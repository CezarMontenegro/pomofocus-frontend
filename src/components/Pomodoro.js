import { useState, useEffect } from 'react';
import styles from './Pomodoro.module.css'


function Pomodoro() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  //This is a switch to set when the timer is running or not
  function playStopToogle() {
    setTimerActive( (prevTimerActive) => !prevTimerActive);
  }

  useEffect(() => {
    let intervalId;

    if (timerActive) {
      if (minutes > 59) {
        setMinutes(0);
        setHours((prevHours) => prevHours + 1);
      }

      if (seconds > 59) {
        setSeconds(0);
        setMinutes((prevMinutes) => prevMinutes + 1)
      }

      intervalId = setInterval(() => {
        setSeconds((prevSegundos) => prevSegundos + 1);
      }, 1000);
    
      
    
    return () => {
      clearInterval(intervalId);
    };
  }
  }, [timerActive, seconds, minutes]);



  return (
    <div className={styles.container}>
      <div className={buttons_container}>
        <button className={styles.button}>Pomodoro</button>
        <button className={styles.button}>Short Break</button>
        <button className={styles.button}>Long Break</button>
      </div>
        <div className={styles.timer}>
          <span>{ hours }</span><span>:</span><span>{ minutes }</span><span>:</span><span>{ seconds }</span>
        </div>
        <div className="controls">
          <button id="start/pause" onClick={playStopToogle}>Iniciar</button>
          <button id="pause">Pausar</button>
      </div>
    </div>
  )
}

export default Pomodoro;

