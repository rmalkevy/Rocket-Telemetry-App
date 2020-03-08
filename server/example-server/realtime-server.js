var express = require('express');

function RealtimeServer(spacecraft) {

    var router = express.Router();

    router.ws('/', function (ws) {
        var unlisten = spacecraft.listen(notifySubscribers);
        var subscribed = {}; // Active subscriptions for this connection
        var handlers = { // Handlers for specific requests
                subscribe: function (id) {
                    subscribed[id] = true;
                },
                unsubscribe: function (id) {
                    delete subscribed[id];
                }
            };

        function notifySubscribers(point) {
            console.log('notifySubscribers', point)
            if (subscribed[point.id]) {
                ws.send(JSON.stringify(point));
            }
        }

        // Listen for requests
        ws.on('message', function (message) {
            handleDataFromSerialPort(message)

            var parts = message.split(' '),
                handler = handlers[parts[0]];
            if (handler) {
                handler.apply(handlers, parts.slice(1));
            }
        });

        // Stop sending telemetry updates for this connection when closed
        ws.on('close', unlisten);
    });

    function handleDataFromSerialPort(message) {
        console.log('Server got from serial port: ', message)

        var spacecraftState = toObject(message)
        if (spacecraftState) {
            var data = {
                "prop.acc": spacecraftState["Acc"],
                "prop.par": spacecraftState["Par"],
                "pwr.hgh": spacecraftState["Hgh"],
                "pwr.ang": spacecraftState["Ang"],
            }
            spacecraft.listenDataFromSerialPort(data)
        }
    }

    function toObject(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return null;
        }
    }

    return router;
};

module.exports = RealtimeServer;
