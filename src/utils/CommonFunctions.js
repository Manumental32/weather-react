const dayByIndex = (index) => {
  const currentDate = new Date();
  return new Date(currentDate.setDate(currentDate.getDate() + 1 + index));
};

// eslint-disable-next-line import/prefer-default-export
export const weekdayReadeable = (index) => {
  const date = dayByIndex(index);
  return new Intl.DateTimeFormat('es', { weekday: 'long' }).format(date);
};

export const formatTemp = (temp) => temp && parseFloat(temp).toFixed(0);
