import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createMarker } from '../store';

import locationQuery, { checkIn, getUserCheckIns } from '../functions/locationQuery'

export class About extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Kingdom</h1>
        <img src='https://kottke.org/plus/misc/images/8-bit-nyc.jpg' />
        <h2>Kingdom is an awesome game you need in your life!</h2>
        <Link to='/'>
          Explore Now!
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

export default connect(mapProps, mapDispatch)(About)
