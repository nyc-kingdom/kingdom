import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App';
import registerServiceWorker from './registerServiceWorker'

// establishes socket connection
import './sockets'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
     <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
