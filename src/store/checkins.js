import axios from 'axios'
import serverUrl from '../environment'
//SOCKET
import socket from '../sockets'
import { paintEstablishment, fetchEstablishments, createMarker, verifyCheckIn, fetchUsers, fetchKingdoms } from './'


/**
 * ACTION TYPES
 */
const GET_CHECKINS = 'GET_CHECKINS'
const CREATE_CHECKIN = 'CREATE_CHECKIN'
const CREATE_FOURSQUARE_CHECKINS = 'CREATE_FOURSQUARE_CHECKINS'
const DELETE_CHECKIN = 'DELETE_CHECKIN'

/**
 * ACTION CREATORS
 */
const getCheckins = checkins => ({ type: GET_CHECKINS, checkins })
export const createFoursquareCheckins = checkins => ({ type: CREATE_FOURSQUARE_CHECKINS, checkins })
export const createCheckin = checkin => ({ type: CREATE_CHECKIN, checkin })
const deleteCheckin = userId => ({ type: DELETE_CHECKIN, userId })

/**
 * THUNK CREATORS
 */
export const fetchCheckins = () => dispatch =>
  axios.get(`${serverUrl}/api/checkins`)
    .then(res => res.data)
    .then(checkins => dispatch(getCheckins(checkins)))
    .catch(err => console.error('Fetching Checkins unsuccessful.', err))

//export const addFoursquareCheckins = () => dispatch =>

export const addCheckIn = (user, place) => dispatch => {
  const checkInBundle = { user, place }
  return axios.put(`${serverUrl}/api/establishments`, checkInBundle)
    .then(res => res.data)
    .then(newCheckin => {
      console.log(newCheckin)
      dispatch(createCheckin(newCheckin))
      socket.emit('new-checkIn', newCheckin)
      //dispatch(paintEstablishment(newCheckin.establishment))
      return axios.get(`${serverUrl}/api/establishments/${newCheckin.establishment.id}`)
        .then(establishment=>establishment.data)
        .then(establishment=>{
          dispatch(paintEstablishment(establishment))
          socket.emit('paint-new-establishment', establishment)
          dispatch(createMarker([]))
          dispatch(fetchEstablishments())
          dispatch(fetchKingdoms())
          dispatch(fetchUsers())
          dispatch(verifyCheckIn({id:'1000', status:'OPEN'}))
        })
    })
    .catch(err => console.error(`Creating Checkin ${checkInBundle.establishment} unsuccessful.`, err))
}

export const removeCheckin = (userId, kingdomId) => dispatch =>
  axios.delete(`${serverUrl}/api/checkins/${userId}/${kingdomId}`)
    .then(() => dispatch(deleteCheckin(userId)))
    .catch(err => console.error(`Deleting Checkin (userId: ${userId} unsuccessful.`, err))

export default function reducer(checkins = [], action) {
  switch (action.type) {
    case GET_CHECKINS:
      return action.checkins;
    case CREATE_CHECKIN:
      return [...checkins, action.checkin];
    case DELETE_CHECKIN:
      return checkins.filter(checkin => checkin.userId !== action.userId)
    default:
      return checkins;
  }
}
