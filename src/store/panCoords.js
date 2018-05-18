const SET_PAN_COORDS = 'SET_PAN_COORDS'

export const setPanning = arrayOfTwoCoords => ({type: SET_PAN_COORDS, coords: arrayOfTwoCoords})

export default function (coords = [40.7050758,-74.00916039999998], action){

    switch(action.type){
        case SET_PAN_COORDS: return action.coords
        default: return coords
    }
}