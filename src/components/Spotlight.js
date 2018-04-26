import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import history from '../history'
import { addCheckIn, verifyCheckIn, setLocationThunk } from '../store'
import distanceCalc from '../functions/distanceCalc'
import { SuccessMenu } from './'

class Spotlight extends React.Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    render(){
        const { markers, match, verify, user } = this.props
        if (markers.length === 0) {
            history.push('/dashboard')
            return null
        }
        const place = markers.find(eachMarker => eachMarker.venue.id === match.params.id)
        if (!place) {
            history.push('/dashboard')
            return null
        }


        return (
            verify.id === place.venue.id
                ? <SuccessMenu user={user} venue={place.venue} />
                : 
                <div id='Spotlight'>
                    <div style={{padding: '20px'}}>
                        <h2 style={{display: 'inline', margin: '5px'}}>
                            {place.venue.name}
                        </h2>
                        {
                            place.venue.price &&
                            <h2 style={{display: 'inline'}}>
                                {'      ' + '$'.repeat(place.venue.price.tier)}
                            </h2>
                        }
                    </div>
                    {
                        this.props.location.status === 'LOCATIONFOUND'
                        ?
                            <button className='powerButton' onClick={this.handleClick}>
                                Check in here
                            </button>
                        : <button>SWORD IN THE STONE</button>
                    }
                    
                    <h4 className='spot'>
                        {place.venue.stats.checkinsCount + ' people have checked in here.'}
                    </h4>
                    {
                        place.tips &&
                        place.tips.map((eachTip,index) => (
                            <div style={{paddingBottom: '20px'}} key={index}>
                                {eachTip.text}
                            </div>
                        ))
                    }
                    <Link id='clean' to='/dashboard' className="escape">
                        X
                    </Link>
                </div>
        )
        
    }

    handleClick(evt){
        evt.preventDefault()
        const { markers, match, user, verify, location } = this.props
        const place = markers.find(eachMarker => eachMarker.venue.id === match.params.id)

        if(verify.status==='HACKED') this.props.addCheckIn(user, place.venue)
            //uncomment this line to be able to check-in without verification
        if (Date.now() - 180000 > location.timeStamp) this.props.setLocationThunk()
        else {
            const distance = distanceCalc(
                location.coords[0],
                location.coords[1],
                place.venue.location.lat,
                place.venue.location.lng
            )
            console.log('WE ARE THIS FAR APART ', distance)
            let bundle
            bundle = distance < 0.0005
                ? { id: place.venue.id, status: 'FULFILLED' }
                : {id: place.venue.id, status: 'FAILURE'}
            this.props.verifyCheckIn(bundle)
        }
    }
}

const mapProps = state => ({
    markers: state.markers,
    user: state.user,
    location: state.trackLocation,
    verify: state.verify,
})

const mapDispatch = dispatch => ({
    addCheckIn: (user, place) => dispatch(addCheckIn(user, place)),
    setLocationThunk: location => dispatch(setLocationThunk()),
    verifyCheckIn: bundle => dispatch(verifyCheckIn(bundle))
})

export default connect(mapProps, mapDispatch)(Spotlight)
