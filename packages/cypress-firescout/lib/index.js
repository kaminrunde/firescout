"use strict";
// foo
Object.defineProperty(exports, "__esModule", { value: true });
exports.firescoutMockFn = void 0;
function firescoutMockFn(name, cb) {
    return function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (typeof window !== 'undefined') {
            // @ts-ignore
            if (window.cymocks && window.cymocks[name]) {
                // @ts-ignore
                return Promise.resolve((_a = window.cymocks)[name].apply(_a, args));
            }
        }
        return cb.apply(void 0, args);
    };
}
exports.firescoutMockFn = firescoutMockFn;
