import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import logo from '../Assets/kingdom.png'


//components
import { Map, Dash } from './'
import { Navigation, BottomNav } from './index';
import Spotlight from './Spotlight'

class Home extends Component {
  render() {
    return (
      <div id='HomeDash'>
        <div id='logo'>
          <h1 style={{ fontFamily: 'Apple Chancery, cursive' }}>Kingdom</h1>
        </div>
        <div id='nav'>
          <Navigation />
        </div>
        <Dash />
        <Map />
        <Route path='/dashboard/selectedView/:id' component={Spotlight} />
      </div>
    );
  }
}

export default Home;

// <img src={logo} style={{ width: '150%', height: '150%' }} />
