console.log(document.cookie);


document.getElementById('login-form')
  .addEventListener('submit', event => {
    event.preventDefault()
    let usernameInput = document.getElementById('username-input');
    let passwordInput = document.getElementById('password-input');
    $.ajax('/login', {
      method: 'POST',
      data: {
        username: usernameInput.value,
        password: passwordInput.value
      }
    }).then(res => {
      window.location.href = res.redirectTo;
    }).catch(err => {
      if (err.status === 422) {
        document.getElementById('login-form')
          .querySelectorAll('.form-group')
          .forEach((element, index) => {
            element.classList.add('has-error');
          })
        document.getElementById('msg-block')
          .classList.remove('hide');

        console.log('Incorrect credentials!')
      }
    })
  })
