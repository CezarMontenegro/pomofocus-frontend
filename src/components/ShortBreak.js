import { useState, useEffect } from 'react';
import styles from './ShortBreak.module.css'


function ShortBreak() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(5);
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
      <div className={styles.buttons_container}>
        <button className={`${styles.button} ${styles['pomodoro']}`} onClick={() => props.setPomodoroOption('pomodoro')}>Pomodoro</button>
        <button className={`${styles.button} ${styles['shortBreak']}`} onClick={() => props.setPomodoroOption('shortBreak')}>Short Break</button>
        <button className={`${styles.button} ${styles['longBreak']}`} onClick={() => props.setPomodoroOption('longBreak')}>Long Break</button>
      </div>
        <div className={styles.timer}>
          <span>{ minutes < 10 ? `0${minutes}` : minutes }</span><span>:</span><span>{ seconds < 10 ? `0${seconds}` : seconds }</span>
        </div>
        <div className={styles.controls}>
          <button id="start/pause" onClick={playStopTimer}>{timerActive ? "Pause" : "Start"}</button>
      </div>
    </div>
  )
}

export default ShortBreak;

