import { Game } from './modules/Game.js';

// FPS control
const FPS = 60;
const interval = 1000 / FPS;
let then;

// Initiate game variable & start game loop
export const game = new Game();
window.requestAnimationFrame(gameloop);

// Game loop
export function gameloop(timestamp) {
    if (!game.state.paused && !game.state.over) {
        // Set 'then' variable the first time
        if (then === undefined) {
            then = timestamp;
        }

        // Calculate time difference between frames
        // and run game logic accordingly
        const delta = timestamp - then;
        window.requestAnimationFrame(gameloop);
        if (delta > interval) {
            game.draw();
            game.move();
            game.checkCollisions();
            game.refresh();
            then = timestamp - (delta % interval);
            return;
        }
    }
    if (game.state.over) {
        return game.scene.drawGameOver();
    }
    if (game.state.paused) {
        return game.scene.drawPause();
    }
}
