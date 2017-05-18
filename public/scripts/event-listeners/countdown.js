const {renderTimer} = require('../jss/timer/timer');
const reflow = require('../jss/reflow');
const {togglePlayButton} = require('../render/toggle-play-button');

function countdownListener(clockDOM, state, jss){
  clockDOM.addEventListener('submit', event => {
    event.preventDefault();
    const wrapperElement = document.getElementById('stopwatch-display');
    if(wrapperElement.querySelector('.glyphicon-play')) {
      const timeLimit = document.getElementById('countdown-work').value*60;

      renderTimer(timeLimit, document.getElementById('stopwatch-display'), jss);
      togglePlayButton(wrapperElement);
      const timeout = window.setTimeout(function () {
        const alarm = new Audio('audio/alarm.mp3');
        alarm.play();
        togglePlayButton(wrapperElement);
        $('#feedback-modal').modal('show'); //from Bootstrap JS
      }, timeLimit*1000);
      state.timeoutId = timeout;
  }

  else if (wrapperElement.querySelector('.glyphicon-stop')) {
    jss.remove();
    window.clearTimeout(state.timeoutId);
    reflow.timer(wrapperElement.firstElementChild);
    togglePlayButton(wrapperElement);
    }
  });
}

module.exports = {countdownListener};
