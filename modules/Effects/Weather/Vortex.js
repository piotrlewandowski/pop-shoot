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
import { flashScreen } from '../../Logic/Helpers.js';

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
    }

    stop() {
        flashScreen();
        this.duration = 0;
        game.audiocontroller.stopVortexSound();
    }
}
