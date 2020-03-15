const moment = require('moment')
const SerialPort = require('serialport')
const Regex = require('@serialport/parser-regex')

const portName = '/dev/tty.usbserial-1410'
const serialPort = new SerialPort(portName, {
  baudRate: 115200
})

const serialPortListener = serialPort.pipe(new Regex({ regex: /[\r\n]+/ }))

const WebSocket = require('ws');
const port = '8080'
const host = 'ws://localhost'
const route = 'realtime'
const ws = new WebSocket(`${host}:${port}/${route}`);

ws.on('open', function open() {
  ws.send('array');
});

serialPortListener.on('data', buffer => {
  const dateTime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss") + ','
  let data = buffer.toString()
  if (data[0] === '{') {
    ws.send(data);
    console.log('time:', dateTime, 'data:', data)
  }
})

// Add posibility to reopen serial port and read again
// Add info about how to start serial port and server
// Show 4 numbers on the some place at the window
// longtitude: 234
// широта: 234
// висотаЖ: 23423
// speed: 234
// timestamp