import React, { useRef, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import socket from "../socketConfig";
import firebase from '../firebase.js';
import './styles.css';

function Final(props) {
  const [code, setCode] = useState(props.location.state.code);
  const [name, setName] = useState(props.location.state.name);
  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState();
  const [winningScore, setWinningScore] = useState(-1);
  
  useEffect(() => {
    const db = firebase.firestore();
    db.collection("rooms").where("code", "==", code).get().then((querySnapshot) => {
      querySnapshot.docs.forEach((snapshot) => {
        snapshot.ref.collection("players").get().then((querySnapshot) => {
          querySnapshot.docs.forEach((snapshot) => {
            setPlayers(players => players.concat({name: snapshot.data().name, score: snapshot.data().score}));
            if (snapshot.data().score > winningScore) {
              setWinningScore(snapshot.data().score);
              setWinner(snapshot.data().name);
            }
          });
        });
      });
    });
}, []);



return (
    <div>
        <table>
        <thead>
          <tr><th>player</th><th>total votes</th></tr>
        </thead>
        <tbody>
          {players.map((player, idx) => {
            return (
              <tr key={idx}>
                <td>{player.name}</td>
                <td>{player.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h1>{winner} wins with a score of {winningScore} total votes!</h1>
    </div>
    );
}

export default Final;

