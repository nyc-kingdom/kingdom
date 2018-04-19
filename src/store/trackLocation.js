const SET_LOCATION = 'SET_LOCATION';
const SET_LOADING = 'SET_LOADING';

export const setLocation = location => ({type: SET_LOCATION, location})
export const setLoading = status => ({type: SET_LOADING, status})

export const setLocationThunk = () => dispatch => {
    dispatch(setLoading('FINDINGLOCATION'))
    navigator.geolocation.getCurrentPosition((position) => {
        dispatch(setLocation({coords: [position.coords.latitude, position.coords.longitude], timeStamp: Date.now()}))
        dispatch(setLoading("LOCATIONFOUND"))
    })
}

export default (trackLocation = {coords:[], timeStamp: 0, status: ''}, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return Object.assign({}, trackLocation, action.location)
    case SET_LOADING:
      return Object.assign({}, trackLocation, {status: action.status})
    default:
      return trackLocation;
  }
}
