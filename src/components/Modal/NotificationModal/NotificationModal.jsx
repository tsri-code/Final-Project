import Button from "../../Button/Button.jsx";
import "./NotificationModal.css";

// notification modal for success/info messages
function NotificationModal({
  isOpen,
  onClose,
  title,
  message,
  type = "success",
}) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className={`modal-content notification-modal__content ${
          type !== "success" ? `notification-modal__content_${type}` : ""
        }`}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className={`modal-icon notification-modal__icon_${type}`}>
          {type === "success" ? "✓" : type === "error" ? "✕" : "ℹ"}
        </div>

        <h2 className="modal-title">{title}</h2>

        {message && <p className="modal-message">{message}</p>}

        <div className="modal-actions">
          <Button variant="primary" size="medium" onClick={onClose}>
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotificationModal;
