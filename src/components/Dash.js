import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addCheckIn, queryMarkers, getUserCheckIns, setLocationThunk, verifyCheckIn } from '../store';
import ruby from '../Assets/Resources/gem.png'

export class Dash extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            queriedMarkers: [],
            userInput: '',
        }
    }

    render() {
        return (
            <div id="Dash" className={this.props.mode} onClick = {
                (e)=>{e.target.className=e.target.className==='closed'?'active':'closed'
            }}> 
                    {this.props.verifyCheckIn.status==='HACKED' && <div className='powerButton'>YOU ARE NOW WORKING IN HACKED MODE - USER MAY NOW CHECK-IN WHEREVER THEY CHOOSE</div>}
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <h2 style={{flex:3}}>{'Welcome ' + this.props.user.username + '!'}</h2>
                        <button style={{flex:1}} onClick={()=>{this.props.getUserCheckIns(this.props.user)}}><img src={require('../Assets/iconButtons/sword.png')} />SYNC MY CHECK-INS</button>
                    </div>
                    <button onClick={()=>{ let bundle = this.props.verifyCheckIn.status==='HACKED'? { id: '1000', status: 'OPEN' } : { id: '1000', status: 'HACKED' }
                            this.props.verify(bundle)}} 
                        style={{position: 'absolute', right: 0, top: '35vh', maxWidth: '24vw'}}><img src={ruby}/>TURN OFF CHECK-IN VERIFICATION</button>
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
    location: state.trackLocation,
    verifyCheckIn: state.verify
})

const mapDispatch = dispatch => ({
    queryMarkers: (userInput, users, location) => dispatch(queryMarkers(userInput, users, location)),
    getUserCheckIns: users => dispatch(getUserCheckIns(users)),
    trackLocation: () => dispatch(setLocationThunk()),
    verify: bundle => { dispatch(verifyCheckIn(bundle)) }
})

export default connect(mapProps, mapDispatch)(Dash)
