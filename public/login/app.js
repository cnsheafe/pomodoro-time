console.log(document.cookie);
// document.cookie = 'pomodoro=null';
// console.log(document.cookie);
// TODO: Parse cookie and set pomodoro to null
// see if app breaks
$.ajax('../logout', {
  method: 'GET',
  data: {

  }
})
.then((data) => {
  console.log('hi');
});
