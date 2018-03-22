<<<<<<< HEAD
import React from 'react';
import { connect } from 'react-redux';
=======
import React from 'react'
import { connect } from 'react-redux'
>>>>>>> master

export class Profile extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        const user = this.props && this.props.user
        const checkins = this.props && this.props.checkins
        return (
            <div>
                <p>Welcome to your profile page!</p>
                <h3>Your Kimgdom: {user.kingdom}</h3>
                <h3>
                    Your Level(total checkins): {
                        checkins
                            .filter(checkin => checkin.userId === user.id)
                            .reduce((accu, curr) => accu += curr.quality, 0)
                    }
                </h3>
            </div>
        )
    }
}

const mapProps = ({ user, checkins }) => ({ user, checkins })

const mapDispatch = null

export default connect(mapProps, mapDispatch)(Profile)
