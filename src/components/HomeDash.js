import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'


//components
import  { Map, Dash } from './'
import { Navigation, BottomNav } from './index';
import Spotlight from './Spotlight'

class Home extends Component {
  render() {
    return (
      <div>
      <Navigation />

      <div id='HomeDash'>
        <Dash/>
        <Map/>
        <Route path='/dashboard/selectedView/:id' component={Spotlight}/>
      </div>
      <BottomNav />
    </div>  
    );
  }
}

export default Home;

// <Link to='/yourProfile'><div id='profile'></div></Link>
// <Link to='/topKingdoms'><div id='kingdoms'></div></Link>
