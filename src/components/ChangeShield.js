import React, { Component } from 'react'
import Carousel from 'nuka-carousel'
import { kingdomMark, bridgeShield } from '../Assets'
import { connect } from 'react-redux'

const style = {
  width: '100vw',
  height: '45vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'center',
}

class ChangeShield extends Component {
  constructor(props) {
    super(props);
    this.state = {
        shield: !props.ownKingdom ? '' : props.ownKingdom.name
    }
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleShieldSelector = this.handleShieldSelector.bind(this);
  }

  render() {
    const { ownKingdom } = this.props
    if(!ownKingdom) return null
    return (
      <div id="newUser">
        <h1>King of {ownKingdom.name}</h1>
        <span>As a King, you have a power to change a Shield</span>
        <div style={style}>
          <img
            src={!kingdomMark[ownKingdom.name] ? kingdomMark.undefinedKingdom[2] : kingdomMark[ownKingdom.name]}
            name={ownKingdom.name}
          />
        </div>
        <div>
          <span>this is for test, nothing will change any for now.</span>
          <form style={{ textAlign: 'center' }} onSubmit={this.handleSubmitForm}>
            
            <div style={{height: '2vh'}} />
              <button>
                <img src={bridgeShield}/>
              </button>
          </form>
        </div>
      </div>
    );
  }

  handleSubmitForm(evt) {
    evt.preventDefault()
    const { history, ownKingdom } = this.props
    history.push(`/profile/kingdoms/${ownKingdom.id}`)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleShieldSelector(evt) {
    evt.preventDefault()
    this.setState({ shield: evt.target.name })
  }
}

const mapProps = ({ user, kingdoms }) => {
  const ownKingdom = kingdoms.find(kingdom => kingdom.id === user.kingdomId)
  return { user, ownKingdom }
}

export default connect(mapProps)(ChangeShield)
