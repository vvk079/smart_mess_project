function isBeforeCutoff(mealType) {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const time = hours * 60 + minutes;

  const cutoffMap = {
    Breakfast: 8 * 60, // 08:00
    Lunch: 11 * 60,    // 11:00
    Dinner: 18 * 60    // 18:00
  };

  return time < cutoffMap[mealType];
}

module.exports = isBeforeCutoff;
