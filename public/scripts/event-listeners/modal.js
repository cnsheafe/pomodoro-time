const togglePlayButton = require('../render/toggle-play-button');
const ringBell = require('./countdown').ringBell;
const startTimerHelper = require('./countdown').startTimerHelper;

function modalListener(form, state) {
  const note = document.getElementById('modal-note');

  form.addEventListener('click', event => {
    if(event.target.classList.contains('mood-feedback')) {
      state.currentSession.mood = event.target.getAttribute('data-mood');
      note.classList.remove('hidden');
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    state.history.push(state.currentSession);
    $.ajax('/me', {
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
    togglePlayButton(wrapperElement);
    state.timer.start(state.settings.break*1e3, function() {
      ringBell.call(this);
      $('#resume-modal').modal('show');
    });
  });

  document.getElementById('resume-modal')
  .querySelector('.modal-button')
  .addEventListener('click', event => {
    const wrapperElement = document.getElementById('timer-module');
    togglePlayButton(wrapperElement);
    $('#resume-modal').modal('hide');
    state.timer.start(state.settings.work*1e3, function() {
      $('#feedback-modal').modal('show');
      ringBell.call(this);
      state.currentSession.end = new Date();
    });
    state.currentSession.start = new Date();

  })
}

module.exports = modalListener;
