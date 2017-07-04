document.getElementById('signup-form').addEventListener('submit', event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    let usernameInput = document.getElementById('username-input');
    let passwordInput= document.getElementById('password-input');
    $.ajax('/signup', {
      method: 'POST',
      data: {
        username: usernameInput.value,
        password: passwordInput.value
      }
    }).then(res => {
        console.log(res);
        window.location.href = res.redirectTo;
    }).catch(err => {
      console.log(err);
      let msgBlock = document.getElementById('msg-block');
      msgBlock.classList.remove('hide');
      msgBlock.innerHTML = err.responseJSON.msg;
    });
  })
