const togglePlayButton = require('../render/toggle-play-button');

function countdownListener(container, state) {
  container.addEventListener('click', event => {
    event.preventDefault();

    if(container.querySelector('.glyphicon-play')) {
      state.settings.work = document.getElementById('countdown-work')
        .value*60;
      state.settings.break = document.getElementById('countdown-break')
        .value*60;
      state.timer.start(state.settings.work*1e3);

      state.currentSession = {};
      state.currentSession.start = new Date();
      togglePlayButton(container);
      const timeout = window.setTimeout(function () {
        const alarm = new Audio('audio/alarm.mp3');
        alarm.play();
        state.currentSession.end = new Date();
        togglePlayButton(wrapperElement);
        $('#feedback-modal').modal('show'); //from Bootstrap JS

      }, state.settings.work*1000);
      state.timeoutId = timeout;
    }

  else if (container.querySelector('.glyphicon-stop')) {
    window.clearTimeout(state.timeoutId);
    state.timer.stop();
    togglePlayButton(container);
    }
  });
}

module.exports = countdownListener;
