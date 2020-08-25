import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyCR-CT3Waz5YjcbUczlG3OrzA4Co5Y-xvw",
    authDomain: "quiplash-drawing-game.firebaseapp.com",
    databaseURL: "https://quiplash-drawing-game.firebaseio.com",
    projectId: "quiplash-drawing-game",
    storageBucket: "quiplash-drawing-game.appspot.com",
    messagingSenderId: "901366300288",
    appId: "1:901366300288:web:40d455c6c9b28af2997065",
    measurementId: "G-SVLHT6Y2WS"
  };
firebase.initializeApp(config);

export default firebase;