const VERIFY_CHECKIN = 'VERIFY_CHECKIN'

export const verifyCheckIn = bundle =>({type: VERIFY_CHECKIN, bundle})

export default (verify = {id: '1000', status: 'OPEN'}, action) => {
    switch(action.type){
        case VERIFY_CHECKIN:
            return Object.assign({}, verify, action.bundle)
        default:
            return verify
    }
}