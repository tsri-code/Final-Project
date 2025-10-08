// generic handler for form field changes
export const createFormChangeHandler = (setFormState) => {
  return (value, fieldName) => {
    setFormState((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));
  };
};
