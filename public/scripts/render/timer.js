class Timer {
  constructor(container, settings) {

    container.setAttribute('style', `height: ${container.offsetWidth}px`);

    window.addEventListener('resize', event =>
      container.setAttribute('style', `height: ${container.offsetWidth}px`)
    );

    this.container = container;
    container.innerHTML =
      `<div class="spinner-left timer"></div>
        <div class="spinner-right timer"></div>
        <div class="hide-left timer"></div>
        <div class="hide-right timer"></div>
        <div class="timer timer-button">
          <button class="glyphicon glyphicon-play" type="button"></button>
        </div>
      `;

    this.container.querySelector('.glyphicon')
      .onfocus = function() {
        this.blur();
      }
    this.settings = settings || {
      duration: 1e3,
      interval: 100
    };

    this.counter = {
      count: 0,
      epoch: null
    };

    this.callback = null;
    this.anim = {};
  }

  update() {
    let [duration, interval] = Object.values(this.settings);
    if(this.counter.count * interval < duration) {
      ++this.counter.count;
      interval -= performance.now() - (this.counter.epoch + this.settings.interval*(this.counter.count-1));

      this.timeoutId = setTimeout(() => {
        this.update();
      }, Math.floor(interval));
    }
    else {
      this.callback.call(this);
    }
  }

  start(duration, callback) {
    this.settings.duration = duration || this.settings.duration;
    this.counter.count = 0;
    this.callback = callback;
    this.counter.epoch = performance.now();
    this.draw();
    this.update();
  }

  stop() {
    clearTimeout(this.timeoutId);
    console.log(this.anim);
    this.anim.spinnerLeft.pause();
    for (let animation in this.anim) {
      this.anim[animation].pause();
    }
  }


  draw() {
    this.anim.spinnerLeft = this.container.querySelector('.spinner-left')
      .animate([
        {transform: 'rotate(0)'},
        {transform: 'rotate(180deg)'}
      ], {
        duration: this.settings.duration/2,
        endDelay: this.settings.duration/2,
        fill: 'forwards'
      });

    this.anim.spinnerRight = this.container.querySelector('.spinner-right')
      .animate([
        {transform: 'rotate(0deg)'},
        {transform: 'rotate(180deg)'}
      ], {
        duration: this.settings.duration/2,
        delay: this.settings.duration/2
      });
    this.anim.rightOpa = this.container.querySelector('.spinner-right')
      .animate([
        {opacity: 0},
        {opacity: 1, offset: 0.5},
        {opacity: 1}
      ], {
        duration: this.settings.duration,
        easing: 'steps(2)'
      })
  }
}

module.exports = function(container, settings) {
  return new Timer(container, settings);
};
