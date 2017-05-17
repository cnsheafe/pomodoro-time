const {countdownListener} = require('./event-listeners/countdown');
const {modalListener} = require('./event-listeners/modal');

let state = {
  feedback: {}
};

let clockDOM = document.getElementById('stopwatch');
countdownListener(clockDOM);

let modalsubmitDOM = document.getElementById('modal-submit');
modalListener(modalsubmitDOM, state);
