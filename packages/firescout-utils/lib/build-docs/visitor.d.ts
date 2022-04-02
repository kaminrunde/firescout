import * as md from 'markdown-ast';
/**
 * Visitor patern implementation
 */
export default class Visitor {
    listeners: any;
    static getText(nodes: md.Node[]): string;
    static getMd(nodes: md.Node[]): string;
    on<K extends keyof md.NodeTypes>(type: K, cb: (row: md.NodeTypes[K]) => void): void;
    fit(rows: md.Node[]): void;
}
