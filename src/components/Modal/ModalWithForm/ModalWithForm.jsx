import { useEffect } from "react";
import Button from "../../Button/Button.jsx";
import { buildClasses, createBemClasses } from "../../../utils/domHelpers.js";
import "./ModalWithForm.css";

// reusable modal wrapper for forms
function ModalWithForm({
  isOpen = false,
  title,
  onClose,
  onSubmit,
  submitButtonText = "Submit",
  submitButtonVariant = "primary",
  isLoading = false,
  error = "",
  children,
  isSubmitDisabled = false,
  showCancelButton = true,
  cancelButtonText = "Cancel",
  className = "",
  ...restProps
}) {
  // close modal on escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && onClose) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // close modal when clicking outside
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit && !isLoading && !isSubmitDisabled) {
      onSubmit(event);
    }
  };

  if (!isOpen) return null;

  const modalClasses = buildClasses(
    ...createBemClasses("modal", {
      opened: isOpen,
    }),
    className
  );

  return (
    <div className={modalClasses} onClick={handleOverlayClick}>
      <div className="modal__container">
        <button
          className="modal__close-button"
          onClick={onClose}
          disabled={isLoading}
        >
          ✕
        </button>

        {title && <h2 className="modal__title">{title}</h2>}

        {error && <div className="modal__error">{error}</div>}

        <form
          className="form"
          onSubmit={handleSubmit}
          noValidate
          {...restProps}
        >
          <div className="form__fields">{children}</div>

          <div className="form__actions">
            <Button
              type="submit"
              variant={submitButtonVariant}
              loading={isLoading}
              disabled={isSubmitDisabled}
            >
              {submitButtonText}
            </Button>

            {showCancelButton && (
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                {cancelButtonText}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
