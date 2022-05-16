type UnionToIntersection<U> = (
  U extends any ? (arg: U) => any : never
) extends (arg: infer I) => void
  ? I
  : never;
//这是我一开始的写法,U extends any 主要是为了利用Union Type的分支代入能力
//这样写出的结果如 type test055_02
//虽然结果是出来了,但是这样的形式:A | A
//如果A是函数或对象,那么TS不会把 A | A 认为与 A等同
// ?? 对这点我表示疑问 ??
//而我也没有办法把 A | A转换成 仅A,不得以才看了答案
// type UnionToIntersection<U, Q extends U = U, O extends U = U> = U extends any
//   ? U & (O extends U ? never : O)
//   : never;
// type test055_01 = UnionToIntersection<(() => "foo") | ((i: 42) => true)>;
// type test055_02 =
//   | ((() => "foo") & ((i: 42) => true))
//   | (((i: 42) => true) & (() => "foo"));

// 下面是我对答案的一些感悟:
// extends 不能仅理解成 继承,而要理解成 "约束",目的是为了类型安全
// 如type test055_03体现的是 函数参数的逆变(这个词不需要纠结于其定义)
// 只要函数参数范围越小,那么这个函数就越安全,它就越是成为 "父"类 =>
//"父"字代表的不是其东西多,而是其具有东西多的潜力,即具有发展、继承的能力,在这个意义上讲,将它翻译成母类反而更合适
//于是 infer 关键字为了找到符合条件的"父类",会把在函数参数位置上的类型自动&交叉,以保证类型安全(缩小范围)
//所以我要更新一下对infer的认知:它不只是占位符,如果它只是占位符,那么它的关键字叫做posite反而更好
//infer就是infer

// type test055_03<T> = T extends { a: (x: never) => void; b: (x: never) => void }
//   ? 1
//   : 2; //result : 1
////下面这些是从TS官网超过来的,便于理解逆变和协变
//https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types
// type test055_T30 = test055_Bar<{ a: (x: string) => void; b: (x: string) => void }>;
// type test055_T31 = test055_Bar<{ a: (x: string) => void; b: (x: number) => void }>;

// type test055_Foo<T> = T extends { a: infer U; b: infer U } ? U : never;
// type test055_T10 = test055_Foo<{ a: string; b: string }>; // string
// type test055_T11 = test055_Foo<{ a: string; b: number }>; // string | number

// type test055_Bar<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void }
//   ? U
//   : never;
// type test055_T20 = test055_Bar<{ a: (x: string) => void; b: (x: string) => void }>; // string
// type test055_T21 = test055_Bar<{ a: (x: string) => void; b: (x: number) => void }>; // string & number
