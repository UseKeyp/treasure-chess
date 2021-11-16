const fs = require('fs-extra')
const path = require('path')

const directoryPath = path.join(__dirname, '../src/assets/flags/24')

const convertAllFlags = async () => {
  fs.readdir(directoryPath, async (err, files) => {
    if (err) return console.log(err)
    console.log('Generating base64...')
    if (!files) throw 'No files found'
    console.log(files)
    let flags = {}
    // const onlyUS = ['United-States.png']
    await Promise.all(
      // onlyUS.map(async (fileName, index) => {
      files.map(async (fileName, index) => {
        if (!fileName.match(/(.png)$/)) return
        const data = fs.readFileSync(path.join(directoryPath, fileName))
        flags[fileName.split('.')[0]] = new Buffer(data, 'binary').toString(
          'base64'
        )
      })
    )
    fs.writeFile(
      path.join(directoryPath, '../../flags.js'),
      `const flags = ${JSON.stringify(flags)}
module.exports = flags`,
      (err) => {
        if (err) throw err
      }
    )
  })
}

convertAllFlags()
