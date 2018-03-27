const SET_MAP = 'SET_MAP'

export const setMapStatus = style => ({type: SET_MAP, style})

export default function reducer(mapStatus = 'greenTheme', action){
    switch(action.type){
        case SET_MAP:
            return action.style
        default: 
            return mapStatus
    }
}
