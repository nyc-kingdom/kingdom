import React, { Component } from "react"
import { shepard, bridgeShield } from '../Assets'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { editUser } from '../store'

const style = {
  width: '100vw',
  height: '35vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'center',
}

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      character: 'shepard1',
      address: '',
      city: '',
      state: '',
      zip: 0,
    }
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCharacterSelector = this.handleCharacterSelector.bind(this)
  }

  handleSubmitForm(evt) {
    evt.preventDefault()
    const { address, city, state, zip, username } = this.state
    const { editUser, user } = this.props
    const addressStr = `${address},${city},${state},${zip}`
    editUser({address: addressStr, username: username}, user.id)
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleCharacterSelector(evt) {
    evt.preventDefault();
    this.setState({ character: evt.target.name })
  }

  render() {
    return (
      <div id="newUser">
        <h1>
          Welcome {!this.props.user ? null : this.props.user.email}
        </h1>
        <div style={style}>
          <img
            src={shepard}
            name="shepard1"
          />
        </div>
        <div>
          <h2>Enter your info to generate your profile</h2>
          <form style={{ textAlign: 'center' }} onSubmit={this.handleSubmitForm}>
            <input
              name="username"
              onChange={this.handleChange}
              type="text"
              required
              placeholder="username"
            />
            <div style={{height: '1vh'}} />
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
    )
  }
}

const mapProps = ({ user }) => ({ user })

const mapDispatch = dispatch => ({
  editUser: (user, userId) => dispatch(editUser(user, userId))
})

export default connect(mapProps, mapDispatch)(User)
