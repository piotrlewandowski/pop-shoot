import { game } from '../../../app.js';

export class SlowMo {
    static start() {
        // ENEMIES
        game.enemies.applySlowmoToAll();

        // LASERS
        game.firelasers.applySlowmoToAll();
        game.bluelasers.applySlowmoToAll();

        // EFFECTS
        game.effects.applySlowmoToAll();
        game.player.flame.toggleSpriteSpeed();
    }

    static stop() {
        // ENEMIES
        game.enemies.removeSlowmoFromAll();

        // LASERS
        game.firelasers.removeSlowmoFromAll();
        game.bluelasers.removeSlowmoFromAll();

        // EFFECTS
        game.effects.removeSlowmoFromAll();
        game.player.flame.toggleSpriteSpeed();
    }
}
