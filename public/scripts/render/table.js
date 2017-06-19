function populateTable(state) {
  let recentDates = [];
  const now = new Date();
  const beginMs = now.setDate(now.getDate() - now.getDay()).valueOf();
  const endMs = now.setDate(now.getDate() + 6 ).valueOf();

  state.history.forEach(session => {
    let start = new Date(session.start);
    let end = new Date(session.end);
    if (start.valueOf() > beginMs && end.valueOf() < endMs) {
      recentDates.push([
        {0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday',
        4: 'Thursday', 5: 'Friday', 6: 'Saturday'}[start.getDay()],
        session.mood,
        start,
        end
      ]);
    }
  });
  console.log(recentDates);
  return recentDates;
  }


function drawTimeline(dates) {
  if(dates.length) {

  const container = document.getElementById('timeline-page');
  google.charts
    .load('current', {'packages':['timeline']});
  const chart = new google.visualization.Timeline(container);
  const table = new google.visualization.DataTable();
  table.addColumn({type: 'string', id: 'Day'});
  table.addColumn({type: 'string', id: 'Mood'});
  table.addColumn({type:'date', id: 'Start'});
  table.addColumn({type: 'date', id: 'End'});
  table.addRows(dates);
  console.log("This is dates", dates);
  chart.draw(table, {
    width: 1000
  });
}
}

module.exports = {drawTimeline, populateTable};
