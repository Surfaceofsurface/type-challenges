type Last<T extends any[]> = T["length"] extends 0
  ? never
  : T extends [first: any, ...args: infer Z]
  ? T[Z["length"]]
  : never;

//通过infer构造出长度-1的值
