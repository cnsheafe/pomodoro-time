class Timer {
  constructor(container, settings, callback) {
    container.setAttribute('style', `height: ${container.offsetWidth}px`);

    window.addEventListener('resize',event =>
      container.setAttribute('style', `height: ${container.offsetWidth}px`)
    );
    this.container = container;
    container.innerHTML =
      `<div class="spinner timer"></div>
        <div class="filler timer"></div>
        <div class="background-border-left timer"></div>
        <div class="background-border-right timer"></div>
        <div class="timer timer-button">
          <button class="glyphicon glyphicon-play" type="button"></button>
        </div>
      `;
    this.settings = settings || {
      duration: 1e3,
      interval: 100
    };
    this.counter = {
      count: 0,
      epoch: null
    };

    this.callback = null;
  }
  update() {
    let [duration, interval] = Object.values(this.settings);
    if(this.counter.count * interval < duration) {
      ++this.counter.count;
      this.draw(this.counter.count * interval, duration);
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
    this.container
      .querySelector('.background-border-left')
      .removeAttribute('style');
    this.container
      .querySelector('.filler')
      .removeAttribute('style');
    this.callback = callback;
    this.counter.epoch = performance.now();
    this.update();
  }

  stop() {
    clearTimeout(this.timeoutId);
    // this.callback.call(this);
  }


  draw(progress, max) {
    if (progress/max > 0.5) {
      this.container.querySelector('.background-border-left').setAttribute('style', `z-index: 25`);
      this.container.querySelector('.filler').setAttribute('style', 'z-index: 75');
    }
    this.container.querySelector('.spinner').setAttribute('style', `transform: rotate(${progress/max*360}deg)`);
  }
}

module.exports = function(container, settings, callback) {
  return new Timer(container, settings, callback);
};
