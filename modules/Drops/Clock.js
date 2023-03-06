import { game } from '../../app.js';
import { flashScreen } from '../Logic/Helpers.js';

const CHARGING_TIME = 99;
const ACTIVE_TIME = 5;

// If player is hit (while shield is down), the clock will stop time for ACTIVE_TIME seconds.

export class Clock {
    constructor() {
        this.owned = false;
        this.active = false;
        this.countdown = 0;
    }

    activate() {
        flashScreen();
        if (game.state.slowmo) {
            game.state.stopSlowmo();
        }
        this.active = true;
        game.audiocontroller.updateMusic();
        this.startCountdown();
    }

    // Stay active for ACTIVE_TIME seconds
    startCountdown() {
        setTimeout(() => {
            this.deactivate();
            this.startCharging();
        }, ACTIVE_TIME * 1000);
    }

    deactivate() {
        flashScreen();
        this.active = false;
        game.audiocontroller.updateMusic();
    }

    startCharging() {
        this.countdown = CHARGING_TIME;
        const charger = setInterval(() => {
            if (!game.state.paused) {
                this.countdown--;
            }
            if (this.countdown <= 0) {
                clearInterval(charger);
            }
        }, 1000);
    }

    get isReady() {
        return this.countdown === 0;
    }
}
