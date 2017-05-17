const {renderTimer} = require('../jss/timer/timer');


function countdownListener(clockDOM){
  clockDOM.addEventListener('submit', event => {
    event.preventDefault();
    const timeLimit = document.getElementById('countdown-work').value*60;
    renderTimer(timeLimit, document.getElementById('stopwatch-display'));

    const timeout = window.setTimeout(function () {
      const alarm = new Audio('audio/alarm.mp3');
      alarm.play();
      // stopwatchButton.innerHTML = 'Start Break';
    }, timeLimit*1000);
  });
}

module.exports = {countdownListener};
