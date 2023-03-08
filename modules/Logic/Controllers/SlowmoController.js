import { game } from '../../../app.js';

const SLOWMORATE = 0.2; // Default Slowmo rate. Lower = Slower. 1 = Fullspeed.

export class SlowmoController {
    constructor() {
        this.slowmorate = SLOWMORATE;
    }

    start() {
        game.enemies.applySlowmoToAll();
        game.firelasers.applySlowmoToAll();
        game.bluelasers.applySlowmoToAll();
        game.effects.applySlowmoToAll();
        game.player.flame.toggleSpriteSpeed();
    }

    stop() {
        game.enemies.removeSlowmoFromAll();
        game.firelasers.removeSlowmoFromAll();
        game.bluelasers.removeSlowmoFromAll();
        game.effects.removeSlowmoFromAll();
        game.player.flame.toggleSpriteSpeed();
    }
}
