//IMPORTS
//hooks
import { useState, useEffect } from 'react';
//components
import Header from './components/Header';
import Settings from './components/Settings';
//styles
import styles from './App2.module.css';

//CONSTANTS
const POMODORO = "pomodoro";
const SHORT_BREAK = "shortBreak";
const LONG_BREAK = "longBreak";

function App() {
  //STATES
  // timer states
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  //timer start/stop
  const [isTimerActive, setIsTimerActive] = useState(false);
  // pageType
  const [pageType, setPageType] = useState(POMODORO);
  //timerType
  const [timerDurations, setTimerDurations] = useState({})
  // intervals qty
  const [pomodoroIntervalsQty, setPomodoroIntervalsQty] = useState(1);
  const [pomodoroIntervalsToLongBreak, setPomodoroIntervalsToLongBreak] = useState(4);
  //settings
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  //FUNCTIONS
  //switch to set when the timer is running or not
  function playStopTimer() {
    setIsTimerActive( (prevTimerActive) => !prevTimerActive);
  }

  // set the correct time on the clock
  useEffect(() => {
    if (pageType === POMODORO) setMinutes(timerDurations.pomodoro);
    if (pageType === SHORT_BREAK) setMinutes(timerDurations.shortBreak);
    if (pageType === LONG_BREAK) setMinutes(timerDurations.longBreak);
  }, [pageType, timerDurations]);

    //set timerDurations
    useEffect(() => {
      if (localStorage.getItem('timer_durations')) {
        setTimerDurations(JSON.parse(localStorage.getItem('timer_durations')))
      } else {
        setTimerDurations({
          pomodoro: 25,
          shortBreak: 5,
          longBreak: 30,
          intervals: 4
        })
      }
    },[])


    function handleForward() {
      
    }

  //timer logic
  useEffect(() => {
    if (isTimerActive) {
      if (seconds < 0) {
        setSeconds(59);
        setMinutes((prevMinutes) => prevMinutes - 1);
      }

      if (minutes === 0 && seconds === 0 && pageType === POMODORO) {
        setIsTimerActive((current) => !current);
        if(pomodoroIntervalsQty % pomodoroIntervalsToLongBreak === 0) {
          setPageType(LONG_BREAK);
        } else {
          setPageType(SHORT_BREAK);
        }
      }

      if (minutes === 0 && seconds === 0 && (pageType === SHORT_BREAK || pageType === LONG_BREAK)) {
        setIsTimerActive((current) => !current);
        setPageType(POMODORO);
        setPomodoroIntervalsQty((current) => current += 1);
      }

      let intervalId = setInterval(() => {
        setSeconds((prevSegundos) => prevSegundos - 1);
      }, 1000);
    
    return () => {
      clearInterval(intervalId);
    };
  }
  }, [isTimerActive, seconds, minutes]);

  //handles the settings opning
  function openSettings() {
    setIsSettingsOpen((current) => !current);
  }

  return (
    <div className={`${styles.container} ${styles[pageType]}`}>
      {console.log(timerDurations)}
      <Header openSettings={openSettings}/>
      <div className={styles.timer_container}>
        <div className={styles.timer_header}>
          <button
            className={`${styles.button} ${pageType === POMODORO ? styles.selected : ""}`}
            onClick={() => setPageType(POMODORO)}
            >Pomodoro
          </button>
          <button
            className={`${styles.button} ${pageType === SHORT_BREAK ? styles.selected : ""}`}
            onClick={() => setPageType(SHORT_BREAK)}
              >Short Break
          </button>
          <button
            className={`${styles.button} ${pageType === LONG_BREAK ? styles.selected : ""}`}
            onClick={() => setPageType(LONG_BREAK)}
            >Long Break
          </button>
        </div>
          <div className={styles.timer}>
            <span>{ minutes < 10 ? `0${minutes}` : minutes }</span><span>:</span><span>{ seconds < 10 ? `0${seconds}` : seconds }</span>
          </div>
          <div className={`${styles.controls} ${isTimerActive ? styles.actived : styles.inactive}`}>
            <button id="start/pause" onClick={playStopTimer}>{isTimerActive ? "PAUSE" : "START"}</button>
            <i className='fa-solid fa-forward-step'></i>
        </div>
      </div>
      <div className={styles.interval_container}>
        <h4>#{pomodoroIntervalsQty}</h4>
        <h3>Time to focus!</h3>
      </div>
      {isSettingsOpen && <Settings
        openSettings={openSettings}
        timerDurations={timerDurations}
        setTimerDurations={setTimerDurations}
      />
      }
    </div>
  )
}                                                                                               

export default App;
