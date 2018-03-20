import React, { Component } from 'react';
import { Router, Switch, Route, withRouter } from 'react-router-dom'

import { About, Home, HomeDash, YourProfile, TopKingdoms, SingleEstablishmentView } from './index'

const Pipeline = () => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/dashboard' component={HomeDash} />
        <Route path='/topKingdoms' component={TopKingdoms} />
        <Route path='/yourProfile' component={YourProfile} />
        <Route path='/about' component={About} />
        <Route path='/singleEstablishment/:id' component={SingleEstablishmentView} />
    </Switch>
)

export default Pipeline
