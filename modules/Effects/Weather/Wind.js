import {
    WIND0SPRITE,
    WIND1SPRITE,
    WIND2SPRITE,
    WIND3SPRITE,
    WIND4SPRITE,
    WIND5SPRITE,
    WIND6SPRITE,
    WIND7SPRITE,
    WIND8SPRITE,
} from '../../Assets/Effects.js';
import { CANVAS } from '../../Assets/Other.js';
import { game } from '../../../app.js';
import { SceneUtils } from '../../Scene/SceneUtils.js';

const SPRITE = [
    WIND0SPRITE,
    WIND1SPRITE,
    WIND2SPRITE,
    WIND3SPRITE,
    WIND4SPRITE,
    WIND5SPRITE,
    WIND6SPRITE,
    WIND7SPRITE,
    WIND8SPRITE,
];

const SHAKEFREQUENCY = 50; // in ticks, higher = longer

export class Wind {
    constructor() {
        this.x = CANVAS.width / 2;
        this.y = CANVAS.height / 2;
        this.ticks = 0;
        this.duration = 1;
        this.sprite = SPRITE[this.ticks % SPRITE.length];
        game.audiocontroller.playSound('wind');
    }

    move() {
        this.ticks++;
        this.sprite = SPRITE[this.ticks % SPRITE.length];

        if (this.ticks % SHAKEFREQUENCY === 0) {
            SceneUtils.shakeScreen(2, 1);
        }
    }

    stop() {
        game.audiocontroller.stopSound('wind');
        this.duration = 0;
    }
}
