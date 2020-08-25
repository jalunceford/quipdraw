import React from 'react'
import { Redirect } from 'react-router-dom'
import socket from "../socketConfig";
import firebase from "../firebase";
import './styles.css';

class Create extends React.Component {

    constructor() {
      super();
      this.state = {code: '', name: '', hasCreated: false, words: [], hasGottenWords: false};
    }

    componentDidMount() {
      this.makeId();
      socket.on('hasCreatedGroup', () => {
        this.setState({hasCreated: true});
      });
      socket.on('hasGottenWords', (words) => {
        this.setState({words: words});
        this.setState({hasGottenWords: true});
      });
    }
  
    makeId = () => {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var charactersLength = characters.length;
      for ( var i = 0; i < 4; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      this.setState({code: result});
   }
  
    createGroup = () => {
      socket.emit("getWords", "getWords");
      if (this.state.hasGottenWords) {
        const db = firebase.firestore();
        db.collection("rooms").add({
          code: this.state.code,
          words: this.state.words
        }).then(() => {
          db.collection("rooms").where("code", "==", this.state.code).get().then((querySnapshot) => {
            querySnapshot.docs.forEach((snapshot) => {
              snapshot.ref.collection("players").add({name: this.state.name, score: 0}).then(() => {
                socket.emit("createGroup", this.state.code);
              });
            });
          });
        });
      }
    }
  
    updateName = (event) => {
      this.setState({name: event.target.value});
    }
  
    render() {
      return (
        <div>
          <div className="vert">
            <div className="center">
              <label for="code" id="l1">Room Code:</label>
              <input type="text" id="code" value={this.state.code} readonly/>
            </div>
            <div className="center">
              <label for="name" id="l2">Name</label>
              <input type="text" id="name" onChange={this.updateName}/>
            </div>
            <div className="center">
              <button id="Done1" onClick={this.createGroup}>Done</button>
            </div>
            { this.state.hasCreated && this.state.hasGottenWords ? <Redirect to={{pathname: '/room', state: {code: this.state.code, name: this.state.name, hasCreated: this.state.hasCreated}}}/> : null }
          </div>
        </div>
      )
    }
  }

  export default Create;