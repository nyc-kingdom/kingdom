const axios = require('axios')
const request = require('request');
const ADD_MARKER = 'ADD_MARKER'

export const createMarker = marker => {
  return ({ type: ADD_MARKER, marker })
}

const reducer = (markers=[], action) => {
  switch (action.type) {
    case ADD_MARKER:
      console.log(action.marker)
      return action.marker
    default:
    return markers
  }
}

export default reducer
