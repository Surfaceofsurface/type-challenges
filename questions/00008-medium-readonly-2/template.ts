type MyReadonly2<T extends object, K extends keyof T = keyof T> = {
  readonly [Z in K]: T[Z];
} & { [Z in keyof T as Z extends K ? never : Z]: T[Z] };

//使用&运算符,可以合并两个对象类型,并分别对他们进行不同的操作
