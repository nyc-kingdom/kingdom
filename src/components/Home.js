import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createMarker } from '../store';
import { Navigation } from './index'

import locationQuery, { checkIn, getUserCheckIns } from '../functions/locationQuery'

export class Home extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='home'>
      <Navigation />
        <h1>Kingdom</h1>
        <br />
        <a href='http://localhost:8080/auth/foursquare'><button>Login</button></a>
        <br />
        <a href='http://localhost:8080/auth/foursquare'><button>Signup</button></a>
        <br />
        <Link to='/about'>
          About
        </Link>
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

export default connect(mapProps, mapDispatch)(Home)
