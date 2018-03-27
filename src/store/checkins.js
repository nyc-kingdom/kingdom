'use strict'

import axios from 'axios'
import { serverUrl } from './'
//SOCKET
import socket from '../sockets.js'

//FUNCTIONALITY
import distanceCalc from '../functions/distanceCalc'
import {verifyCheckIn} from './gameplay'
import {paintEstablishment} from './establishments'
import {createMarker} from './markers'

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

export const addCheckIn = (user, place, history) => dispatch => {

        const checkInBundle = { user, place }
        return axios.put(`${serverUrl}/api/establishments`, checkInBundle)
          .then(res => res.data)
          .then(newCheckin => {
            dispatch(createCheckin(newCheckin))
            socket.emit('new-checkIn', newCheckin)
            dispatch(paintEstablishment(newCheckin.establishment))
            dispatch(createMarker([]))
            dispatch(verifyCheckIn({id:'1000', status:'OPEN'}))
            console.log('THE CHECKIN JUST FINISHED, WE GOT A REPLY FROM OUR SERVER')
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
