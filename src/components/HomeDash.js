import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { gem, bridgeShield, castle, sword } from '../Assets'
import { User, Map, Dash, Spotlight, Ticker } from './'
import { logout } from '../store';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dashMode: 'closed',
    }
    this.renderWithKingdom = this.renderWithKingdom.bind(this)
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
        <h1 id="logo" >
          Kingdom
        </h1>
        <div
          id="sword" className={this.props.trackLocation.status === 'LOCATIONFOUND' ? 'on' : 'off'} onClick={() => {
            if (this.state.dashMode === 'closed') this.setState({ dashMode: 'active' })
            else this.setState({ dashMode: 'closed' })
          }}
        >
          <img src={sword} className="blip" />
        </div>
        <Link to={`/profile/users/${this.props.user.id}`}>
          <div id="gem" className="circle">
            <img src={gem} className="blip" />
          </div>
        </Link>
        <Link to={'/leaderboard'}>
          <div id="castle" className="circle">
            <img src={castle} className="blip" />
          </div>
        </Link>
        <Link to={`/profile/kingdoms/${this.props.user.kingdomId}`}>
          <div id="shield" className="circle">
            <img src={bridgeShield} className="blip" />
          </div>
        </Link>
        <div id="logout" style={{fontFamily: 'Apple Chancery, cursive'}} onClick={this.handleClick}>
          <h2>Logout</h2>
        </div>
        <Dash mode={this.state.dashMode} />
        <Map />
        <Route path="/dashboard/selectedView/:id" component={Spotlight} />
        <Ticker />
      </div>
    )
  }

  handleClick(evt) {
    evt.preventDefault()
    const { logout, history } = this.props
    logout()
    history.push('/')
  }
}

const mapProps = ({ user, trackLocation }) => ({ user, trackLocation })

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapProps, mapDispatch)(Home)
