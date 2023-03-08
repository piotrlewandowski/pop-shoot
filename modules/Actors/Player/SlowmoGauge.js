import { game } from '../../../app.js';

const CHARGERATE = 1; // default charging rate
const DISCHARGERATE = 1; // default discharging rate if no uranium fuel upgrade
const CHARGE_DELAY = 50; // delay in ticks before start charging. lower = faster

export class SlowmoGauge {
    constructor() {
        this.charge = 100;
        this.setObserver();
        this.chargeDelay = CHARGE_DELAY;
    }

    setObserver() {
        let fn = () => {
            // if slowmo active, discharge gauge as long as it's
            // not fully empty. if it becomes empty, stop slowmo
            if (game.state.slowmo && !game.state.paused) {
                if (this.charge === 0) {
                    game.state.stopSlowmo();
                } else {
                    this.startDischarging();
                }
            }
            // if slowmo not active, charge the gauge as long as it
            // has not yet reached full charge
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
        game.audiocontroller.playSound('slowmoCharge');
        this.charge += CHARGERATE;
        game.player.flame.move({ smoketype: 'smoke_normal' });
        if (this.charge >= 100) {
            this.charge = 100;
            game.audiocontroller.stopSound('slowmoCharge');
        }
    }

    startDischarging() {
        game.audiocontroller.stopSound('slowmoCharge');
        this.chargeDelay = CHARGE_DELAY;
        this.charge -= game.itemactioncontroller.uranium ? game.itemactioncontroller.uraniumrate : DISCHARGERATE;
        game.player.flame.move({ smoketype: 'smoke_small' });
        if (this.charge < 0) {
            this.charge = 0;
        }
    }

    isCharged() {
        return this.charge === 100;
    }
}
