import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const hardCoding = {
    flagBackgroundImgUrl: "https://i.pinimg.com/originals/0d/26/fd/0d26fd531a191bdf6659fd0b9ef4c73c.png",
    keeperChairUrl: "https://cdn4.iconfinder.com/data/icons/knight/512/as416g_7-512.png",
    xButton: "http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/ultra-glossy-silver-buttons-icons-alphanumeric/075091-ultra-glossy-silver-button-icon-alphanumeric-x-styled.png",
    flagKingFaceImgurl: "https://cdn.pixabay.com/photo/2016/08/06/14/11/lion-1574448_960_720.png",
    user: {
        id: 1,
        name: "Dongwoo Kang",
        imgUrl: "https://i.imgur.com/I8rXtBd.png",
        level: "Knight",
        points: 200,
        kingdom: {
            name: "Lynbrook",
            imgUrl: "http://leightronix.com/customers/images/lynbrook/Lynbrook_Logo.png",
            king: {
                id: 1,
                name: "Dongwoo Kang"
            }
        }
    },
    establishment: {
        id: 1,
        name: "Liquor & Wine Warehouse",
        address: "343 Rockaway Tpke Lawrence, NY 11559",
        imgUrl: "https://d30y9cdsu7xlg0.cloudfront.net/png/8172-200.png",
        level: "Castle",
        points: 20,
        totalVisit: 210,
        totalAttect: 100,
        keeper: 
        // null,
        {
            id: 1,
            name: "Dongwoo Kang",
            imgUrl: "https://elwiki.net/wiki/images/thumb/e/ef/Lord_Knight.png/500px-Lord_Knight.png",    
        },
        kingdom: {
            id: 1,
            name: "Lynbrook",
            imgUrl: "http://leightronix.com/customers/images/lynbrook/Lynbrook_Logo.png",
            king: {
                name: "Dongwoo Kang"
            }
        }
    },
    kingdom: {
        id: 1,
        name: "Lynbrook",
        imgUrl: "http://leightronix.com/customers/images/lynbrook/Lynbrook_Logo.png",
        level: "Great Kingdom",
        points: 2000,
        king: {
            id: 1,
            name: "Dongwoo Kang"
        }
    }
}

export class Profile extends React.Component {
    constructor(props) {
        super(props)
        // this.renderUser = this.renderUser.bind(this)

    }

    render(){
        // please pass main={'user', 'establishment', or 'kingdom'}
        const example = this.props.one
        const main = !this.props.main ? hardCoding[example] : this.props.main
        const levelUpPoints = 3000
        return (
            <div>
                <div style={{height: '5vh'}}/>
                <div style={{display: 'flex'}}>
                    <div style={{flex: 1}}>
                        <div>
                            <img
                                src={hardCoding.flagBackgroundImgUrl}
                                style={{width:'25vw', left: 0}}
                            />
                            <Link to={`/profile/kingdoms/${!main.kingdom ? main.id : main.kingdom.id}`}>
                                <img
                                    src={!main.kingdom ? main.imgUrl : main.kingdom.imgUrl}
                                    style={{width: '13vw', position: 'absolute', left: '4.5vw', top: '10vh'}}
                                />
                            </Link>
                        </div>
                        {/* <span>{main.kingdom.name}</span> */}
                    </div>
                    <div style={{flex: 2, textAlign: 'center'}}>
                        <h3>{main.name}</h3>
                    </div>
                    <div style={{flex: 1}}>
                        <div>
                            <img
                                src={hardCoding.flagBackgroundImgUrl}
                                style={{width:'25vw', right: 0}}
                            />
                            <Link to={`/profile/users/${!main.kingdom ? main.king.id : main.kingdom.king.id}`}>
                                <img
                                    src={hardCoding.flagKingFaceImgurl}
                                    style={{width: '13vw', position: 'absolute', right: '7.5vw', top : '8vh'}}
                                />
                            </Link>
                        </div>
                        {/* <span>{main.kingdom.king.name}</span> */}
                    </div>
                </div>
                <div>
                    <div style={{textAlign: 'center'}}>
                        <img src={main.imgUrl} style={{width: '75vw', height: '80vw'}}/>
                        {
                            !main.address ?
                            null : !main.keeper ?
                            (
                            <div style={{position: 'absolute', top: '44vh'}}>
                                <img src={hardCoding.keeperChairUrl} style={{width: '45vw'}}/>
                            </div>
                            ) :
                            (
                            <div style={{position: 'absolute', top: '47vh'}}>
                                <Link to={`/profile/users/${main.keeper.id}`}>
                                    <img src={main.keeper.imgUrl} style={{width: '45vw'}}/>
                                    {/* <h5>{main.keeper.name}</h5> */}
                                </Link>
                            </div>
                            )
                        }
                    </div>
                </div>
                <div style={{textAlign: 'center'}}>
                    <span>Level : {main.level}</span>
                    <div>{main.points} / {levelUpPoints}</div>
                    <span>{main.points} / {levelUpPoints}</span>
                </div>
                <div>
                    {
                        // main.map()
                    }
                </div>
                <div style={{textAlign: 'center'}}>
                    <Link to='/dashboard'>
                        <img src={hardCoding.xButton} style={{width: '12vw', height: '12vh'}}/>
                    </Link>
                </div>
            </div>
        )
    }

    // renderUser(){
    //     return(
    //         <div>
    //             <h3>Your Kimgdom: {user.kingdom}</h3>
    //             <h3>
    //                 Your Experience(total Pts): {
    //                     checkins
    //                         .filter(checkin => checkin.userId === user.id)
    //                         .reduce((accu, curr) => accu += curr.quality, 0)
    //                 }
    //             </h3>
    //             <h3>
    //                 Traveller-Diversity: 
    //             </h3>
    //             <h3>

    //             </h3>
    //         </div>
    //     )
    // }
}

const mapProps = ({ users, checkins, establishments, kingdoms }, ownProps) => {
    console.log('what is that? ', Object.keys(ownProps.match.params))
    const one = Object.keys(ownProps.match.params)[0]
    const paramId = ownProps.match.params[one]
    // const 
    console.log('look at it: ', one, paramId)
    return {
        one
    }
}

const mapDispatch = null

export default connect(mapProps, mapDispatch)(Profile)
