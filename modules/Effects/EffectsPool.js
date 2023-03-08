import { game } from '../../app.js';
import { SlowMo } from '../Logic/State/SlowMo.js';
import { Coin } from './Misc/Coin.js';
import { DamageNumber } from './Misc/DamageNumber.js';

export class EffectsPool {
    constructor() {
        this.liveEffects = [];
    }

    add(effect) {
        this.liveEffects.push(effect);

        // If the effect is a damage number & game is in slow-mo state,
        // apply slowmo rates to its duration & speed
        if (game.state.slowmo && (effect.constructor === DamageNumber || effect.constructor === Coin)) {
            this.applySlowmoToOne(effect);
        }
    }

    move() {
        this.liveEffects.forEach((effect) => effect.move());
    }

    applySlowmoToAll() {
        this.liveEffects.forEach((effect) => {
            if (effect.constructor === DamageNumber || effect.constructor === Coin) {
                this.applySlowmoToOne(effect);
            }
        });
    }

    removeSlowmoFromAll() {
        this.liveEffects.forEach((effect) => {
            if (effect.constructor === DamageNumber || effect.constructor === Coin) {
                this.removeSlowmoFromOne(effect);
            }
        });
    }

    applySlowmoToOne(effect) {
        effect.speed *= SlowMo.slowmorate;
        effect.duration /= SlowMo.slowmorate;
    }

    removeSlowmoFromOne(effect) {
        effect.speed /= SlowMo.slowmorate;
        effect.duration *= SlowMo.slowmorate;
    }

    // Only keep effects which duration have not yet reached 0
    refresh() {
        this.liveEffects = this.liveEffects.filter((effect) => effect.duration > 0);
    }
}
