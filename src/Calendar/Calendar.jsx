import { useState, useEffect } from "react";
import {
  formatDateKey,
  mockGetWorkouts,
  saveToStorage,
  getFromStorage,
  STORAGE_KEYS,
} from "../utils/index.js";
import Button from "../components/Button/Button.jsx";
import "./Calendar.css";

// Calendar page for scheduling workouts
function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduledWorkouts, setScheduledWorkouts] = useState({});
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [scheduleForm, setScheduleForm] = useState({
    date: "",
    routine: "",
    time: "07:00",
    repeat: "does-not-repeat",
    count: 1,
  });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    date: null,
    workout: null,
  });

  // load saved data on mount
  useEffect(() => {
    // load saved workouts for dropdown
    mockGetWorkouts()
      .then((workouts) => {
        setSavedWorkouts(workouts);
      })
      .catch((err) => {
        console.error("Error loading workouts:", err);
      });

    // load scheduled workouts from localStorage
    const savedCalendar = getFromStorage(STORAGE_KEYS.CALENDAR);
    if (savedCalendar) {
      setScheduledWorkouts(savedCalendar);
    }
  }, []);

  // get calendar data
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  // calculate first day and total days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // navigation handlers
  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // generate calendar days
  const generateCalendarDays = () => {
    const days = [];

    // previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, daysInPrevMonth - i),
      });
    }

    // current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        date: new Date(year, month, day),
      });
    }

    // next month days to fill grid
    const remainingDays = 42 - days.length; // 6 rows x 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(year, month + 1, day),
      });
    }

    return days;
  };

  // get workouts for specific date
  const getWorkoutsForDate = (date) => {
    return scheduledWorkouts[formatDateKey(date)] || [];
  };

  // calculate repeat dates
  const calculateRepeatDates = (startDate, repeat, interval) => {
    const dates = [];
    const start = new Date(startDate);
    const maxOccurrences = 26; // limit to 26 occurrences (~6 months for weekly)

    if (repeat === "does-not-repeat") {
      dates.push(formatDateKey(start));
      return dates;
    }

    for (let i = 0; i < maxOccurrences; i++) {
      const currentDate = new Date(start);

      if (repeat === "daily") {
        currentDate.setDate(start.getDate() + i * interval);
      } else if (repeat === "weekly") {
        currentDate.setDate(start.getDate() + i * interval * 7);
      } else if (repeat === "monthly") {
        currentDate.setMonth(start.getMonth() + i * interval);
      }

      dates.push(formatDateKey(currentDate));
    }

    return dates;
  };

  // handle schedule form submission
  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!scheduleForm.date || !scheduleForm.routine) return;

    const workouts = { ...scheduledWorkouts };
    const repeatDates = calculateRepeatDates(
      scheduleForm.date,
      scheduleForm.repeat,
      scheduleForm.count
    );

    // add workout to all repeat dates
    repeatDates.forEach((dateKey) => {
      if (!workouts[dateKey]) {
        workouts[dateKey] = [];
      }

      workouts[dateKey].push({
        routine: scheduleForm.routine,
        time: scheduleForm.time,
        repeat: scheduleForm.repeat,
        interval: scheduleForm.count,
        id: `${Date.now()}-${dateKey}`, // unique id for deletion
      });
    });

    setScheduledWorkouts(workouts);

    // save to localStorage
    saveToStorage(STORAGE_KEYS.CALENDAR, workouts);

    setScheduleForm({
      date: "",
      routine: "",
      time: "07:00",
      repeat: "does-not-repeat",
      count: 1,
    });
  };

  // open delete modal
  const handleDeleteClick = (date, workout) => {
    setDeleteModal({
      isOpen: true,
      date: date,
      workout: workout,
    });
  };

  // close delete modal
  const handleCloseDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      date: null,
      workout: null,
    });
  };

  // delete single workout instance
  const handleDeleteSingle = () => {
    const { date, workout } = deleteModal;
    const workouts = { ...scheduledWorkouts };

    if (workouts[date]) {
      workouts[date] = workouts[date].filter((w) => w.id !== workout.id);
      if (workouts[date].length === 0) {
        delete workouts[date];
      }
      setScheduledWorkouts(workouts);

      // save to localStorage
      saveToStorage(STORAGE_KEYS.CALENDAR, workouts);
    }

    handleCloseDeleteModal();
  };

  // delete this and all future workouts
  const handleDeleteAllFuture = () => {
    const { date, workout } = deleteModal;
    const workouts = { ...scheduledWorkouts };
    const currentDateObj = new Date(date);

    // get the base ID (without the date suffix)
    const baseId = workout.id.split("-")[0];

    // iterate through all dates and remove matching workouts on or after current date
    Object.keys(workouts).forEach((dateKey) => {
      const dateObj = new Date(dateKey);

      // only process dates on or after the current date
      if (dateObj >= currentDateObj) {
        workouts[dateKey] = workouts[dateKey].filter((w) => {
          const wBaseId = w.id.split("-")[0];
          // keep workout if it doesn't match OR if it has different routine/time
          return (
            wBaseId !== baseId ||
            w.routine !== workout.routine ||
            w.time !== workout.time
          );
        });

        // clean up empty dates
        if (workouts[dateKey].length === 0) {
          delete workouts[dateKey];
        }
      }
    });

    setScheduledWorkouts(workouts);

    // save to localStorage
    saveToStorage(STORAGE_KEYS.CALENDAR, workouts);

    handleCloseDeleteModal();
  };

  // get interval text
  const getIntervalText = () => {
    const { repeat, count } = scheduleForm;
    if (repeat === "does-not-repeat") return "";
    if (repeat === "daily") {
      return count === 1 ? "Every day" : `Every ${count} days`;
    }
    if (repeat === "weekly") {
      return count === 1 ? "Every week" : `Every ${count} weeks`;
    }
    if (repeat === "monthly") {
      return count === 1 ? "Every month" : `Every ${count} months`;
    }
    return "";
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="calendar-page">
      <div className="calendar-page__container">
        <div className="calendar-page__content">
          <div className="planner">
            <div className="planner__header">
              <h1 className="planner__title">Planner</h1>
              <div className="planner__navigation">
                <button className="planner__nav-btn" onClick={goToPrevMonth}>
                  Prev
                </button>
                <span className="planner__current-month">
                  {monthName} {year}
                </span>
                <button className="planner__nav-btn" onClick={goToNextMonth}>
                  Next
                </button>
              </div>
            </div>

            <div className="planner__calendar">
              <div className="planner__weekdays">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div key={day} className="planner__weekday">
                      {day}
                    </div>
                  )
                )}
              </div>

              <div className="planner__days">
                {calendarDays.map((dayInfo, index) => {
                  const workouts = getWorkoutsForDate(dayInfo.date);
                  return (
                    <div
                      key={index}
                      className={`planner__day ${
                        !dayInfo.isCurrentMonth
                          ? "planner__day_other-month"
                          : ""
                      }`}
                    >
                      <div className="planner__day-number">{dayInfo.day}</div>
                      {workouts.length > 0 && (
                        <button
                          className="planner__delete-btn"
                          onClick={() =>
                            handleDeleteClick(
                              formatDateKey(dayInfo.date),
                              workouts[0]
                            )
                          }
                        >
                          ✕
                        </button>
                      )}
                      <div className="planner__workouts">
                        {workouts.map((workout) => (
                          <div key={workout.id} className="planner__workout">
                            <span className="planner__workout-text">
                              {workout.routine} • {workout.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="planner__schedule">
              <h2 className="planner__schedule-title">Schedule routine</h2>
              <form className="planner__form" onSubmit={handleScheduleSubmit}>
                <input
                  type="date"
                  className="planner__input"
                  value={scheduleForm.date}
                  onChange={(e) =>
                    setScheduleForm({ ...scheduleForm, date: e.target.value })
                  }
                  required
                />
                <select
                  className="planner__select"
                  value={scheduleForm.routine}
                  onChange={(e) =>
                    setScheduleForm({
                      ...scheduleForm,
                      routine: e.target.value,
                    })
                  }
                  required
                  disabled={savedWorkouts.length === 0}
                >
                  <option value="">
                    {savedWorkouts.length === 0
                      ? "No saved routines - create one first"
                      : "Select routine..."}
                  </option>
                  {savedWorkouts.map((workout) => (
                    <option key={workout.id} value={workout.name}>
                      {workout.name}
                    </option>
                  ))}
                </select>
                <input
                  type="time"
                  className="planner__input"
                  value={scheduleForm.time}
                  onChange={(e) =>
                    setScheduleForm({ ...scheduleForm, time: e.target.value })
                  }
                  required
                />
                <select
                  className="planner__select"
                  value={scheduleForm.repeat}
                  onChange={(e) =>
                    setScheduleForm({ ...scheduleForm, repeat: e.target.value })
                  }
                >
                  <option value="does-not-repeat">Does not repeat</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                <div className="planner__interval">
                  <input
                    type="number"
                    className="planner__input planner__input_small"
                    value={scheduleForm.count}
                    onChange={(e) =>
                      setScheduleForm({
                        ...scheduleForm,
                        count: parseInt(e.target.value) || 1,
                      })
                    }
                    min="1"
                    disabled={scheduleForm.repeat === "does-not-repeat"}
                  />
                  {scheduleForm.repeat !== "does-not-repeat" && (
                    <span className="planner__interval-text">
                      {getIntervalText()}
                    </span>
                  )}
                </div>
                <Button type="submit" variant="primary" size="medium">
                  Add to calendar
                </Button>
              </form>
            </div>
          </div>

          {/* delete modal */}
          {deleteModal.isOpen && (
            <div
              className="delete-modal-overlay"
              onClick={handleCloseDeleteModal}
            >
              <div
                className="delete-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="delete-modal__close"
                  onClick={handleCloseDeleteModal}
                >
                  ✕
                </button>
                <h3 className="delete-modal__title">Delete Workout</h3>
                <p className="delete-modal__text">
                  {deleteModal.workout?.routine} • {deleteModal.workout?.time}
                </p>
                {deleteModal.workout?.repeat !== "does-not-repeat" && (
                  <p className="delete-modal__description">
                    This workout is part of a recurring schedule.
                  </p>
                )}
                <div className="delete-modal__actions">
                  <Button
                    variant="secondary"
                    size="medium"
                    onClick={handleDeleteSingle}
                  >
                    Delete this only
                  </Button>
                  {deleteModal.workout?.repeat !== "does-not-repeat" && (
                    <Button
                      variant="primary"
                      size="medium"
                      onClick={handleDeleteAllFuture}
                    >
                      Delete all future
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
