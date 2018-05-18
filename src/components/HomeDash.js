import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { User, Map, Dash, Spotlight, Ticker } from './'
import { logout } from '../store';
import ButtonPad from './ButtonPad'

class HomeDash extends Component {
  constructor(props) {
    super(props)
    this.state = { dashMode: 'closed' }
    this.handleLogout = this.handleLogout.bind(this)
    this.toggleDash = this.toggleDash.bind(this)  
  }

  toggleDash(){
    if(this.state.dashMode==='closed') this.setState({dashMode:'active'})
    else this.setState({dashMode:'closed'})
  }

  render() {
    return !this.props.user.kingdomId ? <User/> : 

      <div id="HomeDash">
        <h1 id="logo" >Kingdom</h1>
        
        <ButtonPad toggleDash={this.toggleDash} user={this.props.user} trackLocation={this.props.trackLocation}/>
        
        <div
          id="logout"
          style={{fontFamily: 'Apple Chancery, cursive'}}
          onClick={this.handleLogout}
        >
          <h2>Logout</h2>
        </div>
        
        <Dash mode={this.state.dashMode} />
        <Map />
        <Route path="/dashboard/selectedView/:id" component={Spotlight} />
        <Ticker />
      </div>
  }

  handleLogout(evt) {
    evt.preventDefault()
    this.props.logout()
  }
}

const mapProps = ({ user, trackLocation }) => ({ user, trackLocation })

const mapDispatch = dispatch => ({ logout: () => dispatch(logout()) })

export default connect(mapProps, mapDispatch)(HomeDash)
