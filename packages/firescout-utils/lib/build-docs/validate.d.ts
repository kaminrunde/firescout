import { Tree } from './createCommandTree';
import { Docs } from './createDocs';
import { ModuleTree } from './createModuleTree';
type Input = {
    tree: Tree[];
    docs: Docs;
    modules: ModuleTree[];
};
export default function validate(input: Input): Input;
export {};
