import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import store from './store'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Router } from 'react-router-dom'
import history from './history'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme(
  {
    "appBar": {
        "padding": 40,
        "color": "#9e9e9e",
        "transparent": "true",
        "textColor": "#673ab7",
        "titleFontWeight": 600,
        "height": 60
    },
    "bottomNavigation": {
        "selectedColor": "#673ab7",
        "unselectedColor": "#7c4dff",
        "backgroundColor": "#9e9e9e"
    }
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
  <Provider store={store}>
    {/* <Router history={history}> */}
     <App />
    {/* </Router> */}
  </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
