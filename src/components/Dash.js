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
        return (
            <div id="Dash" className={this.props.mode} onClick = {
                (e)=>{e.target.className=e.target.className==='closed'?'active':'closed'
            }}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <h2 style={{flex:3}}>{'Welcome ' + this.props.user.username + '!'}</h2>
                        <button style={{flex:1}} onClick={()=>{this.props.getUserCheckIns(this.props.user)}}><img src={require('../Assets/iconButtons/sword.png')} />SYNC MY CHECK-INS</button>
                    </div>
                    {this.props.location.status==='FINDINGLOCATION' && <img style={{display:'block', padding: '5vh'}} src={require('../Assets/characters/knightsword.gif')}/>}
                    <input
                        id='userInput'
                        value={this.state.userInput}
                        onChange={evt => {this.setState({userInput: evt.target.value})}}
                    />
                    <button onClick={() => {

                        if(Date.now() - 180000 < this.props.location.timeStamp){
                            this.props.queryMarkers(this.state.userInput, this.props.user, this.props.location.coords) 
                        }
                        else if(Date.now() - 180000 > this.props.location.timeStamp && this.props.location.status==='LOCATIONFOUND'){
                            this.props.trackLocation()
                        }
                        else console.log('You gotta wait for the navigator to be ready')

                    }}>{this.props.location.status==='FINDINGLOCATION'? 'LOADING': 'Let\'s Search!' }</button>
                    {this.props.markers.length>0 && this.props.markers.map(eachMarker => (
                        <div className = 'listicle'>
                            <Link key={eachMarker.venue.id} to={`/dashboard/selectedView/${eachMarker.venue.id}`}><div className='queryRec'>{eachMarker.venue.name} {eachMarker.venue.rating}</div></Link>
                            <div className='subHeader'>{eachMarker.venue.categories[0].name}</div>
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
