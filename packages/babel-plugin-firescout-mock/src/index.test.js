var {transformSync} = require('@babel/core')
var plugin = require('.')

const transform = code => transformSync(code, {
  presets: ["@babel/preset-react"],
  plugins: [plugin],
}).code

test('transforms @firescoutMock', () => {
  const output = transform(`
    /** @firescoutMock Config.config */
    export const xy =  async (test) => {
      console.log(test)
    }
  `)
  console.log(output)
});