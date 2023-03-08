import { game } from '../../../app.js';
import { Coin } from '../../Effects/Misc/Coin.js';
import { CollisionActions } from './CollisionActions.js';

export class CollisionDetection {
    static checkBluelasersEnemies() {
        game.enemies.liveEnemies.forEach((enemy) => {
            game.bluelasers.liveLasers.forEach((laser) => {
                if (this._areColliding(enemy, laser)) {
                    CollisionActions.BluelasersEnemies(enemy, laser);
                }
            });
        });
    }

    static checkPlayerEnemies() {
        game.enemies.liveEnemies.forEach((enemy) => {
            if (this._areColliding(enemy, game.player)) {
                CollisionActions.PlayerEnemies(enemy);
            }
        });
    }

    static checkPlayerFirelasers() {
        game.firelasers.liveLasers.forEach((laser) => {
            if (this._areColliding(laser, game.player)) {
                CollisionActions.PlayerFirelasers(laser);
            }
        });
    }

    static checkEnemiesEnemies() {
        game.enemies.liveEnemies.forEach((enemy1) => {
            game.enemies.liveEnemies.forEach((enemy2) => {
                if (this._areColliding(enemy1, enemy2)) {
                    CollisionActions.EnemiesEnemies(enemy1, enemy2);
                }
            });
        });
    }

    static checkCoinPlayer() {
        game.effects.liveEffects.forEach((effect) => {
            if (this._areColliding(effect, game.player) && effect.constructor === Coin) {
                CollisionActions.CoinPlayer(effect, game.player);
            }
        });
    }

    static checkEnemyCanvas() {
        game.enemies.liveEnemies.forEach((enemy) => {
            CollisionActions.EnemyCanvas(enemy);
        });
    }

    // every entity that can collide has a radius. this function
    // checks if two entities (represented by circles) are colliding
    static _areColliding(entity1, entity2) {
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
