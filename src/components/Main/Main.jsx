import Button from "../Button/Button.jsx";
import { buildClasses, createBemClasses } from "../../utils/domHelpers.js";
import { exampleRoutine } from "../../utils/mockData.js";
import "./Main.css";

// landing page with welcome message and features
function Main({ className = "" }) {
  const mainClasses = buildClasses(...createBemClasses("main"), className);

  return (
    <main className={mainClasses}>
      <div className="main__container">
        <section className="main__welcome">
          <h1 className="main__welcome-title">Welcome to Exercise Tracker</h1>
          <p className="main__welcome-subtitle">
            Your personal fitness companion for tracking workouts, setting
            goals, and monitoring progress.
          </p>
        </section>

        <div className="main__content-grid">
          <section className="main__features">
            <div className="routine-card">
              <div className="routine-card__header">
                <h3 className="routine-card__title">Key Features</h3>
              </div>
              <div className="routine-card__content">
                <div className="exercise-item">
                  <h4 className="exercise-item__name">Track Workouts</h4>
                  <p className="exercise-item__description">
                    Log exercises with sets, reps, and weight
                  </p>
                </div>
                <div className="exercise-item">
                  <h4 className="exercise-item__name">Create Routines</h4>
                  <p className="exercise-item__description">
                    Build and save custom workout routines
                  </p>
                </div>
                <div className="exercise-item">
                  <h4 className="exercise-item__name">View Progress</h4>
                  <p className="exercise-item__description">
                    Analyze your fitness journey with detailed statistics
                  </p>
                </div>
                <div className="exercise-item">
                  <h4 className="exercise-item__name">Stay Organized</h4>
                  <p className="exercise-item__description">
                    Schedule workouts by day and track your consistency
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="main__example">
            <div className="routine-card">
              <div className="routine-card__header">
                <h3 className="routine-card__title">{exampleRoutine.day}</h3>
                <span className="routine-card__date">
                  {exampleRoutine.date}
                </span>
              </div>
              <div className="routine-card__content">
                {exampleRoutine.exercises.map((exercise) => (
                  <div key={exercise.id} className="exercise-item">
                    <h4 className="exercise-item__name">{exercise.name}</h4>
                    <div className="exercise-item__sets">
                      {exercise.sets.split(" ").map((set, index) => (
                        <span key={index} className="exercise-item__set">
                          {set}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Main;
