// workout-related helper functions

// create exercise with unique id and default sets
export const createExerciseWithDefaults = (
  exercise,
  defaultSetCount = 3,
  defaultReps = 10,
  defaultWeight = 0
) => {
  const sets = [];
  for (let i = 0; i < defaultSetCount; i++) {
    sets.push({ reps: defaultReps, weight: defaultWeight });
  }

  return {
    ...exercise,
    id: Date.now() + Math.random(),
    sets,
  };
};

// prepare routine data for saving (strip temporary fields)
export const prepareRoutineForSave = (routine, exercises) => {
  return {
    id: routine?.id,
    name: routine.name || routine,
    exercises: exercises.map((ex) => ({
      name: ex.name,
      type: ex.type,
      muscle: ex.muscle,
      equipment: ex.equipment,
      difficulty: ex.difficulty,
      instructions: ex.instructions,
      sets: ex.sets,
    })),
  };
};

// add unique ids to exercises (for editing)
export const addExerciseIds = (exercises) => {
  return exercises.map((ex) => ({
    ...ex,
    id: Date.now() + Math.random(),
  }));
};
