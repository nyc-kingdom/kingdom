import React from 'react'
import { Link } from 'react-router-dom'
import Carousel from 'nuka-carousel';
import { arrowRight, arrowLeft, userClass } from '../Assets'
import { serverUrl } from '../sockets'

const Home = () => {
  const charactors = Object.keys(userClass)
  return (
    <div className='home'>
      <br />
      <h1 style={{ fontFamily: 'Apple Chancery, cursive', fontSize: '250%' }}>
        Kingdom
      </h1>
      <div style={{ flexWrap: 'wrap', margin: '0 auto 0 auto', maxWidth: '700px'}}>
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
              <div>
                <img
                  src={userClass[charactor]}
                  style={{maxWidth: "100vw", height: '45vh', marginBottom: '10vh'}}
                />
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
