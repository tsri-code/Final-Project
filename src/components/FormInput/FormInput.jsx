import { useState, useId } from "react";
import { buildClasses, createBemClasses } from "../../utils/domHelpers.js";
import "./FormInput.css";

// form input with label, validation, and error messages
function FormInput({
  label,
  type = "text",
  name,
  value = "",
  onChange,
  onBlur,
  validate,
  required = false,
  placeholder,
  disabled = false,
  helpText,
  className = "",
  ...restProps
}) {
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);

  const inputId = useId();

  const handleChange = (event) => {
    const newValue = event.target.value;

    if (onChange) {
      onChange(newValue, name);
    }

    // clear error when user starts typing
    if (error && touched) {
      setError("");
    }
  };

  const handleBlur = (event) => {
    setTouched(true);
    setFocused(false);

    if (validate) {
      const validationResult = validate(value, name);
      if (validationResult && !validationResult.isValid) {
        setError(validationResult.message);
      }
    }

    if (onBlur) {
      onBlur(event);
    }
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const hasError = touched && error;
  const showHelp = helpText && !hasError;

  const containerClasses = buildClasses(
    ...createBemClasses("form-input", {
      error: hasError,
      disabled,
      focused,
    }),
    className
  );

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={inputId} className="form-input__label">
          {label}
          {required && <span className="form-input__required">*</span>}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className="form-input__field"
        {...restProps}
      />

      {hasError && <div className="form-input__error-message">{error}</div>}

      {showHelp && <div className="form-input__help-text">{helpText}</div>}
    </div>
  );
}

export default FormInput;
