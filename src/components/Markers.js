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
                                <div className="establishmentCard">
                                    <h3>{this.props.establishmentName}</h3>
                                    <Link to={`/profile/establishments/${this.props.establishmentId}`}>Details</Link>
                                    <br />
                                    <div>
                                        {
                                            allegiance === 'none'
                                                ? ''
                                                :
                                                <div>
                                                    {allegiance} <br /> Kingdom
                                                    <br />
                                                </div>
                                        }
                                    </div>
                                    <img style={{ width: '5vw', height: 'auto', padding: '5px' }} src={markersImages[allegiance]} />

                                    <br />
                                    <button
                                        className='powerButtonEst'
                                        onClick={() => {
                                            this.props.addCheckIn(
                                                this.props.user,
                                                {
                                                    id: this.props.fourSquareId,
                                                    location:
                                                        { latitude: this.props.lat, longitude: this.props.lng },
                                                    name: this.props.establishmentName
                                                }
                                            )
                                        }} >Check in here!</button>
                                    <br />
                                    <button className = 'escape' onClick={() => { this.props.cb(this.props.establishmentId) }}>X</button>
                                </div>
                            }
                            <img onClick={() => { this.props.cb(this.props.establishmentId) }} src={markersImages[allegiance]} className="checkIn" />
                        </div>
                        : <Link to={`/dashboard/selectedView/${this.props.establishmentId}`}> <img src={searchResult} /> </Link>
                }
            </div>
        )
    }
}


const mapProps = (state, ownProps) => ({ markers: state.markers, user: state.user, location: state.trackLocation, verifyCheckIn: state.verify, redirect: ownProps.history })

const mapDispatch = (dispatch, ownProps) => ({
    addCheckIn: (user, place) => {
        dispatch(addCheckIn(user, place, ownProps.history))
    }
})

export default connect(mapProps, mapDispatch)(Markers)
