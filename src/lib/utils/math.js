export const getRandomNumber = (max) => Math.floor(Math.random() * max);

export const getNextRoundRobin = (total, current) => {
  if (total === current + 1) return 0;
  return current + 1;
};
