import { useState } from 'react';
import styles from './Settings.module.css';

function Settings({ openSettings, timerDurations, setTimerDurations }) {

  const [pomodoro, setPomodoro] = useState(timerDurations.pomodoro);
  const [shortBreak, setShortBreak] = useState(timerDurations.shortBreak);
  const [longBreak, setLongBreak] = useState(timerDurations.longBreak);
  const [intervals, setIntervals] = useState(timerDurations.intervals);

  function handleSubmit() {
    setTimerDurations({
      pomodoro,
      shortBreak,
      longBreak,
      intervals
    });
    localStorage.setItem('timer_durations', JSON.stringify(timerDurations));
    openSettings();
  }

  return (
    <div className={styles.settings_container}>
      {console.log(pomodoro, shortBreak, longBreak, intervals)}
      <div className="settings">
        <span>Settings</span>
      </div>
      <div className="timer_title">
        <span>Time (minutes)</span>
        <div className="timer_settings">
          <label>
            <span>Pomodoro</span>
            <input
              type="number"
              name="pomodoro"
              value={pomodoro}
              placeholder={pomodoro}
              onChange={(e) => {
                const newValue = parseInt(e.target.value, 10);
                setPomodoro(newValue < 0 ? 0 : newValue);
              }}
            />
          </label>
          <label>
            <span>Short Break</span>
            <input
              type="number"
              name="shortBreak"
              value={shortBreak}
              placeholder={shortBreak}
              onChange={(e) => {
                const newValue = parseInt(e.target.value, 10);
                setShortBreak(newValue < 0 ? 0 : newValue);
              }}
            />
          </label>
          <label>
            <span>Long Break</span>
            <input
              type="number"
              name="longBreak"
              value={longBreak}
              placeholder={longBreak}
              onChange={(e) => {
                const newValue = parseInt(e.target.value, 10);
                setLongBreak(newValue < 0 ? 0 : newValue);
              }}
            />
          </label>
        </div>
      </div>
      <div className="interval_settings">
        <label>
          <span>Long Break Intervals</span>
          <input
            type="number"
            name="intervals"
            value={intervals}
            placeholder={intervals}
            onChange={(e) => {
              const newValue = parseInt(e.target.value, 10);
                setIntervals(newValue < 1 ? 1 : newValue);
            }}
          />
        </label>
      </div>
      <div>
        <button onClick={() => handleSubmit(pomodoro, shortBreak, longBreak, intervals)}>
          Save
        </button>
      </div>
    </div>
  )
}

export default Settings