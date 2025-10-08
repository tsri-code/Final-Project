import { buildClasses, createBemClasses } from "../../utils/domHelpers.js";
import "./Footer.css";

// footer with copyright and links
function Footer({ className = "" }) {
  const currentYear = new Date().getFullYear();

  const footerClasses = buildClasses(...createBemClasses("footer"), className);

  return (
    <footer className={footerClasses}>
      <div className="footer__container">
        <div className="footer__content">
          <p className="footer__copyright">
            &copy; {currentYear} Sridhar Tiwari. All rights reserved.
          </p>

          <nav className="footer__nav">
            <ul className="footer__nav-list">
              <li className="footer__nav-item">
                <a href="/privacy" className="footer__nav-link">
                  Privacy
                </a>
              </li>
              <li className="footer__nav-item">
                <a href="/terms" className="footer__nav-link">
                  Terms
                </a>
              </li>
              <li className="footer__nav-item">
                <a href="/contact" className="footer__nav-link">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
