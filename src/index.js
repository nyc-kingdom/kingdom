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

ReactDOM.render(
  <Provider store={store}>
    {/* <Router history={history}> */}
     <App />
    {/* </Router> */}
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
