'use strict'

import axios from 'axios'
import history from '../history'

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
const deleteCheckin = id => ({type: DELETE_CHECKIN, id})

/**
 * THUNK CREATORS
 */
export const fetchCheckins = () => dispatch =>
    axios.get('/api/checkins')
        .then(res => res.data)
        .then(checkins => dispatch(getCheckins(checkins)))
        .catch(err => console.error('Fetching Checkins unsuccesful.', err))

export const addCheckin = checkin => dispatch =>
    axios.post('/api/checkins', checkin)
        .then(res => res.data)
        .then(newCheckin => {
          dispatch(createCheckin(newCheckin))
          history.push(`/checkins/${newCheckin.id}`)
        })
        .catch(err => console.error(`Creating Checkin ${checkin} unsuccesful.`, err))

export const editCheckin = (userId, establishmentId) => dispatch =>
    axios.put(`/api/checkins?user=${userId}&establishment=${establishmentId}`)
        .then(res => res.data)
        .then(editedCheckin => dispatch(updateCheckin(editedCheckin)))
        .catch(err => console.error(`Updating Checkin ${userId} & ${establishmentId} unsuccesful.`, err))

export const removeCheckin = id => dispatch =>
    axios.delete(`/api/checkins/${id}`)
        .then(() => dispatch(deleteCheckin(id)))
        .catch(err => console.error(`Deleting Checkin (id: ${id}) unsuccesful.`, err))
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
