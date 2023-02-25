import { randomInRange } from '../../Logic/Helpers.js';
import { Movement } from '../../Logic/Motion/Movement.js';

const DURATION = 50; // When DURATION reaches 0, the damage number will be removed by refresh()
const SPEED = 0.5;

export class ScoreNumber {
    constructor(x, y, text) {
        this.x = x;
        this.y = y;

        this.speed = SPEED;
        this.duration = DURATION;
        this.text = `+${text}`;
        this.direction = 270; // NORTH
    }

    move() {
        this.x += Movement.move(this.direction, this.speed).x;
        this.y += Movement.move(this.direction, this.speed).y;
        this.duration--;
    }
}
