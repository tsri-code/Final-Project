import { buildClasses, createBemClasses } from "../../utils/domHelpers.js";
import "./Preloader.css";

// loading spinner with text
const Preloader = ({
  isVisible = true,
  text = "Loading...",
  size = "medium",
  overlay = false,
  className = "",
}) => {
  if (!isVisible) return null;

  const preloaderClasses = buildClasses(
    ...createBemClasses("preloader", {
      overlay,
      [`size_${size}`]: true,
    }),
    className
  );

  return (
    <div className={preloaderClasses}>
      <div className="preloader__content">
        <div className="preloader__spinner">
          <div className="preloader__spinner-inner">
            <div className="preloader__spinner-circle"></div>
            <div className="preloader__spinner-circle"></div>
            <div className="preloader__spinner-circle"></div>
          </div>
        </div>

        {text && <div className="preloader__text">{text}</div>}
      </div>
    </div>
  );
};

export default Preloader;
