const {countdownListener, ringBell} = require('./event-listeners/countdown');
const timer = require('./render/timer');
const modalListener = require('./event-listeners/modal');
const parseCookieString = require('./general/cookie');
const {pageDisplay} = require('./general/page');
const navListener = require('./event-listeners/nav');
const settingsListener = require('./event-listeners/settings');
const timelineListener = require('./event-listeners/timeline');

let state = {
  username: null,
  settings: {
    work: 25,
    break: 5,
  },
  cookie: {
    name: null,
    val: null
  },
  history: [],
  currentSession: {
    start: null,
    end: null,
    mood: null
  },
  timer: timer(document.getElementById('timer-module'), {duration: 1e3, interval: 1000}, ringBell),
};

const cookies = document.cookie;
state.username = window.location.search.slice(1);
parseCookieString(cookies, state);

$.ajax({
  method: 'GET',
  url: `/me`,
  data: {
    username: state.username,
    id: state.cookie.val
  }
})
.then(data => {
  state.settings = data.settings;
  state.history = data.history;
  let buttonLink = document.getElementById('account-interface').querySelector('a');
  buttonLink.classList.add('hide');
  buttonLink.nextElementSibling.textContent = 'Logout';
  let settingsButton = document.getElementById('settings-button');
  settingsButton.classList.remove('hide');
  document.getElementById('timeline-button').classList.remove('hide');

  document.getElementById('countdown-work').setAttribute('value', state.settings.work);
  document.getElementById('countdown-break').setAttribute('value', state.settings.break);
});

let navControls = document.getElementById('nav-controls');
navListener(navControls, state);


let stopwatch = document.getElementById('timer-module');
countdownListener(stopwatch, state);


let modalSubmit = document.getElementById('modal-submit');
modalListener(modalSubmit, state);


let settings = document.getElementById('settings-save-button');
settingsListener(settings, state);


let timeline = document.getElementById('timeline-button');
timelineListener(timeline, state);
