declare type Docs = {
    context: string;
    description: string;
    _description: string;
    triggers: ChapterContent;
    states: ChapterContent;
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
export default function parseComponentMdDocs(text: string): Docs;
export {};
