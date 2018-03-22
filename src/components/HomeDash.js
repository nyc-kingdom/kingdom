import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navigation, BottomNav } from './index';

//components
import  { Map, Dash } from './'

class Home extends Component {
  render() {
    return (
      <div className='HomeDash'>
      <Navigation />
      <div id='a' >
      <Dash/>
      <Map/>
      </div>
      <BottomNav />
      </div>
    );
  }
}

export default Home;

// <Link to='/yourProfile'><div id='profile'></div></Link>
// <Link to='/topKingdoms'><div id='kingdoms'></div></Link>
