function settingsListener(settings, state) {
  settings.addEventListener('click', event => {
    event.target.textContent = 'Saving...';
    event.target.setAttribute('disabled','disabled');

    state.settings.work = document.getElementById('default-work').value;
    state.settings.break = document.getElementById('default-break').value;
    document.getElementById('countdown-work').setAttribute('value', state.settings.work);
    document.getElementById('countdown-break').setAttribute('value', state.settings.break);

    $.ajax({
      method: 'PUT',
      url: '../me',
      data : {
        id: state.cookie.val,
        username: state.username,
        settings: {
          work: state.settings.work,
          break: state.settings.break,
        }
      }
    })
    .then(data => event.target.textContent = 'Saved');
  });
}

module.exports = settingsListener;
