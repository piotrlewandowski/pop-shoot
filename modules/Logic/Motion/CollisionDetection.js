import { game } from '../../../app.js';
import { Coin } from '../../Effects/Misc/Coin.js';
import { CollisionActions } from './CollisionActions.js';

export class CollisionDetection {
    static checkCollisions() {
        // BLUELASERS AND ENEMIES
        game.enemies.liveEnemies.forEach((enemy) => {
            game.bluelasers.liveLasers.forEach((laser) => {
                if (this.areColliding(enemy, laser)) {
                    CollisionActions.BluelasersEnemies(enemy, laser);
                }
            });
        });

        // PLAYER AND ENEMIES
        game.enemies.liveEnemies.forEach((enemy) => {
            if (this.areColliding(enemy, game.player)) {
                CollisionActions.PlayerEnemies(enemy);
            }
        });

        // PLAYER AND ENEMY LASERS
        game.firelasers.liveLasers.forEach((laser) => {
            if (this.areColliding(laser, game.player)) {
                CollisionActions.PlayerLasers(laser);
            }
        });

        // ENEMIES AND ENEMIES
        game.enemies.liveEnemies.forEach((enemy1) => {
            game.enemies.liveEnemies.forEach((enemy2) => {
                if (this.areColliding(enemy1, enemy2)) {
                    CollisionActions.EnemiesEnemies(enemy1, enemy2);
                }
            });
        });

        // BLUELASERS AND FIRELASERS
        game.bluelasers.liveLasers.forEach((bluelaser) => {
            game.firelasers.liveLasers.forEach((firelaser) => {
                if (this.areColliding(bluelaser, firelaser)) {
                    CollisionActions.BluelasersFirelasers(bluelaser, firelaser);
                }
            });
        });

        // COINS AND PLAYER
        game.effects.liveEffects.forEach((effect) => {
            if (this.areColliding(effect, game.player) && effect.constructor === Coin) {
                CollisionActions.CoinPlayer(effect, game.player);
            }
        });

        // ENEMIES AND CANVAS LIMITS
        game.enemies.liveEnemies.forEach((enemy) => {
            CollisionActions.EnemyCanvas(enemy);
        });
    }

    // Every entity in the game is represented by a circle.
    // This function checks if two entities (represented by
    // circles) are colliding
    static areColliding(entity1, entity2) {
        if (entity1.radius === -1 || entity2.radius === -1) {
            // used to make some entities invulerable by setting their radius to -1
            return false;
        }
        const dx = entity1.x - entity2.x;
        const dy = entity1.y - entity2.y;

        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < entity1.radius + entity2.radius;
    }
}
