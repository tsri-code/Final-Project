import { useState, useEffect } from "react";
import Button from "../Button/Button.jsx";
import ExerciseRow from "../ExerciseRow/ExerciseRow.jsx";
import "./RoutineBuilder.css";

// routine builder for creating workout routines
function RoutineBuilder({
  exercises,
  onSave,
  onRemoveExercise,
  onUpdateExercise,
  onCancel,
  editingRoutine,
}) {
  const [routineTitle, setRoutineTitle] = useState("");
  const [titleError, setTitleError] = useState("");

  // set title when editing existing routine
  useEffect(() => {
    if (editingRoutine) {
      setRoutineTitle(editingRoutine.name);
    } else {
      setRoutineTitle("");
    }
    setTitleError("");
  }, [editingRoutine]);

  const handleTitleChange = (e) => {
    setRoutineTitle(e.target.value);
    if (titleError) {
      setTitleError("");
    }
  };

  const handleSaveRoutine = () => {
    if (!routineTitle.trim()) {
      setTitleError("Please enter a routine title");
      return;
    }

    if (exercises.length === 0) {
      setTitleError("Please add at least one exercise to the routine");
      return;
    }

    onSave(routineTitle, exercises);
    setRoutineTitle("");
    setTitleError("");
  };

  const handleCancel = () => {
    setRoutineTitle("");
    setTitleError("");
    onCancel();
  };

  if (exercises.length === 0) {
    return null;
  }

  return (
    <div className="routine-builder">
      <div className="routine-builder__header">
        <div className="routine-builder__title-field">
          <input
            type="text"
            className={`routine-builder__title-input ${
              titleError ? "routine-builder__title-input_error" : ""
            }`}
            placeholder="Enter routine name (e.g., Tuesday, Leg Day)"
            value={routineTitle}
            onChange={handleTitleChange}
          />
          {titleError && <p className="routine-builder__error">{titleError}</p>}
        </div>
        <div className="routine-builder__actions">
          <Button variant="secondary" size="medium" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" size="medium" onClick={handleSaveRoutine}>
            {editingRoutine ? "Update Routine" : "Save Routine"}
          </Button>
        </div>
      </div>

      <div className="routine-builder__exercises">
        {exercises.map((exercise) => (
          <ExerciseRow
            key={exercise.id}
            exercise={exercise}
            onUpdate={onUpdateExercise}
            onRemove={onRemoveExercise}
          />
        ))}
      </div>
    </div>
  );
}

export default RoutineBuilder;
