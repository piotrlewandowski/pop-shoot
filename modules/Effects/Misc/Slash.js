import { game } from '../../../app.js';
import {
    SLASH0SPRITE,
    SLASH1SPRITE,
    SLASH2SPRITE,
    SLASH3SPRITE,
    SLASHQUAD0SPRITE,
    SLASHQUAD1SPRITE,
    SLASHQUAD2SPRITE,
    SLASHQUAD3SPRITE,
} from '../../Assets/Effects.js';
import { randomInRange } from '../../Logic/Helpers.js';

const DURATION = 5;
const SPRITE = [SLASH0SPRITE, SLASH1SPRITE, SLASH2SPRITE, SLASH3SPRITE];
const QUADSPRITE = [SLASHQUAD0SPRITE, SLASHQUAD1SPRITE, SLASHQUAD2SPRITE, SLASHQUAD3SPRITE];

export class Slash {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.duration = DURATION;
        this.sprite = game.buffcontroller.quaddamage ? QUADSPRITE[randomInRange(0, 3)] : SPRITE[randomInRange(0, 3)];
    }

    move() {
        this.duration--;
    }
}
