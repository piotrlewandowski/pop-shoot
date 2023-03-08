import { game } from '../../app.js';

export class EffectsPool {
    constructor() {
        this.liveEffects = [];
    }

    add(effect) {
        this.liveEffects.push(effect);

        if (game.state.slowmo) {
            game.slowmocontroller.applyToOneEffect(effect);
        }
    }

    move() {
        this.liveEffects.forEach((effect) => effect.move());
    }

    refresh() {
        this.liveEffects = this.liveEffects.filter((effect) => effect.duration > 0);
    }
}
