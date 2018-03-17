import React, { Component } from 'react';
import { Link } from 'react-router-dom'

//components
import  { Map, Dash } from './'

class Home extends Component {
  render() {
    return (
      <div className='HomeDash'>
        <Link to='/yourProfile'><div id='profile'></div></Link>
        <Link to='/topKingdoms'><div id='kingdoms'></div></Link>
        <Dash/>
        <div id='a' >
          <Map/>
        </div>
      </div>
    );
  }
}

export default Home;
