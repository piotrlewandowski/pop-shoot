import { game } from '../../app.js';
import { SceneUtils } from '../Scene/SceneUtils.js';
import { Shell } from '../Lasers/Friendly/Shell.js';

const RELOADSPEED = 1;

export class Shotgun {
    constructor() {
        this.charge = 100;
        this.owned = false;
    }

    shoot() {
        this.charge = 0;
        SceneUtils.shakeScreen(4, 0.5);
        game.audiocontroller.playSound('reload');
        this.fireShells();
        this.reload();
    }

    fireShells() {
        for (let i = 0; i < 50; i += 5) {
            setTimeout(() => {
                game.bluelasers.add(new Shell());
            }, i);
        }
    }

    reload() {
        const reloader = setInterval(() => {
            if (this.charge >= 100) {
                this.charge = 100;
                return clearInterval(reloader);
            }
            this.charge += RELOADSPEED;
        }, 100);
    }

    get isLoaded() {
        return this.charge === 100;
    }

    get chargeRatio() {
        return this.charge / 100;
    }
}
