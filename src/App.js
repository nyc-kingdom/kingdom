import React, { Component } from 'react';
import {connect} from 'react-redux';
//import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import logo from './logo.svg';
import './App.css';
import { me } from './store';

//components
import  { Map, Dash } from './components'

class App extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

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

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(App)

App.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}