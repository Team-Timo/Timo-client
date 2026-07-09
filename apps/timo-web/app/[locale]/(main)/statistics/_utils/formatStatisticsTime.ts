export const formatStatisticsHourText = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;

  if (hours === 0) {
    return `${restMinutes}m`;
  }

  if (restMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${restMinutes}m`;
};

export const formatStatisticsClockText = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;

  return `${hours}:${String(restMinutes).padStart(2, "0")}`;
};
