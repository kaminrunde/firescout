/// <reference types="jest" />
import { getStructure } from '..//build-docs';
import * as reporter from '..//build-docs/reporter';
import * as config from '..//build-docs/config';
type ExecutionResult = {
    logs: {
        code: keyof typeof reporter.codes;
        name: string;
        path: string;
    }[];
    result: Awaited<ReturnType<typeof getStructure>>;
    getComponent: (name: string) => Awaited<ReturnType<typeof getStructure>>['tree'][0];
};
export declare function create(_config?: Partial<config.Config>): {
    getFile: (path: string) => string;
    addMarkdown(path: string, def: MarkdownDef): any;
    addReactComponent(path: string, def: ReactDef): any;
    addFile(path: string, content: string): any;
    execute(): Promise<ExecutionResult>;
};
type MarkdownDef = {
    type: 'collection' | 'component';
    name: string;
    desc?: string;
    handles?: {
        name: string;
        description: string;
    }[];
    states?: {
        name: string;
        description: string;
    }[];
    collections?: {
        name: string;
        path: string;
    }[];
};
type ReactComponent = [
    'ctx' | 'col' | 'handle' | 'state',
    string,
    ReactComponent[]?
];
type ReactDef = {
    jsx: ReactComponent;
};
/**
 * custom matchers
 */
declare global {
    namespace jest {
        interface Matchers<R> {
            toContainObject(expected: Object): CustomMatcherResult;
            toContainLog(code: keyof typeof reporter.codes, name?: string, path?: string): CustomMatcherResult;
        }
    }
}
export {};
