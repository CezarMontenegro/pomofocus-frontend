import styles from './Settings.module.css';

function Settings() {
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
            <input type="number" />
          </label>
          <label>
            <span>Short Break</span>
            <input type="number" />
          </label>
          <label>
            <span>Long Break</span>
            <input type="number" />
          </label>
        </div>
      </div>
    </div>
  )
}

export default Settings