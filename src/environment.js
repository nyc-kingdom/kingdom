let serverUrl;

if (process.env.NODE_ENV === "production") {
    serverUrl = 'https://kingdom-server.herokuapp.com'
} else {
    const port = 8080
    serverUrl = `http://localhost:${port}`
}
export default serverUrl
