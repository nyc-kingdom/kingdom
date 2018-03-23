import axios from 'axios';

const SET_LOCATION = 'SET_LOCATION';

export const setLocation = location => {
  const action = {type: SET_LOCATION, location};
  return action;
}

export const setLocationThunk = () => dispatch => {
    console.log('WE ARE TRACKING YOU')
    navigator.geolocation.getCurrentPosition((position) => {
        dispatch(setLocation({coords: [position.coords.latitude, position.coords.longitude], timeStamp: Date.now()}))
    })
}

export default (location = {coords:[], timeStamp: undefined}, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return action.location;
    default:
      return location;
  }
}