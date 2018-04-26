import axios from 'axios'
import history from '../history'
import serverUrl from '../environment'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const CREATE_USER = 'CREATE_USER'
const DELETE_USER = 'DELETE_USER'

/**
 * ACTION CREATORS
 */
const getUsers = users => ({ type: GET_USERS, users })
const createUser = user => ({ type: CREATE_USER, user })
const deleteUser = userId => ({ type: DELETE_USER, userId })

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => dispatch =>
  axios.get(`${serverUrl}/api/users`)
    .then(res => res.data)
    .then(users => dispatch(getUsers(users)))
    .catch(err => console.error('Fetching Users unsuccesful.', err))

export const addUser = user => dispatch =>
  axios.post(`${serverUrl}/api/users`, user)
    .then(res => res.data)
    .then(newUser => dispatch(createUser(newUser)))
    .catch(err => console.error(`Creating User ${user} unsuccesful.`, err))

export const removeUser = userId => dispatch =>
  axios.delete(`${serverUrl}/api/users/${userId}`)
    .then(() => dispatch(deleteUser(userId)))
    .catch(err => console.error(`Deleting User (id: ${userId}) unsuccesful.`, err))

/**
 * Reducer
 */
export default function reducer(users = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case CREATE_USER:
      return [...users, action.user];
    case DELETE_USER:
      return users.filter(user => user.id !== action.user.id);
    default:
      return users;
  }
}
