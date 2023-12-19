import { useState } from 'react';
import styles from './Settings.module.css';

function Settings({
    handleTimerDurations,
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration,
    pomodoroIntervalsToLongBreak
  }) {

  const [pomodoro, setPomodoro] = useState(pomodoroDuration);
  const [shortBreak, setShortBreak] = useState(shortBreakDuration);
  const [longBreak, setLongBreak] = useState(longBreakDuration);
  const [intervals, setIntervals] = useState(pomodoroIntervalsToLongBreak);

  return (
    <div className={styles.settings_container}>
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
        <button onClick={() => handleTimerDurations(pomodoro, shortBreak, longBreak, intervals)}>
          Save
        </button>
      </div>
    </div>
  )
}

export default Settings