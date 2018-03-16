'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

const image = {
    castle: "https://cdn3.iconfinder.com/data/icons/glypho-travel/64/history-castle-tower-512.png",
    restaurant: "http://www.pvhc.net/img179/bcrsijazexxcbdnpicmy.png",
}

export class Markers extends Component {
    render(){
        const style = {
            height: '2.5vh',
            width: '2.5vw'
        }
        return (
            <div>
            <div>{this.props.establishmentName}</div>
            <img src={image[this.props.name]} style={style}/>
            </div>
        )
    }
}

const mapState = null

export default connect(mapState)(Markers)
