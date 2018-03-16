const axios = require('axios')
const request = require('request');
const ADD_MARKER = 'ADD_MARKER'

export const createMarker = marker => {
  console.log('Lets go!')
  
  axios.get('http://172.16.22.215:8080/api/users').then(res=>res.data).then(res=>console.log('HERE IS A RES ',res))
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
