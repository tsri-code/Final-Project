import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";
import "./Header.css";

// header with logo, navigation, and mobile menu
function Header({
  title = "Exercise Tracker",
  onLoginClick,
  onRegisterClick,
  onLogout,
  isMenuOpen = false,
  onMenuToggle,
  onMenuClose,
}) {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand">
          <h1 className="header__title">
            <Link to="/" className="header__title-link">
              <span className="header__icon">💪</span>
              {title}
            </Link>
          </h1>
        </div>

        {/* hamburger menu for mobile */}
        <button
          className={`header__menu-toggle ${
            isMenuOpen ? "header__menu-toggle_opened" : ""
          }`}
          onClick={onMenuToggle}
        >
          <span className="header__menu-toggle-line" />
          <span className="header__menu-toggle-line" />
          <span className="header__menu-toggle-line" />
        </button>

        <div id="header-navigation">
          <Navigation
            onLoginClick={onLoginClick}
            onRegisterClick={onRegisterClick}
            onLogout={onLogout}
            isMenuOpen={isMenuOpen}
            onMenuClose={onMenuClose}
          />
        </div>
      </div>

      {/* dark overlay when mobile menu is open */}
      {isMenuOpen && <div className="header__overlay" onClick={onMenuClose} />}
    </header>
  );
}

export default Header;
