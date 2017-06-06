const {countdownListener} = require('./event-listeners/countdown');
const {modalListener} = require('./event-listeners/modal');
const jss = require('./jss/jss.min');
const {parseCookieString} = require('./general/cookie');
const {pageDisplay} = require('./general/page');
const navListener = require('./event-listeners/nav');
let state = {
  username: null,
  feedback: {
    mood: null
  },
  settings: {
    work: null,
    break: null,
  },
  cookie: {
    name: null,
    val: null
  }
};

const cookies = document.cookie;
state.username = window.location.search.slice(1);
parseCookieString(cookies, state);
$.ajax({
  method: 'GET',
  url: `http://localhost:8080/me`,
  data: {
    username: state.username,
    id: state.cookie.val
  }
})
.then(data => {
  state.settings = data.settings;
  state.history = data.history;
  let buttonLink = document.querySelector('header > a');
  buttonLink.classList.add('hide');
  buttonLink.nextElementSibling.querySelector('button').textContent = 'Logout';
  let settingsButton = document.getElementById('settings-button');
  settingsButton.classList.remove('hide');
  document.getElementById('timeline-button').classList.remove('hide');
});

let navControls = document.getElementById('nav-controls');
navListener(navControls, state);


let stopwatch = document.getElementById('stopwatch');
countdownListener(stopwatch, state, jss);


let modalSubmit = document.getElementById('modal-submit');
modalListener(modalSubmit, state, jss);
