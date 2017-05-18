function togglePlayButton(wrapperElement) {
  let playButton = wrapperElement.querySelector('.glyphicon');
  playButton.classList.toggle('glyphicon-play');
  playButton.classList.toggle('glyphicon-stop');
}

module.exports = {togglePlayButton};
