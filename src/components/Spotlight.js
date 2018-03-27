import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { addCheckIn } from '../store'
import { setLocation } from '../store/trackLocation'
import { verifyCheckIn } from '../store/gameplay'
import distanceCalc from '../functions/distanceCalc'

import SuccessMenu from './CheckInComplete'

const Spotlight = props => {

    if (props.markers.length === 0) { props.redirect.push('/dashboard'); return null }
    else {

        const place = props.markers.find(eachMarker => eachMarker.venue.id === props.match.params.id)

        if (place) {

            return (props.verifyCheckIn.id === place.venue.id ?

                <SuccessMenu user={props.user} venue={place.venue} />

                :

                <div id='Spotlight'>
                    <div className='spot'><h2 >{place.venue.name}</h2> {place.venue.price && <h2>{' ' + '$'.repeat(place.venue.price.tier)}</h2>}</div>

                    {props.location.status === 'LOCATIONFOUND' ?

                        <button className='powerButton' onClick={() => {
                            if (Date.now() - 180000 > props.location.timeStamp) {
                                navigator.geolocation.getCurrentPosition((position) => {
                                    const distance = distanceCalc(props.location.coords[0], props.location.coords[1], place.venue.location.lat, place.venue.location.lng)
                                    if (distance < 0.0005) props.addCheckIn(props.user, place.venue)
                                })
                            }
                            else {
                                const distance = distanceCalc(props.location.coords[0], props.location.coords[1], place.venue.location.lat, place.venue.location.lng)
                                console.log('WE ARE THIS FAR APART ', distance)
                                if (distance < 0.0005) {
                                    props.addCheckIn(props.user, place.venue)
                                    const bundle = { id: place.venue.id, status: 'FULFILLED' }
                                    props.verify(bundle)
                                }
                                else {
                                    const bundle = { id: place.venue.id, status: 'FAILURE' }
                                    props.verify(bundle)
                                }

                            }
                        }}>Check in here </button>
                        :
                        <button>SWORD IN THE STONE</button>

                    }

                    <h3 className='spot'>{place.venue.stats.checkinsCount + ' people have checked in here.'}</h3>
                    {place.tips && place.tips.map((eachTip, index) => (<h4 key={index}>{eachTip.text}</h4>))}
                    <Link id='clean' to='/dashboard' className="escape">X</Link>
                </div>
            )
        } else { props.redirect.push('/dashboard'); return null } //EDGE CASE
    }
}

const mapProps = (state, ownProps) => ({ markers: state.markers, user: state.user, location: state.trackLocation, verifyCheckIn: state.verify, redirect: ownProps.history })

const mapDispatch = (dispatch, ownProps) => ({
    addCheckIn: (user, place) => { dispatch(addCheckIn(user, place, ownProps.history)) },
    setLocation: location => { dispatch(setLocation(location)) },
    verify: bundle => { dispatch(verifyCheckIn(bundle)) }
})

export default connect(mapProps, mapDispatch)(Spotlight)
