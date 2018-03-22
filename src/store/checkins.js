'use strict'

import axios from 'axios'


//FUNCTIONALITY
import checkIn from '../functions/checkIn'
import distanceCalc from '../functions/distanceCalc'
const flickr = require('../secrets').flickrAPIKey

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
const updateCheckin = checkin => ({ type: UPDATE_CHECKIN, checkin })
const deleteCheckin = establishmentId => ({ type: DELETE_CHECKIN, establishmentId })



/**
 * THUNK CREATORS
 */
export const fetchCheckins = () => dispatch =>
  axios.get(`${serverUrl}/api/checkins`)
    .then(res => res.data)
    .then(checkins => dispatch(getCheckins(checkins)))
    .catch(err => console.error('Fetching Checkins unsuccesful.', err))

export const addCheckIn = (user, place) => dispatch => {

  console.log('BEGIN')

  const lat = place.location.lat;
  const long = place.location.lng;

  navigator.geolocation.getCurrentPosition((position) => {
    //console.log('ME', distanceCalc(fullstack.lat,fullstack.lng,position.coords.latitude , position.coords.longitude)) //0.0001226713495550171
    console.log(distanceCalc(lat, long, position.coords.latitude, position.coords.longitude))
    //if (distanceCalc(lat, long, position.coords.latitude, position.coords.longitude) > 0.0005) console.log('YOU ARE NOT HERE')
    //else {

      console.log('Congratulations, it is true that you are at ', place.name)

      const flckr = axios.get(`https://api.flickr.com/services/rest/?method=flickr.places.findByLatLon&api_key=${flickr}&lat=${lat}&lon=${long}&format=json&nojsoncallback=1`).then(res => res.data)

      const fsq = axios.post(`https://api.foursquare.com/v2/checkins/add?venueId=${place.id}&v=20170801&oauth_token=${user.token}`).then(res => res.data)

      Promise.all([flckr, fsq]).then(resArr => {
        const kingdom = resArr[0].places.place[0].woe_name
        console.log('THIS IS OUR KINGDOM ', kingdom)
        console.log('CHECKIN BUNDLE ', resArr[1])
        

        const checkInBundle = {
          user,
          place,
          kingdom
        }

        axios.put(`${serverUrl}/api/establishments`, checkInBundle)
          .then(res => res.data)
          .then(newCheckin => dispatch(createCheckin(newCheckin)))
          .catch(err => console.error(`Creating Checkin ${checkInBundle.establishment} unsuccesful.`, err))

      })
    //}
  })
}






export const editCheckin = (userId, establishmentId) => dispatch =>
  axios.put(`${serverUrl}/api/checkins?user=${userId}&establishment=${establishmentId}`)
    .then(res => res.data)
    .then(editedCheckin => dispatch(updateCheckin(editedCheckin)))
    .catch(err => console.error(`Updating Checkin ${userId} & ${establishmentId} unsuccesful.`, err))

export const removeCheckin = establishmentId => dispatch =>
  axios.delete(`${serverUrl}/api/checkins?establishment=${establishmentId}`)
    .then(() => dispatch(deleteCheckin(establishmentId)))
    .catch(err => console.error(`Deleting Checkin (id: ${establishmentId}) unsuccesful.`, err))
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
