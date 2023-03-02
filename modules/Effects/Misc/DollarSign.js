import { DOLLARSIGNSPRITE } from '../../Assets/Effects.js';
import { randomInRange } from '../../Logic/Helpers.js';
import { Movement } from '../../Logic/Motion/Movement.js';

const DURATION = 20; // When DURATION reaches 0, the dollar-sign ill be removed by refresh()
const SPRITE = DOLLARSIGNSPRITE;

export class DollarSign {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.speed = randomInRange(0.5, 1.5);
        this.duration = DURATION;
        this.sprite = SPRITE;
        this.direction = 270; // NORTH
    }

    move() {
        this.x += Movement.move(this.direction, this.speed).x;
        this.y += Movement.move(this.direction, this.speed).y;
        this.duration--;
    }
}
