import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import logo from './logo.svg';
import './App.css';
import { me, fetchEstablishments, fetchCheckins, fetchKingdoms } from './store';
import axios from 'axios';


//components
import  { Routes } from './components'

class App extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      
       <Routes/>
      
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
      dispatch(fetchEstablishments())
      dispatch(fetchCheckins())
      dispatch(fetchKingdoms())
    }
  }
}

export default connect(mapState, mapDispatch)(App)

App.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
