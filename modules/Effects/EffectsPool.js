import { game } from '../../app.js';
import { Notification } from './Misc/Notification.js';

export class EffectsPool {
    constructor() {
        this.liveEffects = [];
    }

    clearNotifications(type) {
        this.liveEffects.forEach((effect) => {
            if (effect.constructor === Notification && effect.type === type) {
                effect.duration = 0;
            }
        });
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
