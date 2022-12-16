import {
    VORTEX0SPRITE,
    VORTEX1SPRITE,
    VORTEX2SPRITE,
    VORTEX3SPRITE,
    VORTEX4SPRITE,
    VORTEX5SPRITE,
    VORTEX6SPRITE,
    VORTEX7SPRITE,
    VORTEX8SPRITE,
} from '../../Assets/Effects.js';
import { game } from '../../../app.js';
import { CANVAS } from '../../Assets/OtherGfx.js';
import { WeatherController } from '../../Logic/Controllers/WeatherController.js';
import { flashScreen } from '../../Logic/Helpers.js';
import { Shake } from '../../Logic/Helpers.js';

const SPRITE = [
    VORTEX0SPRITE,
    VORTEX1SPRITE,
    VORTEX2SPRITE,
    VORTEX3SPRITE,
    VORTEX4SPRITE,
    VORTEX5SPRITE,
    VORTEX6SPRITE,
    VORTEX7SPRITE,
    VORTEX8SPRITE,
];

const DISAPPEARFREQUENCY = 1000; // in ticks, higher = longer
const DISAPPEARTIME = 4000; // in ms

export class Vortex {
    constructor() {
        this.x = CANVAS.width / 2;
        this.y = CANVAS.height / 2;
        this.ticks = 0;
        this.duration = 1;
        this.sprite = SPRITE[this.ticks % SPRITE.length];
        game.audiocontroller.playVortexSound();
        flashScreen();
    }

    move() {
        this.ticks++;
        this.sprite = SPRITE[this.ticks % SPRITE.length];

        if (this.ticks % DISAPPEARFREQUENCY === 0) {
            flashScreen();
            Shake.addShake(4, DISAPPEARTIME / 1000);
            game.audiocontroller.playDisappearSound();
            WeatherController.disappear = true;

            setTimeout(() => {
                flashScreen();
                game.audiocontroller.playDisappearSound();
                WeatherController.disappear = false;
            }, DISAPPEARTIME);
        }
    }

    stop() {
        flashScreen();
        WeatherController.disappear = false;
        this.duration = 0;
        game.audiocontroller.stopVortexSound();
    }
}
