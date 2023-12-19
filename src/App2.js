//IMPORTS

//hooks
import { useState, useEffect } from 'react';

//components
import Header from './components/Header';
import Settings from './components/Settings';

//styles
import styles from './App2.module.css';

const pageTypeList = {
  pomodoro: "pomodoro",
  shortBreak: "shortBreak",
  longBreak: "longBreak"
}

const {pomodoro, shortBreak, longBreak} = pageTypeList;

function App() {
  //states

  // timer states
  const [seconds, setSeconds] = useState(1);
  const [minutes, setMinutes] = useState(0);

  //timer start/stop
  const [timerActive, setTimerActive] = useState(false);

  // pageType
  const [pageType, setPageType] = useState(pageTypeList.pomodoro);

  //timerType
  const [pomodoroDuration, setPomodoroDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(30);

  // intervals qty
  const [pomodoroIntervals, setPomodoroIntervals] = useState(1);

  //setting
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);


  //FUNCTIONS

  //switch to set when the timer is running or not
  function playStopTimer() {
    setTimerActive( (prevTimerActive) => !prevTimerActive);
  }


  function handleTimersDurations(pomodoro, shortBreak, longBreak) {
    setPomodoroDuration(pomodoro);
    setShortBreakDuration(shortBreak);
    setLongBreakDuration(longBreak);
    openSettings();
  }

  //timer logic
  useEffect(() => {
    if (timerActive) {
      if (seconds < 0) {
        setSeconds(59);
        setMinutes((prevMinutes) => prevMinutes - 1);
      }

      if (minutes === 0 & seconds === 0) {
        setTimerActive((current) => !current);
        if(pomodoroIntervals % 4 === 0) {
          setPageType(longBreak);
        } else {
          setPageType(shortBreak);
        }
      }

      let intervalId = setInterval(() => {
        setSeconds((prevSegundos) => prevSegundos - 1);
      }, 1000);
    
    return () => {
      clearInterval(intervalId);
    };
  }
  }, [timerActive, seconds, minutes]);

  function openSettings() {
    setIsSettingsOpen((current) => !current);
  }

  return (
    <div className={`${styles.container} ${styles[pageType]}`}>
      {console.log(pomodoroDuration, shortBreakDuration, longBreakDuration)}
      <Header openSettings={openSettings}/>
      <div className={styles.timer_container}>
        <div className={styles.timer_header}>
          <button
            className={`${styles.button} ${pageType === pomodoro ? styles.selected : ""}`}
            onClick={() => setPageType(pomodoro)}
            >Pomodoro
          </button>
          <button
            className={`${styles.button} ${pageType === shortBreak ? styles.selected : ""}`}
            onClick={() => setPageType(shortBreak)}
              >Short Break
          </button>
          <button
            className={`${styles.button} ${pageType === longBreak ? styles.selected : ""}`}
            onClick={() => setPageType(longBreak)}
            >Long Break
          </button>
        </div>
          <div className={styles.timer}>
            <span>{ minutes < 10 ? `0${minutes}` : minutes }</span><span>:</span><span>{ seconds < 10 ? `0${seconds}` : seconds }</span>
          </div>
          <div className={styles.controls}>
            <button id="start/pause" onClick={playStopTimer}>{timerActive ? "PAUSE" : "START"}</button>
        </div>
      </div>
      <div className={styles.interval_container}>
        <h4>#{pomodoroIntervals}</h4>
        <h3>Time to focus!</h3>
      </div>
      {isSettingsOpen &&
        <Settings
          handleTimerDurations={handleTimersDurations}
          pomodoroDuration={pomodoroDuration}
          shortBreakDuration={shortBreakDuration}
          longBreakDuration={longBreakDuration}
        />
      }
    </div>
  )
}                                                                                               

export default App;
