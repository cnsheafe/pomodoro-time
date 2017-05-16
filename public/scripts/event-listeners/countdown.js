const jss = require('../jss/jss.min');
const reflow = require('../jss/reflow');
const {spinnerJss, maskJss, fillerJss} = require('../jss/presets');
function countdownListener(clockDOM){
  clockDOM.addEventListener('submit', function(event) {
  event.preventDefault();
  const timeLimit = document.getElementById('countdown').value*60;
  const objectiveStatement = document.getElementById('objective-statement').value;

  jss.remove();
  let elm = document.getElementById('wrapper').firstElementChild;
  reflow.timer(elm);
  //elm.offsetWidth triggers layout reflow to reset the animation
  jss.set('.spinner',spinnerJss);
  jss.set('.filler', fillerJss);
  jss.set('.mask', maskJss);
  let stopwatchButton = document.getElementById('stopwatch-btn');
  stopwatchButton.innerHTML = 'Stop';
  stopwatchButton.removeAttribute('data-toggle');
  stopwatchButton.removeAttribute('data-target');
  stopwatchButton.removeAttribute('form');
  const timerComponents = {
    '.spinner': `rota ${timeLimit}s linear 1 forwards`,
    '.filler': `fill ${timeLimit/2}s steps(1,end) 1 forwards`,
    '.mask': `mask ${timeLimit/2}s steps(1,end) 1 forwards`,
  };
  for (const cssClass in timerComponents) {
    jss.set(cssClass, {
      'animation': timerComponents[cssClass]
    });
  }
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
