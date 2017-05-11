const jss = require('./jss');


let clockDOM = document.querySelector('form.timer');

const spinnerJSS = {
  'clip': 'rect(auto 150px auto auto)',
  'border-radius': '50%',
  'z-index': '200',
  'border': '2px solid green'
};

let fillerJSS = Object.assign({}, spinnerJSS);
fillerJSS['z-index'] = '250';
const maskJSS = {
  'clip': 'rect(auto 150px auto auto)',
  'z-index': '300',
  'opacity': '1',
  'background': 'white'
};

clockDOM.addEventListener('submit', function(event) {
  event.preventDefault();
  const timeLimit = document.getElementById('countdown').value*60;
  console.log(timeLimit);
  // let
  jss.remove();
  let elm = document.getElementById('wrapper').firstElementChild;
//elm.offsetWidth triggers layout reflow to reset the animation 
  void elm.offsetWidth;

  void elm.nextElementSibling.offsetWidth;
  void elm.nextElementSibling.nextElementSibling.offsetWidth;

  jss.set('.spinner',spinnerJSS);
  jss.set('.filler', fillerJSS);
  jss.set('.mask', maskJSS);

  const timerComponents = {
    '.spinner': `rota ${timeLimit}s linear 1 forwards`,
    '.filler': `fill ${timeLimit/2}s steps(1,end) 1 forwards`,
    '.mask': `mask ${timeLimit/2}s steps(1,end) 1 forwards`,
  };
  for (const cssClass in timerComponents) {
    jss.set(cssClass, {
      'animation': timerComponents[cssClass]
    });
  }
});
