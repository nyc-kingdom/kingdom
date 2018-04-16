import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import './App.css';
import { me, fetchEstablishments, fetchCheckins, fetchKingdoms, createCheckin, paintEstablishment, setLocationThunk } from './store';
import socket, { serverUrl } from './sockets'

//components
import  { Routes } from './components'

class App extends Component {
  componentDidMount() {
    
    socket.on('connect', ()=>{
      console.log('I CONNECTED TO SERVER')
    })
    socket.on('new-checkIn', checkIn=> {
      console.log('Somebody checked-in!')
      this.props.createCheckin(checkIn)
    })
    socket.on('paint-new-establishment', establishment => {
      this.props.paintEstablishment(establishment)
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
    location: state.trackLocation,
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
