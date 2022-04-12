"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.haveCss = exports.haveValue = exports.containText = void 0;
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
function haveCss(node, key, val, inverse) {
    if (node instanceof HTMLElement) {
        var style = getComputedStyle(node);
        if (inverse && style[key] === val) {
            return "expected node not to have css-property \"" + key + "\" with value \"" + val + "\"";
        }
        if (!inverse && style[key] !== val) {
            return "expected node to have css-property \"" + key + "\" to have value \"" + val + "\" but got \"" + style[key] + "\"";
        }
    }
    else {
        return 'only HTML-Elements can have css property';
    }
    return null;
}
exports.haveCss = haveCss;
