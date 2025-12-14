export function getStarsRatingCount(count) {
  if (count < 2000) return 1;
  if (count < 4000) return 2;
  if (count < 6000) return 3;
  if (count < 8000) return 4;
  return 5;
}
