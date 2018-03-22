import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import store from './store'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';
import 'firebase/firestore';
import { createUser } from './db';
import { Router } from 'react-router-dom'
import history from './history'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const config = {
  apiKey: process.env.REACT_APP_FIRESTORE_API_KEY,
  messagingSenderId:
  process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  projectId: "game-of-hoods-fsa-1801",
  storageBucket: "game-of-hoods-fsa-1801.appspot.com",
  authDomain: "game-of-hoods-fsa-1801.firebaseapp.com",
  databaseURL: "https://game-of-hoods-fsa-1801.firebaseio.com"
}
firebase.initializeApp(config)
export const db = firebase.firestore();

// createUser()
// .then(function() {
//   console.log("Document successfully written!");
// })
// .catch(function(error) {
//   console.error("Error writing document: ", error);
// });

// db.collection("users").add({
//   first: "Alan",
//   middle: "Mathison",
//   last: "Turing",
//   born: 1912
// })
//   .then(function (docRef) {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch(function (error) {
//     console.error("Error adding document: ", error);
//   });

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
