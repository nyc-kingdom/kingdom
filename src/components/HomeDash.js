import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import gem from '../Assets/gem.png'
import shield2 from '../Assets/shield2.png'
import castle from '../Assets/castle.png'
import { connect } from 'react-redux'
import { User, Map, Dash, Navigation, Spotlight } from './'
import { logout } from '../store';

class Home extends Component {
  constructor(props) {
    super(props)
    this.renderWithKingdom = this.renderWithKingdom.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  render(){
    return (
      <div>
        {
          !this.props.user.kingdomId
          ? <User />
          : this.renderWithKingdom()
        }
      </div>
    )
  }

  renderWithKingdom(){
    return (
      <div id='HomeDash'>
        <div id='logo'>
          <h1 style={{ fontFamily: 'Apple Chancery, cursive' , textAlign: 'center'}}>
            Kingdom
          </h1>
        </div>
        <div id='profile'>
          <br />
          <Navigation />
        </div>
        <div id='kingdoms'>
          <br />
          <img src={gem} />
        </div>
        <div id='castle'>
          <br />
          <img src={castle} />
        </div>
        <div id='shield'>
          <br />
          <Link to={`/profile/kingdoms/${this.props.user.kingdomId}`}>
            <img src={shield2} />
          </Link>
        </div>
        <div id='logout' onClick={this.handleClick}>
          <br />
        </div>
        <Dash />
        <Map />
        <Route path='/dashboard/selectedView/:id' component={Spotlight} />
      </div>
    )
  }

  handleClick(){
    const { logout, history } = this.props
    logout()
    history.push('/')
  }
}

const mapProps = state => {
  const { user } = state
  return {
    user
  }
}

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapProps, mapDispatch)(Home)
