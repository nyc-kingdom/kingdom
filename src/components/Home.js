import React from 'react'
import { Link } from 'react-router-dom'
import Carousel from 'nuka-carousel';
import { arrowRight, arrowLeft, userClass } from '../Assets'
import { serverUrl } from '../sockets'

const Home = () => {
  const charactors = ["King", "Lord", "Knight", "Shepard", "Stone Mason", "Knightsword"]
  return (
    <div className='home'>
      <br />
      <h1 style={{ fontFamily: 'Apple Chancery, cursive', fontSize: '250%', textAlign: 'center'}}>
        Kingdom
      </h1>
      <div style={{ flexWrap: 'wrap', marginLeft: 'auto', marginRight: 'auto', maxWidth: '700px'}}>
        <Carousel
          renderCenterLeftControls={({ previousSlide }) =>
            <img src={arrowLeft} onClick={previousSlide} />
          }
          renderCenterRightControls={({ nextSlide }) =>
            <img src={arrowRight} onClick={nextSlide} />
          }
        >
          {
            charactors.map(charactor => (
              <div className="carousel-summary">
                <img src={userClass[charactor]} style={{maxWidth: "60vw", height: '50vh', marginBottom: '10vh'}}/>
              </div>
            ))
          }
        </Carousel>
      </div>
      <a href={`${serverUrl}/auth/foursquare`}>
        <h2>Play Now</h2>
      </a>
      <Link to='/about'>
        <h2>About</h2>
      </Link>
    </div>
  )
}

export default Home
