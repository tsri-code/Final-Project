// format date key for storage (YYYY-MM-DD)
export const formatDateKey = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
};

// format date for display with locale
export const formatDateDisplay = (date, options = {}) => {
  return new Date(date).toLocaleString("default", options);
};
