const ADD_MARKER = 'ADD_MARKER'

export const createMarker = marker => ({ type: ADD_MARKER, marker })


const initialState = {
  markers: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MARKER:
      return Object.assign({}, state, { markers: [...state.markers, action.marker] })
    default:
    return state
  }
}

export default reducer
