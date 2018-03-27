import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { gem, bridgeShield, castle, sword } from '../Assets'

import { User, Map, Dash, Spotlight, Ticker } from './'

import { logout } from '../store';

class Home extends Component {
  constructor(props) {
    super(props)
    this.renderWithKingdom = this.renderWithKingdom.bind(this)
    this.state = {
      dashMode: 'closed',
    }
    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    return (
      <div>
        {
          !this.props.user.kingdomId
            ? <User history={this.props.history} />
            : this.renderWithKingdom()
        }
      </div>
    )
  }

  renderWithKingdom() {
    return (
      <div id="HomeDash">

        <div id="logo">
          <h1 style={{ fontFamily: 'Apple Chancery, cursive', textAlign: 'center' }}>
            Kingdom
          </h1>
        </div>

        <div
          id="sword" className={this.props.trackLocation.status === 'LOCATIONFOUND' ? 'on' : 'off'} onClick={() => {
            if (this.state.dashMode === 'closed') this.setState({ dashMode: 'active' })
            else this.setState({ dashMode: 'closed' })
          }}>
          <br />
          <img src={sword} className="blip" />
        </div>

        <Link to={`/profile/users/${this.props.user.id}`}>
          <div id="gem" className="circle">
            <br />
            <img src={gem} className="blip" />
          </div>
        </Link>

        <Link to={'/leaderboard'}>
          <div id="castle" className="circle">
            <br />
            <img src={castle} className="blip" />
          </div>
        </Link>


        <Link to={`/profile/kingdoms/${this.props.user.kingdomId}`}>
          <div id="shield" className="circle">
            <br />
            <img src={bridgeShield} className="blip" />
          </div>
        </Link>

        <div id="logout" className="circle" onClick={this.handleClick}>
          <p>Logout</p>
        </div>
        <Dash mode={this.state.dashMode} />
        <Map />
        <Route path='/dashboard/selectedView/:id' component={Spotlight} />
        <Ticker />
      </div>
    )
  }

  handleClick() {
    const { logout, history } = this.props
    logout()
    history.push('/')
  }
}

const mapProps = state => {
  return {
    user: state.user,
    trackLocation: state.trackLocation,
    checkIns: state.checkins
  }
}

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapProps, mapDispatch)(Home)
