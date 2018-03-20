import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createMarker } from '../store';

import locationQuery, { checkIn, getUserCheckIns } from '../functions/locationQuery'

export class Dash extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            queriedMarkers: [],
            userInput: ''
        }
    }

    render() {
        return (
            <div id="Dash">
                <button onClick={()=>{getUserCheckIns(this)}}>FETCH MY CHECK-INS</button>
                <div>{'HEY BOY ' + JSON.stringify(this.props.user)}</div>
                <input id='userInput' value={this.state.userInput} onChange={evt=>{this.setState({userInput: evt.target.value})}}></input>
                <button onClick={() => { locationQuery(this) }}>Hello</button>

                {
                    this.state.queriedMarkers.length > 0 && this.state.queriedMarkers.map(eachMarker => (
                        <div key={eachMarker.venue.id} >
                            <Link to={`/singleEstablishment/${eachMarker.venue.id}`}>{eachMarker.venue.name}</Link>
                            <button onClick={()=>{checkIn(this, eachMarker)}}>Check In!</button> 
                        </div>
                    ))
                }
                <a href='http://localhost:8080/auth/foursquare'><button>Login</button></a>
             <a href='http://localhost:8080/auth/foursquare'><button>Signup</button></a>
            </div>
        )
    }
}

const mapProps = state => ({
    markers: state.markers,
    user: state.user
})

const mapDispatch = dispatch => ({
    createMarker: marker => dispatch(createMarker(marker))
})

export default connect(mapProps, mapDispatch)(Dash)
