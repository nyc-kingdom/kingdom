import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../store'
import { gem, swordSingleButton, userClass, kingdomMark, castle, knight, estCastle, changeKingdom } from '../Assets'

const hardCoding = {
    flagBackgroundImgUrl: "https://i.pinimg.com/originals/0d/26/fd/0d26fd531a191bdf6659fd0b9ef4c73c.png",
    keeperChairUrl: "https://cdn4.iconfinder.com/data/icons/knight/512/as416g_7-512.png",
}

export class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.userLevel = this.userLevel.bind(this)
        this.renderWithItem = this.renderWithItem.bind(this)
        this.eachTypeForItem = this.eachTypeForItem.bind(this)
        this.keeperView = this.keeperView.bind(this)
    }

    componentDidMount() {
        this.props.fetchUsers()
    }

    render() {
        const { ownKingdom, main, users, type } = this.props
        if(!main || !ownKingdom || !users[0]) return null
        const kingdomKing = users.find(user => user.id === ownKingdom.king)
        const profileOf = this.eachTypeFor(main, type, kingdomKing)
        console.log(this.props)
        return (
            <div style={{fontWeight: 'bold'}}>
                <div style={{ height: '3vh' }} />
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 1 }}>
                        <div>
                            <img
                                src={hardCoding.flagBackgroundImgUrl}
                                style={{ width: '25vw', left: 0 }}
                            />
                            <Link to={`/profile/kingdoms/${ownKingdom.id}`}>
                                <img
                                    src={!kingdomMark[ownKingdom.name]
                                        ? kingdomMark.undefinedKingdom[2]
                                        : kingdomMark[ownKingdom.name]}
                                    style={{ width: '13vw', position: 'absolute', left: '4.5vw', top: '8vh' }}
                                />
                            </Link>
                            <span style={{ width: '13vw', position: 'absolute', left: '3vw', top: '20vh' }}>
                                {ownKingdom.name}
                            </span>
                        </div>
                    </div>
                    <div style={{ flex: 2, textAlign: 'center' }}>
                        <div style={{ height: '3vh' }} />
                        <h2>{profileOf[type].name}</h2>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div>
                            <img
                                src={hardCoding.flagBackgroundImgUrl}
                                style={{ width: '25vw', right: 0 }}
                            />
                            {
                                !kingdomKing ? null : (
                                <div>
                                    <Link to={`/profile/users/${kingdomKing.id}`}>
                                        <img
                                            src={userClass.King}
                                            style={{width: '17vw', position: 'absolute', right: '5vw', top : '7vh'}}
                                        />
                                    </Link>
                                    <span style={{ width: '13vw', position: 'absolute', right: '11vw', top: '20vh' }}>
                                        {kingdomKing.username}
                                    </span>
                                </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ textAlign: 'center' }}>
                        {type === "user" && main.id === this.props.user.id ? this.changeKingdom() : null}
                        <img
                            src={profileOf[type].image}
                            style={{ width: '75vw', height: '80vw' }}
                        />
                        {type !== "establishment" ? null : this.keeperView(main, users)}
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <span>Level : {profileOf[type].level}</span>
                    <div>{profileOf[type].point} / {profileOf[type].levelUpPoints}</div>
                    <span>{profileOf[type].point} / {profileOf[type].levelUpPoints}</span>
                </div>
                <div style={{ height: '2vh' }}/>
                <div>{this.renderWithItem(main, type)}</div>
                <div style={{ textAlign: 'center' }}>
                    <Link to='/dashboard'>
                        <img src={swordSingleButton} />
                    </Link>
                </div>
            </div>
        )
    }

    changeKingdom(){
        return (
            <div style={{ position: 'absolute', top: '50vh', left: 0 }}>
                <Link to='/changeKingdom' >
                    <img style={{ width: '25vw' }} src={changeKingdom}/>
                </Link>
            </div>
        )
    }

    keeperView(main, users){
        const keeper = users.find(user => user.id === main.keeper)
        return !main.keeper ?
        (
            <div style={{ position: 'absolute', top: '42vh', left: '10vw' }}>
                <div>
                    <span>No Keeper</span>
                </div>
                <img src={hardCoding.keeperChairUrl} style={{ width: '45vw' }} />
            </div>
        ) :
        (
            <div style={{ position: 'absolute', top: '41vh', left: '10vw' }}>
                <div>
                    <span>Keeper : {keeper.username}</span>
                </div>
                <Link to={`/profile/users/${main.keeper}`}>
                    <img
                        src={userClass[this.userLevel(keeper.id)]}
                        style={{ width: '45vw' }}
                    />
                </Link>
            </div>
        )
    }

    renderWithItem(main, type) {
        const itemOf = this.eachTypeForItem(main, type)
        return (
            <div style={{ display: 'flex' }}>
                {
                    ["item1", "item2", "item3"].map(item => (
                        <div key={item} style={{ flex: 1, textAlign: 'center'}}>
                            <div>
                                <Link to={`/items/${type}s/${main.id}/${item}`}>
                                    <img src={itemOf[type][item].image} style={itemOf[type][item].style}/>
                                </Link>
                            </div>
                            <div>
                                <span>{itemOf[type][item].title}</span>
                            </div>
                            <div>
                                <span>{itemOf[type][item].result}</span>
                            </div>
                        </div>
                    ))
                }
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

    eachTypeFor(main, type, kingdomKing){
        const { users, establishments, kingdoms } = this.props
        return {
            user: type !== "user" ? null : {
                name: main.username,
                image: userClass[this.userLevel(main.id)],
                point: main.experience,
                level: this.userLevel(main.id),
                levelUpPoints: kingdomKing.experience
            },
            kingdom: type !== "kingdom" ? null : {
                name: main.name,
                image: !kingdomMark[main.name] ? kingdomMark.undefinedKingdom[2] : kingdomMark[main.name],
                point: main.power,
                level: "Great Kingdom",
                levelUpPoints: kingdoms.reduce((accu, curr) => curr.power >= accu ? curr.power : accu, 0)
            },
            establishment: type !== "establishment" ? null : {
                name: main.name,
                image: !main.allegiance ? estCastle.none : !estCastle[main.allegiance] ? estCastle.undefinedKingdom : estCastle[main.allegiance],
                point: main.popularity,
                level: "Castle",
                levelUpPoints: establishments.reduce((accu, curr) => curr.popularity >= accu ? curr.popularity : accu, 0)
            }
        }
    }

    eachTypeForItem(main, type){
        return {
            user: type !== "user" ? null : {
                item1: {
                    image: castle,
                    style: { width: '10vw', height: '5vh' },
                    title: "Own Est.",
                    result: this.props.establishments
                        .filter(establishment => establishment.keeper === main.id)
                        .length
                },
                item2: {
                    image: castle,
                    style: { width: '10vw', height: '5vh' },
                    title: "Est. Found",
                    result: main.checkins
                        .reduce((accu, curr) => accu.includes(curr.establishmentId) ? accu : accu.concat(curr.establishmentId), [])
                        .length
                },
                item3: {
                    image: gem,
                    style: { width: '10vw' },
                    title: "Resources",
                    result: main.resources.length
                }
            },
            kingdom: type !== "kingdom" ? null : {
                item1: {
                    image: castle,
                    style: { width: '10vw', height: '5vh' },
                    title: "Own Est.",
                    result: this.props.establishments
                        .filter(establishment => establishment.kingdom === establishment.allegiance && establishment.allegiance === main.name)
                        .length
                },
                item2: {
                    image: castle,
                    style: { width: '10vw', height: '5vh' },
                    title: "Total Colonies",
                    result: this.props.establishments
                        .filter(establishment => establishment.kingdom !== establishment.allegiance && establishment.allegiance === main.name)
                        .length
                },
                item3: {
                    image: knight,
                    style: { width: '10vw' },
                    title: "Total Citizen",
                    result: main.users.length
                }
            },
            establishment: type !== "establishment" ? null : {
                item1: {
                    image: castle,
                    style: { width: '10vw', height: '5vh' },
                    title: "Total Visit",
                    result: main.popularity
                },
                item2: {
                    image: castle,
                    style: { width: '10vw', height: '5vh' },
                    title: "Total Attack",
                    result: 0
                },
                item3: {
                    image: knight,
                    style: { width: '10vw' },
                    title: "Total Visitors",
                    result: main.checkins
                        .reduce((accu, curr) => accu.includes(curr.userId) ? accu : accu.concat(curr.userId), [])
                        .length
                }
            }
        }
    }
}

const mapProps = (state, ownProps) => {
    const type = Object.keys(ownProps.match.params)[0]
    const paramId = +ownProps.match.params[type]
    const main = state[`${type}s`].find(each => each.id === paramId)
    if (!main) return { type, kingdoms: state.kingdoms }
    if (!state.kingdoms[0]) return { type, kingdoms: state.kingdoms }
    const ownKingdom =
        type === "kingdom"
            ? main
            : state.kingdoms.find(kingdom => {
                const compare = !main.kingdom
                    ? null
                    : type === "user"
                        ? main.kingdom.name
                        : !main.allegiance
                            ? main.kingdom
                            : main.allegiance
                return kingdom.name === compare
            })
    if (!ownKingdom) return { type, kingdoms: state.kingdoms }
    console.log(main, ownKingdom)
    return {
        type,
        main,
        ownKingdom,
        user: state.user,
        checkins: state.checkins,
        users: state.users,
        establishments: state.establishments,
        kingdoms: state.kingdoms,
    }
}

const mapDispatch = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapProps, mapDispatch)(Profile)
