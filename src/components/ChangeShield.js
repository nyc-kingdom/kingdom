import React, { Component } from 'react'
import Carousel from 'nuka-carousel'
import { arrowRight, arrowLeft, kingdomMark, bridgeShield, kingdomShields } from '../Assets'
import { connect } from 'react-redux'

const hardCoding = {
  flagBackgroundImgUrl: "https://i.pinimg.com/originals/0d/26/fd/0d26fd531a191bdf6659fd0b9ef4c73c.png"
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
    const shields = Object.keys(kingdomShields)
    return (
      <div className='fit'>
        <div id='change-shield'>
          <div>
            <img
                src={!kingdomMark[ownKingdom.name] ? kingdomMark.undefinedKingdom[2] : kingdomMark[ownKingdom.name]}
                className='header-img-shield'
            />
            <img
                src={hardCoding.flagBackgroundImgUrl}
                className='header-img-flag'
            />
          </div>
          <div className='flex-one'>
            <h2>King of {ownKingdom.name}</h2>
            <span>As a King, you have a power to change a Shield</span>
          </div>
        </div>
        <div>
          <Carousel
            renderCenterLeftControls={({ previousSlide }) =>
              <img src={arrowLeft} onClick={previousSlide} />
            }
            renderCenterRightControls={({ nextSlide }) =>
              <img src={arrowRight} onClick={nextSlide} />
            }
          >
            {
              shields.map(shield => (
                <div>
                  <img src={kingdomShields[shield]} className='change-shield-img'/>
                </div>
              ))
            }
          </Carousel>
        </div>
        <div>
          <span>this is for test, nothing will change any for now.</span>
          <form onSubmit={this.handleSubmitForm}>
            <button className='simpleButton space'>
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
