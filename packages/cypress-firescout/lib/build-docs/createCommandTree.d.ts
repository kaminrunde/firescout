declare type RawItem = {
    type: 'ctx' | 'trigger' | 'state' | 'component-doc';
    payload: string;
    file: string;
};
declare type Tree = {
    context: string;
    file: string;
    basePath: string;
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
