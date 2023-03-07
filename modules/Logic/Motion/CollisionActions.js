import { game } from '../../../app.js';
import { DamageNumber } from '../../Effects/Misc/DamageNumber.js';
import { Movement } from './Movement.js';
import { randomInRange } from '../Helpers.js';
import { Drone } from '../../Lasers/Friendly/Drone.js';
import { Airstrike } from '../../Lasers/Friendly/Airstrike.js';
import { Dart } from '../../Lasers/Friendly/Dart.js';
import { Slash } from '../../Effects/Misc/Slash.js';
import { RedPackage } from '../../Actors/Packages/RedPackage.js';
import { OrangePackage } from '../../Actors/Packages/OrangePackage.js';
import { SceneUtils } from '../../Scene/SceneUtils.js';

export class CollisionActions {
    static BluelasersEnemies(enemy, laser) {
        if (!game.state.variables.blankbullets) {
            // Pushback & play sound if the laser is not a drone or dart
            if (laser.constructor !== Drone && laser.constructor !== Dart) {
                enemy.pushBack();

                // Determine which hit-sound to play
                if (enemy.constructor === RedPackage || enemy.constructor === OrangePackage) {
                    game.audiocontroller.playSound('hitMetal');
                } else if (game.state.variables.quaddamage) {
                    game.audiocontroller.playSound('hitQuad');
                } else {
                    game.audiocontroller.playSound('hit');
                }
            }

            // Damage enemy & show damage-number and slash
            enemy.takeDamage(laser.damage);
            game.effects.add(new DamageNumber(enemy.x, enemy.y, laser.damage));
            game.effects.add(new Slash(enemy.x, enemy.y));

            // Check if Bomb upgraded
            if (game.state.variables.bomb) {
                game.enemies.damageAll(laser.damage * game.state.variables.bombdamagerate);
            }

            // Airstrike
            if (game.state.variables.airstrike) {
                const airstrikeroll = randomInRange(0, 100);
                if (
                    game.enemies.enemiesOnScreen() &&
                    airstrikeroll < game.state.variables.airstrikechance &&
                    laser.constructor !== Airstrike &&
                    laser.constructor !== Drone
                ) {
                    game.enemies.liveEnemies.forEach((enemy, index) => {
                        setTimeout(() => {
                            game.bluelasers.add(new Airstrike(enemy));
                        }, 100 * index);
                    });
                }
            }

            // Darts
            if (game.state.variables.darts && !enemy.name) {
                const stunroll = randomInRange(0, 100);
                if (stunroll < game.state.variables.dartsstunchance) {
                    enemy.stun();
                    enemy.takeDamage(laser.damage * game.state.variables.dartsrate);
                }
            }
        }
        laser.shatter();
    }

    static PlayerEnemies(enemy) {
        if (game.player.shield.isCharged() && !enemy.name) {
            SceneUtils.flashScreen();
            enemy.takeDamage(enemy.hp);
            game.player.shield.deplete();
        } else if (game.player.clock.isReady) {
            game.player.clock.activate();
        } else {
            game.state.setGameOver();
        }
    }

    static PlayerFirelasers(firelaser) {
        if (game.player.shield.isCharged()) {
            SceneUtils.flashScreen();
            firelaser.shatter();
            game.player.shield.deplete();
        } else if (game.player.clock.isReady) {
            game.player.clock.activate();
        } else {
            game.state.setGameOver();
        }
    }

    static CoinPlayer(coin, player) {
        coin.removeAndCount();
    }

    static EnemiesEnemies(enemy1, enemy2) {
        Movement.moveAway(enemy1, enemy2);
    }

    static EnemyCanvas(enemy) {
        Movement.moveToCanvas(enemy);
    }
}
