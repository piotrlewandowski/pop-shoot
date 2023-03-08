import { FIRELASERSPRITE } from '../../Assets/Lasers.js';
import { Movement } from '../../Logic/Motion/Movement.js';
import { Animation } from '../../Effects/Misc/Animation.js';
import { game } from '../../../app.js';

const RADIUS = 5;
const SPRITE = FIRELASERSPRITE;

export class FireLaser {
    constructor(x, y, direction, speed) {
        this.x = x;
        this.y = y;
        this.radius = RADIUS;
        this.sprite = SPRITE;

        this.direction = direction;
        this.speed = speed;

        this.shattered = false;
    }

    move() {
        this.x += Movement.move(this.direction, this.speed).x;
        this.y += Movement.move(this.direction, this.speed).y;
    }

    shatter() {
        this.shattered = true;
        game.effects.add(new Animation(this.x, this.y, 'smoke_small'));
    }
}
