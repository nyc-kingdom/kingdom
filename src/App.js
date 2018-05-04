import React from 'react';
import './App.css';

import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from './history'
import store from './store'

import Routes from './Routes'

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes/>
        </Router>
    </Provider>
  )
}

export default App
