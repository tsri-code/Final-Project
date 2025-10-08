import { useState, useEffect } from "react";
import {
  mockSaveWorkout,
  mockGetWorkouts,
  mockDeleteWorkout,
  mockUpdateWorkout,
  mockExerciseSearch,
  createExerciseWithDefaults,
  prepareRoutineForSave,
  addExerciseIds,
  getPreviousIndex,
  getNextIndex,
  getExercisesByMuscle,
  getExercisesByType,
  getExercisesByDifficulty,
  getExercisesByName,
} from "../utils/index.js";
import Preloader from "../components/Preloader/Preloader.jsx";
import Button from "../components/Button/Button.jsx";
import RoutineBuilder from "../components/RoutineBuilder/RoutineBuilder.jsx";
import NotificationModal from "../components/Modal/NotificationModal/NotificationModal.jsx";
import ConfirmationModal from "../components/Modal/ConfirmationModal/ConfirmationModal.jsx";
import InfoModal from "../components/Modal/InfoModal/InfoModal.jsx";
import "./SavedWorkouts.css";

// page for searching exercises and managing saved workouts
function SavedWorkouts() {
  // search state
  const [searchType, setSearchType] = useState("muscle");
  const [searchQuery, setSearchQuery] = useState("");
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  // saved workouts state
  const [savedWorkouts, setSavedWorkouts] = useState([]);

  // routine builder state
  const [routineExercises, setRoutineExercises] = useState([]);
  const [editingRoutine, setEditingRoutine] = useState(null);

  // modal state
  const [notificationModal, setNotificationModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success",
  });
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    workoutId: null,
  });
  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    title: "",
    content: "",
  });

  // load saved workouts on mount
  useEffect(() => {
    loadSavedWorkouts();
  }, []);

  const loadSavedWorkouts = () => {
    mockGetWorkouts()
      .then((workouts) => {
        setSavedWorkouts(workouts);
      })
      .catch((err) => {
        console.error("Error loading workouts:", err);
      });
  };

  // handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setExercises([]);
    setCurrentExerciseIndex(0);

    // determine which api function to use based on search type
    let apiCall;
    if (searchType === "muscle") {
      apiCall = getExercisesByMuscle(searchQuery);
    } else if (searchType === "type") {
      apiCall = getExercisesByType(searchQuery);
    } else if (searchType === "difficulty") {
      apiCall = getExercisesByDifficulty(searchQuery);
    } else if (searchType === "name") {
      apiCall = getExercisesByName(searchQuery);
    }

    // try real api first, fallback to mock data if api fails
    apiCall
      .then((results) => {
        if (results.length === 0) {
          setError("No exercises found. Try a different search term.");
        }
        setExercises(results);
        setIsLoading(false);
      })
      .catch((apiError) => {
        console.warn("Real API failed, falling back to mock data:", apiError);

        // fallback to mock data
        mockExerciseSearch(searchType, searchQuery)
          .then((results) => {
            if (results.length === 0) {
              setError("No exercises found. Try a different search term.");
            }
            setExercises(results);
            setIsLoading(false);
          })
          .catch((mockError) => {
            setError(
              "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later."
            );
            console.error("Search error:", mockError);
            setIsLoading(false);
          });
      });
  };

  // handle add exercise to routine
  const handleAddToRoutine = (exercise) => {
    const exerciseWithDefaults = createExerciseWithDefaults(exercise);
    setRoutineExercises((prev) => [...prev, exerciseWithDefaults]);
  };

  // handle update exercise in routine
  const handleUpdateExercise = (exerciseId, updates) => {
    setRoutineExercises((prev) =>
      prev.map((ex) => (ex.id === exerciseId ? { ...ex, ...updates } : ex))
    );
  };

  // handle remove exercise from routine
  const handleRemoveExercise = (exerciseId) => {
    setRoutineExercises((prev) => prev.filter((ex) => ex.id !== exerciseId));
  };

  // handle save complete routine
  const handleSaveRoutine = (title, exercises) => {
    const routine = prepareRoutineForSave(
      { id: editingRoutine?.id, name: title },
      exercises
    );
    const savePromise = editingRoutine
      ? mockUpdateWorkout(editingRoutine.id, routine)
      : mockSaveWorkout(routine);

    savePromise
      .then(() => mockGetWorkouts())
      .then((workouts) => {
        setSavedWorkouts(workouts);
        setRoutineExercises([]);
        setEditingRoutine(null);
        setNotificationModal({
          isOpen: true,
          title: editingRoutine ? "Routine Updated!" : "Routine Saved!",
          message: editingRoutine
            ? "Your routine has been updated successfully."
            : "Your routine has been saved successfully.",
          type: "success",
        });
      })
      .catch((err) => {
        console.error("Error saving routine:", err);
        setNotificationModal({
          isOpen: true,
          title: "Error",
          message: "Failed to save routine. Please try again.",
          type: "error",
        });
      });
  };

  // handle edit routine
  const handleEditRoutine = (routine) => {
    setRoutineExercises(addExerciseIds(routine.exercises));
    setEditingRoutine(routine);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // handle cancel edit
  const handleCancelEdit = () => {
    setRoutineExercises([]);
    setEditingRoutine(null);
  };

  // handle delete click - show confirmation modal
  const handleDeleteClick = (workoutId) => {
    setConfirmationModal({
      isOpen: true,
      workoutId,
    });
  };

  // handle confirmed delete
  const handleConfirmDelete = () => {
    const { workoutId } = confirmationModal;
    mockDeleteWorkout(workoutId)
      .then(() => mockGetWorkouts())
      .then((workouts) => {
        setSavedWorkouts(workouts);
        setNotificationModal({
          isOpen: true,
          title: "Routine Deleted",
          message: "Your routine has been deleted successfully.",
          type: "success",
        });
      })
      .catch((err) => {
        console.error("Error deleting workout:", err);
        setNotificationModal({
          isOpen: true,
          title: "Error",
          message: "Failed to delete routine. Please try again.",
          type: "error",
        });
      });
  };

  // close modals
  const handleCloseNotification = () => {
    setNotificationModal({
      isOpen: false,
      title: "",
      message: "",
      type: "success",
    });
  };

  const handleCloseConfirmation = () => {
    setConfirmationModal({ isOpen: false, workoutId: null });
  };

  const handleShowInfo = (title, content) => {
    setInfoModal({ isOpen: true, title, content });
  };

  const handleCloseInfo = () => {
    setInfoModal({ isOpen: false, title: "", content: "" });
  };

  // carousel navigation
  const handlePrevExercise = () => {
    setCurrentExerciseIndex(
      getPreviousIndex(currentExerciseIndex, exercises.length)
    );
  };

  const handleNextExercise = () => {
    setCurrentExerciseIndex(
      getNextIndex(currentExerciseIndex, exercises.length)
    );
  };

  const currentExercise = exercises[currentExerciseIndex];

  return (
    <div className="saved-workouts-page">
      <div className="saved-workouts-page__container">
        {/* search section */}
        <section className="saved-workouts-page__search">
          <header className="saved-workouts-page__header">
            <h1 className="saved-workouts-page__title">Exercise Search</h1>
            <p className="saved-workouts-page__description">
              Search for exercises by muscle group, type, difficulty, or name
            </p>
          </header>
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-form__group">
              <label htmlFor="search-type" className="search-form__label">
                Search by
              </label>
              <select
                id="search-type"
                className="search-form__select"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="muscle">Muscle Group</option>
                <option value="type">Exercise Type</option>
                <option value="difficulty">Difficulty</option>
                <option value="name">Exercise Name</option>
              </select>
            </div>

            <div className="search-form__group">
              <label htmlFor="search-query" className="search-form__label">
                Search term
              </label>
              <input
                id="search-query"
                type="text"
                className="search-form__input"
                placeholder={`e.g., ${
                  searchType === "muscle"
                    ? "biceps, chest, legs"
                    : searchType === "type"
                    ? "strength, cardio, stretching"
                    : searchType === "difficulty"
                    ? "beginner, intermediate, expert"
                    : "push-up, squat"
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
            </div>

            <Button type="submit" variant="primary" size="large">
              Search Exercises
            </Button>
          </form>

          {/* loading state */}
          {isLoading && (
            <div className="saved-workouts-page__loading">
              <Preloader text="Searching exercises..." />
            </div>
          )}

          {/* error state */}
          {error && !isLoading && (
            <div className="saved-workouts-page__error">
              <p className="saved-workouts-page__error-text">{error}</p>
            </div>
          )}

          {/* empty state */}
          {!isLoading && !error && exercises.length === 0 && searchQuery && (
            <div className="saved-workouts-page__empty">
              <p className="saved-workouts-page__empty-text">
                Nothing found. Try a different search term.
              </p>
            </div>
          )}

          {/* results carousel */}
          {!isLoading && !error && exercises.length > 0 && currentExercise && (
            <div className="saved-workouts-page__results">
              <h2 className="saved-workouts-page__results-title">
                Search Results ({currentExerciseIndex + 1} of {exercises.length}
                )
              </h2>
              <div className="exercise-carousel">
                <button
                  className="exercise-carousel__nav exercise-carousel__nav_prev"
                  onClick={handlePrevExercise}
                >
                  ‹
                </button>

                <div className="exercise-carousel__track">
                  <div className="exercise-card">
                    <div className="exercise-card__header">
                      <h3 className="exercise-card__name">
                        {currentExercise.name}
                        <button
                          className="exercise-card__info-btn"
                          onClick={() =>
                            handleShowInfo(
                              currentExercise.name,
                              currentExercise.instructions
                            )
                          }
                        >
                          ⓘ
                        </button>
                      </h3>
                      <span className="exercise-card__difficulty">
                        {currentExercise.difficulty}
                      </span>
                    </div>
                    <div className="exercise-card__details">
                      <p className="exercise-card__detail">
                        <strong>Type:</strong> {currentExercise.type}
                      </p>
                      <p className="exercise-card__detail">
                        <strong>Muscle:</strong> {currentExercise.muscle}
                      </p>
                      <p className="exercise-card__detail">
                        <strong>Equipment:</strong> {currentExercise.equipment}
                      </p>
                    </div>
                    <p className="exercise-card__instructions">
                      {currentExercise.instructions}
                    </p>
                    <Button
                      variant="primary"
                      size="medium"
                      onClick={() => handleAddToRoutine(currentExercise)}
                    >
                      Add to Routine
                    </Button>
                  </div>
                </div>

                <button
                  className="exercise-carousel__nav exercise-carousel__nav_next"
                  onClick={handleNextExercise}
                >
                  ›
                </button>
              </div>

              {/* carousel indicators */}
              <div className="exercise-carousel__indicators">
                {exercises.map((_, index) => (
                  <button
                    key={index}
                    className={`exercise-carousel__indicator ${
                      index === currentExerciseIndex
                        ? "exercise-carousel__indicator_active"
                        : ""
                    }`}
                    onClick={() => setCurrentExerciseIndex(index)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* saved workouts section */}
        <section className="saved-workouts-page__saved">
          <header className="saved-workouts-page__header">
            <h2 className="saved-workouts-page__title">My Saved Workouts</h2>
            <p className="saved-workouts-page__description">
              Your collection of saved exercises
            </p>
          </header>

          {savedWorkouts.length === 0 ? (
            <div className="saved-workouts-page__empty">
              <p className="saved-workouts-page__empty-text">
                No saved workouts yet. Search and save exercises to get started!
              </p>
            </div>
          ) : (
            <div className="exercise-grid">
              {savedWorkouts.map((workout) => (
                <div key={workout.id} className="routine-card">
                  <div className="routine-card__header">
                    <h3 className="routine-card__title">{workout.name}</h3>
                    <span className="routine-card__date">
                      {new Date(workout.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="routine-card__content">
                    {workout.exercises && workout.exercises.length > 0 ? (
                      workout.exercises.map((ex, idx) => (
                        <div key={idx} className="exercise-item">
                          <p className="exercise-item__name">{ex.name}</p>
                          {ex.sets && ex.sets.length > 0 && (
                            <div className="exercise-item__sets">
                              {ex.sets.map((set, setIdx) => (
                                <span
                                  key={setIdx}
                                  className="exercise-item__set"
                                >
                                  S{setIdx + 1}:{set.reps}x{set.weight}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="routine-card__empty">
                        No exercises in this routine
                      </p>
                    )}
                  </div>
                  <div className="routine-card__footer">
                    <Button
                      variant="primary"
                      size="medium"
                      onClick={() => handleEditRoutine(workout)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="medium"
                      onClick={() => handleDeleteClick(workout.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* routine builder section */}
        <RoutineBuilder
          exercises={routineExercises}
          onSave={handleSaveRoutine}
          onRemoveExercise={handleRemoveExercise}
          onUpdateExercise={handleUpdateExercise}
          onCancel={handleCancelEdit}
          editingRoutine={editingRoutine}
        />
      </div>

      {/* Modals */}
      <NotificationModal
        isOpen={notificationModal.isOpen}
        onClose={handleCloseNotification}
        title={notificationModal.title}
        message={notificationModal.message}
        type={notificationModal.type}
      />

      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmDelete}
        title="Delete Routine?"
        message="Are you sure you want to delete this routine? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />

      <InfoModal
        isOpen={infoModal.isOpen}
        onClose={handleCloseInfo}
        title={infoModal.title}
        content={infoModal.content}
      />
    </div>
  );
}

export default SavedWorkouts;
