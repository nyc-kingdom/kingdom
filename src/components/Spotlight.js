import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { addCheckIn } from '../store'
import { setLocationThunk } from '../store/trackLocation'
import { verifyCheckIn } from '../store/gameplay'
import distanceCalc from '../functions/distanceCalc'

import SuccessMenu from './CheckInComplete'

const Spotlight = props => {
    console.log(props, 'props within spotlight')

    if (props.markers.length === 0) { props.redirect.push('/dashboard'); return null }
    else {

        const place = props.markers.find(eachMarker => eachMarker.venue.id === props.match.params.id)

        if (place) {

            return (props.verifyCheckIn.id === place.venue.id ?

                <SuccessMenu user={props.user} venue={place.venue} />

        :
        <div id='Spotlight'>

                <div style={{padding: '20px'}}><h2 style={{display: 'inline', margin: '5px'}}>{place.venue.name}</h2> {place.venue.price && <h2 style={{display: 'inline'}}>{'      ' + '$'.repeat(place.venue.price.tier)}</h2>}</div>

                     {props.location.status === 'LOCATIONFOUND' ?
                <button className='powerButton' onClick={() => {
                    if (Date.now() - 180000 > props.location.timeStamp) {
                        props.setLocation()
                    }
                    else {
                        const distance = distanceCalc(props.location.coords[0], props.location.coords[1], place.venue.location.lat, place.venue.location.lng)
                        console.log('WE ARE THIS FAR APART ', distance)
                        props.addCheckIn(props.user, place.venue)
                        //uncomment this line to be able to check-in without verification
                        if(distance < 0.0005)
                        {
                            const bundle = { id: place.venue.id, status: 'FULFILLED' }
                            props.verify(bundle)
                        }
                        else{
                            const bundle = {id: place.venue.id, status: 'FAILURE'}
                            props.verify(bundle)
                        }

                    }
                }}>Check in here </button>
                :
                        <button>SWORD IN THE STONE</button>
        }

        <h4 className='spot'>{place.venue.stats.checkinsCount + ' people have checked in here.'}</h4>
        {place.tips && place.tips.map((eachTip,index)=>(<div style={{paddingBottom: '20px'}} key={index}>{eachTip.text}</div>))}
        <Link id='clean' to='/dashboard' className="escape">X</Link>
    </div>
    )
} else {props.redirect.push('/dashboard') ; return null } //EDGE CASE
}
}

const mapProps = (state, ownProps) => ({ markers: state.markers, user: state.user, location: state.trackLocation, verifyCheckIn: state.verify, redirect: ownProps.history })

const mapDispatch = (dispatch, ownProps) => ({
    addCheckIn: (user, place) => {
        console.log(user, place, 'info from a checkin')
        dispatch(addCheckIn(user, place, ownProps.history)) },
    setLocation: location => { dispatch(setLocationThunk()) },
    verify: bundle => { dispatch(verifyCheckIn(bundle)) }
})

export default connect(mapProps, mapDispatch)(Spotlight)
