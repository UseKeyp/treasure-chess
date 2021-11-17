const fs = require('fs-extra')
const path = require('path')
const { png2svg } = require('svg-png-converter')

const directoryPath = path.join(__dirname, '../src/assets/flags/64')

// NOTE: This is not helpful, since the output looks like garbage
// Vectorising a png (dot-matrix) is never a good idea
const pngToSvg = async () => {
  fs.readdir(directoryPath, async (err, files) => {
    if (err) return console.log(err)
    console.log('Generating svgs...')
    let svgs = {}
    const onlyUS = ['United-States.png']
    await Promise.all(
      // files.map(async (fileName, index) => {
      onlyUS.map(async (fileName, index) => {
        if (!fileName.match(/(.png)$/)) return
        const result = await png2svg({
          // tracer: 'bitmap2vector',
          tracer: 'imagetracer',
          optimize: true,
          input: fs.readFileSync(path.join(directoryPath, fileName)),
          numberofcolors: 24,
          pathomit: 1,
          scale: 0.5,
          layering: 0,
        })
        svgs[fileName.split('.')[0]] = result.content
        svgs[fileName.split('.')[0]] = result.content
        fs.writeFile(
          path.join(directoryPath, '../flags.js'),
          `const flags = ${JSON.stringify(svgs)}
        module.exports = flags`,
          (err) => {
            if (err) throw err
          }
        )
      })
    )
    fs.writeFile(
      path.join(directoryPath, '../sample.html'),
      svgs['United-States'],
      (err) => {
        if (err) throw err
      }
    )
  })
}

pngToSvg()
