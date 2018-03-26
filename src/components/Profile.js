import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../store'
import { userClass, kingdomMark, wolfShield, castle, castleTower } from '../Assets'

const hardCoding = {
    flagBackgroundImgUrl: "https://i.pinimg.com/originals/0d/26/fd/0d26fd531a191bdf6659fd0b9ef4c73c.png",
    keeperChairUrl: "https://cdn4.iconfinder.com/data/icons/knight/512/as416g_7-512.png",
    xButton: "http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/ultra-glossy-silver-buttons-icons-alphanumeric/075091-ultra-glossy-silver-button-icon-alphanumeric-x-styled.png",
    flagKingFaceImgurl: "https://d1u5p3l4wpay3k.cloudfront.net/rlesports_gamepedia_en/thumb/8/82/Kings_of_Urbanlogo_square.png/300px-Kings_of_Urbanlogo_square.png?version=14a3c8a996adc00855afc2399be68e91",
}

export class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.userLevel = this.userLevel.bind(this)
        this.renderWithItem = this.renderWithItem.bind(this)
    }

    componentDidMount(){
        this.props.fetchUsers()
    }

    render(){
        console.log(this.props)
        const kingdomKing = !this.props.ownKingdom ? null : this.props.ownKingdom.users.reduce((accu, curr) => curr > accu)
        const whatProfile = this.props.one
        const points = whatProfile === "user" ? "experience" : whatProfile === "kingdom" ? "royalty" : "strength"
        const main = !this.props.main ? null : this.props.main
        const level = whatProfile === "user" ? this.userLevel(main, kingdomKing) : whatProfile === "establishment" ? "Castle" : "Great Kingdom"
        const levelUpPoints = 3000
        if(!main) return null
        const keeper = whatProfile === "establishment" ? this.props.users.find(user => user.id === main.keeper) : null
        return (
            <div>
                <div style={{height: '3vh'}}/>
                <div style={{display: 'flex'}}>
                    <div style={{flex: 1}}>
                        <div>
                            <img
                                src={hardCoding.flagBackgroundImgUrl}
                                style={{width:'25vw', left: 0}}
                            />
                            <Link to={`/profile/kingdoms/${!main.kingdom ? main.id : main.kingdom.id}`}>
                                <img
                                    src={
                                        !main.kingdom
                                            ? kingdomMark[main.name]
                                            : whatProfile === "user"
                                                ? kingdomMark[main.kingdom.name]
                                                : kingdomMark[main.kingdom]
                                    }
                                    style={{width: '13vw', position: 'absolute', left: '4.5vw', top: '8vh'}}
                                />
                            </Link>
                            <span style={{width: '13vw', position: 'absolute', left: '3vw', top: '20vh'}}>
                                {whatProfile === 'establishment' ? main.kingdom : !main.kingdom ? main.name : main.kingdom.name}
                            </span>
                        </div>
                    </div>
                    <div style={{flex: 2, textAlign: 'center'}}>
                        <div style={{height: '5vh'}}/>
                        <h2>
                            {
                                whatProfile === "user"
                                    ? main.username
                                    : main.name
                            }
                        </h2>
                    </div>
                    <div style={{flex: 1}}>
                        <div>
                            <img
                                src={hardCoding.flagBackgroundImgUrl}
                                style={{width:'25vw', right: 0}}
                            />
                            <Link to={`/profile/users/${!kingdomKing ? null : kingdomKing.id}`}>
                                <img
                                    src={hardCoding.flagKingFaceImgurl}
                                    style={{width: '18vw', position: 'absolute', right: '5vw', top : '6vh'}}
                                />
                            </Link>
                            <span style={{width: '13vw', position: 'absolute', right: '11vw', top: '20vh'}}>
                                {!kingdomKing ? null : kingdomKing.username}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{textAlign: 'center'}}>
                        <img
                            src={
                                whatProfile === "user"
                                    ? userClass[level]
                                    : whatProfile === "establishment"
                                        ? castleTower
                                        : kingdomMark[main.name]
                            }
                            style={{width: '75vw', height: '80vw'}}
                        />
                        {
                            !main.latitude ?
                            null : !main.keeper ?
                            (
                            <div style={{position: 'absolute', top: '41vh', left: '10vw'}}>
                                <div>
                                    <span>No Keeper</span>
                                </div>
                                <img src={hardCoding.keeperChairUrl} style={{width: '45vw'}}/>
                            </div>
                            ) :
                            (
                            <div style={{position: 'absolute', top: '40vh', left: '10vw'}}>
                                <div>
                                    <span>Keeper : {!keeper ? null : keeper.username}</span>
                                </div>
                                <Link to={`/profile/users/${main.keeper}`}>
                                    <img
                                        src={userClass[this.userLevel(keeper, kingdomKing)]}
                                        style={{width: '45vw'}}
                                    />
                                </Link>
                            </div>
                            )
                        }
                    </div>
                </div>
                <div style={{textAlign: 'center'}}>
                    <span>Level : {level}</span>
                    <div>{!main[points] ? 0 : main[points]} / {levelUpPoints}</div>
                    <span>{!main[points] ? 0 : main[points]} / {levelUpPoints}</span>
                </div>
                <div>
                    {
                        !main.id ? null : this.renderWithItem(main, whatProfile)
                    }
                </div>
                <div style={{textAlign: 'center'}}>
                    <Link to='/dashboard'>
                        <img src={hardCoding.xButton} style={{width: '11vw', height: '11vh'}}/>
                    </Link>
                </div>
            </div>
        )
    }

    renderWithItem(main, whatProfile){
        return (
            <div style={{display: 'flex'}}>
                <div style={{flex: 1, textAlign: 'center'}}>
                    <div>
                        <img src={castle} style={{width: '10vw', height: '5vh'}}/>
                    </div>
                    <div>
                        <span>
                            {
                                whatProfile === "kingdom"
                                    ? "Total Est."
                                    : whatProfile === "user"
                                        ? "Own Est."
                                        : "Total Visit"
                            }
                        </span>
                    </div>
                    <div>
                        <span>
                            {
                                whatProfile === "kingdom"
                                    ? main.establishments.length
                                    : whatProfile === "user"
                                        ? main.checkins
                                            .filter(checkin =>
                                                this.props.establishments
                                                    .find(establishment =>
                                                        establishment.id === checkin.establishmentId
                                                        && establishment.keeper === main.id)
                                                    )
                                            .length
                                        : main.checkins.reduce((accu, curr) => accu + curr.quantity, 0)
                            }
                        </span>
                    </div>
                </div>
                <div style={{flex: 1, textAlign: 'center'}}>
                    <div>
                        <img src={castle} style={{width: '10vw', height: '5vh'}}/>
                    </div>
                    <div>
                        <span>
                            {
                                whatProfile === "kingdom"
                                    ? "Total Colo."
                                    : whatProfile === "user"
                                        ? "Est. Found"
                                        : "Total Attect"
                            }
                        </span>
                    </div>
                    <div>
                        <span>
                            {
                                whatProfile === "kingdom"
                                    ? 0
                                    : whatProfile === "user"
                                        ? main.checkins.length
                                        : null
                            }
                        </span>
                    </div>
                </div>
                <div style={{flex: 1, textAlign: 'center'}}>
                    <div>
                        <img src={castle} style={{width: '10vw', height: '5vh'}}/>
                    </div>
                    <div>
                        <span>
                            {
                                whatProfile === "user" ? "Resources" : "Total People"
                            }
                        </span>
                    </div>
                    <div>
                        <span>
                            {
                                whatProfile === "kingdom"
                                    ? main.users.length
                                    : whatProfile === "user"
                                        ? main.resources.length
                                        : main.checkins.length
                            }
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    userLevel(main, kingdomKing){
        const points = !main ? 0 : main.experience
        const howManyEstablishments = !this.props.ownKingdom ? 0 : this.props.ownKingdom.establishments.length
        const amIKing = !main ? false : !kingdomKing ? false : kingdomKing.id === main.id
        if(amIKing) return "King"
        if (points < 100) {
            if (howManyEstablishments < 20) return "Shepard"
            return "Stone Mason"
        } else if (points < 500) {
            return "Knight"
        } else {
            return "Lord"
        }
    }
}

const mapProps = (state, ownProps) => {
    const one = Object.keys(ownProps.match.params)[0]
    const paramId = +ownProps.match.params[one]
    const main = state[`${one}s`].find(each => each.id === paramId)
    if(!main) return { one }
    const ownKingdom =
        one === "kingdom"
            ? main
            : state.kingdoms.find(kingdom => {
                const compare = !main.kingdom ? null : one === "user" ? main.kingdom.name : main.kingdom
                return kingdom.name === compare
            })
    return {
        one,
        main,
        ownKingdom,
        checkins: state.checkins,
        users: state.users,
        establishments: state.establishments,
    }
}

const mapDispatch = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapProps, mapDispatch)(Profile)
