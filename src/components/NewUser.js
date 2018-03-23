import React, { Component } from "react";
import Carousel from "nuka-carousel";
import shepard from '../Assets/Shepard.gif'
import dino from '../Assets/tRex2Talking.gif'
import shep from '../Assets/sheperd1.gif'
import { Link } from 'react-router-dom'


const style = {
  width: "100vw",
  height: "40vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
}
export default class NewUser extends Component {
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
    console.log(this.state, 'obj from state')
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
                <button onClick={previousSlide}>&lt;</button>
              )}
              renderCenterRightControls={({ nextSlide }) => (
                <button onClick={nextSlide}>&gt;</button>
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
          <form style={
            {textAlign: "center"}
          } onSubmit={this.handleSubmitForm}>
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
