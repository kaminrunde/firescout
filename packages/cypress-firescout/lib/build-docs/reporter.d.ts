import { RawItem as GrepRawItem } from './searchWithGrep';
import { RawItem as NodeRawItem } from './searchWithNode';
declare type RawItem = GrepRawItem | NodeRawItem;
export declare function report(code: 'HANDLE_WITHOUT_PARENT', item: RawItem): void;
export declare function report(code: 'STATE_WITHOUT_PARENT', item: RawItem): void;
export declare function report(code: 'COLLECTION_WITHOUT_PARENT', item: RawItem): void;
export {};
