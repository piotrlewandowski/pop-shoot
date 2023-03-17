import { game } from '../../../app.js';
import { BlueLaser } from './BlueLaser.js';
import { randomInRange } from '../../Logic/Helpers.js';
import { SHELL0SPRITE, SHELL1SPRITE, SHELL2SPRITE, SHELL3SPRITE } from '../../Assets/Lasers.js';

const SPRITE = [SHELL0SPRITE, SHELL1SPRITE, SHELL2SPRITE, SHELL3SPRITE];
const SPEED = 20;
const SPREAD = 15;

export class Shell extends BlueLaser {
    constructor() {
        super();
        this.speed = SPEED;
        this.sprite = SPRITE[randomInRange(0, SPRITE.length - 1)];
        this.direction = 270 + randomInRange(-SPREAD, +SPREAD);
    }
}
