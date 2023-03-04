import { game } from '../../../app.js';
import { CANVAS } from '../../Assets/OtherGfx.js';
import { RedPackage } from '../Packages/RedPackage.js';
import { Slash } from '../../Effects/Misc/Slash.js';

export class EnemyPool {
    constructor() {
        this.liveEnemies = [];
    }

    add(enemy) {
        this.liveEnemies.push(enemy);

        // If enemy is spawned while the game is in slow-mo,
        // let the enemy's speed & firing rate be slowed down
        // in order to match the other enemies on screen
        if (game.state.slowmo) {
            this.applySlowmoToOne(enemy);
        }
    }

    move() {
        // Enemies will keep moving unless stunned
        // or if the clock item is active
        if (!game.player.clock.active) {
            this.liveEnemies.forEach((enemy) => {
                if (!enemy.stunned) {
                    enemy.move();
                }
            });
        }
    }

    // This function is used by items that damage all enemies,
    // such as EMP, bombs & toxic waste
    damageAll(amount) {
        this.liveEnemies.forEach((enemy) => {
            enemy.takeDamage(amount);
            game.effects.add(new Slash(enemy.x, enemy.y));
        });
    }

    // If replay variable is set to true, the enemies array will be cleared (used for replay after game-over)
    // If set to false, the enemies will be killed normally & cash will be counted (used after killing bosses)
    clear(replay) {
        if (replay) {
            this.liveEnemies = [];
        } else {
            this.liveEnemies.forEach((enemy) => {
                if (enemy.constructor !== RedPackage && !enemy.name) {
                    enemy.hp = 0;
                }
            });
        }
    }

    applySlowmoToAll() {
        this.liveEnemies.forEach((enemy) => {
            this.applySlowmoToOne(enemy);
        });
    }

    removeSlowmoFromAll() {
        this.liveEnemies.forEach((enemy) => {
            this.removeSlowmoFromOne(enemy);
        });
    }

    applySlowmoToOne(enemy) {
        enemy.speed *= game.state.variables.slowmorate;
        enemy.firingrate /= game.state.variables.slowmorate;
    }

    removeSlowmoFromOne(enemy) {
        enemy.speed /= game.state.variables.slowmorate;
        enemy.firingrate *= game.state.variables.slowmorate;
    }

    // Used to check if there are any enemies on screen. Currently used by seekers & airstrike
    enemiesOnScreen() {
        return this.liveEnemies.length;
    }

    // Execute the die() function on enemies with HP <= 0,
    // then remove enemies that are dead or off-screen.
    refresh() {
        this.liveEnemies = this.liveEnemies.filter((enemy) => {
            const isRedPackage = enemy.constructor === RedPackage;
            const isOnScreen = enemy.y <= CANVAS.height;
            const isAlive = enemy.hp > 0;

            // Call die() function on killed enemies & remove them
            if (!isAlive && isOnScreen) {
                enemy.die();
                return false;
            }

            // RedPackage has left the screen limits
            if (isRedPackage && !isOnScreen) {
                enemy.vanish();
                return false;
            }

            // Keep living enemies only if still on-screen
            if (isAlive && isOnScreen) {
                return true;
            }
        });
    }
}
