"use strict";
// foo
Object.defineProperty(exports, "__esModule", { value: true });
exports.firescoutMockFn = void 0;
function firescoutMockFn(name, args, cb) {
    var _a;
    if (typeof window !== 'undefined') {
        // @ts-ignore
        if (window.cymocks && window.cymocks[name]) {
            // @ts-ignore
            return Promise.resolve((_a = window.cymocks)[name].apply(_a, args));
        }
    }
    return cb();
}
exports.firescoutMockFn = firescoutMockFn;
