export declare type RawItem = {
    type: 'ctx' | 'handle' | 'state' | 'component-doc';
    payload: string;
    file: string;
};
export default function searchWithGrep(): Promise<RawItem[]>;
