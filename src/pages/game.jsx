import React, { useRef, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import socket from "../socketConfig";
import firebase from '../firebase.js';
import './styles.css';

function Game(props) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [time, setTime] = useState(20);
  const [code, setCode] = useState(props.location.state.code);
  const [name, setName] = useState(props.location.state.name);
  const [round, setRound] = useState(props.location.state.round);
  const [voteTime, setVoteTime] = useState(false);
  const [groupSize, setGroupSize] = useState(props.location.state.groupSize);
  const [word, setWord] = useState();

  useEffect(() => {
    console.log(groupSize);
    let pictures = 0;
    socket.on('picture', () => {
      console.log("picture came in");
      pictures ++;
      if (pictures == groupSize) {
        setVoteTime(true);
      }
    });
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d")
    context.scale(2,2)
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = 5
    contextRef.current = context;
    const myAsyncFunc = async() =>{
      await getWord();
      let time2 = 20;
      const interval = setInterval(() =>{
        setTime(time => time - 1);
        time2 = time2 - 1;
        if (time2 == 0) {
          clearInterval(interval);
          let dataURL = canvasRef.current.toDataURL();
          const db = firebase.firestore();
          db.collection("rooms").where("code", "==", code).get().then((querySnapshot) => {
            querySnapshot.docs.forEach((snapshot) => {
              snapshot.ref.collection("rounds").where("round", "==", round).get().then((querySnapshot) => {
                querySnapshot.docs.forEach((snapshot) => {
                  snapshot.ref.collection("pictures").add({artist: name, dataURL: dataURL, votes: 0}).then(() => {
                    socket.emit("picture", code);
                  });
                });
              });
            });
          });
        }
    }, 1000);
  }
  myAsyncFunc();
  }, []);

  const getWord = async() => {
    const db = firebase.firestore();
    db.collection("rooms").where("code", "==", code).get().then((querySnapshot) => {
      querySnapshot.docs.forEach((snapshot) => {
        snapshot.ref.collection("rounds").where("round", "==", round).get().then((querySnapshot) => {
          querySnapshot.docs.forEach((snapshot) => {
              setWord(snapshot.data().word);
          });
      });
  });
});
}

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
   contextRef.current.closePath()
   setIsDrawing(false)
  }

  const draw = ({nativeEvent}) => {
    if(!isDrawing){
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  const clearCanvas = () => {
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  return (
    <div>
      <div className="center">
        <h1 className="header2">{time}</h1>
        <h1 className="header2">{word}</h1>
        <button onClick={clearCanvas}>Clear</button>
      </div>
      <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
      />
      {voteTime ? <Redirect to={{pathname: '/vote', state: {code: code, name: name, round: round, groupSize: groupSize}}}/> : null }
    </div>
    );
}

export default Game;