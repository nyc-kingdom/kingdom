import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchResult, markersImages } from '../Assets';
import { addCheckIn } from '../store';

export class Markers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMarkerDetail: false,
            select: ''
        }
    }

    render() {
        const { establishmentId, establishmentName, select, user } = this.props
        let allegiance;
        if (markersImages[this.props.allegiance] !== undefined) allegiance = this.props.allegiance
        else if (this.props.allegiance !== null) allegiance = 'undefinedKingdom'
        else allegiance = 'none'

        return (
            <div style={{ position: 'static' }}>
                {
                    this.props.type === 'establishment'
                        ?
                        <div>
                            {
                                select === establishmentId &&
                                <div className="establishmentCard">
                                    <h3>{establishmentName}</h3>
                                    <Link to={`/profile/establishments/${establishmentId}`}>
                                        Details
                                    </Link>
                                    <br />
                                    <div>
                                        {this.props.allegiance} <br /> Kingdom
                                        <br />
                                    </div>
                                    <img
                                        style={{ width: '5vw', height: 'auto', padding: '5px' }}
                                        src={markersImages[allegiance]}
                                    />
                                    <br />
                                    <button
                                        className='powerButtonEst'
                                        onClick={() => {
                                            this.props.addCheckIn(
                                                user,
                                                {
                                                    id: this.props.fourSquareId,
                                                    location: {
                                                        lat: this.props.lat,
                                                        lng: this.props.lng
                                                    },
                                                    name: establishmentName
                                                }
                                            )
                                        }}
                                    >
                                        Check in here!
                                    </button>
                                    <br />
                                    <button
                                        className='escape'
                                        onClick={() => { this.props.cb(establishmentId) }}
                                    >
                                        X
                                    </button>
                                </div>
                            }
                            <img
                                onClick={() => { this.props.cb(establishmentId) }}
                                src={markersImages[allegiance]}
                                className="checkIn"
                            />
                        </div>
                        :
                        <Link to={`/dashboard/selectedView/${establishmentId}`}>
                            <img src={searchResult} />
                        </Link>
                }
            </div>
        )
    }
}

const mapProps = ({ user }) => ({ user })

const mapDispatch = (dispatch, ownProps) => ({
    addCheckIn: (user, place) => dispatch(addCheckIn(user, place, ownProps.history))
})

export default connect(mapProps, mapDispatch)(Markers)
