import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import FormInput from "../../FormInput/FormInput.jsx";
import { validateEmail, validatePassword } from "../../../utils/validation.js";
import { createFormChangeHandler } from "../../../utils/formHelpers.js";

// register modal with name, email, password, and confirmation
function RegisterModal({
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
    confirmPassword: "",
    name: "",
  });

  // reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
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

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    if (!formData.name || !formData.name.trim()) {
      return;
    }

    if (onSuccess) onSuccess();
    if (onSubmit) onSubmit(formData);
  };

  const handleClose = () => {
    setFormData({ email: "", password: "", confirmPassword: "", name: "" });
    if (onClose) onClose();
  };

  const isFormValid =
    formData.email.trim() !== "" &&
    formData.password !== "" &&
    formData.name.trim() !== "" &&
    formData.confirmPassword !== "";

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Create Account"
      onClose={handleClose}
      onSubmit={handleSubmit}
      submitButtonText="Create Account"
      isLoading={isLoading}
      error={error}
      isSubmitDisabled={!isFormValid}
    >
      <FormInput
        label="Full Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Enter your full name"
        disabled={isLoading}
      />

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
        validate={validatePassword}
        required
        placeholder="Create a password"
        disabled={isLoading}
        helpText="Password must be at least 8 characters with uppercase, lowercase, number, and special character"
      />

      <FormInput
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        placeholder="Confirm your password"
        disabled={isLoading}
      />
    </ModalWithForm>
  );
}

export default RegisterModal;
