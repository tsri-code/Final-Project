// validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !email.trim()) {
    return { isValid: false, message: "Email is required" };
  }
  const isValid = emailRegex.test(email);
  return {
    isValid,
    message: isValid ? "" : "Please enter a valid email address",
  };
}

// validate password length
function validatePassword(password) {
  if (!password) {
    return { isValid: false, message: "Password is required" };
  }
  if (password.length < 8) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters",
    };
  }
  return { isValid: true, message: "" };
}

export { validateEmail, validatePassword };
