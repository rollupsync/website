const fs = require('fs')
const path = require('path')

const bundle = require(path.join(__dirname, '../build/vue-ssr-server-bundle.json'))

for (const [name, data] of Object.entries(bundle.files)) {
  fs.writeFileSync(path.join(__dirname, `../build/${name}`), data)
}
