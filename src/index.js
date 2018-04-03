import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import store from './store'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let serverUrl;

if (process.env.NODE_ENV === "production") {
    serverUrl = 'https://kingdom-server.herokuapp.com'
} else {
    const port = 8080
    serverUrl = `http://localhost:${port}`
}
export {serverUrl}

ReactDOM.render(
  <Provider store={store}>
     <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
