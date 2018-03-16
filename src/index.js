import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import store from './store'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';
import 'firebase/firestore';
import {createUser} from './db';

const config = {
  apiKey:
  process.env.FIRESTORE_API_KEY || process.env.REACT_APP_FIRESTORE_API_KEY,
  //  || process.env.REACT_APP_FIREBASE_API_KEY,
  messagingSenderId:
  process.env.FIREBASE_MESSAGING_SENDER_ID || process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  //  ||
  // process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  projectId: "game-of-hoods-fsa-1801",
  storageBucket: "game-of-hoods-fsa-1801.appspot.com",
  authDomain: "game-of-hoods-fsa-1801.firebaseapp.com",
  databaseURL: "https://game-of-hoods-fsa-1801.firebaseio.com"
}
firebase.initializeApp(config)
export const db = firebase.firestore();

//createUser()
// .then(function() {
//   console.log("Document successfully written!");
// })
// .catch(function(error) {
//   console.error("Error writing document: ", error);
// });

// 


ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
