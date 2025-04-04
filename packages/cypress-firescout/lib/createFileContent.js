'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function createFileContent(tree, docs, modules) {
  return (
    '\n    /// <reference types="cypress" />\n\n    type MockFnOptions = {\n      timeout?: number,\n      throws?:boolean,\n      transform?: (val:any) => any,\n      ts?: boolean,\n      sync?: boolean\n    }\n    \n    type MockVarOptions = {\n      transform?: (val:any) => any\n    }\n\n    ' +
    modules
      .map(function (node) {
        return (
          '\n      ' +
          node.commands
            .map(function (cmd) {
              return (
                '\n        interface ' +
                cmd.typesaveId +
                ' {\n          ' +
                cmd.fixtures.map(function (f) {
                  return (
                    '\n            ' +
                    f.description +
                    "\n            mock(name:'" +
                    f.variation +
                    "', opt?:Omit<MockFnOptions,'sync'>):" +
                    node.typesaveContext +
                    '\n          '
                  )
                }) +
                "\n\n          createStub():void\n\n          doesReturn(val:any, opt?:Omit<MockFnOptions,'transform'|'ts'>):void\n        }\n      "
              )
            })
            .join('\n') +
          '\n\n      ' +
          node.variables
            .map(function (cmd) {
              return (
                '\n        interface ' +
                cmd.typesaveId +
                ' {\n          ' +
                cmd.fixtures.map(function (f) {
                  return (
                    '\n            ' +
                    f.description +
                    "\n            load(name:'" +
                    f.variation +
                    "', opt?:MockVarOptions):" +
                    node.typesaveContext +
                    '\n          '
                  )
                }) +
                '\n\n          set(val:any):void\n        }\n      '
              )
            })
            .join('\n') +
          '\n\n      interface ' +
          node.typesaveContext +
          ' {\n        ' +
          node.commands
            .map(function (cmd) {
              return (
                '\n          /**\n           * @name ' +
                cmd.name +
                '\n           * @file [' +
                cmd.file +
                '](' +
                (process.cwd() + cmd.file) +
                ")\n           */\n          fn(name:'" +
                cmd.name +
                "'):" +
                cmd.typesaveId +
                '\n        '
              )
            })
            .join('\n') +
          '\n      }\n\n      interface ' +
          node.typesaveContext +
          ' {\n        ' +
          node.variables
            .map(function (cmd) {
              return (
                '\n          /**\n           * @name ' +
                cmd.name +
                '\n           * @file [' +
                cmd.file +
                '](' +
                (process.cwd() + cmd.file) +
                ")\n           */\n          variable(name:'" +
                cmd.name +
                "'):" +
                cmd.typesaveId +
                '\n        '
              )
            })
            .join('\n') +
          '\n      }\n    '
        )
      })
      .join('\n') +
    '\n\n    ' +
    tree
      .map(function (node) {
        return (
          '\n      ' +
          node.collections
            .map(function (colNode) {
              return (
                '\n        interface ' +
                (node.typesaveContext + colNode.typesaveContext) +
                ' extends Cypress.Chainable<Element> {\n          ' +
                colNode.handles
                  .map(function (handle) {
                    var _a, _b, _c
                    return (
                      '\n            /** \n             * ' +
                      (((_c =
                        (_b =
                          (_a = docs[node.context]) === null || _a === void 0
                            ? void 0
                            : _a.collections[colNode.context]) === null || _b === void 0
                          ? void 0
                          : _b.handles.bullets.find(function (row) {
                              return row.name === handle.name
                            })) === null || _c === void 0
                        ? void 0
                        : _c.value) || '') +
                      '\n             * @name ' +
                      handle.name +
                      '\n             * @file [' +
                      handle.file +
                      '](' +
                      (process.cwd() + handle.file) +
                      ")\n             */\n            handle(name:'" +
                      handle.name +
                      "', index?:number|string): Cypress.Chainable<Element>\n          "
                    )
                  })
                  .join('\n') +
                '\n\n          ' +
                colNode.states
                  .map(function (state) {
                    var _a, _b, _c, _d, _e, _f
                    return (
                      '\n            /** \n             * ' +
                      (((_c =
                        (_b =
                          (_a = docs[node.context]) === null || _a === void 0
                            ? void 0
                            : _a.collections[colNode.context]) === null || _b === void 0
                          ? void 0
                          : _b.states.bullets.find(function (row) {
                              return row.name === state.name
                            })) === null || _c === void 0
                        ? void 0
                        : _c.value) || '') +
                      '\n             * @name ' +
                      state.name +
                      '\n             * @file [' +
                      state.file +
                      '](' +
                      (process.cwd() + state.file) +
                      ")\n             */\n            shouldHaveState( name:'" +
                      state.name +
                      "' " +
                      (state.implementations
                        ? ", implementations: '" +
                          state.implementations
                            .map(function (i) {
                              return i.name
                            })
                            .join(',') +
                          "'"
                        : '') +
                      '): ' +
                      (node.typesaveContext + colNode.typesaveContext) +
                      '\n\n            /** \n             * ' +
                      (((_f =
                        (_e =
                          (_d = docs[node.context]) === null || _d === void 0
                            ? void 0
                            : _d.collections[colNode.context]) === null || _e === void 0
                          ? void 0
                          : _e.states.bullets.find(function (row) {
                              return row.name === state.name
                            })) === null || _f === void 0
                        ? void 0
                        : _f.value) || '') +
                      '\n             * @name ' +
                      state.name +
                      '\n             * @file [' +
                      state.file +
                      '](' +
                      (process.cwd() + state.file) +
                      ")\n             */\n            shouldNotHaveState(name:'" +
                      state.name +
                      "'): " +
                      (node.typesaveContext + colNode.typesaveContext) +
                      '\n          '
                    )
                  })
                  .join('\n') +
                '\n        }\n      '
              )
            })
            .join('\n') +
          '\n\n      interface ' +
          node.typesaveContext +
          ' extends Cypress.Chainable<Element> {\n        ' +
          node.collections
            .map(function (colNode) {
              var _a, _b
              return (
                '\n          /**\n           * ' +
                (((_b =
                  (_a = docs[node.context]) === null || _a === void 0
                    ? void 0
                    : _a.collections[colNode.context]) === null || _b === void 0
                  ? void 0
                  : _b.description) || '...') +
                '\n           * @name ' +
                colNode.context +
                '\n           * @file [' +
                colNode.file +
                '](' +
                (process.cwd() + colNode.file) +
                ')\n           * @docs_file ' +
                (docs[node.context]
                  ? '[' +
                    docs[node.context].file +
                    '](' +
                    (process.cwd() + docs[node.context].file) +
                    ')'
                  : '-') +
                "\n           */\n          collection(name:'" +
                colNode.context +
                "', index?:number|string): " +
                (node.typesaveContext + colNode.typesaveContext) +
                '\n        '
              )
            })
            .join('\n') +
          '\n\n        ' +
          node.handles
            .map(function (handle) {
              var _a, _b
              return (
                '\n          /** \n           * ' +
                (((_b =
                  (_a = docs[node.context]) === null || _a === void 0
                    ? void 0
                    : _a.handles.bullets.find(function (row) {
                        return row.name === handle.name
                      })) === null || _b === void 0
                  ? void 0
                  : _b.value) || '') +
                '\n           * @name ' +
                handle.name +
                '\n           * @file [' +
                handle.file +
                '](' +
                (process.cwd() + handle.file) +
                ")\n           */\n          handle(name:'" +
                handle.name +
                "', index?:number|string): Cypress.Chainable<Element>\n        "
              )
            })
            .join('\n') +
          '\n\n        ' +
          node.states
            .map(function (state) {
              var _a, _b, _c, _d
              return (
                '\n          /** \n           * ' +
                (((_b =
                  (_a = docs[node.context]) === null || _a === void 0
                    ? void 0
                    : _a.states.bullets.find(function (row) {
                        return row.name === state.name
                      })) === null || _b === void 0
                  ? void 0
                  : _b.value) || '') +
                '\n           * @name ' +
                state.name +
                '\n           * @file [' +
                state.file +
                '](' +
                (process.cwd() + state.file) +
                ') ' +
                (!state.implementations
                  ? ''
                  : '\n           * @implementations ' +
                    state.implementations
                      .map(function (imp) {
                        var _a, _b, _c, _d
                        return (
                          '\n           * - ' +
                          imp.name +
                          ' [(' +
                          imp.file +
                          ')](' +
                          (process.cwd() + imp.file) +
                          '): ' +
                          ((_d =
                            (_c =
                              (_b =
                                (_a = docs[node.context]) === null || _a === void 0
                                  ? void 0
                                  : _a.states.bullets.find(function (row) {
                                      return row.name === state.name
                                    })) === null || _b === void 0
                                ? void 0
                                : _b.bullets) === null || _c === void 0
                              ? void 0
                              : _c.find(function (row) {
                                  return row.name === imp.name
                                })) === null || _d === void 0
                            ? void 0
                            : _d.value)
                        )
                      })
                      .join('\n')) +
                "\n           */\n          shouldHaveState( name:'" +
                state.name +
                "' " +
                (state.implementations
                  ? ", implementations: '" +
                    state.implementations
                      .map(function (i) {
                        return i.name
                      })
                      .join(',') +
                    "'"
                  : '') +
                '): ' +
                node.typesaveContext +
                '\n\n          /** \n           * ' +
                (((_d =
                  (_c = docs[node.context]) === null || _c === void 0
                    ? void 0
                    : _c.states.bullets.find(function (row) {
                        return row.name === state.name
                      })) === null || _d === void 0
                  ? void 0
                  : _d.value) || '') +
                '\n           * @name ' +
                state.name +
                '\n           * @file [' +
                state.file +
                '](' +
                (process.cwd() + state.file) +
                ")\n           */\n          shouldNotHaveState(name:'" +
                state.name +
                "'): " +
                node.typesaveContext +
                '\n        '
              )
            })
            .join('\n') +
          '\n      }\n    '
        )
      })
      .join('\n') +
    '\n\n    declare namespace Firescout {\n      ' +
    tree
      .map(function (node) {
        var _a
        return (
          '\n        /**\n         * ' +
          (((_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.description) ||
            '...') +
          ' \n         * @name ' +
          node.context +
          '\n         * @file [' +
          node.folder +
          '](' +
          (process.cwd() + node.file) +
          ')\n         * @docs_file ' +
          (docs[node.context]
            ? '[' + docs[node.context].file + '](' + (process.cwd() + docs[node.context].file) + ')'
            : '-') +
          "\n         */\n        function context (name:'" +
          node.context +
          "', index?:number|string):" +
          node.typesaveContext +
          '\n      '
        )
      })
      .join('\n') +
    '\n\n      ' +
    modules
      .map(function (node) {
        return (
          "\n        function module (name: '" +
          node.context +
          "'):" +
          node.typesaveContext +
          '\n      '
        )
      })
      .join('\n') +
    '\n    }\n\n    declare namespace Cypress {\n      interface Chainable {\n        context: typeof Firescout.context;\n        module: typeof Firescout.module;\n      }\n    }\n  '
  )
    .split('\n')
    .slice(1)
    .map(function (s) {
      return s.trim()
    })
    .join('\n')
}
exports.default = createFileContent
