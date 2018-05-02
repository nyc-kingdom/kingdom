import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../store'
import { gem, swordSingleButton, userClass, kingdomMark, castle, knight, estCastle, changeKingdom } from '../Assets'

const hardCoding = {
    flagBackgroundImgUrl: "https://i.pinimg.com/originals/0d/26/fd/0d26fd531a191bdf6659fd0b9ef4c73c.png",
    keeperChairUrl: "https://cdn4.iconfinder.com/data/icons/knight/512/as416g_7-512.png",
    crown: "https://vignette.wikia.nocookie.net/clubpenguin/images/e/e5/King%27s_Crown_clothing_icon_ID_667.png/revision/latest/scale-to-width-down/537?cb=20141117234124"
}

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.userLevel = this.userLevel.bind(this)
        this.renderWithItem = this.renderWithItem.bind(this)
        this.eachTypeForItem = this.eachTypeForItem.bind(this)
        this.keeperView = this.keeperView.bind(this)
        this.levelUpPointForUser = this.levelUpPointForUser.bind(this)
    }

    componentDidMount() {
        this.props.fetchUsers()
    }

    render() {
        const { ownKingdom, main, users, type } = this.props
        if(!main || !users[0]) return null
        const kingdomKing = !ownKingdom ? null : users.find(user => user.id === ownKingdom.king)
        const profileOf = this.eachTypeFor(main, type)
        return (
            <div style={{fontWeight: 'bold'}}>
                <div style={{ height: '3vh' }} />
                <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: 'auto', marginRight: 'auto', maxWidth: '700px' }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ flex: '0 5' }}>
                                {
                                    !ownKingdom ? null : (
                                        <Link to={`/profile/kingdoms/${ownKingdom.id}`}>
                                            <img
                                                src={!kingdomMark[ownKingdom.name]
                                                    ? kingdomMark.undefinedKingdom[2]
                                                    : kingdomMark[ownKingdom.name]}
                                                style={{ maxWidth: '13vw', position: 'fixed', margin: '4vh 0 0 15px', maxHeight: '9vh' }}
                                            />
                                        </Link>                                        
                                    )
                                }
                                <img
                                    src={hardCoding.flagBackgroundImgUrl}
                                    style={{ maxWidth: '25vw', maxHeight: '18vh' }}
                                />
                            </div>
                            <div style={{ flex: '0 1', textAlign: 'center' }}>
                                {!ownKingdom ? null : ownKingdom.name}
                            </div>
                        </div>
                    </div>
                    <div style={{ flex: 2, textAlign: 'center' }}>
                        <h2>{profileOf[type].name}</h2>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'column'}}>
                            <div style={{ flex: '0 5' }}>
                                {
                                    !kingdomKing ? null : (
                                        <Link to={`/profile/users/${kingdomKing.id}`}>
                                            <img
                                                src={userClass.King}
                                                style={{maxWidth: '17vw', position: 'fixed', margin: '4vh 0 0 10px', maxHeight: '9vh'}}
                                            />
                                        </Link>
                                    )
                                }
                                <img
                                    src={hardCoding.flagBackgroundImgUrl}
                                    style={{ maxWidth: '25vw', right: 0, maxHeight: '18vh' }}
                                />
                            </div>
                            <div style={{ flex: '0 1', textAlign: 'center' }}>
                                {!kingdomKing ? null : kingdomKing.username}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: 'center', flexWrap: 'wrap', marginLeft: 'auto', marginRight: 'auto', maxWidth: '700px' }}>
                    {
                        type === "user" &&
                        main.id === this.props.user.id
                            ? this.changeKingdom()
                            : null
                    }
                    {
                        type !== "establishment"
                            ? null
                            : this.keeperView(main, users)
                    }
                    {
                        type === "kingdom" && 
                        main.king === this.props.user.id
                            ? this.changeShield()
                            : null
                    }
                    <img
                        src={profileOf[type].image}
                        style={{ maxWidth: '85vw', height: '45vh' }}
                    />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <span>Level : {profileOf[type].level}</span>
                    <div>{profileOf[type].point} / {profileOf[type].levelUpPoints}</div>
                    <span>{profileOf[type].point} / {profileOf[type].levelUpPoints}</span>
                </div>
                <div style={{ height: '2vh' }}/>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: 'auto', marginRight: 'auto', maxWidth: '700px' }}>
                    {this.renderWithItem(main, type)}
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Link to='/dashboard'>
                        <img src={swordSingleButton} />
                    </Link>
                </div>
            </div>
        )
    }

    changeShield(){
        return (
            <div style={{ position: 'fixed', bottom: '31vh' }}>
                <Link to='/changeShield' >
                    <img style={{ maxWidth: '25vw', maxHeight: '20vh' }} src={hardCoding.crown}/>
                </Link>
            </div>
        )
    }

    changeKingdom(){
        return (
            <div style={{ position: 'fixed', bottom: '33vh' }}>
                <Link to='/changeKingdom' >
                    <img style={{ maxWidth: '25vw', maxHeight: '20vh' }} src={changeKingdom}/>
                </Link>
            </div>
        )
    }

    keeperView(main, users){
        const keeper = users.find(user => user.id === main.keeper)
        return !main.keeper ?
        (
            <div style={{ position: 'fixed', bottom: '31vh', marginLeft: '2vw' }}>
                <div>
                    <span>No Keeper</span>
                </div>
                <img
                    src={hardCoding.keeperChairUrl}
                    style={{ maxWidth: '45vw', maxHeight: '20vh' }}
                />
            </div>
        ) :
        (
            <div style={{ position: 'fixed', bottom: '31vh', marginLeft: '2vw' }}>
                <div>
                    <span>Keeper : {keeper.username}</span>
                </div>
                <Link to={`/profile/users/${main.keeper}`}>
                    <img
                        src={userClass[this.userLevel(keeper.id)]}
                        style={{ maxWidth: '45vw', maxHeight: '20vh' }}
                    />
                </Link>
            </div>
        )
    }

    renderWithItem(main, type) {
        const itemOf = this.eachTypeForItem(main, type)
        return ["item1", "item2", "item3"].map(item => (
                <div key={item} style={{ flex: 1, textAlign: 'center'}}>
                    <div>
                        <Link to={`/items/${type}s/${main.id}/${item}`}>
                            <img
                                src={itemOf[type][item].image}
                                style={{ width: '10vw', maxHeight: '5vh' }}
                            />
                        </Link>
                    </div>
                    <div>
                        <span>{itemOf[type][item].title}</span>
                    </div>
                    <div>
                        <span>{itemOf[type][item].result}</span>
                    </div>
                </div>
            )
        )
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

    levelUpPointForUser(main){
        const { users, kingdoms } = this.props
        const ownKingdom = !main.kingdom ? 0 : kingdoms.find(kingdom => kingdom.id === main.kingdom.id)
        const kingdomKing = !ownKingdom ? null : users.find(user => user.id === ownKingdom.king)
        if (!!ownKingdom && !!users[0] && !!kingdomKing) {
            return {
                King: main.experience,
                Lord: kingdomKing.experience,
                Knight: kingdomKing.experience > 500 ? 500 : kingdomKing.experience,
                ["Shepard" && "Stone Mason"]: kingdomKing.experience > 100 ? 100 : kingdomKing.experience,
            }
        }
        return {}
    }

    eachTypeFor(main, type){
        const { users, establishments, kingdoms } = this.props
        const levelUpPointForUser = this.levelUpPointForUser(main)
        return {
            user: type !== "user" ? null : {
                name: main.username,
                image: userClass[this.userLevel(main.id)],
                point: main.experience,
                level: this.userLevel(main.id),
                levelUpPoints: !levelUpPointForUser[this.userLevel(main.id)] ? 0 : levelUpPointForUser[this.userLevel(main.id)],
                style: { maxWidth: '85vw', maxHeight: '50vh' }
            },
            kingdom: type !== "kingdom" ? null : {
                name: main.name,
                image: !kingdomMark[main.name] ? kingdomMark.undefinedKingdom[2] : kingdomMark[main.name],
                point: main.power,
                level: "Great Kingdom",
                levelUpPoints: kingdoms.reduce((accu, curr) => curr.power >= accu ? curr.power : accu, 0),
                style: { maxWidth: '85vw', maxHeight: '45vh' }
            },
            establishment: type !== "establishment" ? null : {
                name: main.name,
                image: !main.allegiance ? estCastle.none : !estCastle[main.allegiance] ? estCastle.undefinedKingdom : estCastle[main.allegiance],
                point: users.find(user => user.id === this.props.user.id).checkins.reduce((accu, curr) => curr.establishmentId === main.id ? accu + 1 : accu, 0),
                level: `Castle in ${main.kingdom}`,
                levelUpPoints: !users ? 0 : users.find(user => user.id === main.keeper).checkins.reduce((accu, curr) => curr.establishmentId === main.id ? accu + 1 : accu, 0),
                style: { maxWidth: '85vw', maxHeight: '45vh' }
            }
        }
    }

    eachTypeForItem(main, type){
        return {
            user: type !== "user" ? null : {
                item1: {
                    image: castle,
                    title: "Own Est.",
                    result: this.props.establishments
                        .filter(establishment => establishment.keeper === main.id)
                        .length
                },
                item2: {
                    image: castle,
                    title: "Est. Found",
                    result: main.discover
                },
                item3: {
                    image: gem,
                    title: "Resources",
                    result: main.resources.length
                }
            },
            kingdom: type !== "kingdom" ? null : {
                item1: {
                    image: castle,
                    title: "Local Domains",
                    result: main.localDomain
                },
                item2: {
                    image: castle,
                    title: "Total Colonies",
                    result: main.colonies
                },
                item3: {
                    image: knight,
                    title: "Total Citizen",
                    result: main.users.length
                }
            },
            establishment: type !== "establishment" ? null : {
                item1: {
                    image: castle,
                    title: "Total Visit",
                    result: main.popularity
                },
                item2: {
                    image: castle,
                    title: "Total Attack",
                    result: 0
                },
                item3: {
                    image: knight,
                    title: "Total Visitors",
                    result: main.visitors
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
    let ownKingdom =
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
