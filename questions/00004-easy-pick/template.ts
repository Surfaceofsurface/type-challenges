type MyPick<T extends object, K extends keyof T> = {
  [Z in K]: T[Z];
};
