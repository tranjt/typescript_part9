export const isValidDate = (dateString: string): boolean => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD  
  if (!regEx.exec(dateString)) {
    return false;
  }
  const d = new Date(dateString);
  const dNum = d.getTime();
  if (!dNum && dNum !== 0) {
    return false; // NaN value, Invalid date
  }
  return d.toISOString().slice(0, 10) === dateString;
};
