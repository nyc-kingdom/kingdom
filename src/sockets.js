import openSocket from 'socket.io-client'

let serverUrl;
if (process.env.NODE_ENV === "production") {
    serverUrl = 'https://kingdom-server.herokuapp.com'
} else {
    const port = 8080
    serverUrl = `http://localhost:${port}`
}

const socket = openSocket(serverUrl, {transports: ['websocket']} )

export { serverUrl }
export default socket
