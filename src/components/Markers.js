import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchResult, markersImages, userClass } from '../Assets';
import { addCheckIn } from '../store';

class Markers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMarkerDetail: false,
            select: ''
        }
        this.userLevel = this.userLevel.bind(this)
        this.handleClick = this.handleClick.bind(this)
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
                                        {
                                            this.props.allegiance
                                                ?
                                                (
                                                    <div>
                                                        {this.props.allegiance} <br /> Kingdom
                                                    </div>
                                                )
                                                : this.props.origin 
                                        }
                                        <br />
                                    </div>
                                    <img
                                        style={{ width: '5vw', height: 'auto', padding: '5px' }}
                                        src={markersImages[allegiance]}
                                    />
                                    <br />
                                    <button
                                        className='powerButtonEst'
                                        onClick={this.handleClick}
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
                        : this.props.type === 'user'
                            ? 
                            <Link to={`/profile/users/${user.id}`}>
                                <img style={{ maxHeight : '25px' }} src={userClass[this.userLevel(user)]}/>
                            </Link>
                            :
                            <Link to={`/dashboard/selectedView/${establishmentId}`}>
                                <img src={searchResult} />
                            </Link>
                }
            </div>
        )
    }

    userLevel(user) {
        const { kingdoms } = this.props
        if(!user) return null
        const points = user.experience
        const ownKingdom = kingdoms.find(kingdom => kingdom.id === user.kingdomId)
        const howManyLocalDomains = ownKingdom.localDomain
        const amIKing = !ownKingdom.king ? false : ownKingdom.king === user.id
        if (amIKing) return "King"
        if (points < 100) {
            if (howManyLocalDomains < 20) return "Shepard"
            return "Stone Mason"
        } else if (points < 500) {
            return "Knight"
        }
        return "Lord"
    }

    handleClick(evt){
        evt.preventDefault()
        const { addCheckIn, fourSquareId, lat, lng, establishmentName, user } = this.props
        addCheckIn(
            user,
            {
                id: fourSquareId,
                location: { lat, lng },
                name: establishmentName
            }
        )
    }
}

const mapProps = ({ user, kingdoms }) => ({ user, kingdoms })

const mapDispatch = dispatch => ({
    addCheckIn: (user, place) => dispatch(addCheckIn(user, place))
})

export default connect(mapProps, mapDispatch)(Markers)
