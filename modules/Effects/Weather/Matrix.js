import {
    MATRIX0SPRITE,
    MATRIX1SPRITE,
    MATRIX2SPRITE,
    MATRIX3SPRITE,
    MATRIX4SPRITE,
    MATRIX5SPRITE,
    MATRIX6SPRITE,
    MATRIX7SPRITE,
    MATRIX8SPRITE,
    MATRIX9SPRITE,
    MATRIX10SPRITE,
    MATRIX11SPRITE,
    MATRIX12SPRITE,
} from '../../Assets/Effects.js';
import { CANVAS } from '../../Assets/Other.js';
import { game } from '../../../app.js';
import { randomInRange } from '../../Logic/Helpers.js';
import { SceneUtils } from '../../Scene/SceneUtils.js';

const SPRITE = [
    MATRIX0SPRITE,
    MATRIX1SPRITE,
    MATRIX2SPRITE,
    MATRIX3SPRITE,
    MATRIX4SPRITE,
    MATRIX5SPRITE,
    MATRIX6SPRITE,
    MATRIX7SPRITE,
    MATRIX8SPRITE,
    MATRIX9SPRITE,
    MATRIX10SPRITE,
    MATRIX11SPRITE,
    MATRIX12SPRITE,
];

const GLITCHFREQUENCY = 1000; // in ticks, higher = longer

export class Matrix {
    constructor() {
        this.x = CANVAS.width / 2;
        this.y = CANVAS.height / 2;
        this.ticks = 0;
        this.duration = 1;
        this.sprite = SPRITE[this.ticks % SPRITE.length];
        game.audiocontroller.playSound('matrix');
    }

    move() {
        this.ticks++;
        this.sprite = SPRITE[this.ticks % SPRITE.length];

        if (this.ticks % GLITCHFREQUENCY === 0) {
            SceneUtils.shakeScreen(1, 0.5);
            game.audiocontroller.playSound('glitch');
            const glitchInterval = setInterval(() => {
                game.weathercontroller.glitchOffset.y = randomInRange(-100, 100);
                game.weathercontroller.glitchOffset.x = randomInRange(-100, 100);
            }, 50);

            setTimeout(() => {
                game.weathercontroller.glitchOffset = { x: 0, y: 0 };
                clearInterval(glitchInterval);
            }, 500);
        }
    }

    stop() {
        game.audiocontroller.stopSound('matrix');
        this.duration = 0;
    }
}
