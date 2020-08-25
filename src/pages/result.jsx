import React, { useRef, useEffect, useState } from 'react';
import socket from "../socketConfig";
import firebase from '../firebase.js';
import { Redirect } from 'react-router-dom';
import './styles.css';

function Result(props) {
  const [code, setCode] = useState(props.location.state.code);
  const [name, setName] = useState(props.location.state.name);
  const [winningPic, setWinningPic] = useState();
  const [winningArtist, setWinningArtist] = useState();
  const [round, setRound] = useState(props.location.state.round);
  const [nextRoundTime, setNextRoundTime] = useState(false);
  const [finalScoreTime, setFinalScoreTime] = useState(false);
  const [groupSize, setGroupSize] = useState(props.location.state.groupSize);
  const [word, setWord] = useState();

  useEffect(() => {
    const myAsyncFunc = async() => {
        const db = firebase.firestore();
        await db.collection("rooms").where("code", "==", code).get().then((querySnapshot) => {
            querySnapshot.docs.forEach((snapshot) => {
                snapshot.ref.collection("rounds").where("round", "==", round).get().then((querySnapshot) => {
                    querySnapshot.docs.forEach((snapshot) => {
                        snapshot.ref.collection("pictures").orderBy("votes", "desc").limit(1).get().then((querySnapshot) => {
                            querySnapshot.docs.forEach((snapshot) => {
                                setWinningPic(snapshot.data().dataURL);
                                setWinningArtist(snapshot.data().artist);
                            });
                        });
                    });
                });
            });
        });

        await db.collection("rooms").where("code", "==", code).get().then((querySnapshot) => {
            querySnapshot.docs.forEach((snapshot) => {
                snapshot.ref.collection("rounds").where("round", "==", round).get().then((querySnapshot) => {
                    querySnapshot.docs.forEach((snapshot) => {
                        setWord(snapshot.data().word);
                    });
                });
            });
        });
        socket.on("nextRound", () => {
            setNextRoundTime(true);
        });
        socket.on("finalScore", () => {
            setFinalScoreTime(true);
        });
    }
    myAsyncFunc();
}, []);

const nextRound = () => {
    if (round + 1 <= 5) {
        socket.emit("nextRound", code);
    }
    else {
        socket.emit("finalScore", code);
    }
}
return (
    <div>
        <div className="center">
            <h1 className="header2">{word}</h1>
            <h1 className="header4">{winningArtist} wins round {round}!</h1>
            <button onClick={nextRound}>Next Round</button>
        </div>
        <img src={winningPic} id={winningPic}/>
        {nextRoundTime ? <Redirect to={{pathname: '/game', state: {code: code, name: name, groupSize: groupSize, round: round + 1}}}/> : null }
        {finalScoreTime ? <Redirect to={{pathname: '/final', state: {code: code, name: name, groupSize: groupSize, round: round + 1}}}/> : null }
    </div>
    );
}

export default Result;