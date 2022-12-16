import {
    SAND0SPRITE,
    SAND1SPRITE,
    SAND2SPRITE,
    SAND3SPRITE,
    SAND4SPRITE,
    SAND5SPRITE,
    SAND6SPRITE,
    SAND7SPRITE,
    SAND8SPRITE,
} from '../../Assets/Effects.js';
import { CANVAS } from '../../Assets/OtherGfx.js';
import { game } from '../../../app.js';
import { flashScreen } from '../../Logic/Helpers.js';
import { Shake } from '../../Logic/Helpers.js';

const SPRITE = [
    SAND0SPRITE,
    SAND1SPRITE,
    SAND2SPRITE,
    SAND3SPRITE,
    SAND4SPRITE,
    SAND5SPRITE,
    SAND6SPRITE,
    SAND7SPRITE,
    SAND8SPRITE,
];

const MIRAGEFREQUENCY = 1000; // in ticks, higher = longer

export class Sand {
    constructor() {
        this.x = CANVAS.width / 2;
        this.y = CANVAS.height / 2;
        this.ticks = 0;
        this.duration = 1;
        flashScreen();
        this.sprite = SPRITE[this.ticks % SPRITE.length];
        game.audiocontroller.playSandSound();
    }

    move() {
        this.ticks++;
        this.sprite = SPRITE[this.ticks % SPRITE.length];

        if (this.ticks % MIRAGEFREQUENCY === 0) {
            Shake.addShake(500, 0.25);
            game.audiocontroller.playSandFxSound();
            flashScreen();
        }
    }

    stop() {
        this.duration = 0;
        game.audiocontroller.stopSandSound();
        flashScreen();
    }
}
