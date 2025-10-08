import { forwardRef } from "react";
import { buildClasses, createBemClasses } from "../../utils/domHelpers.js";
import "./Button.css";

// reusable button with variants and loading state
const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "medium",
      disabled = false,
      loading = false,
      type = "button",
      onClick,
      className = "",
      ...restProps
    },
    ref
  ) => {
    const handleClick = (event) => {
      if (disabled || loading) {
        event.preventDefault();
        return;
      }

      if (onClick) {
        onClick(event);
      }
    };

    const buttonClasses = buildClasses(
      ...createBemClasses("button", {
        [`variant_${variant}`]: true,
        [`size_${size}`]: true,
        loading,
        disabled,
      }),
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={handleClick}
        {...restProps}
      >
        {loading && (
          <span className="button__spinner">
            <span className="button__spinner-inner" />
          </span>
        )}
        <span
          className={`button__content ${
            loading ? "button__content_hidden" : ""
          }`}
        >
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
