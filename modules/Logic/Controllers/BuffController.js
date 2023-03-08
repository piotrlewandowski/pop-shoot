import { randomInRange } from '../Helpers.js';
import { game } from '../../../app.js';
import { BUFFS } from '../../Objects/Buffs.js';

const BUFFDURATION = 15; // in seconds

// buffs are dropped by OrangePackage

export class BuffController {
    constructor() {
        // active-buff tracking
        this.activeBuff = false;
        this.countdown = 0;

        // buff activation variables
        this.invincibility = false;
        this.mute = false;
        this.noshield = false;
        this.quaddamage = false;
        this.muteenemies = false;
        this.noslowmo = false;
        this.thorshammer = false;
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
