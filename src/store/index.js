import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import markers from './markers'
import user from './user';
import establishments from './establishments';
import checkins from './checkins'
import kingdoms from './kingdoms'
import users from './users'
import trackLocation from './trackLocation'
import verify from './gameplay'
import mapStatus from './mapStatus'
import panning from './panning'

const reducer = combineReducers({ user, users, markers, checkins, establishments, kingdoms, trackLocation, verify, mapStatus, panning })

const middleware = composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true })
))

const store = createStore(reducer, middleware)


// let serverUrl;

// if (process.env.NODE_ENV === "production") {
//     serverUrl = 'https://kingdom-server.herokuapp.com'
// } else {
//     const port = 8080
//     serverUrl = `http://localhost:${port}`
// }

//grab location + store
//console.log("serverUrl: ", serverUrl, "which enviroment", process.env.NODE_ENV)
//export { serverUrl }
export default store

export * from './markers'
export * from './user'
export * from './users'
export * from './establishments'
export * from './checkins'
export * from './kingdoms'
export * from './trackLocation'
export * from './gameplay'
// export {serverUrl} from '../'
