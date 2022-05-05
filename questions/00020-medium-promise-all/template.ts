declare function PromiseAll<T>(
  values: T,
): T extends any[] ? Promise<T> : T extends readonly any[] ? 1 : never;
