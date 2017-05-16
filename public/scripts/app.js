const {countdownStart} = require('./event-listeners/countdown');

let clockDOM = document.getElementById('stopwatch');
countdownListener(clockDOM);

let modalsubmitDOM = document.getElementById('modal-submit');
modalListener(modalsubmitDOM);
