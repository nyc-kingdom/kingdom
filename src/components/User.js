import React, { Component } from "react";
import Carousel from "nuka-carousel";
import { arrowLeft, arrowRight, shepard } from '../Assets'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { editUser } from '../store'
import history from '../store/history'

const style = {
  width: '100vw',
  height: '40vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'center',
}
class User extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      character: 'shepard1',
      address: '',
      city: '',
      state: '',
      zip: 0
    }
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCharacterSelector = this.handleCharacterSelector.bind(this);
  }

  handleSubmitForm(evt) {
    evt.preventDefault() // for test
    const { address, city, state, zip } = this.state
    const { editUser, user } = this.props
    const addressStr = `${address},${city},${state},${zip}`;
    editUser({address: addressStr, username: this.state.username}, user.id)
    history.push(`/profile/users/${user.id}`)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleCharacterSelector(evt) {
    evt.preventDefault();
    this.setState({ character: evt.target.name })
  }


  render() {
    return (
      <div id="newUser">
        <h1>
          Welcome {
            !this.props.user
              ? <h2>Please sign in first</h2>
              : this.props.user.email
          }
        </h1>
        <br />
        <br />
        <div style={style}>
          <img
            src={shepard}
            name="shepard1"
          />
          <br />
        </div>
        <div>
          <h2>Enter your info to generate your profile</h2>
          <form style={{ textAlign: 'center' }} onSubmit={this.handleSubmitForm}>
          <label>Username:</label>
            <input
              name="username"
              onChange={this.handleChange}
              type="text"
              required
            />
            <br />
          <label>Address:</label>
            <input
              name="address"
              onChange={this.handleChange}
              type="text"
              required
            />
            <br />
            <label>City:</label>
            <input
              name="city"
              onChange={this.handleChange}
              type="text"
              required
            />
            <br />
            <label>State:</label>
            <input
              name="state"
              onChange={this.handleChange}
              type="text"
              required
            />
            <br />
            <label>Zip:</label>
            <input
              name="zip"
              onChange={this.handleChange}
              type="number"
              required
            />
            <br />
            <button>
              Play Now
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapProps = ({ user }) => {
  return {
    user
  }
};

const mapDispatch = dispatch => ({
  editUser: (user, userId) => dispatch(editUser(user, userId))
});

export default connect(mapProps, mapDispatch)(User)
