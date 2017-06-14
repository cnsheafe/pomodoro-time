const togglePlayButton = require('../render/toggle-play-button');

function countdownListener(clockDOM, state) {
  clockDOM.addEventListener('submit', event => {
    event.preventDefault();
    const wrapperElement = document.getElementById('timer-module');

    if(wrapperElement.querySelector('.glyphicon-play')) {
      state.settings.work = document
        .getElementById('countdown-work').value*60;
      state.settings.break = document
        .getElementById('countdown-break').value*60;

      state.timer.start(state.settigns.work*1e3);

      state.currentSession = {};
      state.currentSession.start = new Date();
      togglePlayButton(wrapperElement);
      const timeout = window.setTimeout(function () {
        const alarm = new Audio('audio/alarm.mp3');
        alarm.play();
        state.currentSession.end = new Date();
        // togglePlayButton(wrapperElement);
        $('#feedback-modal').modal('show'); //from Bootstrap JS

      }, state.settings.work*1000);
      state.timeoutId = timeout;
    }

  else if (wrapperElement.querySelector('.glyphicon-stop')) {
    window.clearTimeout(state.timeoutId);
    // reflow.timer(wrapperElement.firstElementChild);
    state.timer.stop();
    togglePlayButton(wrapperElement);
    }
  });
}

module.exports = countdownListener;
