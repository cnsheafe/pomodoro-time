const {drawTimeline, populateTable} = require('../render/table');


function timelineListener(timeline, state) {
  timeline.addEventListener('click', event => {
    event.preventDefault();
    google.charts
      .load('current', {'packages':['timeline']});
    const data = populateTable(state);
    google.charts.setOnLoadCallback(
      function() {
        drawTimeline(data);
    });
  });
}

module.exports = timelineListener;
