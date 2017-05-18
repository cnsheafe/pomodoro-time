// const jss = require('../jss.min');
const reflow = require('../reflow');
const {spinnerJss, maskJss, fillerJss} = require('../presets');
const {togglePlayButton} = require('../../render/toggle-play-button');

function renderTimer(duration, wrapperElement,jss) {
  jss.remove();
  reflow.timer(wrapperElement.firstElementChild);
  jss.set('.spinner',spinnerJss);
  jss.set('.filler', fillerJss);
  jss.set('.mask', maskJss);

  const timerComponents = {
    '.spinner': `rota ${duration}s linear 1 forwards`,
    '.filler': `fill ${duration/2}s steps(1,end) 1 forwards`,
    '.mask': `mask ${duration/2}s steps(1,end) 1 forwards`,
    '.background-border-left': `border-ring ${duration/2}s steps(1,end) 1 forwards`
  };

  for (const cssClass in timerComponents) {
    jss.set(cssClass, {
      'animation': timerComponents[cssClass]
    });
  }
}

module.exports = {renderTimer};
