import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../store'
import { userClass, knight, kingdomMark, castle, swordSingleButton, bridgeShield, estCastle } from '../Assets'

class LeaderBoard extends React.Component {
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
            <div style={{ fontWeight: 'bold' }}>
                <div style={{ height: '5vh' }} />
                <div>
                    <h2>Leaderboards</h2>
                </div>
                <form onClick={this.handleSubmit} style={{ display: 'flex', textAlign: 'center', flexWrap: 'wrap', marginLeft: 'auto', marginRight: 'auto', maxWidth: '700px' }} >
                    <div style={{ flex: 1 }} name="users" >
                        <div name="users">
                            <img name="users" src={knight} style={{ width: '15vw', maxHeight: '10vh' }} />
                        </div>
                        <span name="users">Users</span>
                    </div>
                    <div style={{ flex: 1 }} name="kingdoms">
                        <div name="kingdoms">
                            <img name="kingdoms" src={bridgeShield} style={{ width: '12vw', maxHeight: '10vh' }} />
                        </div>
                        <span name="kingdoms">Kingdoms</span>
                    </div>
                    <div style={{ flex: 1 }} name="establishments">
                        <div name="establishments">
                            <img name="establishments" src={castle} style={{ width: '10vw', maxHeight: '10vh' }} />
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
        const rankAbout = chosen === "kingdoms" ? "power" : chosen === "users" ? "experience" : "popularity"
        const top10 = !chosenGroup ? [] : chosenGroup.sort((a, b) => b[rankAbout] - a[rankAbout]).slice(0, 10)
        return (
            <div style={{ height: '65vh', flexWrap: 'wrap', marginLeft: 'auto', marginRight: 'auto', maxWidth: '700px' }}>
                <div style={{ height: '2vh' }} />
                <div style={{ display: 'flex', textAlign: 'center' }}>
                    <div style={{ flex: 1 }} >Rank</div>
                    <div style={{ flex: 1 }} >{`${chosen[0].toUpperCase()}${chosen.slice(1)}`}</div>
                    <div style={{ flex: 4 }} >Name</div>
                    <div style={{ flex: 1 }} >{rankAbout}</div>
                </div>
                <div style={{ height: '2vh' }} />
                {
                    top10.map((one, index) => (
                        <div key={one.id} style={{ display: 'flex', textAlign: 'center' }} >
                            <div style={{ flex: 1 }} >{` ${index + 1} `}</div>
                            <div style={{ flex: 1 }}>
                                <Link to={`/profile/${chosen}/${one.id}`}>
                                    <img
                                        style={{ maxWidth: '10vw', height: '5vh' }}
                                        src={chosen === "kingdoms"
                                            ? !kingdomMark[one.name] ? kingdomMark.undefinedKingdom[2] : kingdomMark[one.name]
                                            : chosen === "users"
                                                ? userClass[this.userLevel(one.id)]
                                                : !estCastle[!one.allegiance ? one.kingdom : one.allegiance]
                                                    ?estCastle.undefinedKingdom
                                                    :estCastle[!one.allegiance ? one.kingdom : one.allegiance]}
                                    />
                                </Link>
                            </div>
                            <div style={{ flex: 4 }}>{chosen === "users" ? one.username : one.name}</div>
                            <div style={{ flex: 1 }}>{one[rankAbout]}</div>
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
        const { users, kingdoms } = this.props
        const user = users.find(user => user.id === userId)
        const ownKingdom = kingdoms.find(kingdom => kingdom.id === user.kingdom.id)
        if (ownKingdom.king === user.id) return "King"
        if (user.experience < 100) {
            if (ownKingdom.localDomain < 20) return "Shepard"
            return "Stone Mason"
        } else if (user.experience < 500) return "Knight"
        return "Lord"
    }
}

const mapProps = ({ users, kingdoms, establishments }) => ({ users, kingdoms, establishments })

const mapDispatch = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapProps, mapDispatch)(LeaderBoard)
