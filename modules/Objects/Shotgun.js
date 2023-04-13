import { game } from '../../app.js';
import { SceneUtils } from '../Scene/SceneUtils.js';
import { Shell } from '../Lasers/Friendly/Shell.js';

const RELOADSPEED = 20; // in ms. charge increases by 1 for every 'reloadspeed' ms

export class Shotgun {
    constructor() {
        this.charge = 100;
        this.owned = false;
        this.setObserver();
    }

    setObserver() {
        let fn = () => {
            if (!this.isLoaded() & !game.state.paused) {
                this.charge++;
            }
        };
        setInterval(fn.bind(this), RELOADSPEED);
    }

    shoot() {
        this.charge = 0;
        SceneUtils.shakeScreen(4, 0.5);
        game.audiocontroller.playSound('reload');
        this.fireShells();
    }

    fireShells() {
        for (let i = 0; i < 100; i += 5) {
            setTimeout(() => {
                game.bluelasers.add(new Shell());
            }, i);
        }
    }

    isLoaded() {
        return this.charge === 100;
    }

    get chargeRatio() {
        return this.charge / 100;
    }
}
