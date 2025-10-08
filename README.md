# Exercise Tracker

A fitness application for searching exercises, building custom workout routines, and scheduling workouts on a calendar. Built as the final project for TripleTen Software Engineering Bootcamp.

**Live Demo:** [Deployment link coming soon]

**Pull Request:** [Link to PR]

### 🔑 Demo Account

To explore the app without creating an account, use these credentials:

- **Email:** `demo@example.com`
- **Password:** `password123`

Alternatively, you can register a new account using the "Sign Up" button. All data is stored locally in your browser.

---

## What This App Does

- **Exercise Search**: Search for exercises by muscle group, type, difficulty, or name using the API Ninjas Exercise API
- **Routine Builder**: Create custom workout routines with sets, reps, and weight tracking
- **Workout Calendar**: Schedule routines on specific dates with repeat options (daily, weekly, monthly)
- **User Authentication**: Login/register system with persistent sessions across page refreshes
- **Data Persistence**: All workouts, schedules, and user data saved to localStorage

---

## Technologies Used

### Core

- **React 19** - Functional components with hooks
- **Vite 7** - Fast development server and build tool
- **React Router** - Client-side routing
- **React Context API** - Global state management for authentication

### Styling

- **CSS3** - Custom styles with BEM methodology
- **Cabinet Grotesk** - Custom typography via @font-face
- **Responsive Design** - Mobile-first with media queries (320px minimum)
- **Flexbox & Grid** - Modern layout techniques

### API & Data

- **API Ninjas Exercise API** - Third-party exercise database
- **Fetch API** - Native HTTP requests (no axios)
- **localStorage** - Client-side data persistence
- **Mock Backend** - Simulated backend for auth and CRUD operations

### Development

- **ESLint** - Code linting with React-specific rules
- **Git** - Version control with feature branches

---

## Key Techniques

- **BEM Methodology**: All CSS classes follow `block__element` and `block_modifier` patterns
- **Component-Based Architecture**: Reusable components (Button, FormInput, Modals, etc.)
- **Responsive Design**: 320px minimum width, tablet (768px), desktop breakpoints
- **State Management**: React Context for auth, component state for UI
- **Form Validation**: Real-time validation with inline error messages
- **Error Handling**: User-friendly error messages with fallback to mock data
- **Promise Chains**: API calls use `.then()/.catch()` pattern
- **Event Cleanup**: useEffect cleanup to prevent memory leaks

---

## Project Structure

```
src/
├── Calendar/              # Workout scheduling page
├── SavedWorkouts/         # Exercise search & routine management
├── components/            # Reusable UI components
│   ├── App/              # Root component
│   ├── Header/           # Site header with navigation
│   ├── Footer/           # Site footer
│   ├── Button/           # Reusable button component
│   ├── FormInput/        # Form input with validation
│   ├── Modal/            # Modal system
│   │   ├── LoginModal/
│   │   ├── RegisterModal/
│   │   ├── NotificationModal/
│   │   ├── ConfirmationModal/
│   │   ├── InfoModal/
│   │   └── ModalWithForm/
│   ├── Preloader/        # Loading spinner
│   ├── RoutineBuilder/   # Routine creation interface
│   └── ExerciseRow/      # Individual exercise editor
├── contexts/
│   └── AuthContext.jsx   # Authentication state management
├── utils/                # Helper functions
│   ├── exerciseApi.js   # API Ninjas integration
│   ├── mockBackendApi.js # Simulated backend
│   ├── storageHelpers.js # localStorage utilities
│   ├── validation.js    # Form validation
│   └── ...              # Other helpers
└── vendor/
    └── fonts/           # Cabinet Grotesk font files
```

---

## Setup & Installation

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm (comes with Node.js)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd se_final_project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## Available Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

---

## Features in Detail

### Exercise Search

- Search by muscle group, exercise type, difficulty level, or name
- Interactive carousel to browse results
- Add exercises to routine builder
- Fallback to mock data if API is unavailable

### Routine Builder

- Add multiple exercises to a routine
- Configure sets, reps, and weight for each exercise
- Edit existing routines
- Delete exercises or entire routines
- Save routines with custom names

### Workout Calendar

- Monthly calendar view
- Schedule saved routines on specific dates
- Set time for workouts
- Recurring schedules (daily, weekly, monthly)
- Delete individual workouts or all future occurrences
- View all scheduled workouts at a glance

### User Authentication

- Register new accounts
- Login with email/password
- Persistent sessions across page refreshes
- Protected routes (My Workouts, Calendar)
- Logout with redirect

---

## Design & Styling

- **Dark Theme**: Dark background (#0a0a0a) with navy blue accents (#1e3a8a)
- **Typography**: Cabinet Grotesk font family throughout
- **Responsive**: Fully optimized for mobile (320px), tablet (768px), and desktop
- **Custom Modals**: Themed notification, confirmation, and info modals
- **Smooth Transitions**: 0.2s ease transitions on interactive elements

---

## API Integration

### Third-Party API

- **API Ninjas Exercise API**: Provides exercise data
- **Endpoints Used**:
  - Muscle group search
  - Exercise type search
  - Difficulty level search
  - Name search

### Mock Backend

- Simulates user authentication (login, register, token validation)
- Simulates CRUD operations for workouts
- Uses localStorage for data persistence
- Allows full app functionality without a real backend

---

## Code Quality

- **BEM CSS Methodology**: Consistent, scalable class naming
- **No Third-Party UI Libraries**: Pure React and vanilla JS
- **Semantic HTML**: Proper use of header, nav, main, footer, section
- **Clean Code**: No unused variables, functions, or imports
- **Consistent Formatting**: Standardized indentation and structure
- **Error Boundaries**: Graceful error handling throughout

---

## Author

**Sridhar Tiwari**

Built as the final project for TripleTen Software Engineering Bootcamp to demonstrate:

- Modern React development
- Component-based architecture
- State management with Context API
- Third-party API integration
- Responsive mobile-first design
- Professional code organization

---

## License

© 2025 Sridhar Tiwari. All rights reserved.

This project is part of the TripleTen Software Engineering Bootcamp final project.
