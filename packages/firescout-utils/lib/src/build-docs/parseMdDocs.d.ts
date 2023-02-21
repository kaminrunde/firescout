import { RawItem } from './searchWithNode';
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
    bullets: Bullet[] | null;
    _name: string;
    _value: string;
};
declare type ChapterContent = {
    description: string;
    _description: string;
    bullets: Bullet[];
};
export default function createDocs(item: RawItem, allCollections: RawItem[]): Docs | null;
export {};
