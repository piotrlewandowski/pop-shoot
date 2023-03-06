import {
    RAIN0SPRITE,
    RAIN1SPRITE,
    RAIN2SPRITE,
    RAIN3SPRITE,
    RAIN4SPRITE,
    RAIN5SPRITE,
    RAIN6SPRITE,
    RAIN7SPRITE,
    RAIN8SPRITE,
} from '../../Assets/Effects.js';
import { game } from '../../../app.js';
import { CANVAS } from '../../Assets/Other.js';
import { SceneUtils } from '../../Scene/SceneUtils.js';

const SPRITE = [
    RAIN0SPRITE,
    RAIN1SPRITE,
    RAIN2SPRITE,
    RAIN3SPRITE,
    RAIN4SPRITE,
    RAIN5SPRITE,
    RAIN6SPRITE,
    RAIN7SPRITE,
    RAIN8SPRITE,
];
const BIGTHUNDERFREQUENCY = 1800; // in ticks, higher = longer
const SMALLTHUNDERFREQUENCY = 400; // in ticks, higher = longer

export class Rain {
    constructor() {
        this.x = CANVAS.width / 2;
        this.y = CANVAS.height / 2;
        this.ticks = 0;
        this.duration = 1;
        this.sprite = SPRITE[this.ticks % SPRITE.length];
        game.audiocontroller.playSound('rain');
        game.audiocontroller.playSound('bigThunder');
    }

    move() {
        this.ticks++;
        this.sprite = SPRITE[this.ticks % SPRITE.length];

        if (this.ticks % BIGTHUNDERFREQUENCY === 0) {
            game.audiocontroller.playSound('bigThunder');
            SceneUtils.flashScreen();
        }

        if (this.ticks % SMALLTHUNDERFREQUENCY === 0) {
            game.audiocontroller.playSound('smallThunder');
        }
    }

    stop() {
        game.audiocontroller.playSound('bigThunder');
        game.audiocontroller.stopSound('rain');
        this.duration = 0;
    }
}
