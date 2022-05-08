declare function PromiseAll<T extends any[]>(
  values: readonly [...T], //一开始我的疑惑:readonly [...T]为什么不直接写成T,而要这样脱裤子放屁
  //因为这样写可以 既允许调用者传入数组,又调用者传入元组.
  // 而自己接收时则永远接收到元组.
): Promise<{ [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K] }>; //别人的答案

//一开始我是这样写的:
//我以为用keyof遍历数组会把原型上的东西也遍历出来,但实际上还有另一种写法不会遍历出原型上的东西
//详见第 10题
//这种写法 错在
//     T extends any[]
//   ? T extends [infer U, ...infer R] : ...
// 这样永远也没办法 走向这个分支 T extends [infer U, ...infer R]   <--这是元组
// 数组 !不能! 赋值给元组,这意外着无法用 infer来推断数组的结构
// declare function PromiseAll<T>(values: T): Promise<_RePromiseAll<T>>;
// type _RePromiseAll<T> = T extends any[]
//   ? T extends [infer U, ...infer R]
//     ? U extends Promise<infer Z>
//       ? [Z, ..._RePromiseAll<R>]
//       : [U, ..._RePromiseAll<R>]
//     : []
//   : T extends readonly any[]
//   ? T extends readonly [infer U, ...infer R]
//     ? U extends Promise<infer Z>
//       ? [Z, ..._RePromiseAll<R>]
//       : [U, ..._RePromiseAll<R>]
//     : []
//   : [];
// type okiu = [...[], 4, 5, 6];
// type koklji<T extends object> = { [K in keyof T]: T[K] };
// const uwsl = [1, 2, 3];
// type konp = koklji<typeof uwsl>;
