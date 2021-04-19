import React, { useState, useEffect, useRef } from "react";
import Break from "./components/Break";
import Session from "./components/Session";
import TimeLeft from "./components/TimeLeft";
import "./styles/App.scss";

function App() {
  const audioElement = useRef(null);
  //State
  const [currentSessionType, setCurrentSessionType] = useState("Session"); //'Session' or 'Break'
  const [intervalId, setIntervalId] = useState(null);
  const [sessionLength, setSessionLength] = useState(60 * 25);
  const [breakLength, setBreakLength] = useState(300);
  const [timeLeft, setTimeLeft] = useState(sessionLength);

  //useEffect
  //Change timeLeft whenever sessionLength changes
  useEffect(() => {
    setTimeLeft(sessionLength);
  }, [sessionLength]);

  //Listen to timeLeft changes (it will fire whenever any of the values down in the dependency array changes)
  //The code below will only happen when the time left is equal to 0
  useEffect(() => {
    //if timeLeft is zero
    if (timeLeft === 0) {
      //play the audio
      audioElement.current.play();
      //change session to break or break to session
      if (currentSessionType === "Session") {
        setCurrentSessionType("Break");
        setTimeLeft(breakLength);
      } else if (currentSessionType === "Break") {
        setCurrentSessionType("Session");
        setTimeLeft(sessionLength);
      }
    }
  }, [breakLength, currentSessionType, sessionLength, timeLeft]);

  //SESSION

  //Function to decrement the session length by a minute
  const decrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength - 60;
    if (newSessionLength > 0) {
      setSessionLength(newSessionLength);
    }
  };

  //Function to increment the session length by a minute
  const incrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength + 60;
    if (newSessionLength <= 60 * 60) {
      setSessionLength(newSessionLength);
    }
  };

  //BREAK

  //Function to decrement the break length by a minute
  const decrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength - 60;
    if (newBreakLength > 0) {
      setBreakLength(newBreakLength);
    }
  };

  //Function to increment the break length by a minute
  const incrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength + 60;
    if (newBreakLength <= 60 * 60) {
      setBreakLength(newBreakLength);
    }
  };

  //START & STOP

  const isStarted = intervalId !== null;
  const handleStartStopClick = () => {
    if (isStarted) {
      //if we are in started mode:
      //we want to stop the timer
      //to do this we use clearInterval
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      //if we are in stopped mode:
      //decrement timeLeft by one every second (1000 ms)
      //to do this we use setInterval
      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 100); //TURN INTO 1000
      setIntervalId(newIntervalId);
    }
  };

  const handleResetButtonClick = () => {
    //reset audio
    audioElement.current.load();
    //clear the timeout interval (will stop the timer from running)
    clearInterval(intervalId);
    //set the intervalId to null (will let us know that no timer is running)
    setIntervalId(null);
    //set the session type to 'Session'
    setCurrentSessionType("Session");
    //reset the session length to 25 minutes
    setSessionLength(60 * 25);
    //reset the break length to 5 minutes
    setBreakLength(60 * 5);
    //reset the timer to 25 minutes (initial session length)
    setTimeLeft(60 * 25);
  };
  return (
    <div className="App">
      <Session
        sessionLength={sessionLength}
        decrementSessionLengthByOneMinute={decrementSessionLengthByOneMinute}
        incrementSessionLengthByOneMinute={incrementSessionLengthByOneMinute}
      />
      <div className="timer-div">
        <TimeLeft
          timerLabel={currentSessionType}
          handleStartStopClick={handleStartStopClick}
          startStopButtonLabel={isStarted ? "Stop" : "Start"}
          timeLeft={timeLeft}
        />
        <button id="resetButton" onClick={handleResetButtonClick}>
          Reset
        </button>
      </div>
      <Break
        breakLength={breakLength}
        decrementBreakLengthByOneMinute={decrementBreakLengthByOneMinute}
        incrementBreakLengthByOneMinute={incrementBreakLengthByOneMinute}
      />

      <audio id="beep" ref={audioElement}>
        <source
          src="https://www.google.com/logos/fnbx/animal_sounds/robin.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}

export default App;
