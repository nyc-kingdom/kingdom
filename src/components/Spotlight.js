import React from 'react'
import {connect} from 'react-redux'

import {addCheckIn} from '../store'

const Spotlight = props => {

    console.log('THIS IS YOUR CURRENT ', props.markers )

    const place = props.markers ? props.markers.find(eachMarker=>eachMarker.venue.id===props.match.params.id) : null

    return place ?
    <div id='Spotlight'>
    <h2>{place.venue.name + ' ' + '$'.repeat(place.venue.price.tier)}</h2>
    <button onClick={props.addCheckIn(props.user, place.venue)}>Check in here </button>
    <h3>{place.venue.stats.checkinsCount + ' people have checked in here.'}</h3>
    {place.tips && place.tips.map((eachTip,index)=>(<h4 key={index}>{eachTip.text}</h4>))}
    </div>
    :<h3>loading...</h3>
}


const mapProps = state => ({markers: state.markers, user: state.user})

const mapDispatch = dispatch => ({addCheckIn: (user, place)=>{dispatch(addCheckIn(user, place))}})

export default connect(mapProps, mapDispatch)(Spotlight)