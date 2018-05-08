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
            <div className='fit'>
                <div className='d-flex space'>
                    <div className='flex-one'>
                        <div>
                            {
                                !ownKingdom ? null : (
                                    <Link to={`/profile/kingdoms/${ownKingdom.id}`}>
                                        <img
                                            src={!kingdomMark[ownKingdom.name]
                                                ? kingdomMark.undefinedKingdom[2]
                                                : kingdomMark[ownKingdom.name]}
                                            className='header-img-shield'
                                        />
                                    </Link>                                        
                                )
                            }
                            <img src={hardCoding.flagBackgroundImgUrl} className='header-img-flag'/>
                        </div>
                        <div>
                            {!ownKingdom ? null : ownKingdom.name}
                        </div>
                    </div>
                    <div className='flex-two'>
                        <h2>{profileOf[type].name}</h2>
                    </div>
                    <div className='flex-one'>
                        <div>
                            {
                                !kingdomKing ? null : (
                                    <Link to={`/profile/users/${kingdomKing.id}`}>
                                        <img src={userClass.King} className='header-img-king'/>
                                    </Link>
                                )
                            }
                            <img
                                src={hardCoding.flagBackgroundImgUrl}
                                style={{ maxWidth: '25vw', right: 0, maxHeight: '18vh' }}
                            />
                        </div>
                        <div>
                            {!kingdomKing ? null : kingdomKing.username}
                        </div>
                    </div>
                </div>
                <div>
                    {type === "user" && main.id === this.props.user.id ? this.changeOne("Kingdom") : null}
                    {type === "establishment" ? this.keeperView(main, users) : null}
                    {type === "kingdom" &&  main.king === this.props.user.id ? this.changeOne("Shield") : null}
                    <img src={profileOf[type].image} style={{ maxWidth: '85vw', height: '45vh' }}/>
                </div>
                <div>Level : {profileOf[type].level}</div>
                <div>{profileOf[type].point} / {profileOf[type].levelUpPoints}</div>
                <div>{profileOf[type].point} / {profileOf[type].levelUpPoints}</div>
                <div className='d-flex space'>
                    {this.renderWithItem(main, type)}
                </div>
                <Link to='/dashboard'>
                    <img src={swordSingleButton} />
                </Link>
            </div>
        )
    }

    changeOne(one) {
        const source = one === "Shield" ? hardCoding.crown: changeKingdom
        return (
            <div className='change-one'>
                <Link to={`/change${one}`} >
                    <img className='change-one-img' src={source}/>
                </Link>
            </div>
        )
    }

    keeperView(main, users){
        const keeper = users.find(user => user.id === main.keeper)
        return (
            <div className='keeper-view'>
                <div>{!main.keeper ? "No Keeper" : `Keeper : ${keeper.username}`}</div>
                {
                    !main.keeper
                        ? <img src={hardCoding.keeperChairUrl} className='keeper-view-img'/>
                        : (
                        <Link to={`/profile/users/${main.keeper}`}>
                            <img src={userClass[this.userLevel(keeper.id)]} className='keeper-view-img'/>
                        </Link>
                        )
                }
            </div>
        )
    }

    renderWithItem(main, type) {
        const itemOf = this.eachTypeForItem(main, type)
        return ["item1", "item2", "item3"].map(item => (
                <div key={item} className='flex-one'>
                    <Link to={`/items/${type}s/${main.id}/${item}`}>
                        <img src={itemOf[type][item].image} className='item-img'/>
                    </Link>
                    <div>{itemOf[type][item].title}</div>
                    <div>{itemOf[type][item].result}</div>
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
                ["King" || "Lord"]: kingdomKing.experience,
                Knight: kingdomKing.experience > 500 ? 500 : kingdomKing.experience,
                ["Shepard" || "Stone Mason"]: kingdomKing.experience > 100 ? 100 : kingdomKing.experience,
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
            },
            kingdom: type !== "kingdom" ? null : {
                name: main.name,
                image: !kingdomMark[main.name] ? kingdomMark.undefinedKingdom[2] : kingdomMark[main.name],
                point: main.power,
                level: "Great Kingdom",
                levelUpPoints: kingdoms.reduce((accu, curr) => curr.power >= accu ? curr.power : accu, 0),
            },
            establishment: type !== "establishment" ? null : {
                name: main.name,
                image: !main.allegiance ? estCastle.none : !estCastle[main.allegiance] ? estCastle.undefinedKingdom : estCastle[main.allegiance],
                point: users.find(user => user.id === this.props.user.id).checkins.reduce((accu, curr) => curr.establishmentId === main.id ? accu + 1 : accu, 0),
                level: `Castle in ${main.kingdom}`,
                levelUpPoints: !main.keeper ? 0 : !users ? 0 : users.find(user => user.id === main.keeper).checkins.reduce((accu, curr) => curr.establishmentId === main.id ? accu + 1 : accu, 0),
            }
        }
    }

    eachTypeForItem(main, type){
        return {
            user: type !== "user" ? null : {
                item1: {
                    image: castle,
                    title: "Own Castles",
                    result: this.props.establishments
                        .filter(establishment => establishment.keeper === main.id)
                        .length
                },
                item2: {
                    image: castle,
                    title: "Castles Visit",
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
                    title: "Local Castles",
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
    if (!main || !state.kingdoms[0]) return { type, kingdoms: state.kingdoms }
    let ownKingdom = type === "kingdom" ? main : state.kingdoms.find(kingdom => {
        const compare = type === "user" ? main.kingdom.name : main.allegiance
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
