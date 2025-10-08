// combine multiple class names into one string
export const buildClasses = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// create bem classes with modifiers (block_modifier format)
export const createBemClasses = (block, modifiers = {}) => {
  const classes = [block];

  Object.entries(modifiers).forEach(([modifier, condition]) => {
    if (condition) {
      classes.push(`${block}_${modifier}`);
    }
  });

  return classes;
};
