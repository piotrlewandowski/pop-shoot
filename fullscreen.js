var gameContainer = document.getElementById('game-container');

document.addEventListener('DOMContentLoaded', enterFullscreen);

function enterFullscreen() {
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

var fullscreenButton = document.getElementById('fullscreen-button');

fullscreenButton.addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
}
