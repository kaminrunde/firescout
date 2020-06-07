const { override, addBabelPlugins } = require('customize-cra')

module.exports = override(
  process.env.NODE_ENV === 'production' && addBabelPlugins('remove-firescout')
)