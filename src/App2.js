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
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  //timer start/stop
  const [isTimerActive, setIsTimerActive] = useState(false);
  // pageType
  const [pageType, setPageType] = useState(POMODORO);
  //timerType
  const [timerDurations, setTimerDurations] = useState({})
  // intervals qty
  const [pomodoroIntervalsQty, setPomodoroIntervalsQty] = useState(1);
  const [isPomodoroDone, setIsPomodoroDone] = useState(false);
  //settings
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  //dinamic Bar
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [dynamicBarLength, setDynamicBarLength] = useState(0);
  const [counter, setCounter] = useState(0);

  //FUNCTIONS

  //set timerDurations when the application is mounted
  function setInitialTimerDurations() {
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
  }
  useEffect(() => {
    setInitialTimerDurations();
      },[])

  //increments intervalsQty when change to pomodoro page
  function incrementsIntervalsQty() {
    if (isPomodoroDone === true) {
      setIsPomodoroDone(false);
      setPomodoroIntervalsQty((prevPomodoroIntervalsQty) => prevPomodoroIntervalsQty += 1);
    }
  }
  //Set the clock according to the pageType selected
  function setTimer(pageType) {
    if (pageType === POMODORO) {
      incrementsIntervalsQty();
    }
    setTimerSeconds(0);
    setTimerMinutes(timerDurations[pageType]);
    setIsTimerActive(false);
    setTotalSeconds(timerDurations[pageType] * 60);
    setCounter(0);
  }
  useEffect(() => {
    if (Object.keys(timerDurations).length > 0) {
      setTimer(pageType);
    }
  },[timerDurations, pageType]) 

  //transits to Break page when timer is done or when its forced to by clicking on the skipping button
  function skipToBreak() {
    if (pageType === POMODORO) {
      setIsTimerActive((prevTimerActive) => !prevTimerActive);
      if(pomodoroIntervalsQty % timerDurations.intervals === 0) {
        setPageType(LONG_BREAK);
      } else {
        setPageType(SHORT_BREAK);
      }
    }
    setIsPomodoroDone(true);
  }

  //transits to pomodoro page when timer is done or when its forced to by clicking on the skipping button
  function skipToPomodoro() {
    if (pageType === SHORT_BREAK || pageType === LONG_BREAK) {
      setIsTimerActive((prevTimerActive) => !prevTimerActive);
      setPageType(POMODORO);
      setPomodoroIntervalsQty((prevPomodoroIntervalsQty) => prevPomodoroIntervalsQty += 1);
      setIsPomodoroDone(false);
    }
  }

  //switch to set when the timer is running or not
  function playStopTimer() {
  setIsTimerActive((prevTimerActive) => !prevTimerActive);
}

  //forces timer to finish
  function handleSkipButton() {
    skipToBreak();
    skipToPomodoro();
  }

  //timer logic
  useEffect(() => {
    if (isTimerActive) {
      if (timerSeconds < 0) {
        setTimerSeconds(59);
        setTimerMinutes((prevTimerMinutes) => prevTimerMinutes - 1);
      }

      if (timerMinutes === 0 && timerSeconds === 0) {
        skipToBreak();
        skipToPomodoro();
      }

      let intervalId = setInterval(() => {
        setTimerSeconds((prevTimerSeconds) => prevTimerSeconds - 1);
        setCounter((prevCounter) => (prevCounter + 1));
      }, 1000);
    
    return () => {
      clearInterval(intervalId);
    };
  }
  }, [isTimerActive, timerSeconds, timerMinutes]);

  //handles the settings opning
  function openSettings() {
    setIsSettingsOpen((prevIsSettingsOpen) => !prevIsSettingsOpen);
  }

  function handleResetIntervals() {
    const confirmation = window.confirm('Do you want to refresh the pomodoro count?');
    if (confirmation) setPomodoroIntervalsQty(1)
    
  }

  function findDynamicBarLength() {
    setDynamicBarLength((600 / totalSeconds) * counter);
  }
  useEffect(() => {
    findDynamicBarLength();
  },[totalSeconds, counter])


  return (
    <div className={`${styles.container} ${styles[pageType]}`}>
      {console.log(dynamicBarLength)}
      <Header openSettings={openSettings} dynamicBarLength={dynamicBarLength}/>
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
            <span>{ timerMinutes < 10 ? `0${timerMinutes}` : timerMinutes }</span><span>:</span><span>{ timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds }</span>
          </div>
          <div className={`${styles.controls} ${isTimerActive ? styles.actived : styles.inactive}`}>
            <button id="start/pause" onClick={playStopTimer}>{isTimerActive ? "PAUSE" : "START"}</button>
            <i className='fa-solid fa-forward-step'
              onClick={handleSkipButton}
            ></i>
        </div>
      </div>
      <div className={styles.interval_container}>
        <h4 onClick={handleResetIntervals}>#{pomodoroIntervalsQty}</h4>
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
