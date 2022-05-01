type Computed<C extends Record<string, any>> = {
  [P in keyof C]: ReturnType<C[P]>;
};
declare function SimpleVue<
  D,
  C extends Record<string, any>,
  M extends Record<string, (...args: any[]) => any>,
>(options: {
  data(this: {}): D;
  computed: C & ThisType<D & Computed<C> & M>;
  methods: M & ThisType<D & Computed<C> & M>;
}): D & Computed<C> & M;

//这题难在无法在参数中获得实际传入参数的类型
//ThisType却可以在参数中获得实际传入参数的类型

//草稿 *ThisType
//如果把 <T>的类型约束写在 IvueOptions的内部,那么在computed和method提供的this的类型就为 unknow.
//应该尽量把泛型T提前,以供在内部使用泛型
// declare function SimpleVue<T>(options: IvueOptions<T>): any;
// interface IvueOptions<T extends { [key: string | symbol]: any }> {
//   data: (this: undefined) => T;
//   computed: { [key: string | symbol]: (this: T) => any };
//   methods: number;
// }

//如果这样写,虽然可以通过TS借测,但在computed和method提供的this中,类型均为any
//作为泛型的 T ,只管 T 所在的位置能不能被赋值,而不管推断其类型
// declare function SimpleVue<T extends { [key: string | symbol]: any }>(
//   options: IvueOptions<T>,
// ): any;
// interface IvueOptions<T> {
//   data: (this: undefined) => T;
//   computed: { [key: string | symbol]: (this: T) => any };
//   methods: number;
// }

//无论如何,都无法在参数中推断出参数的类型,只能用TS内置的工具函数ThisType才行。
//这个工具函数很特殊,它不是用TS实现的,是TS内部实现的。(点开它的注释,没有提示其实现方式)
//与其把ThisType看作工具函数,不如把它看作关键字:
//ThisType必须!写在对象o之后(用&标注),用于标注该对象中This的类型
//如果o里面还套有对象j,那么对象o的ThisType将失效,除非为对象j也添加ThisType的类型标注
