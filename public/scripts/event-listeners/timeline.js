const {drawTimeline, populateTable} = require('../render/table');


function timelineListener(timeline, state) {

  timeline.addEventListener('click', event => {
    event.preventDefault();
    timelineHelper(state, document.getElementById('timeline-page'));
  });
  window.onresize = function() {
    timelineHelper(state, document.getElementById('timeline-page'));
  };
}

function timelineHelper(state, width) {
  google.charts
    .load('current', {'packages':['timeline']});
  const data = populateTable(state);
  google.charts.setOnLoadCallback(
    function() {
      drawTimeline(data, width);
  });
}
module.exports = timelineListener;
