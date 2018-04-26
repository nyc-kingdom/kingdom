const SET_PAN = 'SET_PAN'

export const setPan = func => ({type: SET_PAN, func})

const reducer = (state=null, action) => {
    switch(action.type){
        case SET_PAN: {
            return action.func
        }
        default: return null
    }
}

export default reducer