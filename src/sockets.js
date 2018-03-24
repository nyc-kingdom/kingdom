const openSocket = require('socket.io-client')


const socket = openSocket('http://172.16.21.145:8080', {transports: ['websocket']} )



socket.on('connection', ()=>{
    console.log('I CONNECTED TO SERVER')
})

export default socket

////172.16.21.145