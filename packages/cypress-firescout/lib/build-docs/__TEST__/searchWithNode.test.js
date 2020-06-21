"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var e = expect;
function sum(a, b) {
    return a + b;
}
test('adds 1 + 2 to equal 3', function () {
    e(sum(1, 2)).toBe(3);
});
