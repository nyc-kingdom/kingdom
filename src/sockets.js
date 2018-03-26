import { serverUrl } from '../src/store'
const openSocket = require('socket.io-client')



const socket = openSocket(serverUrl, {transports: ['websocket']} )



socket.on('connection', ()=>{
    console.log('I CONNECTED TO SERVER')
})

export default socket
