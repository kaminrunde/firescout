
module.exports = function firescoutMock ({ types: t }) {
  return {
    name: 'firescout-mock',
    visitor: {
      ArrowFunctionExpression (path) {
        let comment
        let targetPath = path

        if(path.parentPath.type === 'ExportDefaultDeclaration') {
          targetPath = path.parentPath
          comment = targetPath.node.leadingComments && targetPath.node.leadingComments.find(node => 
            node.value.includes('@firescoutMock')
          )
        }
        else if(path.parentPath.type === 'VariableDeclarator') {
          let targetPath = path.parentPath
          if(targetPath.parentPath.type === 'VariableDeclaration'){
            targetPath = targetPath.parentPath
            comment = targetPath.node.leadingComments && targetPath.node.leadingComments.find(node => 
              node.value.includes('@firescoutMock')
            )
            if(!comment && targetPath.parentPath.type === 'ExportNamedDeclaration') {
              targetPath = targetPath.parentPath
              comment = targetPath.node.leadingComments && targetPath.node.leadingComments.find(node => 
                node.value.includes('@firescoutMock')
              )
            }
          }
        }

        if(!comment) return
        const match = comment.value.match(/@firescoutMock ([^ *]+)/)
        if (!match) return
        const name = match[1].replace(/[\n\r]/g, '')
        targetPath.node.leadingComments = targetPath.node.leadingComments && targetPath.node.leadingComments.filter(
          c => c !== comment
        )

        const fn = t.FunctionExpression(
          t.Identifier(path.node.id ? path.node.id.name : 'foo'),
          path.node.params,
          path.node.body,
        )

        if(path.node.async) fn.async = true

        path.replaceWith(
          t.callExpression(
            t.memberExpression(
              t.callExpression(t.identifier('require'), [
                t.stringLiteral('@kaminrunde/cypress-firescout')
              ]),
              t.identifier('firescoutMockFn')
            ),
            [t.stringLiteral(name), fn]
          )
        )

      },
      FunctionDeclaration (path) {
        let comment
        let targetPath = path
        let isDefaultExported = false
        if (path.node.leadingComments) {
          comment = path.node.leadingComments && path.node.leadingComments.find(node =>
            node.value.includes('@firescoutMock')
          )
        } else {
          const targets = [
            'ExportDefaultDeclaration',
            'ExportDeclaration',
            'ExportNamedDeclaration'
          ]
          if (targets.includes(path.parentPath.type)) {
            comment = path.parentPath.node.leadingComments && path.parentPath.node.leadingComments.find(node =>
              node.value.includes('@firescoutMock')
            )
            isDefaultExported = path.parentPath.type === 'ExportDefaultDeclaration'
            targetPath = path.parentPath
            if (!comment) return
          } else {
            return
          }
        }
        if(!comment) return
        const match = comment.value.match(/@firescoutMock ([^ *]+)/)
        if (!match) return
        const name = match[1].replace(/[\n\r]/g, '')
        targetPath.node.leadingComments = targetPath.node.leadingComments && targetPath.node.leadingComments.filter(
          c => c !== comment
        )

        const fn = t.FunctionExpression(
          t.Identifier(path.node.id.name),
          path.node.params,
          path.node.body
        )
        if(path.node.async) fn.async = true

        if(isDefaultExported) {
          path.replaceWith(
            t.callExpression(
              t.memberExpression(
                t.callExpression(t.identifier('require'), [
                  t.stringLiteral('@kaminrunde/cypress-firescout')
                ]),
                t.identifier('firescoutMockFn')
              ),
              [t.stringLiteral(name), fn]
            )
          )
        }
        else {
          path.replaceWith(
            t.VariableDeclaration('var', [
              t.VariableDeclarator(
                t.Identifier(path.node.id.name),
                t.callExpression(
                  t.memberExpression(
                    t.callExpression(t.identifier('require'), [
                      t.stringLiteral('@kaminrunde/cypress-firescout')
                    ]),
                    t.identifier('firescoutMockFn')
                  ),
                  [t.stringLiteral(match[1]), fn]
                )
              )
            ])
          )
        }
      }
    }
  }
}
