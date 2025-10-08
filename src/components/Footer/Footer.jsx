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
        </div>
      </div>
    </footer>
  );
}

export default Footer;
