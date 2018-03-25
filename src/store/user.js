import axios from 'axios'
import history from './history'

const post = 8080
const serverUrl = `http://localhost:${post}`
//const serverUrl = '172.16.21.145:8080'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const UPDATE_USER = 'UPDATE_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const updateUser = user => ({ type: UPDATE_USER, user })
const removeUser = () => ({ type: REMOVE_USER })

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios({
      method: 'get',
      url: 'http://localhost:8080/auth/me',
      withCredentials: true
    })
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const login = () => dispatch =>
  axios.get('http://localhost:8080/auth/foursquare')
    .then(res =>
      dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err))

export const auth = (email, password, method) => dispatch =>
  axios.post(`/auth/${method}`, { email, password })
    .then(res => {
      dispatch(getUser(res.data))
      history.push('/home')
    }, authError => { // rare example: a good use case for parallel (non-catch) error handler
      dispatch(getUser({ error: authError }))
    })
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const editUser = (user, userId) => dispatch => 
  axios.put(`${serverUrl}/api/users/${userId}`, user)
    .then(res => res.data)
    .then(editedUser => dispatch(updateUser(editedUser)))
    .catch(err => console.error(`Updating User ${user} unsuccesful.`, err))

export const logout = () => dispatch => 
    axios({
      method: 'post',
      url: `${serverUrl}/auth/logout`,
      withCredentials: true
    })
      .then(_ => dispatch(removeUser()))
      .catch(err => console.log(err))

// {
//   console.log("where are you?")
//   axios.post(`${serverUrl}/auth/logout`)
//     .then(_ => {
//       console.log("are you there yet?")
//       dispatch(removeUser())
//       history.push('/')
//     })
//     .catch(err => console.log(err))
//   }
/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case UPDATE_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
