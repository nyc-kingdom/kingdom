import axios from 'axios'
import history from './history'
import { serverUrl, fetchKingdoms, fetchUsers, removeCheckin, fetchCheckins } from './'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const updateUser = user => ({ type: UPDATE_USER, user })

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios({
      method: 'get',
      url: `${serverUrl}/auth/me`,
      withCredentials: true
    })
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const login = () => dispatch =>
  axios.get(`${serverUrl}/auth/foursquare`)
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

export const logout = () => dispatch => 
    axios({
      method: 'post',
      url: `${serverUrl}/auth/logout`,
      withCredentials: true
    })
      .then(_ => dispatch(removeUser()))
      .catch(err => console.log(err))

export const editUser = (user, userId) => dispatch => {
  const kingdomId = !user.kingdomId ? null : user.kingdomId
  return axios.put(`${serverUrl}/api/users/${userId}`, user)
    .then(res => res.data)
    .then(editedUser => {
      if (kingdomId !== editedUser.kingdomId) {
        dispatch(removeCheckin(editedUser.id))
        dispatch(fetchCheckins())
        console.log(editedUser)
      }
      dispatch(fetchUsers())
      dispatch(fetchKingdoms())
      dispatch(updateUser(editedUser))
    })
    .catch(err => console.error(`Updating User ${user} unsuccesful.`, err))
  }

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return action.user
    default:
      return state
  }
}
