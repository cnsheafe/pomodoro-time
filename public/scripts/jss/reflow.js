const reflow = {
  timer: function(elm) {
  void elm.offsetWidth;
  void elm.nextElementSibling.offsetWidth;
  void elm.nextElementSibling.nextElementSibling.offsetWidth;
  }
};

module.exports = reflow;
