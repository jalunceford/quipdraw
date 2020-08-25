import React from 'react'
import { Redirect } from 'react-router-dom'
import socket from "../socketConfig";
import firebase from '../firebase.js';
import './styles.css';

class Room extends React.Component {

        constructor(props) {
          super(props);
          this.state = {
            code: this.props.location.state.code,
            name: this.props.location.state.name,
            players: [],
            groupSize: 0,
            hasReceivedGroupSize: false,
            readyToRedirectToGame: false,
          };
        }
      
        componentDidMount() {
          const db = firebase.firestore();
          db.collection("rooms").where("code", "==", this.state.code).get().then((querySnapshot) => {
            querySnapshot.docs.forEach((snapshot) => {
              snapshot.ref.collection("players").onSnapshot((querySnapshot) => {
                querySnapshot.docs.forEach((snapshot) => {
                  if (!this.state.players.includes(snapshot.data().name)) {
                    this.setState(prevState => ({
                      players: [...prevState.players, snapshot.data().name]
                    }));
                  }
                });
              });
            });
          });

          socket.on("play", (groupSize) => {
            this.setState({groupSize: groupSize});
            this.setState({hasReceivedGroupSize: true});
            this.setState({readyToRedirectToGame: true});
          });
        }

        createGame = () => {
          const db = firebase.firestore();
          db.collection("rooms").where("code", "==", this.state.code).get().then((querySnapshot) => {
            querySnapshot.docs.forEach((snapshot) => {
              const docsArray = [];
              for (let i = 0; i < snapshot.data().words.length; i ++) {
                docsArray.push({round: i + 1, word: snapshot.data().words[i]});
              }
              const batch = db.batch();
              docsArray.forEach((doc) => {
                let docRef = snapshot.ref.collection("rounds").doc();
                batch.set(docRef, doc);
              });
              batch.commit().then(() => {
                socket.emit("play", this.state.code);
              });
            });
          });
        }

      
        render() {
          return (
            <div>
              <div className="center">
                <label for="playersList" id="label">Players who have joined the room:</label>
              </div>
              <div className="center">
                <ul id="playersList">
                  {this.state.players.map((player, idx) => {
                    return <li key={idx}>{player}</li> })}
                </ul>
              </div>
              <div className="center">
                <button type="button" id="play" onClick={this.createGame}>Play</button>
              </div>
              {this.state.readyToRedirectToGame && this.state.hasReceivedGroupSize ? <Redirect to={{pathname: '/game', state: {code: this.state.code, name: this.state.name, groupSize: this.state.groupSize, round: 1}}}/> : null }
            </div>
          )
        }
      }

  export default Room;