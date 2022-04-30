// type GetReadonlyKeys<T extends { [x: string | symbol]: any }> = {
//   [U in keyof T]: ((originItem: { U: T[U] }) => void) extends (readonlyItem: {
//     readonly U: T[U];
//   }) => void
//     ? U
//     : never;
// };
type GetReadonlyKeys<T extends Object> = {
  [K in keyof T]: (<S>() => S extends { [Z in K]: T[Z] } ? 2 : 1) extends <
    S,
  >() => S extends { -readonly [Z in K]: T[Z] } ? 2 : 1
    ? never
    : K;
}[keyof T];

type Expand<T> = T extends infer U
  ? U extends { [x: string]: any }
    ? { [k in keyof U]: U[k] }
    : U
  : never;
type m = Expand<GetReadonlyKeys<Todo1>>;
//?如何判断一个属性是否是readonly的呢：通过函数的类型约束

//下面是草稿
interface Todo1 {
  readonly title: string;
  description: string;
  completed: boolean;
}
interface Todo2 {
  title: string;
  description: string;
  completed: boolean;
}

type a = u extends c ? true : false;
//readonly不能被直接的对象类型捕获,无法用对象判断readonly
type b = { [U in keyof Todo1]: U };
//通过map可以复制原接口的readonly的类型
type c = <Z>() => Z extends { readonly o: string } ? 1 : 2;
type u = <Z>() => Z extends { o: string } ? 1 : 2;
type v = u extends c ? true : false;
const d: c = (parama: { o: string }) => {
  parama.o = "foo"; //本应该是只读的
};
//在函数中对{对象类型}添加只读约束也无法检测出readonly
type e = <Z extends readonly [any]>(t: Z) => any;

// const f: e = (parama: [string]) => {};

/*实在没办法,偷看了一眼答案:https://github.com/type-challenges/type-challenges/issues/13
&
https://stackoverflow.com/questions/52443276/how-to-exclude-getter-only-properties-from-type-in-typescript
TS的相等性判断无法通过继承来实现,实现绝对相等,目前有2种方法:
// https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
1:利用函数的返回值,这会要求绝对相等
type IfEquals<X, Y, A, B> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;

// Alternatively:
2:利用交叉类型&
type IfEquals<X, Y, A, B> =
    [2] & [0, 1, X] extends [2] & [0, 1, Y] & [0, infer W, unknown]
    ? W extends 1 ? B : A
    : B;
*/
//但不知道为什么 第二种方法失效了
// type IfEquals<X, Y, A, B> = [2] & [0, 1, X] extends [2] &
//   [0, 1, Y] &
//   [0, infer W, unknown]
//   ? W extends 1
//     ? B
//     : A
//   : B;

// type mx = IfEquals<string, boolean, true, false>; //expeted false
