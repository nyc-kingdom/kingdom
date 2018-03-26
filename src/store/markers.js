const axios = require('axios')
const request = require('request');
const ADD_MARKER = 'ADD_MARKER'

const post = 8080
const serverUrl = `http://localhost:${post}`


export const createMarker = marker => {
  return ({ type: ADD_MARKER, marker })
}


export const queryMarkers = (userInput, user, location) => async(dispatch) => {
  console.log('Breakpoint ', location)
  const payLoad = await axios.get(`${serverUrl}/api/markers?userInput=${userInput}&token=${user.token}&ll=${location[0]}, ${location[1]}`)
  dispatch(createMarker(payLoad.data.response.groups[0].items))
}


export const getUserCheckIns = user => async (dispatch) => {
  const payLoad = await axios.put(`${serverUrl}/api/establishments/foursquare`, {user})
  //dispatch(createMarker(payLoad.data))
}


const reducer = (markers = [], action) => {
  switch (action.type) {
    case ADD_MARKER:
      return action.marker
    default:
      return markers
  }
}

export default reducer
