import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//components
import Map from './components/Map'
import Dash from './components/Dash'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id='a'>
          <Map/>
          <Dash/>
        </div>
      </div>
    );
  }
}

export default App;
