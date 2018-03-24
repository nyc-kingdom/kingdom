import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createMarker } from '../store';
import { Navigation } from './index'
import king from '../Assets/king.gif'


export class Home extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='home'>
        <br />
        <h1>Kingdom</h1>
        <br />
        <img src={king} />
        <br />
        <a href='http://localhost:8080/auth/foursquare'><h2>Play Now</h2></a>
        <Link to='/about'>
          <h2>About</h2>
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
