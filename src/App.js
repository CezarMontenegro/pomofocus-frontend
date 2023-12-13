import { useState } from 'react';

const timerList = {
  pomodoro: "pomodoro",
  shortBreak: "shortBreak",
  longBreak: "longBreak"
}

function App() {
  const [timerOption, setTimerOption] = useState(timerList.pomodoro);

  return (
    <div>
    {console.log(timerOption.pomodoro)}
    Oi
    </div>
  );
}

export default App;