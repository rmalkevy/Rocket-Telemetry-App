const WebSocket = require('ws');
const port = '8080'
const host = 'ws://localhost'
const route = 'realtime'
const ws = new WebSocket(`${host}:${port}/${route}`)

const wsSendDataHandler = data => {
  ws.send(data)
}

module.exports = wsSendDataHandler

