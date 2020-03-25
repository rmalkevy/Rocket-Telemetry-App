const serialPortListenData = require('./serialPortHandler')
const wsSendDataHandler = require('./websocketHandler')

serialPortListenData(wsSendDataHandler)

// Add posibility to reopen serial port and read again
// Add info about how to start serial port and server
// Show 4 numbers on the some place at the window
// longtitude: 234
// широта: 234
// висотаЖ: 23423
// speed: 234
// timestamp