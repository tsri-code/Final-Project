// localStorage helpers for persistent data storage

// storage keys for the app
export const STORAGE_KEYS = {
  AUTH_TOKEN: "exercise_tracker_auth_token",
  CURRENT_USER: "exercise_tracker_user",
  USERS: "exercise_tracker_users",
  WORKOUTS: "exercise_tracker_workouts",
  CALENDAR: "exercise_tracker_calendar",
};

// save data to localStorage
export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// get data from localStorage
export const getFromStorage = (key) => {
  const item = localStorage.getItem(key);
  if (!item) return null;

  return JSON.parse(item);
};

// remove data from localStorage
export const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};

// clear all app data from localStorage
export const clearAllStorage = () => {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
};
