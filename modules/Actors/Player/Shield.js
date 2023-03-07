import { game } from '../../../app.js';
import { SHIELDEMPSPRITE, SHIELDMETALSPRITE, SHIELDSPRITE, SHIELDUNDERFIRESPRITE } from '../../Assets/Player.js';

const INVINCIBILITYTIME = 1; // default invincibility time if no metalshield upgrade, in seconds
const CHARGERATE = 1; // default charging rate if no nitrogen upgrade

export class Shield {
    constructor() {
        this.charge = 100; // 0=EMPTY 100=FULL
        this.sprite = [SHIELDSPRITE];
        this.underfire = false;
        this.setObserver();
    }

    // This method will observe the state of the shield and charge/discharge accordingly
    setObserver() {
        let fn = () => {
            // First check if shield is upgraded and set sprite accordingly
            this.setSprite();

            if (!game.state.paused && !this.isCharged()) {
                this.startCharging();
                if (this.isCharged()) {
                    game.audiocontroller.playSound('shieldUp');
                }
            }
        };
        setInterval(fn.bind(this), 50);
    }

    startCharging() {
        let rate = game.itemcontroller.nitrogen ? game.itemcontroller.nitrogenrate : CHARGERATE;

        if (game.state.slowmo) {
            rate *= game.state.variables.slowmorate;
        }

        if (!game.itemcontroller.noshield) {
            this.charge += rate;
        }

        if (this.charge > 100 || game.itemcontroller.invincibility) {
            this.charge = 100;
        }
    }

    deplete() {
        const invincibilitytime = game.itemcontroller.metalshield
            ? game.itemcontroller.metalshieldtime
            : INVINCIBILITYTIME;

        if (!game.itemcontroller.invincibility && !this.underfire) {
            game.audiocontroller.playSound('shieldDown');
            this.underfire = true;
            setTimeout(() => {
                this.charge = 0;
                this.underfire = false;
            }, invincibilitytime * 1000);
        }
    }

    setSprite() {
        if (this.underfire) {
            this.sprite = [SHIELDUNDERFIRESPRITE];
        } else {
            this.sprite = [SHIELDSPRITE];
            if (game.itemcontroller.emp) {
                this.sprite.push(SHIELDEMPSPRITE);
            }
            if (game.itemcontroller.metalshield) {
                this.sprite.unshift(SHIELDMETALSPRITE);
            }
        }
    }

    isCharged() {
        return this.charge === 100;
    }

    getCharge() {
        return Math.round(this.charge);
    }
}
