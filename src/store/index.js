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

const reducer = combineReducers({ user, users, markers, checkins, establishments, kingdoms, trackLocation, verify })

const middleware = composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true })
))

const store = createStore(reducer, middleware)

export default store

export * from './markers'
export * from './user'
export * from './users'
export * from './establishments'
export * from './checkins'
export * from './kingdoms'
export * from './trackLocation'
