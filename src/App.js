import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import './App.css';
import { me, fetchEstablishments, fetchCheckins, fetchKingdoms, createCheckin, paintEstablishment } from './store';
import { setLocationThunk } from './store/trackLocation'
import socket from './sockets'
import openSocket from 'socket.io-client'
import {serverUrl} from './'

//components
import  { Routes } from './components'

//export const socket = openSocket(serverUrl, {transports: ['websocket']} )

class App extends Component {
  componentDidMount() {
    
    socket.on('connect', ()=>{
      console.log('I CONNECTED TO SERVER')
    })
    socket.on('new-checkIn', checkIn=> {
      console.log('Somebody checked-in!')
      this.props.createCheckin(checkIn)
      this.props.paintEstablishment(checkIn.establishment)
    })
    this.props.setLocation()
    this.props.loadInitialData()
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
    location: state.trackLocation,
    user: state.user
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
    },
    paintEstablishment(establishment){
      dispatch(paintEstablishment(establishment))
    }
  }
}

export default connect(mapState, mapDispatch)(App)

App.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
