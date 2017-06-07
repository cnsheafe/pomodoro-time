function settingsListener(settings, state) {
  settings.addEventListener('click', event => {
    event.target.textContent = 'Saving...';
    event.target.setAttribute('disabled','disabled');
    $.ajax({
      method: 'PUT',
      url: 'http://localhost:8080/me',
      data : {
        id: state.id,
        username: state.username,
        settings: {
          work: document.getElementById('default-work').getAttribute('value'),
          break: document.getElementById('default-break').getAttribute('value'),
        }
      }
    })
    .then(data => event.target.textContent = 'Saved');
  });
}

module.exports = settingsListener;
