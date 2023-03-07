import { game } from '../../../app.js';
import { SHIELDEMPSPRITE, SHIELDMETALSPRITE, SHIELDSPRITE, SHIELDUNDERFIRESPRITE } from '../../Assets/Player.js';
import { randomInRange } from '../../Logic/Helpers.js';

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
        let rate = game.state.variables.nitrogen ? game.state.variables.nitrogenrate : CHARGERATE;

        if (game.state.slowmo) {
            rate *= game.state.variables.slowmorate;
        }

        if (!game.state.variables.noshield) {
            this.charge += rate;
        }

        if (this.charge > 100 || game.state.variables.invincibility) {
            this.charge = 100;
        }
    }

    deplete() {
        if (game.state.variables.emp) {
            this.activateEmp();
        }

        const invincibilitytime = game.state.variables.metalshield
            ? game.state.variables.metalshieldtime
            : INVINCIBILITYTIME;

        if (!game.state.variables.invincibility && !this.underfire) {
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
            if (game.state.variables.emp) {
                this.sprite.push(SHIELDEMPSPRITE);
            }
            if (game.state.variables.metalshield) {
                this.sprite.unshift(SHIELDMETALSPRITE);
            }
        }
    }

    activateEmp() {
        game.enemies.damageAll(
            randomInRange(2, 6) * game.state.variables.damageMultiplier * game.state.variables.emprate
        );
        game.firelasers.clear();
    }

    isCharged() {
        return this.charge === 100;
    }

    getCharge() {
        return Math.round(this.charge);
    }
}
