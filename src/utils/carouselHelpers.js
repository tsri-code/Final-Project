// carousel navigation helpers

// get previous index in carousel
export const getPreviousIndex = (currentIndex, totalItems) => {
  return currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
};

// get next index in carousel
export const getNextIndex = (currentIndex, totalItems) => {
  return currentIndex === totalItems - 1 ? 0 : currentIndex + 1;
};

// create carousel navigation handlers
export const createCarouselHandlers = (
  currentIndex,
  setCurrentIndex,
  totalItems
) => {
  const handlePrevious = () => {
    setCurrentIndex(getPreviousIndex(currentIndex, totalItems));
  };

  const handleNext = () => {
    setCurrentIndex(getNextIndex(currentIndex, totalItems));
  };

  return { handlePrevious, handleNext };
};
