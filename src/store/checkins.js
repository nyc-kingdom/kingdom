'use strict'

import axios from 'axios'

//SOCKET
import socket from '../sockets.js'

//FUNCTIONALITY
import distanceCalc from '../functions/distanceCalc'
import {verifyCheckIn} from './gameplay'


const post = 8080
// const serverUrl = `http://localhost:${post}`
const serverUrl = 'https://kingdom-server.herokuapp.com'
/**
 * ACTION TYPES
 */
const GET_CHECKINS = 'GET_CHECKINS'
const CREATE_CHECKIN = 'CREATE_CHECKIN'
const CREATE_FOURSQUARE_CHECKINS = 'CREATE_FOURSQUARE_CHECKINS'

/**
 * ACTION CREATORS
 */
const getCheckins = checkins => ({ type: GET_CHECKINS, checkins })
const createFoursquareCheckins = checkins => ({ type: CREATE_FOURSQUARE_CHECKINS, checkins })
export const createCheckin = checkin => ({ type: CREATE_CHECKIN, checkin })

/**
 * THUNK CREATORS
 */
export const fetchCheckins = () => dispatch =>
  axios.get(`${serverUrl}/api/checkins`)
    .then(res => res.data)
    .then(checkins => dispatch(getCheckins(checkins)))
    .catch(err => console.error('Fetching Checkins unsuccesful.', err))

//export const addFoursquareCheckins = () => dispatch =>

export const addCheckIn = (user, place) => dispatch => {

        const checkInBundle = { user, place }
        return axios.put(`${serverUrl}/api/establishments`, checkInBundle)
          .then(res => res.data)
          .then(newCheckin => {
            dispatch(createCheckin(newCheckin))
            socket.emit('new-checkIn', newCheckin)
            console.log('THE CHECKIN JUST FINISHED, WE GOT A REPLY FROM OUR SERVER')
            dispatch(verifyCheckIn({id:'1000', status:'COMPLETED'}))
          }) 
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
