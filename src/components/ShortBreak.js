import { useState, useEffect } from 'react';
import styles from './ShortBreak.module.css';
import Header from './Header.js';

function ShortBreak({ setTimerOption, setIntervals, pomodoroIntervals }) {
  const [seconds, setSeconds] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  //This is a switch to set when the timer is running or not
  function playStopTimer() {
    setTimerActive( (prevTimerActive) => !prevTimerActive);
  }

  useEffect(() => {
    let intervalId;

    if (timerActive) {
      if (seconds < 0) {
        setSeconds(59);
        setMinutes((prevMinutes) => prevMinutes - 1)
      }

      if (minutes == 0 & seconds < 0) {
        setTimerActive((current) => !current);
        setIntervals();
        setTimerOption("pomodoro");
      }

      intervalId = setInterval(() => {
        setSeconds((prevSegundos) => prevSegundos - 1);
      }, 1000);
    
      
    
    return () => {
      clearInterval(intervalId);
    };
  }
  }, [timerActive, seconds, minutes]);  



  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.timer_container}>
        <div className={styles.timer_header}>
          <button
            className={styles.button}
            onClick={() => setTimerOption('pomodoro')}
            >Pomodoro
          </button>

          <button
            className={`${styles.button} ${styles.selected}`}
            onClick={() => setTimerOption('shortBreak')}
              >Short Break
          </button>

          <button
            className={styles.button}
            onClick={() => setTimerOption('longBreak')}
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
        <h3>Time for a small break!</h3>
      </div>
    </div>
  )
}

export default ShortBreak;

