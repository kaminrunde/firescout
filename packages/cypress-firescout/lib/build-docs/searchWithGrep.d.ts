export declare type RawItem = {
    type: 'ctx' | 'handle' | 'state' | 'component-doc' | 'collection-doc';
    payload: string;
    file: string;
    folder: string;
};
export default function searchWithGrep(): Promise<RawItem[]>;
