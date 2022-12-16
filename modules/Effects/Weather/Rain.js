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
import { flashScreen } from '../../Logic/Helpers.js';
import { CANVAS } from '../../Assets/OtherGfx.js';

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
        game.audiocontroller.playRainSound();
        game.audiocontroller.playBigThunderSound();
        flashScreen();
    }

    move() {
        this.ticks++;
        this.sprite = SPRITE[this.ticks % SPRITE.length];

        if (this.ticks % BIGTHUNDERFREQUENCY === 0) {
            game.audiocontroller.playBigThunderSound();
            flashScreen();
        }

        if (this.ticks % SMALLTHUNDERFREQUENCY === 0) {
            game.audiocontroller.playSmallThunderSound();
        }
    }

    stop() {
        game.audiocontroller.playBigThunderSound();
        flashScreen();
        game.audiocontroller.stopRainSound();
        this.duration = 0;
    }
}
