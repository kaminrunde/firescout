declare type ArgumentTypes<T> = T extends (...args: infer A) => any ? A : any;
export declare function firescoutMockFn<CB extends (...args: any) => any>(name: string, cb: CB): (...args: ArgumentTypes<CB>) => ReturnType<CB>;
export {};
