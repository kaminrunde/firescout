export declare type RawItem = {
    type: 'ctx' | 'handle' | 'state' | 'component-doc' | 'collection-doc' | 'collection';
    payload: string;
    file: string;
    folder: string;
};
export default function findInFiles(): Promise<RawItem[]>;
