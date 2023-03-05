import { game } from '../../app.js';
import { Notification } from '../Effects/Misc/Notification.js';
import { CANVAS } from '../Assets/Other.js';
import { WHITESCREENSPRITE } from '../Assets/Effects.js';

// Returns a random number between min(inclusive) and max(inclusive)
export function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Converts game time to MM:SS format
export function getGametimeToMMSS() {
    let minutes = Math.floor(game.state.time / 60);
    let seconds = game.state.time % 60;

    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return `${minutes}:${seconds}`;
}

// Returns the closest enemy to entity
export function getClosestEnemyTo(entity) {
    let distance = 9999;
    let closestEnemy;
    game.enemies.liveEnemies.forEach((enemy) => {
        const dx = enemy.x - entity.x;
        const dy = enemy.y - entity.y;

        const squared = Math.pow(dx, 2) + Math.pow(dy, 2);
        const newDistance = Math.sqrt(squared);

        if (newDistance < distance) {
            distance = newDistance;
            closestEnemy = enemy;
        }
    });
    return closestEnemy;
}

// White screen-flash
export function flashScreen() {
    game.effects.add(new Notification(CANVAS.width / 2, CANVAS.height / 2, WHITESCREENSPRITE, 5));
}

// Screen-shake effect
export function shakeScreen(intensity, duration) {
    const shake = setInterval(() => (game.scene.shake = randomInRange(-intensity, intensity)), 16);

    setTimeout(() => {
        game.scene.shake = 0;
        clearInterval(shake);
    }, duration * 1000);
}
