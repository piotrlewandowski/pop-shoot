import { Game } from './modules/Game.js';

const FPS = 60;
const interval = 1000 / FPS;
let then;

export const game = new Game();
window.requestAnimationFrame(gameloop);

export function gameloop(timestamp) {
    if (!game.state.paused && !game.state.over) {
        // set 'then' variable the first time
        if (then === undefined) {
            then = timestamp;
        }

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
