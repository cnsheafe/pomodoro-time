const {drawTimeline, populateTable} = require('../render/table');


function timelineListener(timeline, state) {

  timeline.addEventListener('click', event => {
    event.preventDefault();
    timelineHelper(state, document.getElementById('timeline-container'));
  });
  window.onresize = function() {
    timelineHelper(state, document.getElementById('timeline-container'));
  };
}

function timelineHelper(state, container) {
  google.charts
    .load('current', {'packages':['timeline']});
  const data = populateTable(state);
  google.charts.setOnLoadCallback(
    function() {
      drawTimeline(data, container);
  });
  if(!data.length) {
    document.getElementById('empty-timeline').classList.remove('hide');
  }
  else {
    document.getElementById('empty-timeline').classList.add('hide');
  }
}
module.exports = timelineListener;
