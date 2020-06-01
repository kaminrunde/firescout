declare type Config = {
    widgetFolders: string[];
    outPath: string;
    extensions: string;
    useGrep: boolean;
    fixturesFolder: string;
};
declare const config: Config;
export default config;
