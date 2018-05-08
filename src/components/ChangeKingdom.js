import React, { Component } from 'react'
import { bridgeShield, userClass } from '../Assets'
import { connect } from 'react-redux'
import { editUser } from '../store'

class ChangeKingdom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      city: '',
      state: '',
      zip: 0,
    }
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.userLevel = this.userLevel.bind(this)
  }

  render() {
    if(!this.props.ownKingdom) return null
    return (
      <div className='fit'>
        <h2>Hello, {!this.props.user ? null : this.props.user.username}!</h2>
        <div>
          if you change your kingdom, 
          you will lose all experience and checkins
        </div>
        <img id='change-kingdom-img' src={userClass[this.userLevel()]}/>
        <div>
          <span>Your Current Kingdom</span>
          <h2>{this.props.ownKingdom.name}</h2>
          <span>
            We don't storage your address, 
            so if you moved, but stay same neighborhood, 
            you do not need to Update your info
          </span>
          <form onSubmit={this.handleSubmitForm}>
            <input
              name="address"
              onChange={this.handleChange}
              type="text"
              required
              placeholder="Street"
            />
            <br/>
            <input
              name="city"
              onChange={this.handleChange}
              type="text"
              required
              placeholder="City"
            />
            <br/>
            <input
              name="state"
              onChange={this.handleChange}
              type="text"
              required
              placeholder="State"
            />
            <br/>
            <input
              name="zip"
              onChange={this.handleChange}
              type="text"
              required
              placeholder="Zip Code"
            />
            <br/>
            <button className='simpleButton'>
              <img src={bridgeShield}/>
            </button>
          </form>
        </div>
      </div>
    );
  }

  userLevel() {
    const { user, ownKingdom } = this.props
    if (ownKingdom.king === user.id) return "King"
    if (user.experience < 100) {
        if (ownKingdom.localDomain < 20) return "Shepard"
        return "Stone Mason"
    } else if (user.experience < 500) return "Knight"
    return "Lord"
  }

  handleSubmitForm(evt) {
    evt.preventDefault();
    const { address, city, state, zip } = this.state
    const { editUser, user } = this.props
    const addressStr = `${address},${city},${state},${zip}`
    editUser({address: addressStr, username: user.username, kingdomId: user.kingdomId}, user.id)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }
}

const mapProps = ({ user, kingdoms }) => {
    const ownKingdom = kingdoms.find(kingdom => kingdom.id === user.kingdomId)
    return { user, ownKingdom }
}

const mapDispatch = dispatch => ({
  editUser: (user, userId) => dispatch(editUser(user, userId))
})

export default connect(mapProps, mapDispatch)(ChangeKingdom)
