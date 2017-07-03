const togglePlayButton = require('../render/toggle-play-button');
const ringBell = require('./countdown').ringBell;
const startTimerHelper = require('./countdown').startTimerHelper;
const timelineHelper = require('./timeline').timelineHelper;

function modalListener(form, state) {
  const note = document.getElementById('modal-note');

  form.addEventListener('click', event => {
    console.log(event.target);
    console.log(event.target.tagName);
    if(event.target.classList.contains('mood-feedback')) {
      state.currentSession.mood = event.target.getAttribute('data-mood');
      note.classList.remove('hidden');
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    console.log("form: ", state.currentSession);
    const currentSession = Object.assign({}, state.currentSession);
    state.history.push(currentSession);
    $.ajax('../me', {
      method: 'PUT',
      data: {
        username: state.username,
        id: state.cookie.val,
        history: state.history
      }
    })
    .then(() => {
      $('#feedback-modal').modal('hide');
      timelineHelper(state, document.getElementById('timeline-container'));
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

}
function resumeModalListener(modal, state) {
  modal
    .querySelector('.modal-button')
    .addEventListener('click', event => {
      const wrapperElement = document.getElementById('timer-module');
      togglePlayButton(wrapperElement);
      $('#resume-modal').modal('hide');
      console.log(state);
      startTimerHelper(state);
    })
};
module.exports = {modalListener, resumeModalListener};
