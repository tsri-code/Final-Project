import "./InfoModal.css";

// info modal for displaying detailed content
function InfoModal({ isOpen, onClose, title, content }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content info-modal__content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h3 className="modal-title">{title}</h3>

        <div className="info-modal__text">{content}</div>

        <button className="info-modal__close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default InfoModal;
