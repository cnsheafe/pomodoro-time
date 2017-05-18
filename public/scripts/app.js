const {countdownListener} = require('./event-listeners/countdown');
const {modalListener} = require('./event-listeners/modal');
const jss = require('./jss/jss.min');
let state = {
  feedback: {}
};

let clockDOM = document.getElementById('stopwatch');
countdownListener(clockDOM, state, jss);

let modalsubmitDOM = document.getElementById('modal-submit');
modalListener(modalsubmitDOM, state);
