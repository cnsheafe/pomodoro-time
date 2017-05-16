function modalListener(modalDOM, state) {
  modalDOM.addEventListener('click', event => {
    event.preventDefault();
    if(event.target.classList.contains('mood-feedback')) {
      state.feedback.mood = event.target.getAttribute('data-mood');
    }
    else if (event.target.getAttribute('type')==='submit') {
      state.feedback.mood =  event.target.innerHTML;
    }
  });
}

module.exports = {modalListener};
