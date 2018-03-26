import React from 'react';
import { connect } from 'react-redux'
import { Router, Route, withRouter, Switch } from 'react-router-dom'
import history from '../history'
import { About, Home, HomeDash, Profile, TopKingdoms, SingleEstablishmentView } from './index'

const Pipeline = (props) => (

    <Router history={history}>
        <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/test" component={HomeDash} />
            {
                props.isLoggedIn &&
                <Switch>
                    {/* Routes placed here are only available after logging in */}
                    <Route path="/dashboard" component={HomeDash} />
                    <Route path="/topKingdoms" component={TopKingdoms} />
                    <Route path="/profile/users/:user" component={Profile} />
                    <Route path="/profile/kingdoms/:kingdom" component={Profile} />
                    <Route path="/profile/establishments/:establishment" component={Profile} />
                    <Route path="/singleEstablishment/:id" component={SingleEstablishmentView} />
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
