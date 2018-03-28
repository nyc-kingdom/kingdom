import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../store'
import { userClass, knight, kingdomMark, wolfShield, castle, castleTower, markersImages, swordSingleButton, bridgeShield, estCastle } from '../Assets'

export class LeaderBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = { show: 'kingdoms' }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.top10 = this.top10.bind(this)
        this.userLevel = this.userLevel.bind(this)
    }

    componentDidMount() {
        this.props.fetchUsers()
    }

    render() {
        return (
            <div>
                <div style={{ height: '5vh' }} />
                <div>
                    <h2>Leaderboards</h2>
                </div>
                <form onClick={this.handleSubmit} style={{ display: 'flex', textAlign: 'center', fontWeight: 'bold' }} >
                    <div style={{ flex: 1 }} name="users" >
                        <div name="users">
                            <img name="users" src={knight} style={{ width: '15vw' }} />
                        </div>
                        <span name="users">Users</span>
                    </div>
                    <div style={{ flex: 1 }} name="kingdoms">
                        <div name="kingdoms">
                            <img name="kingdoms" src={bridgeShield} style={{ width: '12vw' }} />
                        </div>
                        <span name="kingdoms">Kingdoms</span>
                    </div>
                    <div style={{ flex: 1 }} name="establishments">
                        <div name="establishments">
                            <img name="establishments" src={castle} style={{ width: '10vw' }} />
                        </div>
                        <span name="establishments">Establishments</span>
                    </div>
                </form>
                <div>
                    {!this.props.users ? null : this.top10()}
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Link to='/dashboard'>
                        <img src={swordSingleButton} />
                    </Link>
                </div>
            </div>
        )
    }

    top10() {
        const chosen = this.state.show
        const chosenGroup = this.props[chosen]
        const points = chosen === "kingdoms" ? "experience" : "quantity"
        const checkFor = chosen === "kingdoms" ? "users" : "checkins"
        const top10 = !chosenGroup
            ? []
            : chosen === "users"
                ? chosenGroup.sort((a, b) => b.experience - a.experience).slice(0, 10)
                : chosenGroup.sort((a, b) => b[checkFor].reduce((accu, curr) => accu + curr[points], 0) - a[checkFor].reduce((accu, curr) => accu + curr[points], 0)).slice(0, 10)
        return (
            <div>
                <div style={{ height: '2vh' }} />
                <div style={{ display: 'flex', textAlign: 'center', fontWeight: 'bold' }}>
                    <div style={{ flex: 1 }} >Rank</div>
                    <div style={{ flex: 1 }} >{`${chosen[0].toUpperCase()}${chosen.slice(1)}`}</div>
                    <div style={{ flex: 3 }} >Name</div>
                </div>
                <div style={{ height: '2vh' }} />
                {
                    top10.map((one, index) => (
                        <div key={one.id} style={{ display: 'flex', textAlign: 'center', fontWeight: 'bold' }} >
                            <div style={{ flex: 1 }} >{` ${index + 1} `}</div>
                            <div style={{ flex: 1 }}>
                                <Link to={`/profile/${chosen}/${one.id}`}>
                                    <img
                                        style={{ width: '10vw', height: '5vh' }}
                                        src={chosen === "kingdoms"
                                            ? kingdomMark[one.name]
                                            : chosen === "users"
                                                ? userClass[this.userLevel(one.id)]
                                                : estCastle[!one.allegiance ? one.kingdom : one.allegiance]}
                                    />
                                </Link>
                            </div>
                            <div style={{ flex: 3 }}>{chosen === "users" ? one.username : one.name}</div>
                        </div>
                    ))
                }
            </div>
        )
    }

    handleSubmit(evt) {
        evt.preventDefault()
        if (!!evt.target.name) this.setState({ show: evt.target.name })
    }

    userLevel(userId) {
        const user = this.props.users.find(user => user.id === userId)
        const points = !user ? 0 : user.experience
        const ownKingdom = !user.kingdom ? 0 : this.props.kingdoms.find(kingdom => kingdom.id === user.kingdom.id)
        const howManyEstablishments = user.kingdom.domainSize
        const kingdomKing = !ownKingdom ? null : ownKingdom.users.reduce((accu, curr) => accu = curr.experience >= 0 ? curr : accu, {})
        const amIKing = !user ? false : !kingdomKing ? false : !kingdomKing.id ? true : kingdomKing.id === user.id
        if (amIKing) return "King"
        if (points < 100) {
            if (howManyEstablishments < 20) return "Shepard"
            return "Stone Mason"
        } else if (points < 500) {
            return "Knight"
        }
        return "Lord"
    }
}

const mapProps = state => {
    return {
        users: state.users,
        kingdoms: state.kingdoms,
        establishments: state.establishments
    }
}

const mapDispatch = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapProps, mapDispatch)(LeaderBoard)
