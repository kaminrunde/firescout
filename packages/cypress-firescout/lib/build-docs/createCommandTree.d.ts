import parseComponendMdDocs from './parseComponentMdDocs';
import { RawItem } from './parseInput';
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
