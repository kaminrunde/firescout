export declare type RawItem = {
    type: 'ctx' | 'trigger' | 'state' | 'component-doc';
    payload: string;
    file: string;
};
export default function findInFiles(): Promise<RawItem[]>;
