import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import FormInput from "../../FormInput/FormInput.jsx";
import { validateEmail } from "../../../utils/validation.js";
import { createFormChangeHandler } from "../../../utils/formHelpers.js";

// login modal with email and password
function LoginModal({
  isOpen,
  onClose,
  onSuccess,
  isLoading,
  error,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        email: "",
        password: "",
      });
    }
  }, [isOpen]);

  const handleChange = (value, fieldName) => {
    createFormChangeHandler(setFormData)(value, fieldName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      return;
    }

    if (!formData.password) {
      return;
    }

    if (onSuccess) onSuccess();
    if (onSubmit) onSubmit(formData);
  };

  const handleClose = () => {
    setFormData({ email: "", password: "" });
    if (onClose) onClose();
  };

  const isFormValid = formData.email.trim() !== "" && formData.password !== "";

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign In"
      onClose={handleClose}
      onSubmit={handleSubmit}
      submitButtonText="Sign In"
      isLoading={isLoading}
      error={error}
      isSubmitDisabled={!isFormValid}
    >
      <FormInput
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        validate={validateEmail}
        required
        placeholder="Enter your email"
        disabled={isLoading}
      />

      <FormInput
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        placeholder="Enter your password"
        disabled={isLoading}
      />
    </ModalWithForm>
  );
}

export default LoginModal;
