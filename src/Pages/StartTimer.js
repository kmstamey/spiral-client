import React, { useState, useEffect } from 'react';
import AuthService from "../Services/auth.service";
import UserService from "../Services/user.service";

import { Header } from '../Components/Header.js';

const StartTimer = () => {

  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSpiral, setCurrentSpiral] = useState(null);
  const [goalList, setGoalList] = useState([""]);

  const [userName, setUserName] = useState("");
  const [time, setSpiralTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [progress, setProgress] = useState(0);

  const progressTime = (progress - startTime) / 1000;

  let showInput = (startTime === null);

  let minutesLeft = 0, secondsLeft = 0, progressPerc = 0;

  let secondsLeftText = '00';

  if (isFinished === false && time !== null && startTime !== null) {
    let timeParts = time.split(':');
    let timeMinutes = parseInt(timeParts[0]);
    let timeSeconds = parseInt(timeParts[1]);

    const totalTimeSeconds = (timeMinutes * 60) + timeSeconds;

    const totalSecondsLeft = totalTimeSeconds - progressTime;

    minutesLeft = Math.floor(totalSecondsLeft / 60);
    secondsLeft = Math.ceil(totalSecondsLeft % 60);

    secondsLeftText = secondsLeft.toString();
    if (secondsLeftText.length == 1) {
      secondsLeftText = '0' + secondsLeftText;
    }

    progressPerc = Math.ceil((100 / totalTimeSeconds) * progressTime);

    if (totalSecondsLeft <= 0) {
      setIsFinished(true);
    }
  }

  if (startTime !== null && isFinished === false && progressPerc < 100) {
    const timer = setTimeout(() => {
      setProgress(Date.now());
    }, 200);
  }


  const onChangeTime = (e) => {
    const time = e.target.value;
    setSpiralTime(time);

    return true;
  };

  if (time === null) {
    setSpiralTime("25:00");
  }

  function handleNewSpiralClick() {
    setIsFinished(false);
    setIsLoading(false);
    setCurrentSpiral(null);
    setGoalList(['']);
    setSpiralTime(null);
    setStartTime(null);
    setProgress(0);
  }

  function handleGoalInput(e, index) {
    const { value } = e.target;

    const list = [...goalList];
    list[index] = value;
    setGoalList(list);

    return true;
  }

  function handleAddGoalClick() {
    setGoalList([...goalList, '' ]);
  }

  function handleRemoveGoalClick() {
    //setGoalList([...goalList, '' ]);
  }

  async function handleCancelTimerClick() {
    try {
      let result = await UserService.cancelTimer();
      console.log('CANCELED TIMER');
      
    } catch (e) {

    }

    handleNewSpiralClick();
  }

  async function handleNewSpiral() {
    let timeParts = time.split(':');
    let timeMinutes = parseInt(timeParts[0]);
    let timeSeconds = parseInt(timeParts[1]);

    let totalSeconds = (timeMinutes * 60) + timeSeconds;

    let goals = [];

    console.log('goalList');
    console.log(goalList);

    let spiralData;
    try {
      spiralData = await UserService.startTimer(time, goalList);
      console.log('STARTED TIMES');
      console.log(spiralData);
    } catch (e) {
      console.log('FAILED');
      console.log(e);
      alert('Could not start new spiral. Are you sure you are logged in?');
      return;
    }

    setCurrentSpiral(spiralData.data);
    let spiralStartDate = new Date(spiralData.data.startDate);
    let spiralStartTimestamp = spiralStartDate.getTime();

    let spiralMinutes = Math.floor(spiralData.data.duration / 60);
    let spiralSeconds = Math.floor(spiralData.data.duration % 60);
    let spiralDurationTime = spiralMinutes + ':' + spiralSeconds;

    setSpiralTime(spiralDurationTime);
    setStartTime(spiralStartTimestamp);

    //setStartTime(Date.now());

    const timer = setTimeout(() => {
      setProgress(Date.now());
    }, 200);

    // Validate time
    // Validate date if in future
  }

  useEffect(() => {
    // Load current spiral
    
    let user = AuthService.getCurrentUser();
    if (user) {
      setUserName(user.name);
    }
 
    if (currentSpiral === null) {
      UserService.getTimer().then(
        (timerData) => {
          if (timerData.data && timerData.data.startDate) {
            setCurrentSpiral(timerData.data);
            let spiralStartDate = new Date(timerData.data.startDate);
            let spiralStartTimestamp = spiralStartDate.getTime();
      
            let spiralMinutes = Math.floor(timerData.data.duration / 60);
            let spiralSeconds = Math.floor(timerData.data.duration % 60);
            let spiralDurationTime = spiralMinutes + ':' + spiralSeconds;
      
            setSpiralTime(spiralDurationTime);
            setStartTime(spiralStartTimestamp);

          } else {
            //setCurrentSpiral({});
          }

          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
        }
      );
    }

  }, []);


  var progressStyle = { "--progress": progressPerc + '%' };

  return (
  <div className="App">
    <Header />

    <h1>Start spiral</h1>

    { isLoading && (
      <div>Loading</div>
    )}

    { !isLoading && (
     <div className="spiral">

       <div className="left">
         
       </div>

       <div className="right">

        <div className="timer">

        { 
          isFinished && (
            <div>
              <h1>You're done!</h1>
              <p>Time for a break</p>
              <button onClick={handleNewSpiralClick}>Start a new spiral</button>
            </div>
          )
        }

        { !isFinished && !showInput &&  ( 
          <div>
          <figure>
            <div className="timer-visual">
            <div className="time-left-container" style={progressStyle}>
              <div className="time-left">
                {minutesLeft} : {secondsLeftText}
              </div>
            </div>
            
            </div>
          </figure>
              <button onClick={handleCancelTimerClick}>Cancel</button>
            </div> 
            
          ) }

          { !isFinished && showInput && (
          <div>
            <div className="input-time">
              <h3>Choose timeframe</h3>
              <input type="text" value={time} onChange={onChangeTime} />
            </div>
            
            <div className="input-goals">
              <h3>Enter one or more goals</h3>
              <div className="list">
                {
                goalList.map((x, i) => {
                  return (
                    <div className="goal" key={i} ><input type="text" value={x} onChange={e => handleGoalInput(e, i)} /></div>
                  );
                })}
              </div>
              <button onClick={handleAddGoalClick}>Add another goal</button>
            </div>
            <div>
              <button onClick={handleNewSpiral}>Start</button>
            </div>
          </div>
          ) }

          
        </div>

       </div>
     </div>
    )}

    </div>
  );
}

export default StartTimer;