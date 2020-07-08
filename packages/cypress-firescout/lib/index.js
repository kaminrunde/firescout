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
            if (window.cymocks && window.cymocks[name]) {
                var _b = window.cymocks[name], type = _b.type, cb_1 = _b.cb, _c = _b.options, options = _c === void 0 ? {} : _c;
                if (type === 'mock') {
                    var resolve = function (r) { return Promise.resolve(r); };
                    if (options.sync)
                        resolve = function (r) { return r; };
                    if (options.throws)
                        resolve = function (r) { return Promise.reject(r); };
                    return resolve((_a = window.cymocks[name]).cb.apply(_a, args));
                }
                if (type === 'stub') {
                    cb_1.apply(void 0, args);
                }
            }
        }
        return cb.apply(void 0, args);
    };
}
exports.firescoutMockFn = firescoutMockFn;
