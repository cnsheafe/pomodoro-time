const {countdownListener} = require('./event-listeners/countdown');
const {modalListener} = require('./event-listeners/modal');
const jss = require('./jss/jss.min');
let state = {
  feedback: {
    mood: null
  },
  settings: {
    work: null,
    break: null,
  }
};

let clockDOM = document.getElementById('stopwatch');
countdownListener(clockDOM, state, jss);

let modalsubmitDOM = document.getElementById('modal-submit');
modalListener(modalsubmitDOM, state, jss);

// let loginBtn = document.getElementById('login-btn');
