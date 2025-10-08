import Button from "../../Button/Button.jsx";
import "./ConfirmationModal.css";

// confirmation modal for destructive actions
function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
}) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className={`modal-content confirmation-modal__content ${
          variant === "warning" ? "confirmation-modal__content_warning" : ""
        }`}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-icon confirmation-modal__icon">⚠</div>

        <h2 className="modal-title">{title}</h2>

        {message && <p className="modal-message">{message}</p>}

        <div className="modal-actions">
          <Button variant="secondary" size="medium" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant="primary" size="medium" onClick={handleConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
