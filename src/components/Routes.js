import React, { Component } from 'react';
import { Router, Switch, Route, withRouter } from 'react-router-dom'

import { About, Home, HomeDash, Profile, TopKingdoms, SingleEstablishmentView } from './index'

const Pipeline = () => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/dashboard' component={HomeDash} />
        <Route path='/topKingdoms' component={TopKingdoms} />
        <Route path='/profile/users/:user' component={Profile} />
        <Route path='/profile/kingdoms/:kingdom' component={Profile} />
        <Route path='/profile/establishments/:establishment' component={Profile} />
        <Route path='/about' component={About} />
        <Route path='/singleEstablishment/:id' component={SingleEstablishmentView} />
    </Switch>
)

export default Pipeline
