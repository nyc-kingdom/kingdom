import { createStore, combineReducers, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import markers from './markers'
import user from './user';

const reducer = combineReducers({ user, markers })
const middleware = composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

export default store;

export * from './markers';
export * from './user';
