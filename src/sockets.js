const openSocket = require('socket.io-client')
//const serverUrl = 'http://localhost:8080'
const serverUrl = 'https://kingdom-server.herokuapp.com'

//const socket = openSocket('http://172.16.21.145:8080', {transports: ['websocket']} )

const socket = openSocket(serverUrl, {transports: ['websocket']} )



socket.on('connection', ()=>{
    console.log('I CONNECTED TO SERVER')
})

export default socket

////172.16.21.145
