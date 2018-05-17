import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { About, Home, HomeDash, Profile, SingleEstablishmentView, LeaderBoard, ItemList, ChangeKingdom, ChangeShield } from './components'
import { me, fetchEstablishments, fetchCheckins, fetchKingdoms, setLocationThunk, createCheckin, paintEstablishment } from './store';
import socket from './sockets'

/**
 * COMPONENT
 */
class Pipeline extends Component {
    componentDidMount () {
        
        socket.on('new-checkIn', checkIn => {
            this.props.createCheckin(checkIn)
        })
        socket.on('paint-new-establishment', establishment => {
            this.props.paintEstablishment(establishment)
        })

        this.props.loadInitialData()
        this.props.setLocation()
    }

    render () {
        const { isLoggedIn } = this.props
        return (
            <Switch>
                {/* Routes placed here are available to all visitors */}
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                {
                    isLoggedIn &&
                    <Switch>
                        {/* Routes placed here are only available after logging in */}
                        <Route path="/dashboard" component={HomeDash} />
                        <Route path="/dashboard#_=_" component={HomeDash} />
                        <Route path="/profile/users/:user" component={Profile} />
                        <Route path="/profile/kingdoms/:kingdom" component={Profile} />
                        <Route path="/profile/establishments/:establishment" component={Profile} />
                        <Route path="/items/users/:user/:item" component={ItemList} />
                        <Route path="/items/kingdoms/:kingdom/:item" component={ItemList} />
                        <Route path="/items/establishments/:establishment/:item" component={ItemList} />
                        <Route path="/singleEstablishment/:id" component={SingleEstablishmentView} />
                        <Route path="/leaderboard" component={LeaderBoard} />
                        <Route path="/changeKingdom" component={ChangeKingdom} />
                        <Route path="/changeShield" component={ChangeShield} />
                    </Switch>
                }
                {/* Displays our Home component as a fallback */}
                <Route component={Home} />
            </Switch>
        )
    }
}

/**
 * CONTAINER
 */
const mapProps = ({ user }) => {
    return {
        // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
        // Otherwise, state.user will be an empty object, and state.user.id will be falsey
        isLoggedIn: !!user.id,
    }
}

const mapDispatch = dispatch => {
    return {
        loadInitialData () {
            dispatch(me())
            dispatch(fetchEstablishments())
            dispatch(fetchCheckins())
            dispatch(fetchKingdoms())
        },
        setLocation(){
            dispatch(setLocationThunk())
        },
        createCheckin(checkIn){
            dispatch(createCheckin(checkIn))
        },
        paintEstablishment(establishment){
            dispatch(paintEstablishment(establishment))
        }      
    }
}
  
// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapProps, mapDispatch)(Pipeline))

/**
 * PROP TYPES
 */
Pipeline.propTypes = {
    loadInitialData: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
}
