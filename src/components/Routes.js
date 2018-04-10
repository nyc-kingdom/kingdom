import React from 'react';
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import history from '../history'
import { About, Home, HomeDash, Profile, SingleEstablishmentView, LeaderBoard, ItemList, ChangeKingdom, ChangeShield } from './index'

const Pipeline = (props) => (

    <Router history={history}>
        <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            {
                props.isLoggedIn &&
                <Switch>
                    {/* Routes placed here are only available after logging in */}
                    <Route path="/dashboard" component={HomeDash} />
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
        </Switch>
    </Router>
)

const mapProps = ({ user }) => {
    return {
      isLoggedIn: !!user.id
    }
};

export default connect(mapProps)(Pipeline)
