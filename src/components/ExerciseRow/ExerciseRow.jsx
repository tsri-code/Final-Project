import "./ExerciseRow.css";

// single exercise row in routine builder with vertical sets
function ExerciseRow({ exercise, onUpdate, onRemove }) {
  // update specific set's reps or weight
  const handleSetUpdate = (setIndex, field, value) => {
    const updatedSets = exercise.sets.map((set, index) => {
      if (index === setIndex) {
        return { ...set, [field]: value };
      }
      return set;
    });
    onUpdate(exercise.id, { sets: updatedSets });
  };

  // add new set
  const handleAddSet = () => {
    const lastSet = exercise.sets[exercise.sets.length - 1];
    const newSet = { reps: lastSet?.reps || 10, weight: lastSet?.weight || 0 };
    onUpdate(exercise.id, { sets: [...exercise.sets, newSet] });
  };

  // remove set
  const handleRemoveSet = (setIndex) => {
    if (exercise.sets.length <= 1) {
      alert("Must have at least one set");
      return;
    }
    const updatedSets = exercise.sets.filter((_, index) => index !== setIndex);
    onUpdate(exercise.id, { sets: updatedSets });
  };

  return (
    <div className="exercise-row">
      {/* exercise name header */}
      <div className="exercise-row__header">
        <span className="exercise-row__name">{exercise.name}</span>
        <button
          className="exercise-row__remove"
          onClick={() => onRemove(exercise.id)}
        >
          Remove
        </button>
      </div>

      {/* sets list */}
      <div className="exercise-row__sets">
        {exercise.sets.map((set, index) => (
          <div key={index} className="exercise-row__set">
            <div className="exercise-row__set-number">Set {index + 1}</div>

            <div className="exercise-row__set-field">
              <label className="exercise-row__set-label">Reps</label>
              <input
                type="number"
                className="exercise-row__input"
                value={set.reps}
                onChange={(e) =>
                  handleSetUpdate(index, "reps", parseInt(e.target.value) || 0)
                }
                min="1"
              />
            </div>

            <div className="exercise-row__set-field">
              <label className="exercise-row__set-label">Weight (lbs)</label>
              <input
                type="number"
                className="exercise-row__input"
                value={set.weight}
                onChange={(e) =>
                  handleSetUpdate(
                    index,
                    "weight",
                    parseFloat(e.target.value) || 0
                  )
                }
                min="0"
                step="5"
              />
            </div>

            <button
              className="exercise-row__set-remove"
              onClick={() => handleRemoveSet(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* add set button */}
      <button className="exercise-row__add-set" onClick={handleAddSet}>
        + Add Set
      </button>
    </div>
  );
}

export default ExerciseRow;
