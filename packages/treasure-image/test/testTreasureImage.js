const treasureImage = require('../index.js')

const testFen = '8/kp3Rp1/1p1B2r1/4P1qp/Q2Pp3/4P3/6PP/6K1 b - - 4 32'
//https://lichess.org/editor?fen=8%2Fkp3Rp1%2F1p1B2r1%2F4P1qp%2FQ2Pp3%2F4P3%2F6PP%2F6K1+b+-+-+4+32

const testfen2 = '6k1/6p1/7p/1N6/P7/2P2P1P/4r1P1/R5KR b - - 0 33'

var base64img = '123abcXXXXXXXXXXXXXXXXXXXX'

console.log('====== Test Treasure Image ======')
console.log('FEN = ' + testFen)

var img = treasureImage.loadFEN(testFen)
base64img = treasureImage.convertPngToBase64(img)

console.log(base64img.slice(0, 11)) // "01"
