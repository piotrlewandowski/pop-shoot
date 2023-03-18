import { BlueLaser } from './BlueLaser.js';
import { randomInRange } from '../../Logic/Helpers.js';
import { SHELL0SPRITE, SHELL1SPRITE, SHELL2SPRITE } from '../../Assets/Lasers.js';

const SPRITE = [SHELL0SPRITE, SHELL1SPRITE, SHELL2SPRITE];
const SPEED = 20;

const SPREAD = 15; // horizontal spread
const TRAVELDISTANCE = 275; // distance in px from starting y-coordinate

export class Shell extends BlueLaser {
    constructor() {
        super();

        this.speed = SPEED;
        this.sprite = SPRITE[randomInRange(0, SPRITE.length - 1)];
        this.direction = 270 + randomInRange(-SPREAD, +SPREAD);

        this.alreadyLooped = true; // shells don't loop so this variable is overridden

        // keep track of starting y-coordinate to measure travelled distance
        this.startingY = this.y;
    }

    move() {
        super.move();
        if (this.hasReachedDistance()) {
            this.shatter();
        }
    }

    hasReachedDistance() {
        return this.startingY - this.y > TRAVELDISTANCE;
    }
}
