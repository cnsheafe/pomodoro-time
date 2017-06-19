const {pageDisplay, controlDisplay} = require('../general/page');

function navListener(navGroup, state) {
  navGroup.addEventListener('click', event => {
    event.preventDefault();
    pageDisplay(event.target.dataset.page);
    controlDisplay(event.target);
  });
}

module.exports = navListener;
