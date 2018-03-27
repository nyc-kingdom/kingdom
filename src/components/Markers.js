import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ravenswoodMarker, test, financialDistrictMarker, cityHallMarker, bushwickMarker, searchResult, blacksmith, knight, markersImages } from '../Assets';

export class Markers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMarkerDetail: false,
            select: ''
        }
    }

    render() {
        const style = { height: '4vh', width: '2.5vw' }
        const searchView = { height: '8vh', width: '5vw' }

        let allegiance;
        if (markersImages[this.props.allegiance] !== undefined) allegiance = this.props.allegiance
        else allegiance = 'none'

        return (
            <div style={{ position: 'static' }}>
                {
                    this.props.type === 'establishment'
                        ?
                        <div>
                            {
                                this.props.select === this.props.establishmentId &&
                                <div id="establishment" style={{ fontFamily: 'Apple Chancery, cursive', top: -100, left: -17 }}>
                                    <h1>{this.props.establishmentName}</h1>
                                    <Link to={`/profile/establishments/${this.props.establishmentId}`} ><h2>Details</h2></Link>
                                    <h2>Allegiance: {allegiance}</h2>
                                    <img src={markersImages[allegiance]} />

                                    <button onClick={() => { this.props.cb(this.props.establishmentId) }}>Close</button>
                                </div>
                            }
                            <img onClick={() => { this.props.cb(this.props.establishmentId) }} src={markersImages[allegiance]} className="checkIn" />
                        </div>
                        : <Link to={`/dashboard/selectedView/${this.props.establishmentId}`}> <img src={searchResult} /> </Link>
                }
            </div>
        )
    }

    markerButton() {
        console.log('helllloooooo')
        return (
            <div style={{ position: 'absolute' }}>
                <h1>HELLOoOOoooo</h1>
                <img src={blacksmith}> </img>
            </div>
        )
    }
}

// <Link to={`/profile/establishments/${this.props.establishmentId}`} > <img src={image[allegiance]} className='checkIn' /></Link>

const mapProps = null;

export default connect(mapProps)(Markers)
