export declare type Config = {
    widgetFolders: string[];
    outPath: string;
    extensions: string;
    useGrep: boolean;
    fixturesFolder: string;
};
export default function getConfig(): Config;
