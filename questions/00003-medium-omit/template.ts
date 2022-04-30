type MyOmit0<T extends { [key: string]: any }, K> = keyof T | K extends keyof T
  ? { [U in keyof T as U extends K ? never : U]: T[U] } //利用as可以对遍历出来的值再进行一次操作
  : never;
//返回never不等于报错,如果想让ts报错,则需要 在一开始的时候使用的类型约束

type MyOmit<T extends { [key: string]: any }, K extends keyof T> = {
  [U in keyof T as U extends K ? never : U]: T[U];
}; //利用as可以对遍历出来的值再进行一次操作
