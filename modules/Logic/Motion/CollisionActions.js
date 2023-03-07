import { game } from '../../../app.js';
import { DamageNumber } from '../../Effects/Misc/DamageNumber.js';
import { Movement } from './Movement.js';
import { Drone } from '../../Lasers/Friendly/Drone.js';
import { Dart } from '../../Lasers/Friendly/Dart.js';
import { Slash } from '../../Effects/Misc/Slash.js';
import { RedPackage } from '../../Actors/Packages/RedPackage.js';
import { OrangePackage } from '../../Actors/Packages/OrangePackage.js';
import { SceneUtils } from '../../Scene/SceneUtils.js';
import { ItemsActions } from '../../Objects/ItemsAction.js';

export class CollisionActions {
    static BluelasersEnemies(enemy, laser) {
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

        enemy.takeDamage(laser.damage);
        game.effects.add(new DamageNumber(enemy.x, enemy.y, laser.damage));
        game.effects.add(new Slash(enemy.x, enemy.y));
        laser.shatter();

        if (game.state.variables.bomb) {
            ItemsActions.bombAll();
        }

        if (game.state.variables.airstrike) {
            ItemsActions.sendAirstrike();
        }

        if (game.state.variables.darts && !enemy.name) {
            ItemsActions.stunWithDart(enemy);
        }
    }

    static PlayerEnemies(enemy) {
        if (game.player.shield.isCharged() && !enemy.name) {
            SceneUtils.flashScreen();
            enemy.takeDamage(enemy.hp);
            game.player.shield.deplete();
            if (game.state.variables.emp) {
                ItemsActions.blowEmp();
            }
        } else if (game.player.clock.isReady && !game.player.clock.active) {
            game.player.clock.activate();
        } else if (!game.player.clock.active) {
            game.state.setGameOver();
        }
    }

    static PlayerFirelasers(firelaser) {
        if (game.player.shield.isCharged()) {
            SceneUtils.flashScreen();
            firelaser.shatter();
            game.player.shield.deplete();
            if (game.state.variables.emp) {
                ItemsActions.blowEmp();
            }
        } else if (game.player.clock.isReady && !game.player.clock.active) {
            game.player.clock.activate();
        } else if (!game.player.clock.active) {
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
