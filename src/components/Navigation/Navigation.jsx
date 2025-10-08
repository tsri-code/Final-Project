import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import Button from "../Button/Button.jsx";
import "./Navigation.css";

// navigation links and auth buttons
function Navigation({
  onLoginClick,
  onRegisterClick,
  onLogout,
  isMenuOpen = false,
  onMenuClose,
}) {
  const { isLoggedIn, currentUser, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // close menu and trigger modal
  const handleLoginClick = () => {
    if (onMenuClose) onMenuClose();
    if (onLoginClick) onLoginClick();
  };

  const handleRegisterClick = () => {
    if (onMenuClose) onMenuClose();
    if (onRegisterClick) onRegisterClick();
  };

  const handleLogoutClick = () => {
    if (onMenuClose) onMenuClose();
    logout();
    if (onLogout) onLogout();
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
    if (onMenuClose) onMenuClose();
  };

  return (
    <nav className={`navigation ${isMenuOpen ? "navigation_opened" : ""}`}>
      <button className="navigation__close" onClick={onMenuClose}>
        ✕
      </button>
      <div className="navigation__group">
        <div className="navigation__links">
          {isLoggedIn && (
            <>
              <div className="navigation__dropdown navigation__dropdown_desktop">
                <button
                  className={`navigation__dropdown-toggle ${
                    isDropdownOpen ? "navigation__dropdown-toggle_active" : ""
                  }`}
                  onClick={handleDropdownToggle}
                >
                  Menu <span className="navigation__dropdown-arrow">▼</span>
                </button>
                {isDropdownOpen && (
                  <div className="navigation__dropdown-menu">
                    <Link
                      to="/my-workouts"
                      className="navigation__dropdown-link"
                      onClick={handleLinkClick}
                    >
                      My Workouts
                    </Link>
                    <Link
                      to="/calendar"
                      className="navigation__dropdown-link"
                      onClick={handleLinkClick}
                    >
                      Calendar
                    </Link>
                    <Link
                      to="/about"
                      className="navigation__dropdown-link"
                      onClick={handleLinkClick}
                    >
                      About
                    </Link>
                  </div>
                )}
              </div>

              <div className="navigation__mobile-links">
                <Link
                  to="/my-workouts"
                  className="navigation__link"
                  onClick={handleLinkClick}
                >
                  My Workouts
                </Link>
                <Link
                  to="/calendar"
                  className="navigation__link"
                  onClick={handleLinkClick}
                >
                  Calendar
                </Link>
                <Link
                  to="/about"
                  className="navigation__link"
                  onClick={handleLinkClick}
                >
                  About
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="navigation__actions">
          {isLoggedIn ? (
            <>
              <span className="navigation__user-name">{currentUser?.name}</span>
              <Button
                variant="secondary"
                size="small"
                onClick={handleLogoutClick}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="small" onClick={handleLoginClick}>
                Sign In
              </Button>
              <Button
                variant="primary"
                size="small"
                onClick={handleRegisterClick}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
