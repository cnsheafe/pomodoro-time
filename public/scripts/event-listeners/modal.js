const togglePlayButton = require('../render/toggle-play-button');
const ringBell = require('./countdown').ringBell;

function formListener(form, state) {
  const note = document.getElementById('modal-note');

  form.addEventListener('click', event => {
    console.log('click');
    if(event.target.classList.contains('mood-feedback')) {
      state.currentSession.mood = event.target.getAttribute('data-mood');
      note.classList.remove('hidden');
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    console.log('submit');
    state.history.push(state.currentSession);
    $.ajax('/me',{
      method: 'PUT',
      data: {
        username: state.username,
        id: state.cookie.val,
        history: state.history
      }
    })
    .then(() => {
      $('#feedback-modal').modal('hide')
    });
  });


  $('#feedback-modal').on('hidden.bs.modal', event => {
    event.preventDefault();
    const wrapperElement = document.getElementById('timer-module');
    note.classList.add('hidden');

    state.timer.start(state.settings.break*1e3, ringBell);
    togglePlayButton(wrapperElement);
    // const timeout = window.setTimeout(function () {
    //   const alarm = new Audio('audio/alarm.mp3');
    //   alarm.play();
    // }, state.settings.break*1000);
    // state.timeoutId = timeout;
  });
}

module.exports = formListener;
