import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Carousel from 'nuka-carousel';
import { arrowRight, arrowLeft, king, shepard, lord, knight, knightsword, blacksmith } from '../Assets'
import { serverUrl } from '../sockets'


export class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const style = {
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center",
    }
    console.log(!!this.props.user.id, this.props.user.id, this.props)
    return (
      <div className='home'>
        <br />
        <h1 style={{ fontFamily: 'Apple Chancery, cursive', fontSize: '250%', textAlign: 'center'}}>
          Kingdom
        </h1>
        <div>
        <Carousel
          renderCenterLeftControls={({ previousSlide }) => (
            <img src={arrowLeft} onClick={previousSlide} />
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <img src={arrowRight} onClick={nextSlide} />
          )}
        >
          <div className="carousel-summary" style={style}>
            <img src={king} style={{width: "60vw", padding:"50px"}}/>
          </div>
          <div className="carousel-summary" style={style}>
            <img src={shepard} style={{width: "60vw", padding:"50px"}}/>
          </div>
          <div className="carousel-summary" style={style}>
            <img src={lord} style={{width: "60vw", padding:"50px"}}/>
          </div>
          <div className="carousel-summary" style={style}>
            <img src={knight} style={{width: "60vw", padding:"50px"}}/>
          </div>
          <div className="carousel-summary" style={style}>
            <img src={knightsword} style={{width: "60vw", padding:"50px"}}/>
          </div>
          <div className="carousel-summary" style={style}>
            <img src={blacksmith} style={{width: "60vw", padding:"50px"}}/>
          </div>
        </Carousel>
          <br />
          <br />
        </div>
        {
          !!this.props.user.id
            ?
            <Link to='/dashboard'>
              <h2>Play Now</h2>
            </Link>
            :
            <a href={`${serverUrl}/auth/foursquare`}>
              <h2>Play Now</h2>
            </a>
        }
        <Link to='/about'>
          <h2>About</h2>
        </Link>
      </div>
    )
  }
}

const mapProps = ({ user }) => ({ user })

export default connect(mapProps)(Home)
