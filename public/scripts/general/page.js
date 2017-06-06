function pageDisplay(page) {
  ['timer-page', 'settings-page', 'timeline-page'].forEach(element => {
    document.getElementById(element).classList.add('hide');
  });
  document.getElementById(page).classList.remove('hide');
}

function controlDisplay(control) {
  ['timer-button', 'settings-button', 'timeline-button'].forEach(element => {
    document.getElementById(element).classList.remove('hide');
  });
  control.classList.add('hide');
}

module.exports = {pageDisplay, controlDisplay};
