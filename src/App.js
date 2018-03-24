import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import logo from './logo.svg';
import './App.css';
import { me, fetchEstablishments, fetchCheckins, fetchKingdoms, createCheckin } from './store';
import { setLocationThunk } from './store/trackLocation'
import axios from 'axios';
import socket from './sockets'


//components
import  { Routes } from './components'

class App extends Component {
  componentDidMount() {
    this.props.setLocation()
    this.props.loadInitialData();
    socket.on('new-checkIn', checkIn=> {
      console.log('Somebody checked-in!')
      //this.props.createCheckin(checkIn)
    })
    

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
    isLoggedIn: !!state.user.id,
    location: state.trackLocation
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData () {
      dispatch(me())
      dispatch(fetchEstablishments())
      dispatch(fetchCheckins())
      dispatch(fetchKingdoms())
    },
    setLocation(){
      dispatch(setLocationThunk())
    },
    createCheckin(checkIn){
      dispatch(createCheckin(checkIn))
    }
  }
}

export default connect(mapState, mapDispatch)(App)

App.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
