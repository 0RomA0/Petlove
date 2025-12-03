export function formatWorkTime(workDays) {
  if (!Array.isArray(workDays) || workDays.length === 0) {
    return 'Day and night';
  }

  const workDay = workDays.find((day) => day.isOpen);

  if (!workDay) {
    return 'Day and night';
  }

  return `${workDay.from} - ${workDay.to}`;
}
