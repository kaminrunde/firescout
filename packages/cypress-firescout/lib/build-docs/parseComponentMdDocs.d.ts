import { RawItem as GrepRawItem } from './searchWithGrep';
import { RawItem as NodeRawItem } from './searchWithNode';
declare type RawItem = GrepRawItem | NodeRawItem;
export declare type Docs = {
    context: string;
    file: string;
    folder: string;
    description: string;
    _description: string;
    handles: ChapterContent;
    states: ChapterContent;
    collections: Record<string, Docs>;
};
declare type Bullet = {
    name: string;
    value: string;
    _name: string;
    _value: string;
};
declare type ChapterContent = {
    description: string;
    _description: string;
    bullets: Bullet[];
};
export default function parseComponentMdDocs(mdItem: RawItem, allCollections: RawItem[]): Docs;
export {};
