import React, { useState, useEffect } from 'react';
import AuthService from "../Services/auth.service";
import UserService from "../Services/user.service";

import { Header } from '../Components/Header.js';

const StartTimer = () => {

  const [currentSpiral, setCurrentSpiral] = useState(null);

  const [userName, setUserName] = useState("");
  const [time, setSpiralTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [progress, setProgress] = useState(0);

  const progressTime = (progress - startTime) / 1000;

  let showInput = (startTime === null);

  let minutesLeft = 0, secondsLeft = 0, progressPerc = 0;

  if (time !== null && startTime !== null) {
    let timeParts = time.split(':');
    let timeMinutes = parseInt(timeParts[0]);
    let timeSeconds = parseInt(timeParts[1]);

    const totalTimeSeconds = (timeMinutes * 60) + timeSeconds;

    const totalSecondsLeft = totalTimeSeconds - progressTime;

    minutesLeft = Math.floor(totalSecondsLeft / 60);
    secondsLeft = Math.floor(totalSecondsLeft % 60);


    progressPerc = Math.ceil((100 / totalTimeSeconds) * progressTime);
  }


  if (startTime !== null) {
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

  function handleNewSpiral() {
    let timeParts = time.split(':');
    let timeMinutes = parseInt(timeParts[0]);
    let timeSeconds = parseInt(timeParts[1]);

    let totalSeconds = (timeMinutes * 60) + timeSeconds;

    let goals = [];

    UserService.startTimer(time, goals).then(
      (spiralData) => {
        console.log('STARTED TIMES');
        console.log(spiralData);
      },
      (error) => {
        
      }
    );

    setStartTime(Date.now());

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
        },
        (error) => {
          
        }
      );
    }

  }, []);


  return (
  <div className="App">
    <Header />

    { (userName ) && (   <h3>Welcome, {userName}</h3> ) }
    { (!userName ) && (   <h3>Not logged in</h3> ) }

    <h1>Start spiral</h1>

     
     <div className="spiral">
       <div className="left">
         Left
       </div>

       <div className="right">

        <div className="timer">

        { !showInput &&  ( 
          <div>
          <figure>
            <div className="timer-visual">
              <div className="time-left">
                {minutesLeft} : {secondsLeft}
              </div>
            </div>
          </figure>

            <div>
            Seconds: {progressTime} / Percentage: {progressPerc}%
            </div>
            </div> 
            
          ) }



          { showInput && (
          <div>
            <div>
              <input type="text" value={time} onChange={onChangeTime} />
            </div>
            <div>
              <button onClick={handleNewSpiral}>Start</button>
            </div>
          </div>
          ) }

          
        </div>

       </div>
     </div>
  </div>
  );
}

export default StartTimer;