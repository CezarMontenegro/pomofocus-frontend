import { useState } from 'react';
import styles from './Settings.module.css';

function Settings({
    handleTimerDurations,
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration
  }) {

  const [pomodoro, setPomodoro] = useState(pomodoroDuration);
  const [shortBreak, setShortBreak] = useState(shortBreakDuration);
  const [longBreak, setLongBreak] = useState(longBreakDuration);

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
              onChange={(e) => setPomodoro(e.target.value)}
            />
          </label>
          <label>
            <span>Short Break</span>
            <input
              type="number"
              name="shortBreak"
              value={shortBreak}
              placeholder={shortBreak}
              onChange={(e) => setShortBreak(e.target.value)}
            />
          </label>
          <label>
            <span>Long Break</span>
            <input
              type="number"
              name="longBreak"
              value={longBreak}
              placeholder={longBreak}
              onChange={(e) => setLongBreak(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div>
        <button onClick={() => handleTimerDurations(pomodoro, shortBreak, longBreak)}>
          Save
        </button>
      </div>
    </div>
  )
}

export default Settings