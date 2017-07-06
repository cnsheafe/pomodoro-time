const {pageDisplay, controlDisplay} = require('../general/page');

function navListener(navGroup, state) {
  navGroup.addEventListener('click', event => {
    if (event.target.dataset.page) {
    pageDisplay(event.target.dataset.page);
    controlDisplay(event.target);
    }
  });
}

module.exports = navListener;
