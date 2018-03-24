import React, { Component } from "react";
import Carousel from "nuka-carousel";
import { arrowLeft, arrowRight, shepard } from '../Assets/index.js'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { editUser } from '../store';

const style = {
  width: "100vw",
  height: "40vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
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
    evt.preventDefault();
    const addressStr = `${this.state.address}${this.state.city}${this.state.state}${this.state.zip}`.split(' ').join('');
    this.props.editUser({ address: addressStr }, this.props.user.id)
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
          <h3>You're a shepard</h3>
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

const mapProps = (state) => {
  const { user } = state
  return {
    user
  }
};

const mapDispatch = dispatch => ({
  editUser: (user, userId) => dispatch(editUser(user, userId))
});

export default connect(mapProps, mapDispatch)(User)
