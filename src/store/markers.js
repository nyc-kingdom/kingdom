import { serverUrl } from '../sockets'
import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_MARKER = 'ADD_MARKER'

/**
 * ACTION CREATORS
 */
export const createMarker = marker => ({ type: ADD_MARKER, marker })

/**
 * THUNK CREATORS
 */
export const queryMarkers = (userInput, user, location) => async dispatch => {
  try {
    console.log('Breakpoint ', location)
    const payLoad = await axios.get(`${serverUrl}/api/markers?userInput=${userInput}&token=${user.token}&ll=${location[0]}, ${location[1]}`)
    dispatch(createMarker(payLoad.data.response.groups[0].items))  
  } catch (err) {
    console.error('Query Markers unsuccessful.', err)
  }
}

/**
 * REDUCER
 */
export default function (markers = [], action) {
  switch (action.type) {
    case ADD_MARKER:
      return action.marker
    default:
      return markers
  }
}
