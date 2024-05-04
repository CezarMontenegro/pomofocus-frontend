//IMPORTS
//hooks
import { useState, useEffect, useRef } from 'react';
//components
import Header from '../components/Header/Header';
import Settings from '../components/Settings/Settings';
//styles
import styles from './App.module.css';

//CONSTANTS
const POMODORO = "pomodoro";
const SHORT_BREAK = "shortBreak";
const LONG_BREAK = "longBreak";

const CURRENT_TASK_OBJ = {
  pomodoro: "Time to focus!",
  break: "Time for a break!"
}

function App() {
  //STATES
  // timer states
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  //timer start/stop
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [autoStartPomodoro, setAutoStartPomodoro] = useState(false);
  const [autoStartBreaks, setAutoStartBreaks] = useState(false);
  // pageType
  const [pageType, setPageType] = useState(POMODORO);
  //timerType
  const [timerDurations, setTimerDurations] = useState({})
  // intervals qty
  const [pomodoroIntervalsQty, setPomodoroIntervalsQty] = useState(1);
  const [isPomodoroDone, setIsPomodoroDone] = useState(false);
  //settings
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef(null)
  //dinamic Bar
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [dynamicBarLength, setDynamicBarLength] = useState(0);
  const [counterSeconds, setCounterSeconds] = useState(0);
  //current task
  const [currentTask, setCurrentTask] = useState('');

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

  function setTimer() {
    setTimerSeconds(0);
    setTimerMinutes(timerDurations[pageType]);
  }

  function setDynamicBar() {
    setTotalSeconds(timerDurations[pageType] * 60);
    setCounterSeconds(0);
  }

  function setDynamicTask() {
    pageType === POMODORO ? setCurrentTask(CURRENT_TASK_OBJ.pomodoro) : setCurrentTask(CURRENT_TASK_OBJ.break);
  }

  //Set the page features according to the pageType selected
  function setPageFeatures() {
    if (pageType === POMODORO) { incrementsIntervalsQty() }
    setTimer();
    setDynamicBar();
    setDynamicTask();
  }
  useEffect(() => {
    if (Object.keys(timerDurations).length > 0) {setPageFeatures(pageType)}
  },[timerDurations, pageType]) 

  //transits to Break page when timer is done or when its forced to by clicking on the skipping button
  function skipToBreak() {
    if (pageType === POMODORO) {
      if (!autoStartBreaks) setIsTimerActive((prevTimerActive) => !prevTimerActive);
      pomodoroIntervalsQty % timerDurations.intervals === 0 ? setPageType(LONG_BREAK) : setPageType(SHORT_BREAK)
    }
    setIsPomodoroDone(true);
  }

  //transits to pomodoro page when timer is done or when its forced to by clicking on the skipping button
  function skipToPomodoro() {
    if (pageType === SHORT_BREAK || pageType === LONG_BREAK) {
      if (!autoStartPomodoro) {setIsTimerActive((prevTimerActive) => !prevTimerActive)};
      setPageType(POMODORO);
      setPomodoroIntervalsQty((prevPomodoroIntervalsQty) => prevPomodoroIntervalsQty += 1);
      setIsPomodoroDone(false);
    }
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
        setCounterSeconds((prevCounter) => (prevCounter + 1));
      }, 1000);
    
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isTimerActive, timerSeconds, timerMinutes]);

  //handles the settings opening
  function openSettings() {
    setIsSettingsOpen((prevIsSettingsOpen) => !prevIsSettingsOpen);
  }

  function handleCloseSettingsByClickingOutside(e) {
    if (isSettingsOpen && !settingsRef.current.contains(e.target)) setIsSettingsOpen(false);
  }

  function handleResetIntervals() {
    const confirmation = window.confirm('Do you want to refresh the pomodoro count?');
    if (confirmation) setPomodoroIntervalsQty(1)
    
  }

  function findDynamicBarLength() {
    const screenWidth = window.innerWidth;
    setDynamicBarLength((600 / totalSeconds) * counterSeconds);
    if (screenWidth <= 500) { setDynamicBarLength((400 / totalSeconds) * counterSeconds) }
    if (screenWidth <= 400) { setDynamicBarLength((350 / totalSeconds) * counterSeconds) }
    if (screenWidth <= 350) { setDynamicBarLength((300 / totalSeconds) * counterSeconds) }
  }
  useEffect(() => {
    findDynamicBarLength();
  },[totalSeconds, counterSeconds])

  function setDynamicTitle() {
    document.title = `${timerMinutes < 10 ? `0${timerMinutes}` : timerMinutes}:${ timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds } - ${currentTask}`
    const favicon = document.getElementById('favicon');
    if (favicon) {
      favicon.href = `/pomofocus-frontend/${pageType}.png`;
    }
  }
  useEffect(() => {
    setDynamicTitle();
  },[timerSeconds, timerMinutes, currentTask, pageType])

  return (
    <div className={`${styles.container} ${styles[pageType]}`} onClick={handleCloseSettingsByClickingOutside} data-testid="app-container">
      <Header openSettings={openSettings} dynamicBarLength={dynamicBarLength}/>
      <div className={styles.timer_container}>
        <div className={styles.timer_header}>
          <button
            className={`${styles.button} ${pageType === POMODORO ? styles.selected : ""}`}
            onClick={() => {setPageType(POMODORO); setIsTimerActive(false)}}
            >Pomodoro
          </button>
          <button
            className={`${styles.button} ${pageType === SHORT_BREAK ? styles.selected : ""}`}
            onClick={() => {setPageType(SHORT_BREAK); setIsTimerActive(false)}}
              >Short Break
          </button>
          <button
            className={`${styles.button} ${pageType === LONG_BREAK ? styles.selected : ""}`}
            onClick={() =>{ setPageType(LONG_BREAK); setIsTimerActive(false)}}
            >Long Break
          </button>
        </div>
          <div className={styles.timer}>
            <span>{ timerMinutes < 10 ? `0${timerMinutes}` : timerMinutes }</span><span>:</span><span>{ timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds }</span>
          </div>
          <div className={`${styles.controls}`}>
            <button id="start/pause" onClick={() => setIsTimerActive((prev) => !prev)}>{isTimerActive ? "PAUSE" : "START"}</button>
            <i className='fa-solid fa-forward-step'
              onClick={handleSkipButton}
            ></i>
        </div>
      </div>
      <div className={styles.interval_container}>
        <h4 onClick={handleResetIntervals}>#{pomodoroIntervalsQty}</h4>
        <h3>{currentTask}</h3>
      </div>
      {isSettingsOpen && <Settings
          openSettings={openSettings}
          timerDurations={timerDurations}
          setTimerDurations={setTimerDurations}
          settingsRef={settingsRef}
          autoStartBreaks={autoStartBreaks}
          setAutoStartBreaks={setAutoStartBreaks}
          autoStartPomodoro={autoStartPomodoro}
          setAutoStartPomodoro={setAutoStartPomodoro}
        />
      }
    </div>
  )
}                                                                                               

export default App;
