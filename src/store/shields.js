import axios from 'axios'
import socket from '../sockets'
import { serverUrl } from './'

/**
 * ACTION TYPES
 */
const GET_SHIELDS = 'GET_SHIELDS'
const CREATE_SHIELD = 'CREATE_SHIELD'
const UPDATE_SHIELD = 'UPDATE_SHIELD'
const DELETE_SHIELD = 'DELETE_SHIELD'

/**
 * ACTION CREATORS
 */
const getShields = shields => ({ type: GET_SHIELDS, shields })
const createShield = shield => ({ type: CREATE_SHIELD, shield })
const updateShield = shield => ({ type: UPDATE_SHIELD, shield })
const deleteShield = shieldId => ({ type: DELETE_SHIELD, shieldId })

/**
 * THUNK CREATORS
 */
export const fetchShields = () => dispatch =>
  axios.get(`${serverUrl}/api/shields`)
    .then(res => res.data)
    .then(shields => dispatch(getShields(shields)))
    .catch(err => console.error('Fetching Shields unsuccessful.', err))

export const addShield = (shield, kingdomId) => dispatch =>
  axios.post(`${serverUrl}/api/shields`, shield)
    .then(res => res.data)
    .then(newShield => {
      dispatch(createShield(newShield))
      socket.emit('new-Shield', newShield)
    })
    .catch(err => console.error(`Creating Shield ${shield} unsuccessful.`, err))

export const editShield = (shield, shieldId) => dispatch => 
  axios.put(`${serverUrl}/api/shields/${shieldId}`, shield)
    .then(res => res.data)
    .then(editedShield => {
      dispatch(createShield(editedShield))
      socket.emit('edited-Shield', editedShield)
    })
    .catch(err => console.error(`Updating Shield ${shield} unsuccessful.`, err))

export const removeShield = shieldId => dispatch =>
  axios.delete(`${serverUrl}/api/shields/${shieldId}`)
    .then(() => dispatch(deleteShield(shieldId)))
    .catch(err => console.error(`Deleting Shield (shieldId: ${shieldId} unsuccessful.`, err))

/**
 * Reducer
 */
export default function reducer(shields = [], action) {
  switch (action.type) {
    case GET_SHIELDS:
      return action.shields
    case CREATE_SHIELD:
      return [...shields, action.shield]
    case UPDATE_SHIELD:
      return shields.map(shield => shield.id === action.shield.id ? action.shield : shield)
    case DELETE_SHIELD:
      return shields.filter(shield => shield.id !== action.shieldId)
    default:
      return shields
  }
}
