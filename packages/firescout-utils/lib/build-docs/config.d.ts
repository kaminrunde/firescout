export type Config = {
    widgetFolders: string[];
    outPath: string;
    extensions: string;
    fixturesFolder: string;
    tsFixtures: boolean;
};
export declare function getConfig(): Config;
