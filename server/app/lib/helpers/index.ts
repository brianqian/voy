export const assertPresent = <T>(val?: T | null): T => {
  if (val === undefined || val === null) {
    throw new Error('Required value misisng');
  }
  return val;
};
