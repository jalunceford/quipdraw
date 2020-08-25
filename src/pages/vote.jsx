import React, { useRef, useEffect, useState } from 'react';
import socket from "../socketConfig";
import firebase from '../firebase.js';
import { Redirect } from 'react-router-dom';
import "./styles.css";

function Vote(props) {
  const [code, setCode] = useState(props.location.state.code);
  const [name, setName] = useState(props.location.state.name);
  const [pictures, setPictures] = useState([]);
  const [round, setRound] = useState(props.location.state.round);
  const [resultTime, setResultTime] = useState(false);
  const [groupSize, setGroupSize] = useState(props.location.state.groupSize);
  const [vote, setVote] = useState();
  const inputRef = useRef(null);
  const [time, setTime] = useState(20);
  const [word, setWord] = useState();
  const [artist, setArtist] = useState();
  const [voting, setVoting] = useState(false);
  const [doneVoting, setDoneVoting] = useState(false);

  useEffect(() => {
    setVoting(true);
    let numVotes = 0;
    socket.on("vote", () => {
        numVotes ++;
        if (numVotes == groupSize) {
            setResultTime(true);
        }
    });
    const db = firebase.firestore();
    const myAsyncFunc = async() =>{
        await getWord();
        await db.collection("rooms").where("code", "==", code).get().then((querySnapshot) => {
            querySnapshot.docs.forEach((snapshot) => {
                snapshot.ref.collection("rounds").where("round", "==", round).get().then((querySnapshot) => {
                    querySnapshot.docs.forEach((snapshot) => {
                        snapshot.ref.collection("pictures").get().then((querySnapshot) => {
                            querySnapshot.docs.forEach((doc) => {
                                setPictures(pictures => pictures.concat({picture: doc.data().dataURL, artist: doc.data().artist}));
                            });
                        });
                    });
                });
            });
        });
        let time2 = 20;
        const interval = setInterval(() => {
            time2 = time2 - 1;
            setTime( time => time - 1);
            if (time2 == 0) {
                clearInterval(interval);
                setResultTime(true);
            }
        }, 1000);
    }
    myAsyncFunc();
}, []);

  const updateVote = (event) => {
      setVote({vote: event.target.value});
  }

  const submitVote = async() => {
      setVoting(false);
      setDoneVoting(true);
      let votedArtist = pictures[vote.vote].artist;
      const db = firebase.firestore();
      await db.collection("rooms").where("code", "==", code).get().then((querySnapshot) => {
          querySnapshot.docs.forEach((snapshot) => {
              snapshot.ref.collection("rounds").where("round", "==", round).get().then((querySnapshot) => {
                  querySnapshot.docs.forEach((snapshot) => {
                      snapshot.ref.collection("pictures").where("artist", "==", votedArtist).get().then((querySnapshot) => {
                          querySnapshot.docs.forEach((snapshot) => {
                              console.log("vote about to be counted for " + snapshot.data().artist);
                              setArtist(snapshot.data().artist);
                              snapshot.ref.update({votes : firebase.firestore.FieldValue.increment(1)})
                            });
                        });
                    });
                });
            });
        });

        db.collection("rooms").where("code", "==", code).get().then((querySnapshot) => {
            querySnapshot.docs.forEach((snapshot) => {
                snapshot.ref.collection("players").where("name", "==", votedArtist).get().then((querySnapshot) => {
                    querySnapshot.docs.forEach((snapshot) => {
                        console.log("total vote added to " + votedArtist);
                        snapshot.ref.update({
                            score : firebase.firestore.FieldValue.increment(1)
                        }).then(() => {
                            socket.emit("vote", code);
                        });
                    });
                });
            });
        });
    }

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

  return (
    <div>
        <div className="center">
            <h1 className="header1">{time}</h1>
            <h1 className="header1">{word}</h1>
        </div>
        <div className="center">
            {pictures.map((picture, idx) => {
                return (<div>
                    <a href={picture.picture} download>{idx}</a>
                    </div>)
                })}
        </div>
        <div className="center">
            {voting ? <input type="text" id="vote" onChange={updateVote} ref={inputRef}/> : null }
            {voting ? <button id="done" onClick={submitVote}>Done</button> : null }
            {doneVoting ? <h2 className="header3">Waiting for other players to submit their votes...</h2> : null}
        </div>
        {resultTime ? <Redirect to={{pathname: '/result', state: {code: code, name: name, groupSize: groupSize, round: round}}}/> : null }
    </div>
    );
}

export default Vote;