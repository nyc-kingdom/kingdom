import React, { Component } from 'react';
import { Router, Route, withRouter } from 'react-router-dom'
import history from '../history'

import { NewUser, About, Home, HomeDash, Profile, TopKingdoms, SingleEstablishmentView } from './index'

const Pipeline = () => (
    
    <Router history={history}>
        <div>

        <Route exact path='/' component={Home} />
        <Route path='/dashboard' component={HomeDash} />
        
        <Route path='/topKingdoms' component={TopKingdoms} />
        <Route path='/profile/users/:user' component={Profile} />
        <Route path='/profile/kingdoms/:kingdom' component={Profile} />
        <Route path='/profile/establishments/:establishment' component={Profile} />
        <Route path='/newUser' component={NewUser} />
        <Route path='/about' component={About} />
        <Route path='/singleEstablishment/:id' component={SingleEstablishmentView} />

        

        </div>
    </Router>
    
)

export default Pipeline
