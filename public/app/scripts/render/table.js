function populateTable(state) {
  let recentDates = [];
  const now = new Date();
  now.setDate(now.getDate() - now.getDay());
  now.setHours(0, 0 ,0);
  const beginMs = now.valueOf();

  now.setDate(now.getDate() + 6);
  now.setHours(23, 59, 59);
  const endMs = now.valueOf();

  state.history.forEach(session => {
    let start = new Date(session.start);
    let end = new Date(session.end);
    if (start.valueOf() > beginMs && end.valueOf() < endMs) {
      recentDates.push([
        {0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday',
        4: 'Thursday', 5: 'Friday', 6: 'Saturday'}[start.getDay()],
        session.mood,
        new Date(0, 0, 0, start.getHours(), start.getMinutes(), start.getSeconds()),
        new Date(0, 0, 0, end.getHours(), end.getMinutes(), end.getSeconds()),
      ]);
    }
  });
  return recentDates;
}


function drawTimeline(dates, container) {
  if(dates.length) {
    google.charts
      .load('current', {'packages':['timeline']});
    const chart = new google.visualization.Timeline(container);
    const table = new google.visualization.DataTable();
    table.addColumn({type: 'string', id: 'Day'});
    table.addColumn({type: 'string', id: 'Mood'});
    table.addColumn({type:'date', id: 'Start'});
    table.addColumn({type: 'date', id: 'End'});
    table.addRows(dates);

    chart.draw(table, {
      width: container.parentNode.offsetWidth,
      height: container.parentNode.offsetHeight,
      hAxis: {
        viewWindow: {
          min: new Date(0, 0, 0, 0, 0, 0),
          max: new Date(0, 0, 0, 23, 59, 59)
        },
        format: 'h:m aa'
      }
    });
  }
}

module.exports = {drawTimeline, populateTable};
