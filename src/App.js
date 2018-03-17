import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//components
import  { Map, Dash } from './components'

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
