"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.report = void 0;
var codes = {
    // HANDLE_WITHOUT_PARENT: (item:RawItem) => `You declared a "data-cy-handle='${item.payload}'" `
    // + `in "${item.file}" but there was no parent found. You have define a "data-cy-ctx" in `
    // + `either the same file or `,
    HANDLE_WITHOUT_PARENT: function (item) { return item.file; },
    STATE_WITHOUT_PARENT: function (item) { return item.file; },
    COLLECTION_WITHOUT_PARENT: function (item) { return item.file; },
};
function report(code, ctx) {
    console.log(code, codes[code](ctx));
}
exports.report = report;
function validate(input) {
    return input;
}
exports.validate = validate;
