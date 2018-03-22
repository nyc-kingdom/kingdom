import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navigation, BottomNav, IconMenu } from './index';
import logo from '../Assets/kingdom.png'

//components
import { Map, Dash } from './'

class Home extends Component {
  render() {
    return (
      <div className='HomeDash'>
        <div id='logo'>
          <img src={logo} style={{ width: '150%', height: '150%' }} />
        </div>
        <div id='nav'>
          <Navigation />
        </div>
        <div id='a' >
          <Dash />
          <Map />
        </div>
        <BottomNav />
      </div>
    );
  }
}

export default Home;

// <Link to='/topKingdoms'><div id='kingdoms'></div></Link>
