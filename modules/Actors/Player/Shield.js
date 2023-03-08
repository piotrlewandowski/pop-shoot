import { game } from '../../../app.js';
import { SHIELDMETALSPRITE, SHIELDSPRITE, SHIELDUNDERFIRESPRITE } from '../../Assets/Player.js';

const UNDERFIRETIME = 1; // default invincibility time if no metalshield upgrade, in seconds
const CHARGERATE = 1; // default charging rate if no nitrogen upgrade

export class Shield {
    constructor() {
        this.charge = 100;
        this.underfire = false;
        this.setObserver();
        this.sprite = SHIELDSPRITE;
    }

    setObserver() {
        let fn = () => {
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
        let rate = game.itemactioncontroller.nitrogen ? game.itemactioncontroller.nitrogenrate : CHARGERATE;

        if (game.state.slowmo) {
            rate *= game.slowmocontroller.slowmorate;
        }

        if (!game.buffcontroller.noshield) {
            this.charge += rate;
        }

        if (this.charge > 100 || game.buffcontroller.invincibility) {
            this.charge = 100;
        }
    }

    deplete() {
        const underfiretime = game.itemactioncontroller.metalshield
            ? game.itemactioncontroller.metalshieldtime
            : UNDERFIRETIME;

        if (!game.buffcontroller.invincibility && !this.underfire) {
            game.audiocontroller.playSound('shieldDown');
            this.underfire = true;
            setTimeout(() => {
                this.charge = 0;
                this.underfire = false;
            }, underfiretime * 1000);
        }
    }

    setSprite() {
        if (this.underfire) {
            return (this.sprite = SHIELDUNDERFIRESPRITE);
        }
        if (game.itemactioncontroller.metalshield) {
            return (this.sprite = SHIELDMETALSPRITE);
        }
        this.sprite = SHIELDSPRITE;
    }

    isCharged() {
        return this.charge === 100;
    }

    get currentCharge() {
        return Math.round(this.charge);
    }
}
