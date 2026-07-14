let nextModalStackIndex = 0;

export const acquireModalStackIndex = (): number => {
  const index = nextModalStackIndex;
  nextModalStackIndex += 1;
  return index;
};
