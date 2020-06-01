export declare type RawItem = {
    type: 'ctx' | 'handle' | 'state' | 'component-doc' | 'collection-doc' | 'collection' | 'module-fn';
    payload: string;
    file: string;
    folder: string;
};
export default function findInFiles(): Promise<RawItem[]>;
