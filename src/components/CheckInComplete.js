import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { addCheckIn } from '../store'


const Success = props => {

    if(props.verifyCheckIn.status==='FULFILLED'){
        console.log('river flowing here')
    return (
    <div id='Spotlight'>
        <h3>CONGRATULATIONS YOU SUCCESSFULLY CHECKED IN, PLEASE PICK AN ITEM</h3>
        <button className='powerButton' onClick={() => { props.addCheckIn(props.user, props.venue) }}>CONFIRM</button>
        <Link id='clean' to='/dashboard' className="escape">X</Link>
    </div>
    )
    }
else if(props.verifyCheckIn.status==='FAILURE'){
    return (
    <div id='Spotlight'>
        <h3>NICE TRY, SEEMS LIKE YOU'RE NOT NEAR THIS LOCATION</h3>
        <Link id='clean' to='/dashboard' className="escape">X</Link>
    </div>
    )
}
else return (<div id='Spotlight'></div>)
}


const mapProps = (state, ownProps) => ({ verifyCheckIn: state.verify })

const mapDispatch = (dispatch, ownProps) => ({
    addCheckIn: (user, place) => { dispatch(addCheckIn(user, place, ownProps.history)) }})

export default connect(mapProps, mapDispatch)(Success)