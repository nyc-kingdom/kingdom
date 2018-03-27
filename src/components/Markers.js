import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ravenswoodMarker, test, financialDistrictMarker, cityHallMarker, bushwickMarker, searchResult, blacksmith, knight } from '../Assets';

const image = {
    knight: "https://vignette.wikia.nocookie.net/the-king-of-towers/images/0/01/Hero_Vord_Knight_Icon.png/revision/latest?cb=20140831041856",
    Ravenswood: ravenswoodMarker,
    default: test,
    Lynbrook: financialDistrictMarker,
    'South Slope': cityHallMarker,
    Bushwick: bushwickMarker,
    Astoria: ravenswoodMarker
}

export class Markers extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const style = { height: '4vh', width: '2.5vw' }
        const searchView = { height: '8vh', width: '5vw' }

        let allegiance;
        if (image[this.props.allegiance] !== undefined) allegiance = this.props.allegiance
        else allegiance = 'default'

        return (
            <div>
                {
                    this.props.type === 'establishment'
                        ? <Link to={`/profile/establishments/${this.props.establishmentId}`} > <img src={image[allegiance]} className='checkIn' /></Link>
                        : <Link to={`/dashboard/selectedView/${this.props.establishmentId}`}> <img src={searchResult} /> </Link>
                }
            </div>
        )
    }
}

const mapProps = null;

export default connect(mapProps)(Markers)
