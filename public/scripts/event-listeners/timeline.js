const drawTimeline = require('../render/table').drawTimeline;
function timelineListener(timeline) {
  timeline.addEventListener('click', event => {
    event.preventDefault();
    //Chart must be loaded after everything to prevent drawing errors
    google.charts
      .load('current', {'packages':['timeline']});
    google.charts.setOnLoadCallback(drawTimeline);
  });

}

module.exports = timelineListener;
