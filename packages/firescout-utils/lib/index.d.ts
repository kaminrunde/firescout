type ArgumentTypes<T> = T extends (...args: infer A) => any ? A : any;
declare global {
    interface Window {
        cymocks?: {
            [name: string]: {
                type: 'stub' | 'mock';
                cb: Function;
            };
        };
        firescoutVars?: {
            [name: string]: any;
        };
    }
}
export declare function firescoutMockFn<CB extends (...args: any) => any>(name: string, cb: CB): (...args: ArgumentTypes<CB>) => ReturnType<CB>;
export declare function firescoutMockVar<Val>(name: string, val: Val): Val;
export {};
