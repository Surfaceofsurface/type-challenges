type DeepReadonly<T extends U, U = { [key: string | symbol]: any }> = {
  readonly [Z in keyof T]: T[Z] extends Function
    ? T[Z]
    : T[Z] extends U
    ? DeepReadonly<T[Z]>
    : T[Z];
};
//函数是继承自 { [key: string | symbol]: any }非数组对象的
//所以要 先判断是不是 Function
// type foo0009 = (() => 22) extends { [key: string | symbol]: any } ? 1 : 2;
