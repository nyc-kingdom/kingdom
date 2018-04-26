import serverUrl from './environment'
import openSocket from 'socket.io-client'

// let serverUrl;
// if (process.env.NODE_ENV === "production") {
//     serverUrl = 'https://kingdom-server.herokuapp.com'
// } else {
//     const port = 8080
//     serverUrl = `http://localhost:${port}`
// }

const socket = openSocket(serverUrl, {transports: ['websocket']} )

socket.on('connect', ()=>{
    console.log('I CONNECTED TO SERVER')
})

export { serverUrl }
export default socket
