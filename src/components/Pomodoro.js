function Pomodoro() {
  function setTimer() {
    
  }

  return (
    <div className="container">
      <div class="pomodoro-timer">
        <h2>Cronômetro Pomodoro</h2>
        <div class="timer">
            <span id="minutes">25</span>:<span id="seconds">00</span>
        </div>
        <div class="controls">
            <button id="start/pause">Iniciar</button>
            <button id="pause">Pausar</button>
        </div>
    </div>
    </div>
  )
}

export default Pomodoro;

