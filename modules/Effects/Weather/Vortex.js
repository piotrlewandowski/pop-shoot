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
import { flashScreen, shakeScreen } from '../../Logic/Helpers.js';

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

const ANXIETYFREQUENCY = 1000; // in ticks, higher = longer
const ANXIETYTIME = 2000; // in ms

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

        if (this.ticks % ANXIETYFREQUENCY === 0) {
            flashScreen();
            shakeScreen(4, ANXIETYTIME / 1000);
            game.audiocontroller.playAnxietySound();

            setTimeout(() => {
                flashScreen();
            }, ANXIETYTIME);
        }
    }

    stop() {
        flashScreen();
        this.duration = 0;
        game.audiocontroller.stopVortexSound();
    }
}
