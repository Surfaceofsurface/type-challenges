type TupleToUnion<T extends any[]> = T extends [infer Z, ...infer U]
  ? Z extends undefined
    ? never
    : Z | TupleToUnion<U>
  : never;

//keyof 操作符会遍历数组的话,会遍历出原型上的东西
// type TupleToUnion<T extends any[]> = T[keyof T];
//所以不能用keyof
//而infer X 可以获得 一个位置的值,利用这点读取tuple每一项的值
//再利用递归实现循环
