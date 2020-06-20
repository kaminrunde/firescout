import { RawItem as GrepRawItem } from './searchWithGrep';
import { RawItem as NodeRawItem } from './searchWithNode';
import { Tree } from './createCommandTree';
import { Docs } from './createDocs';
import { ModuleTree } from './createModuleTree';
declare type RawItem = GrepRawItem | NodeRawItem;
export declare function report(code: 'HANDLE_WITHOUT_PARENT', item: RawItem): void;
export declare function report(code: 'STATE_WITHOUT_PARENT', item: RawItem): void;
export declare function report(code: 'COLLECTION_WITHOUT_PARENT', item: RawItem): void;
export declare function report(code: 'HANDLE_HAS_NO_DOCS', item: RawItem): void;
export declare function report(code: 'STATE_HAS_NO_DOCS', item: RawItem): void;
declare type Input = {
    tree: Tree[];
    docs: Docs;
    modules: ModuleTree[];
};
export declare function validate(input: Input): Input;
export {};
