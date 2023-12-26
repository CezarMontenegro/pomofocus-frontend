import { useState } from 'react';
import styles from './Settings.module.css';

function Settings({
    openSettings,
    timerDurations,
    setTimerDurations,
    settingsRef,
    autoStartBreaks,
    setAutoStartBreaks,
    autoStartPomodoro,
    setAutoStartPomodoro
  }) {

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
    localStorage.setItem('timer_durations', JSON.stringify({
      pomodoro,
      shortBreak,
      longBreak,
      intervals
    }));
    openSettings();
  }

  return (
    <div className={styles.settings_container} ref={settingsRef}>
      <div className={styles.title}>
        <span>Settings</span>
      </div>
      <div className={styles.timers}>
        <span className={styles.span_title}>Time (minutes)</span>
        <div className={styles.timers_settings}>
          <div className={styles.mini_container}>
            <label htmlFor="pomodoro">Pomodoro</label>
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
          </div>
          <div className={styles.mini_container}>
            <label htmlFor="shortBreak">Short Break</label>
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
          </div>
          <div className={styles.mini_container}>
            <label htmlFor="longBreak">Long Break</label>
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
          </div>
        </div>
      </div>
      <div className={styles.interval_settings}>
        <div className={styles.interval_settings_lines}>
          <label htmlFor="Auto Start Breaks">Auto Start Breaks</label>
          <input
            type="checkbox"
            name="Auto Start Breaks"
            checked={autoStartBreaks}
            onClick={() => setAutoStartBreaks((prev) => !prev)}
          />
        </div>
        <div className={styles.interval_settings_lines}>
          <label htmlFor="Auto Start Pomodoros">Auto Starts Pomodoro</label>
          <input
            type="checkbox"
            name="Auto Start Pomodoros"
            checked={autoStartPomodoro}
            onClick={() => setAutoStartPomodoro((prev) => !prev)}
          />
        </div>
        <div className={styles.interval_settings_lines}>
          <label htmlFor="intervals">Long Break Intervals</label>
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
        </div>
      </div>
      <div className={styles.settings_footer}>
        <button onClick={() => handleSubmit(pomodoro, shortBreak, longBreak, intervals)}>
          Save
        </button>
      </div>
    </div>
  )
}

export default Settings