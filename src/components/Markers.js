'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

const image = {
    castle: "https://cdn3.iconfinder.com/data/icons/glypho-travel/64/history-castle-tower-512.png",
    restaurant: "http://www.pvhc.net/img179/bcrsijazexxcbdnpicmy.png",
    knight: "https://vignette.wikia.nocookie.net/the-king-of-towers/images/0/01/Hero_Vord_Knight_Icon.png/revision/latest?cb=20140831041856"
}

const activeMarkerStyle = {border: '2px solid black', width: '30px', transform: 'translateY(130px)' }


const regularMarkerStyle = {border: '2px solid black', width: '30px', transition: 'translate 10s'}

export class Markers extends Component {

    constructor(props){
        super(props)
        this.style = activeMarkerStyle
    }

    componentDidMount(){
        this.style = regularMarkerStyle
    }

    render(){
        const style = {
            height: '3.5vh',
            width: '3.5vw'
        }
        return (
            <Link to={`/dashboard/selectedView/${this.props.establishmentId}`}>
                <div style= {this.style} className='rec'>
                    {this.props.establishmentName}
                </div>
                <img src={image['knight']} style={style}/>
            </Link>
        )
    }
}

const mapState = null

export default connect(mapState)(Markers)
