import { game } from '../../app.js';
import { flashScreen } from '../Logic/Helpers.js';

const CHARGING_TIME = 99;
const ACTIVE_TIME = 5;

// If player is hit (without a shield), the clock will stop time for ACTIVE_TIME seconds.
// Timer will be set to CHARGING_TIME and will countdown to 0, during which the clock will not work.

export class Clock {
    constructor() {
        this.owned = false;
        this.active = false;
        this.ready = true;

        this.currentCharge = 0;
    }

    startCharging() {
        this.currentCharge = CHARGING_TIME;
        const timer = setInterval(() => {
            if (!game.state.paused) {
                this.currentCharge--;
            }
            if (this.currentCharge === 0) {
                this.ready = true;
                clearInterval(timer);
            }
        }, 1000);
    }

    activate() {
        flashScreen();
        if (game.state.slowmo) {
            game.state.stopSlowmo();
        }
        this.active = true;
        this.ready = false;
        game.audiocontroller.updateMusic();
        this.startCountdown();
    }

    // The clock will be active for ACTIVE_TIME seconds.
    startCountdown() {
        const timer = setInterval(() => {
            if (!game.state.paused) {
                this.currentCharge--;
            }
            if (this.currentCharge === -ACTIVE_TIME) {
                this.deactivate();
                this.startCharging();
                clearInterval(timer);
            }
        }, 1000);
    }

    deactivate() {
        flashScreen();
        this.active = false;
        game.audiocontroller.updateMusic();
    }
}
