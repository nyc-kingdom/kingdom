import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../store'
import { userClass, knight, kingdomMark, wolfShield, castle, castleTower, swordSingleButton, gem } from '../Assets'

class ItemList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            start: 0,
            end: 10,
        }
        this.eachItemFor = this.eachItemFor.bind(this)
        this.userLevel = this.userLevel.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.props.fetchUsers()
    }

    render() {
        const { type, main, item } = this.props
        if (!main) return null
        const itemOf = this.eachItemFor(main)
        let navigateLength = Math.ceil(itemOf[type][item].result.length/10)
        return (
            <div style={{ fontWeight: 'bold' }}>
                <div style={{ height: '5vh' }} />
                <div>
                    <h2>{itemOf[type][item].title}</h2>
                </div>
                <div style={{ height: '2vh' }} />
                <div style={{ display: 'flex', textAlign: 'center', fontWeight: 'bold' }}>
                    <div style={{ flex: 1 }} >
                        Rank
                    </div>
                    <div style={{ flex: 1 }} >
                        {`${itemOf[type][item].listFor[0].toUpperCase()}${itemOf[type][item].listFor.slice(1)}`}
                    </div>
                    <div style={{ flex: 3 }} >
                        Name
                    </div>
                    <div style={{ flex: 1 }} >
                        {`${itemOf[type][item].pointOf[0].toUpperCase()}${itemOf[type][item].pointOf.slice(1)}`}
                    </div>
                </div>
                <div style={{ height: '2vh' }} />
                <div style={{ height: '60vh'}}>
                    {
                        itemOf[type][item].result
                            .sort((front, back) =>
                                back[itemOf[type][item].pointOf] - front[itemOf[type][item].pointOf]
                            )
                            .slice(this.state.start, this.state.end)
                            .map((one, index) => !one ? null : (
                                <div
                                    key={one.id}
                                    style={{ display: 'flex', textAlign: 'center', fontWeight: 'bold' }}
                                >
                                    <div style={{ flex: 1 }}>{index+1+this.state.start}</div>
                                    <div style={{ flex: 1 }}>
                                        <Link to={`/profile/${itemOf[type][item].listFor}s/${one.id}`}>
                                            <img
                                                style={{ maxWidth: '10vw', height: '5vh' }}
                                                src={itemOf[type][item].image(one.id)}
                                            />
                                        </Link>
                                    </div>
                                    <div style={{ flex: 3 }}>{one[itemOf[type][item].name]}</div>
                                    <div style={{ flex: 1 }}>{one[itemOf[type][item].pointOf]}</div>
                                </div>
                            ))
                    }
                </div>
                <form style={{ textAlign: 'center' }} onClick={this.handleClick}>
                    {
                        this.navigate(navigateLength).map((one, index) =>
                            <button
                                key={one}
                                name={index}
                                style={{ fontSize: '20px', background: 'none', border: 'none'}}
                            >
                                {one}
                            </button>
                        )
                    }
                </form>
                <div style={{ height: '3vh' }}/>
                <div style={{ textAlign: 'center' }}>
                    <Link to='/dashboard'>
                        <img src={swordSingleButton} />
                    </Link>
                </div>
            </div>
        )
    }

    handleClick (evt) {
        evt.preventDefault()
        const start = +evt.target.name * 10
        const end = (+evt.target.name + 1) * 10
        this.setState({ start, end })
        console.log(start, end)
    }

    navigate(length) {
        let arrNavi = []
        for (var i = 1; i <= length; i++){
            arrNavi.push(` ${i} `)
        }
        return arrNavi
    }

    userLevel(userId) {
        const { users, kingdoms } = this.props
        const user = users.find(user => user.id === userId)
        if(!user) return null
        const ownKingdom = kingdoms.find(kingdom => kingdom.id === user.kingdom.id)
        if (ownKingdom.king === user.id) return "King"
        if (user.experience < 100) {
            if (ownKingdom.localDomain < 20) return "Shepard"
            return "Stone Mason"
        } else if (user.experience < 500) return "Knight"
        return "Lord"
    }

    eachItemFor(main){
        const { type, item, users, establishments } = this.props
        return {
            user: type !== "user" ? null : {
                item1: {
                    listFor: "establishment",
                    image: () => castle,
                    title: "Own Establishments",
                    pointOf: "popularity",
                    name: "name",
                    result: establishments
                        .filter(establishment => establishment.keeper === main.id)
                },
                item2: {
                    listFor: "establishment",
                    image: () => castle,
                    title: "Establishments Found",
                    pointOf: "popularity",
                    name: "name",                    
                    result: main.checkins
                        .reduce((accu, curr) => accu.includes(curr.establishmentId) ? accu : accu.concat(curr.establishmentId), [])
                        .map(establishmentId => establishments.find(establishment => establishment.id === establishmentId))
                },
                item3: {
                    listFor: "item",
                    image: () => gem,
                    title: "Resources",
                    pointOf: "quantity",
                    name: "name",
                    result: main.resources
                }
            },
            kingdom: type !== "kingdom" ? null : {
                item1: {
                    listFor: "establishment",
                    image: () => castle,
                    title: "Local Domains",
                    pointOf: "popularity",
                    name: "name",
                    result: establishments
                        .filter(establishment => establishment.kingdom === establishment.allegiance && establishment.allegiance === main.name)
                },
                item2: {
                    listFor: "establishment",
                    image: () => castle,
                    title: "Total Colonies",
                    pointOf: "popularity",
                    name: "name",
                    result: establishments
                        .filter(establishment => establishment.kingdom !== establishment.allegiance && establishment.allegiance === main.name)
                },
                item3: {
                    listFor: "user",
                    image: userId => userClass[this.userLevel(userId)],
                    title: "All Citizen",
                    pointOf: "experience",
                    name: "username",
                    result: main.users
                }
            },
            establishment: type !== "establishment" ? null : {
                item1: item !== "item1" ? null : {
                    listFor: "user",
                    image: userId => userClass[this.userLevel(userId)],
                    title: "Total Visit",
                    pointOf: "experience",
                    name: "username",
                    result: main.checkins
                        .reduce((accu, curr) => accu.includes(curr.userId) ? accu : accu.concat(curr.userId), [])
                        .map(userId => users.find(user => user.id === userId))
                },
                item2: {
                    listFor: "establishment",
                    image: () => castle,
                    title: "Total Attack",
                    pointOf: "popularity",
                    name: "name",
                    result: []
                },
                item3: {
                    listFor: "user",
                    image: userId => userClass[this.userLevel(userId)],
                    title: "Total Visitors",
                    pointOf: "experience",
                    name: "username",
                    result: main.checkins
                        .reduce((accu, curr) => accu.includes(curr.userId) ? accu : accu.concat(curr.userId), [])
                        .map(userId => users.find(user => user.id === userId))
                }
            }
        }
    }
}

const mapProps = (state, ownProps) => {
    const type = Object.keys(ownProps.match.params)[0]
    const paramId = +ownProps.match.params[type]
    const main = state[`${type}s`].find(each => each.id === paramId)
    const item = ownProps.match.params["item"]
    return {
        type,
        main,
        item,
        users: state.users,
        kingdoms: state.kingdoms,
        establishments: state.establishments
    }
}

const mapDispatch = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapProps, mapDispatch)(ItemList)
