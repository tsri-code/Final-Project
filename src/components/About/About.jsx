import { buildClasses, createBemClasses } from "../../utils/domHelpers.js";
import "./About.css";

// about section with project info and author details
const About = ({ className = "" }) => {
  const aboutClasses = buildClasses(...createBemClasses("about"), className);

  return (
    <section className={aboutClasses}>
      <div className="about__container">
        <div className="card">
          <div className="card__header">
            <h2 className="card__title">About Exercise Tracker</h2>
          </div>
          <div className="card__content">
            <div className="about__info">
              <p className="about__description">
                Exercise Tracker is a comprehensive fitness application that
                combines exercise discovery, custom routine building, and
                workout scheduling. Built with modern React and a focus on user
                experience, this app demonstrates full-stack development
                capabilities with persistent state management.
              </p>

              <div className="about__details">
                <div className="about__detail-item">
                  <h3 className="about__detail-title">Technologies Used</h3>
                  <ul className="about__tech-list">
                    <li>React 19 with functional components</li>
                    <li>Vite 7 for fast development</li>
                    <li>React Context API for global state</li>
                    <li>localStorage for data persistence</li>
                    <li>React Router for navigation</li>
                    <li>CSS with BEM methodology</li>
                    <li>API Ninjas Exercise API integration</li>
                    <li>Cabinet Grotesk custom typography</li>
                  </ul>
                </div>

                <div className="about__detail-item">
                  <h3 className="about__detail-title">Key Features</h3>
                  <ul className="about__feature-list">
                    <li>User authentication with persistent sessions</li>
                    <li>Exercise search with 4 search types</li>
                    <li>
                      Custom routine builder with individual set configuration
                    </li>
                    <li>Interactive calendar with workout scheduling</li>
                    <li>Recurring schedule support (daily, weekly, monthly)</li>
                    <li>Dark theme with navy blue accents</li>
                    <li>Fully responsive mobile-first design</li>
                    <li>Real-time form validation</li>
                    <li>Custom modal system</li>
                  </ul>
                </div>
              </div>

              <div className="about__author">
                <h3 className="about__author-title">Created by</h3>
                <p className="about__author-info">Sridhar Tiwari</p>
                <p className="about__author-description">
                  Built as the final project for TripleTen Software Engineering
                  Bootcamp to demonstrate modern React development practices,
                  component-based architecture, state management, API
                  integration, and professional user-centered design.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card__header">
            <h2 className="card__title">Exercise Search Parameters</h2>
          </div>
          <div className="card__content">
            <div className="about__info">
              <p className="about__description">
                On the My Workouts page, you can search for exercises using
                these parameters. Mix and match to find the perfect exercises
                for your routine!
              </p>

              <div className="about__details">
                <div className="about__detail-item">
                  <h3 className="about__detail-title">Search by Name</h3>
                  <p className="about__param-description">
                    Search for exercises by name. Partial matches work! For
                    example, "press" will match "Dumbbell Bench Press".
                  </p>
                </div>

                <div className="about__detail-item">
                  <h3 className="about__detail-title">Search by Type</h3>
                  <ul className="about__feature-list">
                    <li>Cardio</li>
                    <li>Olympic Weightlifting</li>
                    <li>Plyometrics</li>
                    <li>Powerlifting</li>
                    <li>Strength</li>
                    <li>Stretching</li>
                    <li>Strongman</li>
                  </ul>
                </div>
              </div>

              <div className="about__details">
                <div className="about__detail-item">
                  <h3 className="about__detail-title">
                    Search by Muscle Group
                  </h3>
                  <ul className="about__feature-list">
                    <li>Abdominals</li>
                    <li>Abductors</li>
                    <li>Adductors</li>
                    <li>Biceps</li>
                    <li>Calves</li>
                    <li>Chest</li>
                    <li>Forearms</li>
                    <li>Glutes</li>
                    <li>Hamstrings</li>
                    <li>Lats</li>
                    <li>Lower Back</li>
                    <li>Middle Back</li>
                    <li>Neck</li>
                    <li>Quadriceps</li>
                    <li>Traps</li>
                    <li>Triceps</li>
                  </ul>
                </div>

                <div className="about__detail-item">
                  <h3 className="about__detail-title">Search by Difficulty</h3>
                  <ul className="about__feature-list">
                    <li>Beginner</li>
                    <li>Intermediate</li>
                    <li>Expert</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
