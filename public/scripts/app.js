const jss = require('./jss');


let clockDOM = document.querySelector('form.timer');

clockDOM.addEventListener('submit', function(event) {
  event.preventDefault();
  const timeLimit = document.getElementById('countdown').value*60;
  console.log(timeLimit);
  const timerComponents = {
    '.spinner': `rota ${timeLimit}s linear 1 forwards`,
    '.filler': `fill ${timeLimit/2}s steps(1,end) forwards`,
    '.mask': `mask ${timeLimit/2}s steps(1,end) forwards`,
  };
  let timerDom = document.getElementById('wrapper').firstElementChild;
  for (const cssClass in timerComponents) {
    jss.set(cssClass, {
      'animation': timerComponents[cssClass]
    });
  }
});
