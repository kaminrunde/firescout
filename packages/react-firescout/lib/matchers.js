"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.haveValue = exports.containText = void 0;
function containText(node, val, inverse) {
    var text = node.textContent;
    if (!inverse) {
        if (!(text === null || text === void 0 ? void 0 : text.includes(val))) {
            return "\"" + text + "\" did not contain \"" + val + "\"";
        }
    }
    else {
        if (!!(text === null || text === void 0 ? void 0 : text.includes(val))) {
            return "\"" + text + "\" did contain \"" + val + "\"";
        }
    }
    return null;
}
exports.containText = containText;
function haveValue(node, val, inverse) {
    if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) {
        var value = node.value;
        if (!inverse) {
            if (value !== val) {
                return "expected \"" + value + "\" to be \"" + val + "\"";
            }
        }
        else {
            if (value === val) {
                return "expected \"" + value + "\" not to be \"" + val + "\"";
            }
        }
    }
    else {
        return "can only extract values from Input and TextArea nodes";
    }
    return null;
}
exports.haveValue = haveValue;
