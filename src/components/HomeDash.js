import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import logo from '../Assets/kingdom.png'
import gem from '../Assets/gem.png'
import shield2 from '../Assets/shield2.png'
import castle from '../Assets/castle.png'
import { connect } from 'react-redux'


//components
import { Map, Dash } from './'
import { Navigation, BottomNav } from './index';
import Spotlight from './Spotlight'

class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div id='HomeDash'>
        <div id='logo'>
          <h1 style={{ fontFamily: 'Apple Chancery, cursive' , textAlign: 'center'}}>Kingdom</h1>
        </div>
        <div id='profile'>
          <br />
          <Navigation />
        </div>
        <div id='kingdoms'>
          <br />
          <img src={gem} />
        </div>
        <div id='castle'>
          <br />
          <img src={castle} />
        </div>
        <div id='shield'>
          <br />
          <Link to={`/profile/kingdoms/${this.props.user.kingdomId}`}>
            <img src={shield2} />
          </Link>
        </div>
        <Dash />
        <Map />
        <Route path='/dashboard/selectedView/:id' component={Spotlight} />
      </div>
    );
  }
}


const mapProps = state => {
  console.log(state)
  return {
    user: state.user
  }
}

export default connect(mapProps)(Home)
