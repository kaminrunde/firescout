"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.report = exports.codes = void 0;
var safe_1 = __importDefault(require("colors/safe"));
exports.codes = {
    // HANDLE_WITHOUT_PARENT: (item:RawItem) => `You declared a "data-cy-handle='${item.payload}'" `
    // + `in "${item.file}" but there was no parent found. You have define a "data-cy-ctx" in `
    // + `either the same file or `,
    HANDLE_WITHOUT_PARENT: function (item) { return [item.payload, item.file]; },
    STATE_WITHOUT_PARENT: function (item) { return [item.payload, item.file]; },
    COLLECTION_WITHOUT_PARENT: function (item) { return [item.payload, item.file]; },
    HANDLE_HAS_NO_DOCS: function (item) { return [item.name, item.file]; },
    STATE_HAS_NO_DOCS: function (item) { return [item.name, item.file]; },
    HANDLE_HAS_NO_REF: function (item) { return [item.name, item.file]; },
    STATE_HAS_NO_REF: function (item) { return [item.name, item.file]; },
    NO_DOCS: function (item) { return [item.name, item.file]; },
    COLLECTION_HAS_NO_REF: function (item) { return [item.name, item.file]; },
    COLLECTION_HAS_NO_DOCS: function (item) { return [item.name, item.file]; },
    NO_CTX_REF: function (item) { return [item.name, item.file]; },
    STATE_IMPLEMENTATION_HAS_NO_REF: function (item) { return [item.name, item.file]; },
    STATE_IMPLEMENTATION_HAS_NO_DOCS: function (item) { return [
        item.name,
        item.file,
    ]; },
    MIXED_STATES_AND_IMPLEMENTATIONS: function (item) { return [
        item.name,
        item.file,
    ]; },
};
function report(code, ctx) {
    var _a = exports.codes[code](ctx), name = _a[0], file = _a[1];
    console.log(safe_1.default.yellow(code), safe_1.default.green(name), safe_1.default.grey(file.slice(1)));
}
exports.report = report;
