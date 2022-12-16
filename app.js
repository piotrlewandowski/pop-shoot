import { Game } from './modules/Game.js';
import { CollisionDetection } from './modules/Logic/Motion/CollisionDetection.js';

export const game = new Game();
window.requestAnimationFrame(gameloop);

export function gameloop() {
    if (!game.state.paused && !game.state.over) {
        game.draw();
        game.move();
        game.refresh();
        CollisionDetection.checkCollisions();
        return window.requestAnimationFrame(gameloop);
    }
    if (game.state.over) {
        return game.scene.drawGameOver();
    }
    if (game.state.paused) {
        return game.scene.drawPause();
    }
}
