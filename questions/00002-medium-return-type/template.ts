type MyReturnType<T> = T extends (...args: any) => infer U ? U : never;
//infer可以凭空捏造一个位置的类型出来
