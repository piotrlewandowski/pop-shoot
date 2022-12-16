import { game } from '../../../app.js';

const CHARGERATE = 1; // default charging rate
const DISCHARGERATE = 1; // default discharging rate if no uranium fuel upgrade
const CHARGE_DELAY = 50; // delay in ticks before start charging. lower = faster

export class SlowmoGauge {
    constructor() {
        this.charge = 100; // 0=EMPTY 100=FULL
        this.setObserver();
        this.chargeDelay = CHARGE_DELAY;
    }

    setObserver() {
        let fn = () => {
            // If SLOWMO, discharge gauge as long as it's not fully empty
            // If it becomes empty, stop slowmo
            if (game.state.slowmo && !game.state.paused) {
                if (this.charge === 0) {
                    game.state.stopSlowmo();
                } else {
                    this.startDischarging();
                }
            }
            // If not in SLOWMO, charge the gauge as long as it has not
            // yet reached full charge
            if (!game.state.slowmo && !game.state.paused && !this.isCharged()) {
                this.startCharging();
            }
        };
        setInterval(fn.bind(this), 50);
    }

    startCharging() {
        if (this.chargeDelay > 0) {
            return this.chargeDelay--;
        }
        game.audiocontroller.playSlowmoChargeSound();
        this.charge += CHARGERATE;
        game.player.flame.move({ smoke: 'smoke_normal' });
        if (this.charge >= 100) {
            this.charge = 100;
            game.audiocontroller.stopSlowmoChargeSound();
        }
    }

    startDischarging() {
        game.audiocontroller.stopSlowmoChargeSound();
        this.chargeDelay = CHARGE_DELAY;
        this.charge -= game.state.variables.uranium ? game.state.variables.uraniumrate : DISCHARGERATE;
        game.player.flame.move({ smoke: 'smoke_small' });
        if (this.charge < 0) {
            this.charge = 0;
        }
    }

    isCharged() {
        return this.charge === 100;
    }
}
