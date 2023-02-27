import { game } from '../../app.js';
import { Scoreball } from './Misc/Scoreball.js';
import { DamageNumber } from './Misc/DamageNumber.js';

export class EffectsPool {
    constructor() {
        this.liveEffects = [];
    }

    add(effect) {
        this.liveEffects.push(effect);

        // If the effect is a damage number & game is in slow-mo state,
        // apply slowmo rates to its duration & speed
        if (game.state.slowmo && (effect.constructor === DamageNumber || effect.constructor === Scoreball)) {
            this.applySlowmoToOne(effect);
        }
    }

    move() {
        this.liveEffects.forEach((effect) => effect.move());
    }

    applySlowmoToAll() {
        this.liveEffects.forEach((effect) => {
            if (effect.constructor === DamageNumber || effect.constructor === Scoreball) {
                this.applySlowmoToOne(effect);
            }
        });
    }

    removeSlowmoFromAll() {
        this.liveEffects.forEach((effect) => {
            if (effect.constructor === DamageNumber || effect.constructor === Scoreball) {
                this.removeSlowmoFromOne(effect);
            }
        });
    }

    applySlowmoToOne(effect) {
        effect.speed *= game.state.variables.slowmorate;
        effect.duration /= game.state.variables.slowmorate;
    }

    removeSlowmoFromOne(effect) {
        effect.speed /= game.state.variables.slowmorate;
        effect.duration *= game.state.variables.slowmorate;
    }

    // Only keep effects which duration have not yet reached 0
    refresh() {
        this.liveEffects = this.liveEffects.filter((effect) => effect.duration > 0);
    }
}
