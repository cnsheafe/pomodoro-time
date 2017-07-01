document.getElementById('demo-button')
  .addEventListener('click', event => {
    $.ajax('/login', {
      method: 'POST',
      data: {
        username: 'demo',
        password: 'password'
      }
    }).then(data => {
      window.location.assign('/app?demo');
      console.log('demo!')
    })
  })
