import { CANVAS } from '../Assets/OtherGfx.js';
import { game } from '../../app.js';

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
        laser.speed *= game.state.variables.slowmorate;
    }

    removeSlowmoFromOne(laser) {
        laser.speed /= game.state.variables.slowmorate;
    }

    // Only keep lasers that are not shattered and still on-screen
    refresh() {
        this.liveLasers = this.liveLasers.filter(
            (laser) => laser.y >= 0 && laser.y <= CANVAS.height && laser.x >= 0 && laser.x <= CANVAS.width && !laser.shattered
        );
    }
}
