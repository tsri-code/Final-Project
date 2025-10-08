import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import LoginModal from "../Modal/LoginModal/LoginModal.jsx";
import RegisterModal from "../Modal/RegisterModal/RegisterModal.jsx";
import SavedWorkouts from "../../SavedWorkouts/SavedWorkouts.jsx";
import Calendar from "../../Calendar/Calendar.jsx";
import About from "../About/About.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import "./App.css";

function AppContent() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  // state for modals and menu
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // open/close modal handlers
  const handleOpenModal = (modalType) => {
    setActiveModal(modalType);
    setError("");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setError("");
    setIsLoading(false);
  };

  // mobile menu handlers
  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  // handle login submission
  const handleLoginSubmit = (formData) => {
    setIsLoading(true);
    setError("");

    login(formData.email, formData.password)
      .then(() => {
        setIsLoading(false);
        handleCloseModal();
      })
      .catch((err) => {
        setError(err.message || "Login failed. Please try again.");
        setIsLoading(false);
      });
  };

  // handle register submission
  const handleRegisterSubmit = (formData) => {
    setIsLoading(true);
    setError("");

    register(formData.name, formData.email, formData.password)
      .then(() => {
        setIsLoading(false);
        handleCloseModal();
      })
      .catch((err) => {
        setError(err.message || "Registration failed. Please try again.");
        setIsLoading(false);
      });
  };

  // close modal when escape key is pressed
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleLogout = () => {
    setIsLoggingOut(true);

    setTimeout(() => {
      setIsLoggingOut(false);
      navigate("/");
    }, 800);
  };

  if (isLoggingOut) {
    return (
      <div className="app">
        <Preloader text="Logging out..." overlay={true} />
      </div>
    );
  }

  return (
    <div className="app">
      <Header
        title="Exercise Tracker"
        onLoginClick={() => handleOpenModal("login")}
        onRegisterClick={() => handleOpenModal("register")}
        onLogout={handleLogout}
        isMenuOpen={isMenuOpen}
        onMenuToggle={handleMenuToggle}
        onMenuClose={handleMenuClose}
      />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/my-workouts" element={<SavedWorkouts />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={handleCloseModal}
        onSubmit={handleLoginSubmit}
        isLoading={isLoading}
        error={error}
      />

      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={handleCloseModal}
        onSubmit={handleRegisterSubmit}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
