declare function Currying<F>(
  fn: F,
): F extends (...args: infer T) => infer R
  ? T extends []
    ? F
    : T extends [infer U]
    ? (param: U) => R
    : _ReCurrying<T, R>
  : never;

type _ReCurrying<T, R> = T extends [infer Z, ...infer O]
  ? O extends []
    ? (param: Z) => R
    : (param: Z) => _ReCurrying<O, R>
  : never;
// 一开始的方案如下
// 离答案只有一步之遥,答案返回的是 true,而我的柯里化返回结果却是 boolean
// ?? 疑问:有些时候 TS 能获取到确切值(比如数组的长度 <any[]:T> T['length']),有时候有不行,具体是什么时候呢 ??
// declare function Currying<T extends any[], R>(
//   fn: (...args: T) => R,
// ): T extends []
//   ? () => R
//   : T extends [infer U]
//   ? (param: U) => R
//   : _ReCurrying<T, R>;

// type _ReCurrying<T extends any[], R> = T extends [infer Z, ...infer O]
//   ? O extends []
//     ? (param: Z) => R
//     : (param: Z) => _ReCurrying<O, R>
//   : never;

// 方案2:使用了infer推断返回值,但仍然不能获取确切值
// ((其实得到了infer R的值为true,但只有第一层是true,后面不懂为什么范围扩大到了boolean了:
// 这样写得到的 R 为true,但后面就变成boolean了
//declare function Currying<F extends (...args: any[]) => any>(
//   fn: F,
// ): F extends (...args: infer T) => infer R
//   ? R
//   : never;
// ))
// 下面是方案2的完整写法
// declare function Currying<F extends (...args: any[]) => any>(
//   fn: F,
// ): F extends (...args: infer T) => infer R
//   ? T extends []
//     ? () => R
//     : T extends [infer U]
//     ? (param: U) => R
//     : _ReCurrying<T, R>
//   : never;

// type _ReCurrying<T extends any[], R> = T extends [infer Z, ...infer O]
//   ? O extends []
//     ? (param: Z) => R
//     : (param: Z) => _ReCurrying<O, R>
//   : never;

//最终方案如未注释的那样:
//就是把方案2的 F 约束关系给删除了
// !! 对疑问的解答:如果泛型被约束定义了,那么TS可能会根据约束的条件扩大范围 !!
// !! 所以能少用约束就少用约束 ,但在具体表达式中,三元运算符却可以缩小范围  !!
// !! 本质上,泛型里的 extend(也叫约束)与具体运算中的extend有本质区别(也叫三元运算)符 !!
