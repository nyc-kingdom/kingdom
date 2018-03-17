import React, { Component } from 'react';
import {Router, Switch, Route, withRouter} from 'react-router-dom'


import  { HomeDash, YourProfile, TopKingdoms, SingleEstablishmentView } from './index'

const Pipeline = () => (
    <Switch>
        <Route exact path='/' component={HomeDash}/>
        <Route path='/topKingdoms' component={TopKingdoms}/>
        <Route path = '/yourProfile' component={YourProfile}/>
        <Route path = '/singleEstablishment/:id' component={SingleEstablishmentView}/>
    </Switch>
)

export default Pipeline