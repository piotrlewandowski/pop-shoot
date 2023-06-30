var fullscreenButton = document.getElementById('fullscreen-button');
var gameContainer = document.getElementById('game-container');

fullscreenButton.addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
  if (gameContainer.requestFullscreen) {
    gameContainer.requestFullscreen();
  } else if (gameContainer.mozRequestFullScreen) {
    gameContainer.mozRequestFullScreen();
  } else if (gameContainer.webkitRequestFullscreen) {
    gameContainer.webkitRequestFullscreen();
  } else if (gameContainer.msRequestFullscreen) {
    gameContainer.msRequestFullscreen();
  }
}

document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);
window.addEventListener('resize', handleResize);

function handleFullscreenChange() {
  if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
    fullscreenButton.style.display = 'none';
    handleResize();
  } else {
    fullscreenButton.style.display = 'block';
  }
}

function handleResize() {
  if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
    var windowHeight = window.innerHeight;
    gameContainer.style.height = windowHeight + 'px';
  }
}
