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
export declare function mount(El: any, ctx: any): Wrapped;
declare type MockConfig = {
    value?: any;
    fixture?: string;
    sync?: boolean;
    timeout?: number;
    transform?: (data: any) => any;
};
export declare function getModule(moduleName: string): {
    fn: (fnName: string) => {
        stub<Fn extends (...args: any) => any>(wrapper?: Fn | undefined): void;
        mock<Fn_1 extends (...args: any) => any>(config: string | MockConfig, wrapper?: Fn_1 | undefined): Promise<ReturnType<Fn_1>>;
    };
};
export declare function clearMocks(): void;
declare type Wrapped = {
    context: (name: string) => Wrapped;
    handle: (name: string) => Wrapped;
    collection: (name: string) => Wrapped;
    shouldHaveState: (name: string, implementations?: string) => Wrapped;
    shouldNotHaveState: (name: string) => Wrapped;
    nth: (n: number) => Wrapped;
    wait: (ms: number) => Promise<void>;
    unwrap: () => Element;
    click: (timeout?: number) => Promise<Wrapped>;
    type: (value: string, timeout?: number) => Promise<Wrapped>;
    simulate: (cb: (el: Element) => Promise<void> | void) => Promise<Wrapped>;
};
export {};
