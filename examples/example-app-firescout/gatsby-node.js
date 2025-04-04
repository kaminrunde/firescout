/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it


exports.onCreateBabelConfig = ({ stage, actions }) => {

  if(process.env.NODE_ENV === 'production'){
    actions.setBabelPlugin({
      name: `@kaminrunde/babel-plugin-remove-firescout`,
      stage,
    })
  }
  else {
    actions.setBabelPlugin({
      name: `@kaminrunde/babel-plugin-firescout-mock`,
      stage,
    })
  }
}