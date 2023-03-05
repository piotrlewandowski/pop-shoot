// BUFFS ARE DROPPED BY ORANGE PACKAGES

import { randomInRange } from '../Helpers.js';
import { game } from '../../../app.js';
import { BUFFS } from '../../Drops/Buffs.js';

const BUFFDURATION = 15; // in seconds

export class BuffController {
    constructor() {
        this.activeBuff = false;
        this.countdown = 0;
    }

    drop() {
        this.activeBuff = BUFFS[randomInRange(0, BUFFS.length - 1)];
        this.activeBuff.enable();
        this.startTimer();
    }

    startTimer() {
        this.countdown = BUFFDURATION;
        this.timer = setInterval(() => {
            if (!game.state.paused) {
                this.countdown--;
            }
            if (this.countdown <= 0) {
                this.activeBuff.disable();
                this.activeBuff = false;
                clearInterval(this.timer);
            }
        }, 1000);
    }
}
