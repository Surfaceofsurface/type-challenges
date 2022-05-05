type Last<T extends any[]> = T["length"] extends 0
  ? never
  : T extends [first: any, ...args: infer Z]
  ? T[Z["length"]]
  : never;

//通过infer构造出长度-1的值

//别人的写法:
//type Last<T extends any[]> = T extends [...infer _, infer L] ? L : never;
//在TS里可以 在前面接收剩余参数,而不必像JS一样,只能把剩余参数写在最后面
