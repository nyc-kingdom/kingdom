import axios from 'axios'
import { serverUrl } from '../sockets'
import { fetchCheckins } from './'

/**
 * ACTION TYPES
 */
const GET_ESTABLISHMENTS = 'GET_ESTABLISHMENTS'
const ADD_ESTABLISHMENT = 'ADD_ESTABLISHMENT'

/**
 * ACTION CREATORS
 */
const getEstablishments = establishments => ({type: GET_ESTABLISHMENTS, establishments})
export const paintEstablishment = establishment => ({type: ADD_ESTABLISHMENT, establishment})

/**
 * THUNK CREATORS
 */
export const fetchEstablishments = () => async dispatch => {
  try {
    const establishments = await axios.get(`${serverUrl}/api/establishments`)
    dispatch(getEstablishments(establishments.data))  
  } catch (err) {
    console.error('Fetch Establishments unsuccessful.', err)
  }
}

export const getUserCheckIns = user => async dispatch => {
  try {
    const payLoad = await axios.put(`${serverUrl}/api/establishments/foursquare`, {user})
    dispatch(fetchCheckins())
    dispatch(fetchEstablishments())
  } catch (err) {
    console.error('Get Checkins from Foursquare unsuccessful.', err)
  }
}

/**
 * REDUCER
 */
export default (state = [], action) => {
  switch (action.type) {
    case GET_ESTABLISHMENTS:
      return action.establishments;
    case ADD_ESTABLISHMENT:
      return [...state, action.establishment]
    default:
      return state;
  }
}
