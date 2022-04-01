'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
/**
 * Visitor patern implementation
 */
var Visitor = /** @class */ (function () {
  function Visitor() {
    this.listeners = {}
  }
  Visitor.getText = function (nodes) {
    var v = new Visitor()
    var text = ''
    v.on('text', function (block) {
      text += block.text
    })
    v.fit(nodes)
    return text
  }
  Visitor.getMd = function (nodes) {
    var result = ''
    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
      var node = nodes_1[_i]
      switch (node.type) {
        case 'bold':
        case 'strike':
        case 'italic':
          result += node.style + Visitor.getMd(node.block) + node.style
          break
        case 'text':
        case 'border':
        case 'break':
          result += node.text
          break
        case 'codeBlock':
          result += node.indent + node.syntax + node.code + node.indent
          break
        case 'codeSpan':
          result += '`' + node.code + '`'
          break
        // case 'image': result += node.
        // case 'link': result += node.
        // case 'linkDef':
        // case 'list': result += node.
        // case 'quote':
        case 'title':
          result += Array(node.rank).fill('#').join('') + ' ' + Visitor.getMd(node.block)
          break
      }
    }
    return result
  }
  Visitor.prototype.on = function (type, cb) {
    if (!this.listeners[type]) this.listeners[type] = []
    this.listeners[type].push(cb)
  }
  Visitor.prototype.fit = function (rows) {
    var _this = this
    var recursive = function (node) {
      if (_this.listeners[node.type]) {
        _this.listeners[node.type].forEach(function (l) {
          return l(node)
        })
      }
      // @ts-ignore
      if (node.block)
        for (var _i = 0, _a = node.block; _i < _a.length; _i++) {
          var block = _a[_i]
          recursive(block)
        }
    }
    for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
      var block = rows_1[_i]
      recursive(block)
    }
  }
  return Visitor
})()
exports.default = Visitor
