import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../store'
import { userClass, knight, kingdomMark, wolfShield, castle, castleTower, markersImages, swordSingleButton, bridgeShield, estCastle, gem } from '../Assets'

export class ItemList extends React.Component {
    constructor(props) {
        super(props)
        this.eachItemFor = this.eachItemFor.bind(this)
        this.userLevel = this.userLevel.bind(this)
    }

    componentDidMount() {
        this.props.fetchUsers()
    }

    render() {
        const { type, main, item } = this.props
        if(!main) return null
        const itemOf = this.eachItemFor(main)
        return (
            <div>
                <div style={{ height: '5vh' }} />
                <div>
                    <h2>{itemOf[type][item].title}</h2>
                </div>
                <div style={{ height: '2vh' }} />
                <div style={{ display: 'flex', textAlign: 'center', fontWeight: 'bold' }}>
                    <div style={{ flex: 1 }} >Rank</div>
                    <div style={{ flex: 1 }} >{`${itemOf[type][item].listFor[0].toUpperCase()}${itemOf[type][item].listFor.slice(1)}`}</div>
                    <div style={{ flex: 3 }} >Name</div>
                    <div style={{ flex: 1 }} >{`${itemOf[type][item].pointOf[0].toUpperCase()}${itemOf[type][item].pointOf.slice(1)}`}</div>
                </div>
                <div style={{ height: '2vh' }} />
                <div>
                    {
                        itemOf[type][item].result
                            .sort((front, back) => back[itemOf[type][item].pointOf] - front[itemOf[type][item].pointOf])
                            .map((one, index) => !one ? null : (
                                <div key={one.id} style={{ display: 'flex', textAlign: 'center', fontWeight: 'bold' }}>
                                    <div style={{ flex: 1 }}>{index+1}</div>
                                    <div style={{ flex: 1 }}>
                                        <Link to={`/profile/${itemOf[type][item].listFor}s/${one.id}`}>
                                            <img style={itemOf[type][item].style} src={itemOf[type][item].image(one.id)}/>
                                        </Link>
                                    </div>
                                    <div style={{ flex: 3 }}>{one[itemOf[type][item].name]}</div>
                                    <div style={{ flex: 1 }}>{one[itemOf[type][item].pointOf]}</div>
                                </div>
                            ))
                    }
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Link to='/dashboard'>
                        <img src={swordSingleButton} />
                    </Link>
                </div>
            </div>
        )
    }

    userLevel(userId) {
        const { users, kingdoms } = this.props
        const user = users.find(user => user.id === userId)
        if(!user) return null
        const points = user.experience
        const ownKingdom = !user.kingdom ? 0 : kingdoms.find(kingdom => kingdom.id === user.kingdom.id)
        const howManyEstablishments = this.props.establishments
            .filter(establishment => establishment.kingdom === establishment.allegiance && establishment.allegiance === ownKingdom.name)
            .length
        const kingdomKing = !ownKingdom ? null : users.find(user => user.id === ownKingdom.king)
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

    eachItemFor(main){
        const { type, item, users, establishments } = this.props
        return {
            user: type !== "user" ? null : {
                item1: {
                    listFor: "establishment",
                    image: () => castle,
                    style: { width: '10vw', height: '5vh' },
                    title: "Own Establishments",
                    pointOf: "popularity",
                    name: "name",
                    result: establishments
                        .filter(establishment => establishment.keeper === main.id)
                },
                item2: {
                    listFor: "establishment",
                    image: () => castle,
                    style: { width: '10vw', height: '5vh' },
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
                    style: { width: '10vw' },
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
                    style: { width: '10vw', height: '5vh' },
                    title: "Own Establishments",
                    pointOf: "popularity",
                    name: "name",
                    result: establishments
                        .filter(establishment => establishment.kingdom === establishment.allegiance && establishment.allegiance === main.name)
                },
                item2: {
                    listFor: "establishment",
                    image: () => castle,
                    style: { width: '10vw', height: '5vh' },
                    title: "Total Colonies",
                    pointOf: "popularity",
                    name: "name",
                    result: establishments
                        .filter(establishment => establishment.kingdom !== establishment.allegiance && establishment.allegiance === main.name)
                },
                item3: {
                    listFor: "user",
                    image: userId => userClass[this.userLevel(userId)],
                    style: { width: '10vw' },
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
                    style: { width: '10vw' },
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
                    style: { width: '10vw', height: '5vh' },
                    title: "Total Attack",
                    pointOf: "popularity",
                    name: "name",
                    result: []
                },
                item3: {
                    listFor: "user",
                    image: userId => userClass[this.userLevel(userId)],
                    style: { width: '10vw' },
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
