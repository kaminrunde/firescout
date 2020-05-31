export declare type RawItem = {
    type: 'ctx' | 'trigger' | 'state' | 'component-doc';
    payload: string;
    file: string;
};
export default function parseInput(input: [string, string]): RawItem[];
