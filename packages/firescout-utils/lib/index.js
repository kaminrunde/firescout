"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firescoutMockVar = exports.firescoutMockFn = void 0;
function firescoutMockFn(name, cb) {
    var fn = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (typeof window !== 'undefined') {
            if (window.cymocks && window.cymocks[name]) {
                var _b = window.cymocks[name], type = _b.type, cb_1 = _b.cb;
                if (type === 'mock') {
                    return (_a = window.cymocks[name]).cb.apply(_a, args);
                }
                if (type === 'stub') {
                    cb_1.apply(void 0, args);
                }
            }
        }
        return cb.apply(void 0, args);
    };
    fn.originalImplementation = cb;
    fn.mockName = name;
    return fn;
}
exports.firescoutMockFn = firescoutMockFn;
function firescoutMockVar(name, val) {
    if (typeof window !== 'undefined') {
        if (window.firescoutVars && window.firescoutVars[name]) {
            return window.firescoutVars[name];
        }
    }
    return val;
}
exports.firescoutMockVar = firescoutMockVar;
