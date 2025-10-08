import { exerciseApiKey } from "./constants.js";

const baseUrl = "https://api.api-ninjas.com/v1";

// check if response is ok, return json or reject with error
const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

// fetch exercises filtered by muscle group
function getExercisesByMuscle(muscle) {
  return fetch(`${baseUrl}/exercises?muscle=${muscle}`, {
    method: "GET",
    headers: {
      "X-Api-Key": exerciseApiKey,
    },
  }).then(checkResponse);
}

// fetch exercises filtered by type
function getExercisesByType(type) {
  return fetch(`${baseUrl}/exercises?type=${type}`, {
    method: "GET",
    headers: {
      "X-Api-Key": exerciseApiKey,
    },
  }).then(checkResponse);
}

// fetch exercises filtered by difficulty
function getExercisesByDifficulty(difficulty) {
  return fetch(`${baseUrl}/exercises?difficulty=${difficulty}`, {
    method: "GET",
    headers: {
      "X-Api-Key": exerciseApiKey,
    },
  }).then(checkResponse);
}

// fetch exercises by name search
function getExercisesByName(name) {
  return fetch(`${baseUrl}/exercises?name=${name}`, {
    method: "GET",
    headers: {
      "X-Api-Key": exerciseApiKey,
    },
  }).then(checkResponse);
}

// fetch all exercises without filters
function getAllExercises() {
  return fetch(`${baseUrl}/exercises`, {
    method: "GET",
    headers: {
      "X-Api-Key": exerciseApiKey,
    },
  }).then(checkResponse);
}

export {
  getExercisesByMuscle,
  getExercisesByType,
  getExercisesByDifficulty,
  getExercisesByName,
  getAllExercises,
};
