import parseComponendMdDocs from './parseComponentMdDocs';
declare type RawItem = {
    type: 'ctx' | 'trigger' | 'state' | 'component-doc';
    payload: string;
    file: string;
};
export declare type Tree = {
    context: string;
    typesaveContext: string;
    file: string;
    basePath: string;
    docsFile?: string;
    docs?: ReturnType<typeof parseComponendMdDocs>;
    triggers: {
        name: string;
        file: string;
    }[];
    states: {
        name: string;
        file: string;
    }[];
}[];
export default function createCommandTree(items: RawItem[]): Tree;
export {};
