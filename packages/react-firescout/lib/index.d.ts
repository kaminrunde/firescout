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
export declare function mount(El: any, ctx: any): {
    context: (name: string) => any;
    handle: (name: string) => any;
    collection: (name: string) => any;
    shouldHaveState: (name: string) => void;
    shouldNotHaveState: (name: string) => void;
    nth(n: number): any;
    wait: (ms: number) => any;
    unwrap: () => Element;
    click: (w?: string | number | undefined) => Promise<any>;
    simulate: (cb: (el: Element) => void | Promise<void>) => Promise<any>;
};
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
export {};
