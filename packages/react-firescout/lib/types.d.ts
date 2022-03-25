export declare type FirescoutElement = {
    parent: null | FirescoutElement;
    container: Element;
    type: 'context' | 'handle' | 'collection' | 'root';
    index: number;
};
