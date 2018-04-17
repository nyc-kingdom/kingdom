import React, { Component } from 'react'
import { arrowLeft, arrowRight, shepard, bridgeShield } from '../Assets'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { editUser } from '../store'

const style = {
  width: '100vw',
  height: '30vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'center',
}

class ChangeKingdom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.user.username,
      character: 'shepard1',
      address: '',
      city: '',
      state: '',
      zip: 0,
      experience: 0,
    }
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    if(!this.props.ownKingdom) return null
    return (
      <div id="newUser">
        <h1>Hello {!this.props.user ? null : this.props.user.username}</h1>
        <span>if you change your kingdom, you will lose all experience and checkins</span>
        <div style={style}>
          <img src={shepard} name="shepard1" />
        </div>
        <div>
          <h3>Your Current Kingdom</h3>
          <h2>{this.props.ownKingdom.name}</h2>
          <span>We don't storage your address, so if you moved, but stay same neighbor, you do not need to Update your info</span>
          <form style={{ textAlign: 'center' }} onSubmit={this.handleSubmitForm}>
            <input
              name="address"
              onChange={this.handleChange}
              type="text"
              required
              placeholder="Street"
            />
            <div style={{height: '1vh'}} />
            <input
              name="city"
              onChange={this.handleChange}
              type="text"
              required
              placeholder="City"
            />
            <div style={{height: '1vh'}} />
            <input
              name="state"
              onChange={this.handleChange}
              type="text"
              required
              placeholder="State"
            />
            <div style={{height: '1vh'}} />
            <input
              name="zip"
              onChange={this.handleChange}
              type="text"
              required
              placeholder="Zip Code"
            />
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
    evt.preventDefault();
    const { address, city, state, zip, username, experience } = this.state
    const { editUser, user, history } = this.props
    const addressStr = `${address},${city},${state},${zip}`
    editUser({address: addressStr, username, experience, kingdomId: user.kingdomId}, user.id)
    history.push(`/profile/users/${user.id}`)
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
