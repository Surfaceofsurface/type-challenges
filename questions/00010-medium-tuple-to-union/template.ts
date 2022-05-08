type TupleToUnion<T extends any[]> = T extends [infer Z, ...infer U]
  ? Z extends undefined
    ? never
    : Z | TupleToUnion<U>
  : never;

// keyof 操作符会遍历数组的话,会遍历出原型上的东西 :
// type TupleToUnion<T extends any[]> = T[keyof T];
// 如果用对象语法的话,就可以仅遍历出数组的东西了:
// type TupleToUnion<T extends any[]> = { [Z in keyof T]: T[Z] };
//所以不能用keyof
//而infer X 可以获得 一个位置的值,利用这点读取tuple每一项的值
//再利用递归实现循环

//看了下别人的写法:
//type TupleToUnion<T extends unknown[]> = T[number]
//可以直接在T[number]索引的地方写一个类型,这样就可以过滤掉其他类型的数据了
