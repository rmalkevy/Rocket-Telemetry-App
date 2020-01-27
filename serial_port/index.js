const moment = require('moment')
const SerialPort = require('serialport')
const Regex = require('@serialport/parser-regex')
const port = new SerialPort('/dev/tty.usbserial-1410', {
  baudRate: 115200
})

const serialportListener = port.pipe(new Regex({ regex: /[\r\n]+/ }))
// serialportListener.on('data', buffer => {
//   const dateTime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss") + ','
//   let data = buffer.toString()
//   if (data[0] === '{') {
//     data = JSON.parse(data)
//     console.log('time:', dateTime, 'data:', data)
//   }
// })

module.exports = {
  serialportListener
};