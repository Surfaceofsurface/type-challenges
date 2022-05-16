type MyExclude<T, U> = T extends U ? never : T;
//联合类型的extends会逐分支判断,返回T的逐分支联合类型
