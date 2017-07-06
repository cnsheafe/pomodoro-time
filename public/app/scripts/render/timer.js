class Timer {
  constructor(container, settings) {
    let mql = window.matchMedia('(max-width: 768px)');
    if(mql.matches) {
      if (window.innerHeight < window.innerWidth) {
        container.classList.add('landscape-timer-wrapper');
      }
    }
    container.setAttribute('style', `height: ${container.offsetWidth}px`);

    window.addEventListener('resize', event => {
    if (mql.matches) {
      if (window.innerHeight < window.innerWidth) {
        container.classList.add('landscape-timer-wrapper');
      }else {
        container.classList.remove('landscape-timer-wrapper')
      }
    }else if(window.innerHeight < window.innerWidth){
      container.classList.remove('landscape-timer-wrapper');
    }

    if(container.offsetWidth > 0) {
      container.setAttribute('style', `height: ${container.offsetWidth}px`)
    }
  });

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

  start(duration, callback) {
    this.settings.duration = duration || this.settings.duration;
    this.counter.count = 0;
    this.callback = callback;
    this.timeoutId = setTimeout(() => {
      this.anim.spinnerLeft.cancel();
      this.anim.spinnerRight.cancel();
      this.anim.rightOpa.cancel();
      this.callback.call(this);
    }, duration);
    this.draw();
  }

  stop() {
    clearTimeout(this.timeoutId);
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
      });
  }
}

module.exports = function(container, settings) {
  return new Timer(container, settings);
};
