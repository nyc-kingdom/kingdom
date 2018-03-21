import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const hardCoding = {
    kingdomImgUrl: "https://i.pinimg.com/originals/0d/26/fd/0d26fd531a191bdf6659fd0b9ef4c73c.png",
    kingdomName: "No Kingdom",
    userName: "Dongwoo Kang",
    userImgUrl: "https://elwiki.net/wiki/images/thumb/e/ef/Lord_Knight.png/500px-Lord_Knight.png",
    keeperChairUrl: "https://banner.kisspng.com/20180208/wqw/kisspng-throne-chair-icon-throne-5a7c0d10b42472.6808909515180792487379.jpg",
    kingName: "No King",
    level: "Knight",
    points: 200,
    xButton: "http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/ultra-glossy-silver-buttons-icons-alphanumeric/075091-ultra-glossy-silver-button-icon-alphanumeric-x-styled.png",

}

export class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.renderUser = this.renderUser.bind(this)

    }



    render(){
        const main = this.props.main // please pass 'user', 'establishment', or 'kingdom'
        const levelUpPoints = 1000
        return (
            <div>
                <div>
                    <div>
                        <img src={!main.kingdom ? hardCoding.kingdomImgUrl : main.kingdom.imgUrl}/>
                        <h4>{!main.kingdom ? hardCoding.kingdomName : main.kingdom.name}</h4>
                    </div>
                    <div>
                        <h1>{!main.name ? hardCoding.userName : main.name}</h1>
                        <div>
                            <img src={!main.imgUrl ? hardCoding.userImgUrl : main.imgUrl}/>
                            {
                                !main.address ?
                                null : !main.keeper ?
                                <img src={hardCoding.keeperChairUrl}/> :
                                (
                                <div>
                                    <img scr={main.keeper.imgUrl}/>
                                    <h5>{main.keeper.name}</h5>
                                </div>
                                )
                            }
                        </div>
                    </div>
                    <div>
                        <img src={!main.kingdom ? hardCoding.kingdomImgUrl : main.kingdom.imgUrl}/>
                        <h4>{!main.kingdom ? hardCoding.kingName : main.king.name}</h4>
                    </div>
                </div>
                <div>
                    <h3>Level : {!main.level ? hardCoding.level : main.level}</h3>
                    <div>{!main.points ? hardCoding.points : main.points} / {levelUpPoints}</div>
                    <h3>{!main.points ? hardCoding.points : main.points} / {levelUpPoints}</h3>
                </div>
                <div></div>
                <div>
                    <Link to='/main'><img scr={hardCoding.xButton}/></Link>
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

const mapProps = ({ user, checkins }) => ({ user, checkins })

const mapDispatch = null

export default connect(mapProps, mapDispatch)(Profile)
