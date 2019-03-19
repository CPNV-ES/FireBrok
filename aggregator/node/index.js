var net = require('net')
var mqttCon = require('mqtt-connection')
var server = new net.Server()

var admin = require("firebase-admin");

var serviceAccount = require("./token/firebrok-firebase-adminsdk-o8itf-963da3c09e.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://firebrok.firebaseio.com"
});

var db = admin.firestore();

var automatonsCol = db.collection('automatons');


server.on('connection', function (stream) {
    var client = mqttCon(stream)


    // client connected
    client.on('connect', function (packet) {
        // acknowledge the connect packet
        let automaton = packet.username
        let authorized = false

        console.log(`Automaton ${automaton} connected`)

        automatonsCol.doc(automaton).get()
            .then(doc => {
                if (!doc.exists) {
                    console.log(`Automaton ${automaton} refused`)
                    client.destroy()
                } else {
                    console.log(`Automaton ${automaton} authorized`)
                    authorized = true
                }
            })
            .catch(err => {
                console.log(`Automaton ${automaton} refused`)
                client.destroy()
            })



        client.connack({ returnCode: 0 });

        // client published
        client.on('publish', function (packet) {
            if(!authorized){
                return
            }

            let currentDate = new Date()
            let topic = packet.topic

            automatonsCol.doc(automaton).set({
                updated_at: admin.firestore.Timestamp.fromDate(currentDate)
            }, {merge: true})

            automatonsCol.doc(automaton).collection("topics").doc(topic).get()
                .then(doc => {
                    if (!doc.exists) {
                        automatonsCol.doc(automaton).collection("topics").doc(topic).set({
                            name: topic,
                            created_at: admin.firestore.Timestamp.fromDate(currentDate),
                            updated_at: admin.firestore.Timestamp.fromDate(currentDate)
                        }, {merge: true})
                    }
                    else{
                        automatonsCol.doc(automaton).collection("topics").doc(topic).set({
                            updated_at: admin.firestore.Timestamp.fromDate(currentDate)
                        }, {merge: true})
                    }
                })

            let fluxDoc = automatonsCol.doc(automaton).collection("topics").doc(topic).collection("flux").doc()

            fluxDoc.set({
                message: packet.payload.toString('utf8'),
                timestamp: admin.firestore.Timestamp.fromDate(currentDate)
            }, {merge: false});
            console.log(`Automaton ${automaton} send :`)
            console.log(`Topic : ${topic}`)
            console.log(`Message : ${packet.payload.toString('utf8')}`)
        })


        // timeout idle streams after 5 minutes
        stream.setTimeout(1000 * 60 * 5)

        // connection error handling
        client.on('close', function () {
            console.log(`Automaton ${automaton} connection close`)
            client.destroy()
        })
        client.on('error', function () {
            console.log(`Automaton ${automaton} connection error`)
            client.destroy()
        })
        client.on('disconnect', function () {
            console.log(`Automaton ${automaton} connection disconnect`)
            client.destroy()
        })

        // stream timeout
        stream.on('timeout', function () {
            console.log(`Automaton ${automaton} connection timeout`)
            client.destroy()
        })
    })
})

// listen on port 1883
server.listen(1883)

console.log("Listening...")