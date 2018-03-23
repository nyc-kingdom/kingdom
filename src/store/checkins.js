'use strict'

import axios from 'axios'

//FUNCTIONALITY
import distanceCalc from '../functions/distanceCalc'

const post = 8080
const serverUrl = `http://localhost:${post}`
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
const getCheckins = checkins => ({ type: GET_CHECKINS, checkins })
const createCheckin = checkin => ({ type: CREATE_CHECKIN, checkin })
// const updateCheckin = checkin => ({ type: UPDATE_CHECKIN, checkin })
// const deleteCheckin = establishmentId => ({ type: DELETE_CHECKIN, establishmentId })

/**
 * THUNK CREATORS
 */
export const fetchCheckins = () => dispatch =>
  axios.get(`${serverUrl}/api/checkins`)
    .then(res => res.data)
    .then(checkins => dispatch(getCheckins(checkins)))
    .catch(err => console.error('Fetching Checkins unsuccesful.', err))

export const addCheckIn = (user, place) => dispatch => {

        const checkInBundle = { user, place }
        return axios.put(`${serverUrl}/api/establishments`, checkInBundle)
          .then(res => res.data)
          .then(newCheckin => dispatch(createCheckin(newCheckin)))
          .catch(err => console.error(`Creating Checkin ${checkInBundle.establishment} unsuccesful.`, err))
}

export default function reducer(checkins = [], action) {
  switch (action.type) {
    case GET_CHECKINS:
      return action.checkins;
    case CREATE_CHECKIN:
      return [...checkins, action.checkin];
    default:
      return checkins;
  }
}
