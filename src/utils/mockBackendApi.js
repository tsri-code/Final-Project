// mock backend api for simulating server responses
import {
  saveToStorage,
  getFromStorage,
  removeFromStorage,
  STORAGE_KEYS,
} from "./storageHelpers.js";

// in-memory storage for mock data - initialize from localStorage or use defaults
let mockUsers = getFromStorage(STORAGE_KEYS.USERS) || [
  // demo user for testing
  {
    id: 1,
    name: "Demo User",
    email: "demo@example.com",
    password: "Password123!",
  },
];

// initialize from localStorage
let mockWorkouts = getFromStorage(STORAGE_KEYS.WORKOUTS) || [];
let currentUser = getFromStorage(STORAGE_KEYS.CURRENT_USER);

// mock exercise database for when external api is down
const mockExercises = {
  chest: [
    {
      name: "Bench Press",
      type: "strength",
      muscle: "chest",
      difficulty: "intermediate",
      equipment: "barbell",
      instructions: "Lie on bench, lower bar to chest, press up",
    },
    {
      name: "Push-ups",
      type: "strength",
      muscle: "chest",
      difficulty: "beginner",
      equipment: "body_only",
      instructions: "Lower body until chest nearly touches floor, push back up",
    },
    {
      name: "Incline Dumbbell Press",
      type: "strength",
      muscle: "chest",
      difficulty: "intermediate",
      equipment: "dumbbell",
      instructions: "Press dumbbells upward on incline bench",
    },
    {
      name: "Cable Flyes",
      type: "strength",
      muscle: "chest",
      difficulty: "intermediate",
      equipment: "cable",
      instructions: "Pull cables together in front of chest",
    },
    {
      name: "Dips",
      type: "strength",
      muscle: "chest",
      difficulty: "intermediate",
      equipment: "body_only",
      instructions: "Lower body between parallel bars, push back up",
    },
  ],
  biceps: [
    {
      name: "Barbell Curl",
      type: "strength",
      muscle: "biceps",
      difficulty: "beginner",
      equipment: "barbell",
      instructions: "Curl barbell toward shoulders, lower slowly",
    },
    {
      name: "Hammer Curls",
      type: "strength",
      muscle: "biceps",
      difficulty: "beginner",
      equipment: "dumbbell",
      instructions: "Curl dumbbells with neutral grip",
    },
    {
      name: "Concentration Curls",
      type: "strength",
      muscle: "biceps",
      difficulty: "intermediate",
      equipment: "dumbbell",
      instructions: "Curl dumbbell while seated, elbow on thigh",
    },
  ],
  triceps: [
    {
      name: "Tricep Dips",
      type: "strength",
      muscle: "triceps",
      difficulty: "intermediate",
      equipment: "body_only",
      instructions: "Lower body by bending elbows, push back up",
    },
    {
      name: "Overhead Extension",
      type: "strength",
      muscle: "triceps",
      difficulty: "beginner",
      equipment: "dumbbell",
      instructions: "Extend arms overhead with dumbbell",
    },
    {
      name: "Skull Crushers",
      type: "strength",
      muscle: "triceps",
      difficulty: "intermediate",
      equipment: "barbell",
      instructions: "Lower bar to forehead, extend arms",
    },
  ],
  legs: [
    {
      name: "Squats",
      type: "strength",
      muscle: "quadriceps",
      difficulty: "intermediate",
      equipment: "barbell",
      instructions: "Lower into squat position, drive through heels",
    },
    {
      name: "Leg Press",
      type: "strength",
      muscle: "quadriceps",
      difficulty: "beginner",
      equipment: "machine",
      instructions: "Push platform away with legs",
    },
    {
      name: "Lunges",
      type: "strength",
      muscle: "quadriceps",
      difficulty: "intermediate",
      equipment: "body_only",
      instructions: "Step forward and lower back knee",
    },
  ],
  back: [
    {
      name: "Pull-ups",
      type: "strength",
      muscle: "lats",
      difficulty: "intermediate",
      equipment: "body_only",
      instructions: "Pull body up until chin over bar",
    },
    {
      name: "Barbell Rows",
      type: "strength",
      muscle: "middle_back",
      difficulty: "intermediate",
      equipment: "barbell",
      instructions: "Pull bar to chest while bent over",
    },
    {
      name: "Lat Pulldown",
      type: "strength",
      muscle: "lats",
      difficulty: "beginner",
      equipment: "cable",
      instructions: "Pull bar down to chest",
    },
  ],
  shoulders: [
    {
      name: "Shoulder Press",
      type: "strength",
      muscle: "shoulders",
      difficulty: "intermediate",
      equipment: "dumbbell",
      instructions: "Press dumbbells overhead",
    },
    {
      name: "Lateral Raises",
      type: "strength",
      muscle: "shoulders",
      difficulty: "beginner",
      equipment: "dumbbell",
      instructions: "Raise arms to sides until parallel",
    },
    {
      name: "Front Raises",
      type: "strength",
      muscle: "shoulders",
      difficulty: "beginner",
      equipment: "dumbbell",
      instructions: "Raise arms forward to shoulder height",
    },
  ],
};

// simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// mock login
export const mockLogin = (email, password) => {
  return delay(1000).then(() => {
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      currentUser = { id: user.id, name: user.name, email: user.email };
      const token = `mock-jwt-${Date.now()}-${user.id}`;

      // save to localStorage
      saveToStorage(STORAGE_KEYS.AUTH_TOKEN, token);
      saveToStorage(STORAGE_KEYS.CURRENT_USER, currentUser);

      return { user: currentUser, token };
    }

    return Promise.reject(new Error("Invalid email or password"));
  });
};

// mock registration
export const mockRegister = (name, email, password) => {
  return delay(1000).then(() => {
    if (mockUsers.find((u) => u.email === email)) {
      return Promise.reject(new Error("Email already exists"));
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    mockUsers.push(newUser);
    currentUser = { id: newUser.id, name, email };
    const token = `mock-jwt-${Date.now()}-${newUser.id}`;

    // save to localStorage
    saveToStorage(STORAGE_KEYS.USERS, mockUsers);
    saveToStorage(STORAGE_KEYS.AUTH_TOKEN, token);
    saveToStorage(STORAGE_KEYS.CURRENT_USER, currentUser);

    return { user: currentUser, token };
  });
};

// mock token check
export const mockCheckToken = (token) => {
  return delay(500).then(() => {
    if (token && token.startsWith("mock-jwt-")) {
      // extract user id from token
      const parts = token.split("-");
      const userId = parseInt(parts[parts.length - 1]);

      if (currentUser && currentUser.id === userId) {
        return { user: currentUser };
      }

      // if no current user, return demo user
      return {
        user: { id: 1, name: "Demo User", email: "demo@example.com" },
      };
    }

    return Promise.reject(new Error("Invalid or expired token"));
  });
};

// mock save workout
export const mockSaveWorkout = (workout) => {
  return delay(500).then(() => {
    const newWorkout = {
      ...workout,
      id: Date.now(),
      userId: currentUser?.id || 1,
      createdAt: new Date().toISOString(),
    };

    mockWorkouts.push(newWorkout);

    // save to localStorage
    saveToStorage(STORAGE_KEYS.WORKOUTS, mockWorkouts);

    return newWorkout;
  });
};

// mock delete workout
export const mockDeleteWorkout = (workoutId) => {
  return delay(500).then(() => {
    const initialLength = mockWorkouts.length;
    mockWorkouts = mockWorkouts.filter((w) => w.id !== workoutId);

    if (mockWorkouts.length === initialLength) {
      return Promise.reject(new Error("Workout not found"));
    }

    // save to localStorage
    saveToStorage(STORAGE_KEYS.WORKOUTS, mockWorkouts);

    return { success: true, id: workoutId };
  });
};

// mock get user workouts
export const mockGetWorkouts = () => {
  return delay(500).then(() => {
    const userId = currentUser?.id || 1;
    return mockWorkouts.filter((w) => w.userId === userId);
  });
};

// mock update workout
export const mockUpdateWorkout = (workoutId, updates) => {
  return delay(500).then(() => {
    const index = mockWorkouts.findIndex((w) => w.id === workoutId);

    if (index === -1) {
      return Promise.reject(new Error("Workout not found"));
    }

    mockWorkouts[index] = {
      ...mockWorkouts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    // save to localStorage
    saveToStorage(STORAGE_KEYS.WORKOUTS, mockWorkouts);

    return mockWorkouts[index];
  });
};

// get current user
export const getCurrentUser = () => currentUser;

// logout
export const mockLogout = () => {
  currentUser = null;

  // clear auth data from localStorage
  removeFromStorage(STORAGE_KEYS.AUTH_TOKEN);
  removeFromStorage(STORAGE_KEYS.CURRENT_USER);
};

// reset all data (for testing)
export const resetMockData = () => {
  mockUsers = [
    {
      id: 1,
      name: "Demo User",
      email: "demo@example.com",
      password: "password123",
    },
  ];
  mockWorkouts = [];
  currentUser = null;
};

// mock exercise search (fallback when external api is down)
export const mockExerciseSearch = (searchType, searchQuery) => {
  return delay(800).then(() => {
    const query = searchQuery.toLowerCase();

    if (searchType === "muscle") {
      return mockExercises[query] || [];
    }

    if (searchType === "name") {
      const allExercises = Object.values(mockExercises).flat();
      return allExercises.filter((ex) => ex.name.toLowerCase().includes(query));
    }

    if (searchType === "difficulty") {
      const allExercises = Object.values(mockExercises).flat();
      return allExercises.filter((ex) => ex.difficulty === query);
    }

    if (searchType === "type") {
      const allExercises = Object.values(mockExercises).flat();
      return allExercises.filter((ex) => ex.type === query);
    }

    return [];
  });
};
