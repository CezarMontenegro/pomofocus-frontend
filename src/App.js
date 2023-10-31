import styles from './App.module.css'
import Pomodoro from "./components/Pomodoro";

function App() {
  return (
    <div class={styles.app_container}>
      <Pomodoro />
    </div>
  );
}

export default App;
