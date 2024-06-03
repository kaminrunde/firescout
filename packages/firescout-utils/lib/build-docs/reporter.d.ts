import { RawItem } from './searchWithNode';
export declare const codes: {
    HANDLE_WITHOUT_PARENT: (item: RawItem) => string[];
    STATE_WITHOUT_PARENT: (item: RawItem) => string[];
    COLLECTION_WITHOUT_PARENT: (item: RawItem) => string[];
    HANDLE_HAS_NO_DOCS: (item: {
        name: string;
        file: string;
    }) => string[];
    STATE_HAS_NO_DOCS: (item: {
        name: string;
        file: string;
    }) => string[];
    HANDLE_HAS_NO_REF: (item: {
        name: string;
        file: string;
    }) => string[];
    STATE_HAS_NO_REF: (item: {
        name: string;
        file: string;
    }) => string[];
    NO_DOCS: (item: {
        name: string;
        file: string;
    }) => string[];
    COLLECTION_HAS_NO_REF: (item: {
        name: string;
        file: string;
    }) => string[];
    COLLECTION_HAS_NO_DOCS: (item: {
        name: string;
        file: string;
    }) => string[];
    NO_CTX_REF: (item: {
        name: string;
        file: string;
    }) => string[];
    STATE_IMPLEMENTATION_HAS_NO_REF: (item: {
        name: string;
        file: string;
    }) => string[];
    STATE_IMPLEMENTATION_HAS_NO_DOCS: (item: {
        name: string;
        file: string;
    }) => string[];
    MIXED_STATES_AND_IMPLEMENTATIONS: (item: {
        name: string;
        file: string;
    }) => string[];
};
export declare function report(code: 'HANDLE_WITHOUT_PARENT', item: RawItem): void;
export declare function report(code: 'STATE_WITHOUT_PARENT', item: RawItem): void;
export declare function report(code: 'COLLECTION_WITHOUT_PARENT', item: RawItem): void;
export declare function report(code: 'HANDLE_HAS_NO_DOCS', item: {
    name: string;
    file: string;
}): void;
export declare function report(code: 'STATE_HAS_NO_DOCS', item: {
    name: string;
    file: string;
}): void;
export declare function report(code: 'HANDLE_HAS_NO_REF', item: {
    name: string;
    file: string;
}): void;
export declare function report(code: 'STATE_HAS_NO_REF', item: {
    name: string;
    file: string;
}): void;
export declare function report(code: 'NO_DOCS', item: {
    name: string;
    file: string;
}): void;
export declare function report(code: 'NO_CTX_REF', item: {
    name: string;
    file: string;
}): void;
export declare function report(code: 'COLLECTION_HAS_NO_REF', item: {
    name: string;
    file: string;
}): void;
export declare function report(code: 'COLLECTION_HAS_NO_DOCS', item: {
    name: string;
    file: string;
}): void;
export declare function report(code: 'STATE_IMPLEMENTATION_HAS_NO_REF', item: {
    name: string;
    file: string;
}): void;
export declare function report(code: 'STATE_IMPLEMENTATION_HAS_NO_DOCS', item: {
    name: string;
    file: string;
}): void;
export declare function report(code: 'MIXED_STATES_AND_IMPLEMENTATIONS', item: {
    name: string;
    file: string;
}): void;
