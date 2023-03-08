import { randomInRange } from '../../Logic/Helpers.js';
import { Movement } from '../../Logic/Motion/Movement.js';

const DURATION = 20;
const SPEED = 5;

export class DamageNumber {
    constructor(x, y, damage) {
        this.x = x;
        this.y = y;

        this.speed = SPEED;
        this.duration = DURATION;
        this.text = Math.round(damage);
        this.direction = randomInRange(0, 360);
    }

    move() {
        this.x += Movement.move(this.direction, this.speed).x;
        this.y += Movement.move(this.direction, this.speed).y;
        this.duration--;
    }
}
