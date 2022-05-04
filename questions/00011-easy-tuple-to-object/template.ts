type TupleToObject<
  T extends readonly string[],
  M = {
    [Z in keyof T as Z extends number ? T[Z] : never]: any;
  },
> = { [Z in keyof M]: Z };
// 一开始我的写法是这样的,但得到的T[Z]相当于T[number],于是值就成了联合类型
//奇怪的是键的值是正确的,而值却是联合类型
// type TupleToObject<T extends readonly string[]> = {
//   [Z in keyof T as Z extends number ? T[Z] : never]: T[Z];
// };
//

//别人的简洁写法
//type TupleToObject<T extends readonly string[]> = {
//   [P in T[number]]: P;
// }

//*利用T[number]获取纯粹数组元素
