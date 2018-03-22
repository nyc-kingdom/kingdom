import React, { Component } from "react";
import Carousel from "nuka-carousel";
import shepard from '../Assets/Shepard.gif'
import dino from '../Assets/tRex2Talking.gif'
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
  render() {
    return (
      <div>
        <div id='newUser'>
          <h1>
            Welcome Connor
      </h1>
          <br />
          <br />
          <h2>
            Choose your character
      </h2>
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
                <img src={shepard} />
              </div>
              <div style={style}>
                <img src={dino} />
              </div>
            </Carousel>
          </div>
          <div>
          </div>
        </div>
        <div>
          <form style={
            {textAlign: "center"}
          }>
            <label>Address:</label>
            <input
              name="address"
              type="text"
              required
            />
            <br />
            <label>City:</label>
            <input
              name="city"
              type="text"
              required
            />
            <br />
            <label>State:</label>
            <input
              name="state"
              type="text"
              required
            />
            <br />
            <label>Zip:</label>
            <input
              name="zip"
              type="number"
              required
            />
            <br />
            <button>
            Play Now
            </button>
            <Link to='/dashboard'>Dashboard</Link>
          </form>
        </div>
      </div>
    );
  }
}
