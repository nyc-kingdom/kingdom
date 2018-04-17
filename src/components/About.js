import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createMarker } from '../store';


export class About extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={{ fontFamily: 'Apple Chancery, cursive', margin: '20px', fontWeight: 'bold'}}>
        <h1>Welcome to Kingdom: <br />a game of neighborhood pride</h1>
        <p>
        Pledge your Allegiance:
        Sign up with your Foursquare account.
        Your neighborhood is your kingdom.
        <br />
        Gain Experience:
        Begin checking in at local establishments to boost your personal experience,
        and the strength of you kingdom.
        <br />
        Conquer an Establishment:
        Each time you checkin to an establishment for the first time, a
        new castle is forged. The Kingdom with the greatest number of
        checkins, declares that establishment as part of their kingdom.
        <br />
        Become the Keeper:
        Checkin to an establishment more than anyone else and you become the keeper.
        The keeper gains 1 experience point each time another player checks into
        their establishment.
        <br />
        Become the King:
        Own the most establishments within your kingdom, and become the king of your
        realm.</p>
        <Link to={!this.props.user.id ? '/' : '/dashboard'} >
          <h3>Explore Now!</h3>
        </Link>
      </div>
    )
  }
}

const mapProps = ({ markers, user }) => ({ markers, user })

const mapDispatch = dispatch => ({
  createMarker: marker => dispatch(createMarker(marker))
})

export default connect(mapProps, mapDispatch)(About)
