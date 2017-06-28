const togglePlayButton = require('../render/toggle-play-button');

function countdownListener(container, state) {
  container.addEventListener('click', event => {
    event.preventDefault();

    if(container.querySelector('.glyphicon-play')) {
      state.settings.work = document.getElementById('countdown-work')
        .value*60;
      state.settings.break = document.getElementById('countdown-break')
        .value*60;
      startTimerHelper(state);
    }

    else if (container.querySelector('.glyphicon-stop')) {
      state.timer.stop();
      togglePlayButton(container);
    }
  });
}

function ringBell() {
  const alarm = new Audio('audio/alarm_edit.mp3');
  alarm.play();
  this.stop();
  togglePlayButton(this.container);
}

function startTimerHelper(state) {
  state.timer.start(state.settings.work*1e3, function() {
    ringBell.call(this);
    state.currentSession.end = new Date();
    $('#feedback-modal').modal('show');
  });
  state.currentSession.start = new Date();
  togglePlayButton(state.timer.container);
}
module.exports = {countdownListener, ringBell, startTimerHelper};
