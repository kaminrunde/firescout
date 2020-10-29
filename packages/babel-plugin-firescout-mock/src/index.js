
module.exports = function firescoutMock ({ types: t }) {
  return {
    name: 'firescout-mock',
    visitor: {
      ArrowFunctionExpression (path) {
        let comment
        let targetPath = path

        if(path.parentPath.type === 'ExportDefaultDeclaration') {
          targetPath = path.parentPath
          comment = extractAndRemoveComment(targetPath, '@firescoutMockFn')
        }
        else if(path.parentPath.type === 'VariableDeclarator') {
          targetPath = path.parentPath
          if(targetPath.parentPath.type === 'VariableDeclaration'){
            targetPath = targetPath.parentPath
            comment = extractAndRemoveComment(targetPath, '@firescoutMockFn')
            if(!comment && targetPath.parentPath.type === 'ExportNamedDeclaration') {
              targetPath = targetPath.parentPath
              comment = extractAndRemoveComment(targetPath, '@firescoutMockFn')
            }
          }
        }

        const name = getName(comment, '@firescoutMockFn')
        if(!name) return

        const fn = t.FunctionExpression(
          t.Identifier(path.node.id ? path.node.id.name : 'fn'),
          path.node.params,
          path.node.body.type === 'BlockStatement' ? path.node.body : t.blockStatement([
            t.returnStatement(path.node.body)
          ]),
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
        let isDefaultExported = false
        
        comment = extractAndRemoveComment(path, '@firescoutMockFn')
        if(!comment) {
          const targets = [
            'ExportDefaultDeclaration',
            'ExportDeclaration',
            'ExportNamedDeclaration'
          ]
          if (targets.includes(path.parentPath.type)) {
            comment = extractAndRemoveComment(path.parentPath, '@firescoutMockFn')
            isDefaultExported = path.parentPath.type === 'ExportDefaultDeclaration'
          }
        }

        const name = getName(comment, '@firescoutMockFn')
        if(!name) return

        const fn = t.FunctionExpression(
          t.Identifier(path.node.id ? path.node.id.name : 'fn'),
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
                  [t.stringLiteral(name), fn]
                )
              )
            ])
          )
        }
      },
      FunctionExpression (path) {
        let comment
        let targetPath = path

        if(path.parentPath.type === 'ExportDefaultDeclaration') {
          targetPath = path.parentPath
          comment = extractAndRemoveComment(targetPath, '@firescoutMockFn')
        }
        else if(path.parentPath.type === 'VariableDeclarator') {
          let targetPath = path.parentPath
          if(targetPath.parentPath.type === 'VariableDeclaration'){
            targetPath = targetPath.parentPath
            comment = extractAndRemoveComment(targetPath, '@firescoutMockFn')
            if(!comment && targetPath.parentPath.type === 'ExportNamedDeclaration') {
              targetPath = targetPath.parentPath
              comment = extractAndRemoveComment(targetPath, '@firescoutMockFn')
            }
          }
        }

        const name = getName(comment, '@firescoutMockFn')
        if(!name) return

        const fn = t.FunctionExpression(
          t.Identifier(path.node.id ? path.node.id.name : 'fn'),
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
      VariableDeclaration (path) {
        if(!path.node.leadingComments) return
        const comment = extractAndRemoveComment(path, '@firescoutMockVar')
        
        const name = getName(comment, '@firescoutMockVar')
        if(!name) return

        const declarators = path.get('declarations')
        if(declarators.length > 1) return
        const lastDeclarator = declarators[declarators.length-1]

        path.replaceWith(
          t.variableDeclaration(path.node.kind, [
            t.VariableDeclarator(
              t.identifier(lastDeclarator.node.id.name), 
              t.callExpression(
                t.memberExpression(
                  t.callExpression(t.identifier('require'), [
                    t.stringLiteral('@kaminrunde/cypress-firescout')
                  ]),
                  t.identifier('firescoutMockVar')
                ),
                [t.stringLiteral(name), lastDeclarator.node.init]
              )
            )
          ])
        )
      },
      ObjectProperty (path) {
        if(!path.node.leadingComments) return

        const varComment = extractAndRemoveComment(path, '@firescoutMockVar')
        const fnComment = extractAndRemoveComment(path, '@firescoutMockFn')
        const comment = varComment || fnComment
        const query = varComment ? 'firescoutMockVar' : 'firescoutMockFn'

        
        const name = getName(comment, '@' + query)
        if(!name) return
        
        const valPath = path.get('value')

        valPath.replaceWith(
          t.callExpression(
            t.memberExpression(
              t.callExpression(t.identifier('require'), [
                t.stringLiteral('@kaminrunde/cypress-firescout')
              ]),
              t.identifier(query)
            ),
            [t.stringLiteral(name), valPath.node]
          )
        )
      }
    }
  }
}


function extractAndRemoveComment (path, query) {
  if(!path.node.leadingComments) return null
  const comment = path.node.leadingComments.find(node => 
    node.value.includes(query)
  )
  if(!comment) return null
  path.node.leadingComments = path.node.leadingComments.filter(
    node => node !== comment
  )
  return comment
}

function getName (commentNode, query) {
  const regex = new RegExp(`${query} ([^ *]+)`)
  if(!commentNode) return null
  const match = commentNode.value.match(regex)
  if (!match) return null
  const name = match[1].replace(/[\n\r]/g, '')
  return name
}