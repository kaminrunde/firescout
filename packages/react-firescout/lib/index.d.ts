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
    var: (varName: string) => {
        set(val: any): void;
        fixture(config: string | MockConfig): Promise<void>;
    };
    fn: (fnName: string) => {
        stub<Fn extends (...args: any) => any>(wrapper?: Fn | undefined): void;
        mock<Fn_1 extends (...args: any) => any>(config: string | MockConfig, wrapper?: Fn_1 | undefined): Promise<ReturnType<Fn_1>>;
    };
};
export declare function clearMocks(): void;
interface Matchers {
    should(m: 'contain.text', s: string, x?: never): void;
    should(m: 'not.contain.text', s: string, x?: never): void;
    should(m: 'have.value', s: string, x?: never): void;
    should(m: 'not.have.value', s: string, x?: never): void;
    should(m: 'have.css', key: string, val: string): void;
    should(m: 'not.have.css', key: string, val: string): void;
    should(m: 'have.length', n: number, x?: never): void;
    should(m: 'not.have.length', n: number, x?: never): void;
    should(m: 'exist', a?: never, b?: never): void;
    should(m: 'not.exist', a?: never, b?: never): void;
}
interface Wrapped extends Matchers {
    context: (name: string, ignoreError?: boolean) => Wrapped;
    handle: (name: string, ignoreError?: boolean) => Wrapped;
    collection: (name: string, ignoreError?: boolean) => Wrapped;
    shouldHaveState: (name: string, implementations?: string) => Wrapped;
    shouldNotHaveState: (name: string) => Wrapped;
    nth: (n: number, ignoreError?: boolean) => Wrapped;
    wait: (ms: number) => Promise<void>;
    unwrap: () => Element;
    query: (s: string, ignoreError?: boolean) => Wrapped;
    click: (timeout?: number) => Promise<Wrapped>;
    type: (value: string, timeout?: number) => Promise<Wrapped>;
    simulate: (cb: (el: Element) => Promise<void> | void) => Promise<Wrapped>;
}
export {};
