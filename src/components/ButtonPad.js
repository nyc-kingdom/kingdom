import React from 'react'
import { gem, bridgeShield, castle, sword } from '../Assets'
import { Link } from 'react-router-dom'


const GamePad = props => (
  <div id='gamePad'>
    <div
        id="sword"
        className={props.trackLocation.status === 'LOCATIONFOUND' ? 'on circle' : 'off circle'}
        onClick={props.toggleDash}
    >
        <img src={sword} className="blip" />
    </div>
    <Link to={`/profile/users/${props.user.id}`}>
        <div id="gem" className="circle">
        <img src={gem} className="blip" />
        </div>
    </Link>
    <Link to={'/leaderboard'}>
        <div id="castle" className="circle">
        <img src={castle} className="blip" />
        </div>
    </Link>
    <Link to={`/profile/kingdoms/${props.user.kingdomId}`}>
        <div id="shield" className="circle">
        <img src={bridgeShield} className="blip" />
        </div>
    </Link>
  </div>
)

export default GamePad