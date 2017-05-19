const {renderTimer} = require('../jss/timer/timer');
function modalListener(modalDOM, state, jss) {
  const note = document.getElementById('modal-note');

  modalDOM.addEventListener('click', event => {
    // event.preventDefault();
    console.log('click');
    if(event.target.classList.contains('mood-feedback')) {
      state.feedback.mood = event.target.getAttribute('data-mood');
      note.classList.remove('hidden');
    }
  });
  $('#feedback-modal').on('hidden.bs.modal', event => {
    event.preventDefault();
    const wrapperElement = document.getElementById('stopwatch-display');
    console.log('submit');
    note.classList.add('hidden');
    renderTimer(state.settings.break, wrapperElement, jss);
    togglePlayButton(wrapperElement);
    const timeout = window.setTimeout(function () {
      const alarm = new Audio('audio/alarm.mp3');
      alarm.play();
      togglePlayButton(wrapperElement);
      // $('#feedback-modal').modal('show'); //from Bootstrap JS
    }, state.settings.break*1000);
    state.timeoutId = timeout;
  });
}

module.exports = {modalListener};
