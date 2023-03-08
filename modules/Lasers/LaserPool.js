import { CANVAS } from '../Assets/Other.js';
import { game } from '../../app.js';
import { Debris } from './Friendly/Debris.js';

export class LaserPool {
    constructor() {
        this.liveLasers = [];
    }

    add(laser) {
        this.liveLasers.push(laser);
        if (game.state.slowmo) {
            this.applySlowmoToOne(laser);
        }
    }

    clear() {
        this.liveLasers.forEach((laser) => laser.shatter());
    }

    move() {
        if (!game.player.clock.active) {
            this.liveLasers.forEach((laser) => laser.move());
        }
    }

    applySlowmoToAll() {
        this.liveLasers.forEach((laser) => this.applySlowmoToOne(laser));
    }

    removeSlowmoFromAll() {
        this.liveLasers.forEach((laser) => this.removeSlowmoFromOne(laser));
    }

    applySlowmoToOne(laser) {
        laser.speed *= game.slowmocontroller.slowmorate;
    }

    removeSlowmoFromOne(laser) {
        laser.speed /= game.slowmocontroller.slowmorate;
    }

    // Only keep lasers that meet the below conditions:
    // - Not shattered
    // - Still on-screen
    // - Out of screen, but is a space debris
    refresh() {
        this.liveLasers = this.liveLasers.filter((laser) => {
            const isShattered = laser.shattered;
            const isDebris = laser.constructor === Debris;
            const isInScreen = laser.y >= 0 && laser.y <= CANVAS.height && laser.x >= 0 && laser.x <= CANVAS.width;

            if (isShattered) {
                return false;
            }

            if (isDebris) {
                return true;
            }

            if (!isInScreen) {
                return false;
            }

            return true;
        });
    }
}
