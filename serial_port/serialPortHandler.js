const moment = require('moment')
const SerialPort = require('serialport')
const Regex = require('@serialport/parser-regex')

const portName = '/dev/tty.usbserial-1410'
const serialPort = new SerialPort(portName, {
  baudRate: 115200,
  autoOpen: true,
})

const serialPortListener = serialPort.pipe(new Regex({ regex: /[\r\n]+/ }))

const serialPortListenData = wsSendHandler => {
  const bufferHandler = buffer => {
    const dateTime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss") + ','
    const data = buffer.toString()
  
    if (data[0] === '{') {
      wsSendHandler(data)
      console.log('time:', dateTime, 'data:', data)
    }
  }

  serialPortListener.on('data', bufferHandler)
  serialPortListener.on('close', () => console.log('Closed'))
  serialPortListener.on('end', () => console.log('End'))
  serialPortListener.on('error', (error) => console.log('error: ', error))
  serialPortListener.on('readable', () => console.log('readable'))
}

module.exports = serialPortListenData
