import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchResult, markersImages, userClass } from '../Assets';
import { addCheckIn } from '../store';
import EstablishmentCard from './establishmentCard'

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
        const allegianceDisplay = markersImages[this.props.allegiance] ? this.props.allegiance : 'undefinedKingdom'

        return (
            <div style={{ position: 'static' }}>
                {
                    this.props.type === 'establishment' ?
                        <div>
                            {
                                select === establishmentId && <EstablishmentCard {...this.props} allegianceDisplay={allegianceDisplay} handleClick={this.handleClick}/>
                            }
                            <img
                                onClick={() => { this.props.changeSelection(establishmentId) }}
                                src={markersImages[allegianceDisplay]}
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
        const ownKingdom = kingdoms.find(kingdom => kingdom.id === user.kingdomId)
        if (ownKingdom && ownKingdom.king === user.id) return "King"
        if (user.experience < 100) {
            if (ownKingdom.localDomain < 20) return "Shepard"
            return "Stone Mason"
        } else if (user.experience < 500) return "Knight"
        return "Lord"
    }

    handleClick(evt){
        evt.preventDefault()
        const { addCheckIn, fourSquareId, lat, lng, establishmentName, user } = this.props
        addCheckIn(user, {
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
