import React from 'react'
import {connect} from 'react-redux'

import {addCheckIn} from '../store'
import { setLocation } from '../store/trackLocation'
import { verifyCheckIn } from '../store/gameplay'
import distanceCalc from '../functions/distanceCalc'

const Spotlight = props => {

    const place = props.markers ? props.markers.find(eachMarker=>eachMarker.venue.id===props.match.params.id) : null
    console.log('!!!', props.verify)
    return place ? ( props.verifyCheckIn.status === 'FULFILLED' ? <div id='Spotlight'>
        <h3>CONGRATULATIONS YOU SUCCESSFULLY CHECKED IN, PLEASE PICK AN ITEM</h3>
        <button onClick={()=>{props.addCheckIn(props.user, place.venue)}}>CHECK-IN</button>
    </div> 

          :

     <div id='Spotlight'>
        {place.venue.price && <h2>{place.venue.name + ' ' + '$'.repeat(place.venue.price.tier)}</h2>}
        
        {props.location.status==='LOCATIONFOUND' ?

        <button onClick={ () => {
            if(Date.now() - 180000 > props.location.timeStamp){
                navigator.geolocation.getCurrentPosition((position) => {
                const distance = distanceCalc(props.location.coords[0], props.location.coords[1], place.venue.location.lat, place.venue.location.lng)
                if(distance < 0.0005) props.addCheckIn(props.user, place.venue)
                })
            }
            else{
                const distance = distanceCalc(props.location.coords[0], props.location.coords[1], place.venue.location.lat, place.venue.location.lng)
                console.log('WE ARE THIS FAR APART ', distance)   
                //if(distance < 0.0005) 
                {   //props.addCheckIn(props.user, place.venue)
                    const bundle = {id: place.venue.id, status: 'FULFILLED'}
                    props.verify(bundle)
                }
                // else{
                //     const bundle = {id: place.venue.id, status: 'FAILURE'}
                //     props.verify(bundle)
                // }
                
            }
        }}>Check in here </button>
        :
        <button>SWORD IN THE STONE</button>
        
        }
        
        <h3>{place.venue.stats.checkinsCount + ' people have checked in here.'}</h3>
        {place.tips && place.tips.map((eachTip,index)=>(<h4 key={index}>{eachTip.text}</h4>))}
    </div>
    )
    : <h3>Loading...</h3>
}

const mapProps = state => ({markers: state.markers, user: state.user, location: state.trackLocation, verifyCheckIn: state.verify})

const mapDispatch = dispatch => ({
    addCheckIn: (user, place)=>{dispatch(addCheckIn(user, place))}, 
    setLocation: location => {dispatch(setLocation(location))},
    verify: bundle => {dispatch(verifyCheckIn(bundle))}
})

export default connect(mapProps, mapDispatch)(Spotlight)