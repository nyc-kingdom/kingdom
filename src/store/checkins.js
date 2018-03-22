'use strict'

import axios from 'axios'

const port = 8080
const serverUrl = `http://localhost:${port}`
/**
 * ACTION TYPES
 */
const GET_CHECKINS = 'GET_CHECKINS'
const CREATE_CHECKIN = 'CREATE_CHECKIN'
const UPDATE_CHECKIN = 'UPDATE_CHECKIN'
const DELETE_CHECKIN = 'DELETE_CHECKIN'

/**
 * ACTION CREATORS
 */
const getCheckins = checkins => ({type: GET_CHECKINS, checkins})
const createCheckin = checkin => ({type: CREATE_CHECKIN, checkin})
const updateCheckin = checkin => ({type: UPDATE_CHECKIN, checkin})
const deleteCheckin = establishmentId => ({type: DELETE_CHECKIN, establishmentId})

/**
 * THUNK CREATORS
 */
export const fetchCheckins = () => dispatch =>
    axios.get(`${serverUrl}/api/checkins`)
        .then(res => res.data)
        .then(checkins => dispatch(getCheckins(checkins)))
        .catch(err => console.error('Fetching Checkins unsuccesful.', err))

export const addCheckin = checkin => dispatch =>
    axios.post(`${serverUrl}/api/checkins`, checkin)
        .then(res => res.data)
        .then(newCheckin => dispatch(createCheckin(newCheckin)))
        .catch(err => console.error(`Creating Checkin ${checkin} unsuccesful.`, err))

// export const editCheckin = (userId, establishmentId) => dispatch =>
//     axios.put(`${serverUrl}/api/checkins?user=${userId}&establishment=${establishmentId}`)
//         .then(res => res.data)
//         .then(editedCheckin => dispatch(updateCheckin(editedCheckin)))
//         .catch(err => console.error(`Updating Checkin ${userId} & ${establishmentId} unsuccesful.`, err))

// export const removeCheckin = establishmentId => dispatch =>
//     axios.delete(`${serverUrl}/api/checkins?establishment=${establishmentId}`)
//         .then(() => dispatch(deleteCheckin(establishmentId)))
//         .catch(err => console.error(`Deleting Checkin (id: ${establishmentId}) unsuccesful.`, err))
/**
 * Reducer
 */
export default function reducer(checkins = [], action) {
  switch (action.type) {
    case GET_CHECKINS:
      return action.checkins;
    case CREATE_CHECKIN:
      return [...checkins, action.checkin];
    case UPDATE_CHECKIN:
      return checkins.map(checkin => {
        return checkin.id === action.checkin.id ? action.checkin : checkin
      });
    case DELETE_CHECKIN:
      return checkins.filter(checkin => checkin.id !== action.checkin.id);
    default:
      return checkins;
  }
}
