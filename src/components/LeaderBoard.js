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
            <div className='fit'>
                <h2>Leaderboards</h2>
                <form onClick={this.handleSubmit} className='d-flex' >
                    <button className='simpleButton flex-one' name="users" >
                        <img name="users" src={knight} id='user-img'/>
                        <div name="users" className='letterButton'>Users</div>
                    </button>
                    <button className='simpleButton flex-one' name="kingdoms" >
                        <img name="kingdoms" src={bridgeShield} id='kingdom-img'/>
                        <div name="kingdoms" className='letterButton'>Kingdoms</div>
                    </button>
                    <button className='simpleButton flex-one' name="establishments" >
                        <img name="establishments" src={castle} id='establishment-img'/>
                        <div name="establishments" className='letterButton'>Castles</div>
                    </button>
                </form>
                {!this.props.users ? null : this.top10()}
                <Link to='/dashboard'>
                    <img src={swordSingleButton} />
                </Link>
            </div>
        )
    }

    top10() {
        const chosen = this.state.show
        const chosenGroup = this.props[chosen]
        const rankAbout = chosen === "kingdoms" ? "power" : chosen === "users" ? "experience" : "popularity"
        const top10 = !chosenGroup ? [] : chosenGroup.sort((a, b) => b[rankAbout] - a[rankAbout]).slice(0, 10)
        return (
            <div id='leader-board-body'>
                <div id='leader-board-top'>
                    <div className='flex-one' >Rank</div>
                    <div className='flex-one' >{chosen === "establishments" ? "Castles" : `${chosen[0].toUpperCase()}${chosen.slice(1)}`}</div>
                    <div className='flex-four' >Name</div>
                    <div className='flex-one' >{`${rankAbout[0].toUpperCase()}${rankAbout.slice(1)}`}</div>
                </div>
                {
                    top10.map((one, index) => (
                        <div key={one.id} className='d-flex' >
                            <div className='flex-one' >{` ${index + 1} `}</div>
                            <div className='flex-one'>
                                <Link to={`/profile/${chosen}/${one.id}`}>
                                    <img
                                        className='top-img'
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
                            <div className='flex-four'>{chosen === "users" ? one.username : one.name}</div>
                            <div className='flex-one'>{one[rankAbout]}</div>
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
