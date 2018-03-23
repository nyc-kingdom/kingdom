const axios = require('axios')
const request = require('request');
const ADD_MARKER = 'ADD_MARKER'

const FOURSQUAREID = require('../secrets').clientID
const FOURSQUARESECRET = require('../secrets').clientSecret

const post = 8080
const serverUrl = `http://localhost:${post}`


export const createMarker = marker => {
  return ({ type: ADD_MARKER, marker })
}


export const queryMarkers = (userInput, user) => async(dispatch) => {
const payLoad = await axios.get(`${serverUrl}/api/markers?userInput=${userInput}&token=${user.token}`)
dispatch(createMarker(payLoad.data.response.groups[0].items))
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
