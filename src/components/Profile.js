import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../store'
import { gem, swordSingleButton, userClass, kingdomMark, wolfShield, castle, castleTower, markersImages, knight, estCastle } from '../Assets'

const hardCoding = {
    flagBackgroundImgUrl: "https://i.pinimg.com/originals/0d/26/fd/0d26fd531a191bdf6659fd0b9ef4c73c.png",
    keeperChairUrl: "https://cdn4.iconfinder.com/data/icons/knight/512/as416g_7-512.png",
    flagKingFaceImgurl: "https://d1u5p3l4wpay3k.cloudfront.net/rlesports_gamepedia_en/thumb/8/82/Kings_of_Urbanlogo_square.png/300px-Kings_of_Urbanlogo_square.png?version=14a3c8a996adc00855afc2399be68e91",
}

const profileOf = {
    user: {
        pointFor: "experience",
    },
    kingdom: {
        pointFor: "power",
        level: "Great Kingdom",
    },
    establishment: {
        pointFor: "popularity",
        level: "Castle"
    }
}

export class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.userLevel = this.userLevel.bind(this)
        this.renderWithItem = this.renderWithItem.bind(this)
        this.levelUpPoints = this.levelUpPoints.bind(this)
        this.eachTypeForItem = this.eachTypeForItem.bind(this)
    }

    componentDidMount() {
        this.props.fetchUsers()
    }

    render() {
        console.log(this.props)
        const { ownKingdom, main, users, type } = this.props
        const points = profileOf[type].pointFor
        if(!main) return null
        const kingdomKing = !ownKingdom ? null : users.find(user => user.id === ownKingdom.king)
        const levelUpPoints = this.levelUpPoints(main, kingdomKing)
        const level = type !== "user" ? profileOf[type].level : !!kingdomKing ? this.userLevel(main, kingdomKing) : null
        const keeper = type === "establishment" ? users.find(user => user.id === main.keeper) : null
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
                            <Link to={`/profile/kingdoms/${!ownKingdom ? null : ownKingdom.id}`}>
                                <img
                                    src={!ownKingdom ? null : !kingdomMark[!ownKingdom ? null : ownKingdom.name]
                                        ? kingdomMark.undefinedKingdom[2]
                                        : kingdomMark[!ownKingdom ? null : ownKingdom.name]}
                                    style={{ width: '13vw', position: 'absolute', left: '4.5vw', top: '8vh' }}
                                />
                            </Link>
                            <span style={{ width: '13vw', position: 'absolute', left: '3vw', top: '20vh' }}>
                                {!ownKingdom ? null : ownKingdom.name}
                            </span>
                        </div>
                    </div>
                    <div style={{ flex: 2, textAlign: 'center' }}>
                        <div style={{ height: '5vh' }} />
                        <h2>{type === "user" ? main.username : main.name}</h2>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div>
                            <img
                                src={hardCoding.flagBackgroundImgUrl}
                                style={{ width: '25vw', right: 0 }}
                            />
                            <Link to={`/profile/users/${!kingdomKing ? null : kingdomKing.id}`}>
                                <img
                                    src={!kingdomKing ? null : userClass.King}
                                    style={{width: '17vw', position: 'absolute', right: '5vw', top : '7vh'}}
                                />
                            </Link>
                            <span style={{ width: '13vw', position: 'absolute', right: '11vw', top: '20vh' }}>
                                {!kingdomKing ? null : kingdomKing.username}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ textAlign: 'center' }}>
                        <img
                            src={
                                type === "user"
                                    ? userClass[level]
                                    : type === "kingdom"
                                        ? !kingdomMark[main.name] ? kingdomMark.undefinedKingdom[2] : kingdomMark[main.name]
                                        : !main.allegiance
                                            ? estCastle.none
                                            : !estCastle[main.allegiance]
                                                ? estCastle.undefinedKingdom
                                                : estCastle[main.allegiance]
                            }
                            style={{ width: '75vw', height: '80vw' }}
                        />
                        {
                            type !== "establishment" ?
                                null : !main.keeper ?
                                    (
                                        <div style={{ position: 'absolute', top: '41vh', left: '10vw' }}>
                                            <div>
                                                <span>No Keeper</span>
                                            </div>
                                            <img src={hardCoding.keeperChairUrl} style={{ width: '45vw' }} />
                                        </div>
                                    ) :
                                    (
                                        <div style={{ position: 'absolute', top: '40vh', left: '10vw' }}>
                                            <div>
                                                <span>Keeper : {!keeper ? null : keeper.username}</span>
                                            </div>
                                            <Link to={`/profile/users/${main.keeper}`}>
                                                <img
                                                    src={userClass[this.userLevel(keeper, kingdomKing)]}
                                                    style={{ width: '45vw' }}
                                                />
                                            </Link>
                                        </div>
                                    )
                        }
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <span>Level : {level}</span>
                    <div>{main[points]} / {levelUpPoints}</div>
                    <span>{main[points]} / {levelUpPoints}</span>
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

    levelUpPoints(main, kingdomKing){
        const { type, kingdoms, establishments } = this.props
        return type === 'kingdom' 
            ? kingdoms.reduce((accu, curr) => curr.power >= accu ? curr.power : accu, 0)
            : type === 'establishment'
                ? establishments.reduce((accu, curr) => curr.popularity >= accu ? curr.popularity : accu, 0)
                : !kingdomKing
                    ? 0
                    : kingdomKing.experience
    }

    userLevel(main, kingdomKing){
        console.log(main, this.props.ownKingdom)
        const points = main.experience
        const howManyEstablishments = this.props.establishments
            .filter(establishment => establishment.kingdom === establishment.allegiance && establishment.allegiance === main.name)
            .length
        const amIKing = !kingdomKing ? false : !kingdomKing.id ? true : kingdomKing.id === main.id
        if (amIKing) return "King"
        if (points < 100) {
            if (howManyEstablishments < 20) return "Shepard"
            return "Stone Mason"
        } else if (points < 500) {
            return "Knight"
        }
        return "Lord"
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
