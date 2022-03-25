declare namespace Firescout {
    interface FireModule {
        getModule(name: unknown): any;
    }
}
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
export declare const fn: Firescout.FireModule['getModule'];
export declare function getModule(name: string): {
    fn: (name: string) => {
        stub(): void;
        mock(config: string | {
            value?: any;
            fixture?: string;
            sync?: boolean;
            timeout?: number;
        }): void;
    };
};
export declare function clearMocks(): void;
export {};
