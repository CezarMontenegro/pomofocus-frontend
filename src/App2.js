//hooks
import { useState, useEffect } from 'react';

//components
// import Pomodoro from './components/Pomodoro';
// import ShortBreak from './components/ShortBreak';
// import LongBreak from './components/LongBreak';
import Header from './components/Header';
import Settings from './components/Settings';

//styles
import styles from './App2.module.css';

const timerList = {
  pomodoro: "pomodoro",
  shortBreak: "shortBreak",
  longBreak: "longBreak"
}

const {pomodoro, shortBreak, longBreak} = timerList;

function App() {
  // timer states
  const [seconds, setSeconds] = useState(1);
  const [minutes, setMinutes] = useState(0);
  //timer start/stop
  const [timerActive, setTimerActive] = useState(false);
  // timerOption
  const [timer, setTimer] = useState(timerList.pomodoro);
  // intervals qty
  const [pomodoroIntervals, setPomodoroIntervals] = useState(1);
  //setting
  const [openSettings, setOpenSettings] = useState(false);

  function setTimerOption(option) {
    setTimer(option)
  }

  function setIntervals(option) {
    setPomodoroIntervals((current) => current + 1);
  }

  //This is a switch to set when the timer is running or not
  function playStopTimer() {
    setTimerActive( (prevTimerActive) => !prevTimerActive);
  }

  useEffect(() => {

    if (timerActive) {
      if (seconds < 0) {
        setSeconds(59);
        setMinutes((prevMinutes) => prevMinutes - 1);
      }

      if (minutes === 0 & seconds < 0) {
        setTimerActive((current) => !current);
        if(pomodoroIntervals % 4 === 0) {
          setTimerOption("longBreak");
        } else {
          setTimerOption("shortBreak");
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

  function handleSettings() {
    setOpenSettings((current) => !current);
  }

  return (
    <div className={`${styles.container} ${styles[timer]}`}>
      <Header handleSettings={handleSettings}/>
      <div className={styles.timer_container}>
        <div className={styles.timer_header}>
          <button
            className={`${styles.button} ${timer === pomodoro ? styles.selected : ""}`}
            onClick={() => setTimerOption(pomodoro)}
            >Pomodoro
          </button>
          <button
            className={`${styles.button} ${timer === shortBreak ? styles.selected : ""}`}
            onClick={() => setTimerOption(shortBreak)}
              >Short Break
          </button>
          <button
            className={`${styles.button} ${timer === longBreak ? styles.selected : ""}`}
            onClick={() => setTimerOption(longBreak)}
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
      {openSettings && <Settings />}
    </div>
  )
}                                                                                               

export default App;
