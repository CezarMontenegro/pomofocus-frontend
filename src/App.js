import { useState } from 'react';
import Pomodoro from './components/Pomodoro';
import ShortBreak from './components/ShortBreak';
import LongBreak from './components/LongBreak';

const timerList = {
  pomodoro: "pomodoro",
  shortBreak: "shortBreak",
  longBreak: "longBreak"
}

function App() {
  const [timer, setTimer] = useState(timerList.pomodoro);
  const [pomodoroIntervals, setPomodoroIntervals] = useState(1);

  const {pomodoro, shortBreak, longBreak} = timerList;

  function setTimerOption(option) {
    setTimer(option)
  }

  function setIntervals(option) {
    setPomodoroIntervals((current) => current + 1);
  }

  return (
    <div>
    {timer === pomodoro && <Pomodoro setTimerOption={setTimerOption} setIntervals={setIntervals} pomodoroIntervals={pomodoroIntervals}/>}
    {timer === shortBreak && <ShortBreak setTimerOption={setTimerOption} setIntervals={setIntervals} pomodoroIntervals={pomodoroIntervals}/>}
    {timer === longBreak && <LongBreak setTimerOption={setTimerOption} setIntervals={setIntervals} pomodoroIntervals={pomodoroIntervals}/>}
    </div>
  );
}

export default App;