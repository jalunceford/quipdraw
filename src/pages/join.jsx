import React from 'react'
import { Redirect } from 'react-router-dom'
import socket from "../socketConfig";
import firebase from '../firebase.js';
import './styles.css';

class Join extends React.Component {

    constructor() {
      super();
      this.state = {code: '', name: '', hasJoined: false};
    }

    componentDidMount() {
      socket.on("joinCompleted", () => {
        this.setState({hasJoined: true});
      });
    }
    
    joinGroup = () => {
      const db = firebase.firestore();
      let docRef = db.collection("rooms").where("code", "==", this.state.code);
      docRef.get().then((querySnapshot) => {
        if (!querySnapshot.empty) {
          docRef.get().then((querySnapshot) => {
            querySnapshot.docs.forEach((snapshot) => {
              snapshot.ref.collection("players").add({name: this.state.name, score: 0}).then(() => {
                socket.emit("joinGroup", this.state.code);
              });
            });
          });
        }
        else {
          alert("no group with that code exists!");
        }
      });
    }
  
    updateName = (event) => {
      this.setState({name: event.target.value});
    }

    updateCode = (event) => {
      this.setState({code: event.target.value});
    }
  
    render() {
      return (
        <div>
          <div className="vert">
            <div className="center">
              <label for="code" id="l1">Room Code:</label>
              <input type="text" id="code" onChange={this.updateCode}/>
            </div>
            <div className="center">
              <label for="name" id="l2">Name</label>
              <input type="text" id="name" onChange={this.updateName}/>
            </div>
            <div className="center">
              <button id="Done2" onClick={this.joinGroup}>Done</button>
            </div>
          </div>
            { this.state.hasJoined ? <Redirect to={{pathname: '/room', state: { code: this.state.code, name: this.state.name, hasCreated: false}}}/> : null }
        </div>
      )
    }
  }

  export default Join;