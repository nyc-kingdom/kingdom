import React, { Component } from "react";
import Carousel from "nuka-carousel";
import shepard from '../Assets/Shepard.gif'
import dino from '../Assets/tRex2Talking.gif'
import shep from '../Assets/sheperd1.gif'
import arrowLeft from '../Assets/arrowLeft.png'
import arrowRight from '../Assets/arrowRight.png'
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
    this.props.editUser({address: addressStr}, this.props.user.id)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleCharacterSelector(evt) {
    evt.preventDefault();
    this.setState({character: evt.target.name})
  }


  render() {
    console.log(this.state, 'current state of new user form')
    console.log(this.props)
    return (
        <div id="newUser">
          <h1>
            Welcome Connor
      </h1>
          <br />
          <br />
          <h2>
            Pick your character
      </h2>
      <form onClick={this.handleCharacterSelector}>
          <div
            id="carousel-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Carousel
              renderCenterLeftControls={({ previousSlide }) => (
                <button onClick={previousSlide}><img src={arrowLeft} /></button>
              )}
              renderCenterRightControls={({ nextSlide }) => (
                <button onClick={nextSlide}><img src={arrowRight} /></button>
              )}
            >
              <div style={style}>
              <h3>Shepard 1</h3>
              <img
                src={shepard}
                name="shepard1"
                />
                <h3>Click me!</h3>
                <br />
              </div>
              <div style={style}>
              <h3>Shepard2</h3>
              <img
                src={shep}
                name="shepard2"
                />
                <h3>Click me!</h3>
                <br />
              </div>
              <div style={style}>
              <h3>Dinosaur</h3>
                <img
                src={dino}
                name="dino"
                />
                <h3>Click me!</h3>
              </div>
            </Carousel>
          </div>
          </form>
        <div>
          <form style={{textAlign: 'center'}} onSubmit={this.handleSubmitForm}>
          <label>Character:</label>
          <input
            name="character"
            value={this.state.character}
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

const mapProps = state => {
  return {
    user: state.user
  }
};

const mapDispatch = dispatch => ({
  editUser: (user, userId) => dispatch(editUser(user, userId))
});

export default connect(mapProps, mapDispatch)(User)
