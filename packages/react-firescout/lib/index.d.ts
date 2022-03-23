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
