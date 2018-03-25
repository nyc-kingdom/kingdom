import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import logo from '../Assets/kingdom.png'
import gem from '../Assets/gem.png'
import shield2 from '../Assets/shield2.png'
import castle from '../Assets/castle.png'
import sword from '../Assets/sword.png'
import { connect } from 'react-redux'
import { User, Map, Dash, Navigation, BottomNav, Spotlight } from './'

class Home extends Component {
  constructor(props) {
    super(props)
    this.renderWithKingdom = this.renderWithKingdom.bind(this)
    this.state = {
      dashMode: 'closed'
    }

  }

  render(){
    return (
      <div>
        {
          !this.props.user.kingdomId
          ? <User/>
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
        <div id='sword' className={this.props.trackLocation.status === 'LOCATIONFOUND' ? 'on' : 'off'} onClick={()=>{
          if(this.state.dashMode==='closed') this.setState({dashMode: 'active'})
          else this.setState({dashMode: 'closed'})
          }}>
          <br />
          <img src={sword} />
        </div>
        <div id='gem' className='circle'>
          <br />
          <img src={gem} />
        </div>
        <div id='castle' className='circle'>
          <br />
          <img src={castle} />
        </div>
        <div id='shield' className='circle'>
          <br />
          <Link to={`/profile/kingdoms/${this.props.user.kingdomId}`}>
            <img src={shield2} />
          </Link>
        </div>
        <Dash mode={this.state.dashMode} />
        <Map />
        <Route path='/dashboard/selectedView/:id' component={Spotlight} />
      </div>
    )
  }
}

const mapProps = state => {
  
  return {
    user: state.user,
    trackLocation: state.trackLocation

  }
}

export default connect(mapProps)(Home)
