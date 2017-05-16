const {renderTimer} = require('../jss/timer/timer');


function countdownListener(clockDOM){
  clockDOM.addEventListener('submit', event => {
    event.preventDefault();
    const timeLimit = document.getElementById('countdown').value*60;
    const objectiveStatement = document.getElementById('objective-statement').value;
    renderTimer(timeLimit, document.getElementById('wrapper'));

    let stopwatchButton = document.getElementById('stopwatch-btn');
    stopwatchButton.innerHTML = 'Stop';
    stopwatchButton.removeAttribute('data-toggle');
    stopwatchButton.removeAttribute('data-target');
    stopwatchButton.removeAttribute('form');

    const timeout = window.setTimeout(function () {
      const alarm = new Audio('audio/alarm.mp3');
      alarm.play();
      stopwatchButton.innerHTML = 'Start Break';
      stopwatchButton.setAttribute('data-toggle', 'modal');
      stopwatchButton.setAttribute('data-target', '#feedback-modal');
    }, timeLimit*1000);
  });
}

module.exports = {countdownListener};
