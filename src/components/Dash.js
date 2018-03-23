import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createMarker, addCheckIn, queryMarkers, getUserCheckIns } from '../store';
import trackLocation from '../store/trackLocation'


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
            <div id="Dash" className="closed" onClick = {(e)=>{e.target.className=e.target.className==='closed'?'active':'closed'}}>
                
                
                    <button onClick={()=>{this.props.getUserCheckIns(this.props.user)}}>FETCH MY CHECK-INS</button>
                    <div>{'Hello ' + JSON.stringify(this.props.user)}</div>
                    <input
                        id='userInput'
                        value={this.state.userInput}
                        onChange={evt => {this.setState({userInput: evt.target.value})}}
                    />
                    <button onClick={() => { 
                        if(this.props.location.timeStamp < Date.now()+180000) this.props.queryMarkers(this.state.userInput, this.props.user, this.props.location.coords) 
                        else console.log('You better refresh your location!')
                    }}>Hello</button>
                    {this.props.markers.length>0 && this.props.markers.map(eachMarker => (
                        <div>
                            <Link to={`/dashboard/selectedView/${eachMarker.venue.id}`}>{eachMarker.venue.name}</Link>
                            {/* <button onClick={()=>{
                                this.props.checkIn(this.props.user, eachMarker.venue)}
                            }>Check In!</button>  */}
                        </div>
                    ))}
                    <a href='http://localhost:8080/auth/foursquare'><button>Login</button></a>
                    <a href='http://localhost:8080/auth/foursquare'><button>Signup</button></a>
                </div>
            
        )
    }
}

const mapProps = state => ({
    markers: state.markers,
    user: state.user,
    location: state.location
})

const mapDispatch = dispatch => ({
    createMarker: marker => dispatch(createMarker(marker)),
    checkIn: (user, place) => dispatch(addCheckIn(user,place)),
    queryMarkers: (userInput, users) => dispatch(queryMarkers(userInput, users)),
    getUserCheckIns: users => dispatch(getUserCheckIns(users)),
    trackLocation: () => dispatch(trackLocation())

})

export default connect(mapProps, mapDispatch)(Dash)
