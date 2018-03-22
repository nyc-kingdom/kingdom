const axios = require('axios')
const request = require('request');
const ADD_MARKER = 'ADD_MARKER'

const FOURSQUAREID = require('../secrets').clientID
const FOURSQUARESECRET = require('../secrets').clientSecret


export const createMarker = marker => {
  return ({ type: ADD_MARKER, marker })
}


export const queryMarkers = (userInput, user) => dispatch => {
  // navigator.geolocation.getCurrentPosition(position => {

request({
  url: 'https://api.foursquare.com/v2/venues/explore',
  method: 'GET',
  qs: {
      client_id: FOURSQUAREID,
      client_secret: FOURSQUARESECRET,
      ll: '40.741895, -73.989308',
      //near: 'New York City, NY',
      query: userInput,
      sortByDistance: 1,
      oauth_token: user.token,
      v: '20170801',
      limit: 10
  }
}, (err, res, body) => {
  if (err) console.error.bind(console)
  const payLoad = JSON.parse(body)
  dispatch(createMarker(payLoad.response.groups[0].items))
})
}


export const getUserCheckIns = user => dispatch => {

  console.log('USER', user)

  request({
      url: 'https://api.foursquare.com/v2/users/self/checkins',
      method: 'GET',
      qs: {
          v: '20170801',
          oauth_token: user.token
      }
  }, (err, res, body) => {
      if (err) console.error.bind(console)
      const payLoad = JSON.parse(body)
      console.log('You visited ', payLoad)
      dispatch(createMarker(payLoad.response.checkins.items))
  })
}




const reducer = (markers=[], action) => {
  switch (action.type) {
    case ADD_MARKER:
      return action.marker
    default:
    return markers
  }
}

export default reducer
