import { game } from '../../../app.js';
import { BlueLaser } from './BlueLaser.js';
import { randomInRange } from '../../Logic/Helpers.js';
import { DRONES0SPRITE, DRONES1SPRITE, DRONES2SPRITE, DRONES3SPRITE } from '../../Assets/Lasers.js';

const SPRITE = [DRONES0SPRITE, DRONES1SPRITE, DRONES2SPRITE, DRONES3SPRITE];
const SPEED = 0.1;

// DISTANCE FROM PLAYER
const MIN_DISTANCE = 55;
const MAX_DISTANCE = 65;

export class Debris extends BlueLaser {
    constructor(x, y) {
        super(x, y);
        this.sprite = SPRITE[randomInRange(0, SPRITE.length - 1)];

        this.distance = randomInRange(MIN_DISTANCE, MAX_DISTANCE);
        this.speed = SPEED;
        this.angle = 0;
        this.damage *= game.state.variables.debrisrate;
    }

    move() {
        // In the below type of circular movement, angle and speed are closely linked.
        // The angle is multiplied by the speed in order to slowdown the debris during slowmo
        this.angle += this.speed;

        this.x = game.player.x + this.speed + Math.cos(this.angle) * this.distance;
        this.y = game.player.y + this.speed + Math.sin(this.angle) * this.distance;
    }

    shatter() {
        Debris.count--;
        super.shatter();
    }
}
