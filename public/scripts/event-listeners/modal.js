const {renderTimer} = require('../jss/timer/timer');
const {togglePlayButton} = require('../render/toggle-play-button');
function formListener(form, state, jss) {
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
    $.ajax('http://localhost:8080/me',{
      method: 'PUT',
      data: {
        username: state.username,
        id: state.cookie.val,
        history: state.history
      }
    })
    .then(() => console.log('ok'));
  });


  $('#feedback-modal').on('hidden.bs.modal', event => {
    event.preventDefault();
    const wrapperElement = document.getElementById('stopwatch-display');
    // console.log('submit');
    note.classList.add('hidden');
    renderTimer(state.settings.break, wrapperElement, jss);
    togglePlayButton(wrapperElement);
    const timeout = window.setTimeout(function () {
      const alarm = new Audio('audio/alarm.mp3');
      alarm.play();
    }, state.settings.break*1000);
    state.timeoutId = timeout;
  });
}

module.exports = formListener;
