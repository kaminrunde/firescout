'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.bubbleError = exports.query = void 0
function query(query, elements) {
  var targets = []
  var _loop_1 = function (el) {
    targets.push.apply(
      targets,
      Array.from(el.container.querySelectorAll(query)).map(function (container, index) {
        return { container: container, parent: el, index: index }
      })
    )
  }
  for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
    var el = elements_1[_i]
    _loop_1(el)
  }
  return targets
}
exports.query = query
function bubbleError(size, msg) {
  var e = new Error(msg)
  if (e.stack) {
    var lines = e.stack.split('\n')
    var combined = [lines.shift()]
    for (var i = 0; i < size; i++) lines.shift()
    e.stack = combined.concat(lines).join('\n')
  }
  throw e
}
exports.bubbleError = bubbleError
