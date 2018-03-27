import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createMarker, addCheckIn, queryMarkers, getUserCheckIns, setLocationThunk, setLocation } from '../store';


export class Dash extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            queriedMarkers: [],
            userInput: ''
        }
    }

    render() {

        const user = this.props.user
        const userInput = this.state.userInput
        return (
            <div id="Dash" className={this.props.mode} onClick={
                (e) => {
                    e.target.className = e.target.className === 'closed' ? 'active' : 'closed'
                }}>


                <button onClick={() => { this.props.getUserCheckIns(this.props.user) }}>FETCH MY CHECK-INS</button>
                <div>{'Hello ' + JSON.stringify(this.props.user)}</div>
                <input
                    id='userInput'
                    value={this.state.userInput}
                    onChange={evt => { this.setState({ userInput: evt.target.value }) }}
                />
                <button onClick={() => {

                    if (Date.now() - 180000 < this.props.location.timeStamp) {
                        console.log('You logged your location recently enough to check-in, ', this.props.location)
                        this.props.queryMarkers(this.state.userInput, this.props.user, this.props.location.coords)
                    }
                    else if (Date.now() - 180000 > this.props.location.timeStamp && this.props.location.status === 'LOCATIONFOUND') {
                        this.props.trackLocation()
                    }
                    else console.log('You gotta wait for the navigator to be ready')

                }}>{this.props.location.status === 'FINDINGLOCATION' ? 'LOADING' : 'Let\'s Search!'}</button>
                {this.props.markers.length > 0 && this.props.markers.map(eachMarker => (
                    <div key={eachMarker.venue.id}>
                        <Link to={`/dashboard/selectedView/${eachMarker.venue.id}`}>{eachMarker.venue.name}</Link>
                    </div>
                ))}
            </div>

        )
    }
}

const mapProps = state => ({
    markers: state.markers,
    user: state.user,
    location: state.trackLocation
})

const mapDispatch = dispatch => ({
    createMarker: marker => dispatch(createMarker(marker)),
    checkIn: (user, place) => dispatch(addCheckIn(user, place)),
    queryMarkers: (userInput, users, location) => dispatch(queryMarkers(userInput, users, location)),
    getUserCheckIns: users => dispatch(getUserCheckIns(users)),
    trackLocation: () => dispatch(setLocationThunk()),
    setLocation: (location) => dispatch(setLocation(location))

})

export default connect(mapProps, mapDispatch)(Dash)
