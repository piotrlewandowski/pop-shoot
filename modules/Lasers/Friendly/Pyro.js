import { Movement } from '../../Logic/Motion/Movement.js';
import { game } from '../../../app.js';
import { CANVAS } from '../../Assets/OtherGfx.js';
import { Animation } from '../../Effects/Misc/Animation.js';
import { randomInRange } from '../../Logic/Helpers.js';
import { BOMBSPRITE, FIRELASERSPRITE, LASERSPRITE, QUADSPRITE } from '../../Assets/Lasers.js';

const SPEED = 10;
const RADIUS = 5;
const MINDMG = 3;
const MAXDMG = 6;
const DEFAULTDIRECTION = 270; // Angle (0=EAST 90=South 180=WEST 270=NORTH)

export class Pyro {
    constructor(x, y, direction = DEFAULTDIRECTION) {
        this.x = x;
        this.y = y;
        this.radius = RADIUS;
        this.sprite = FIRELASERSPRITE;

        this.damage = randomInRange(MINDMG, MAXDMG) * game.state.variables.damageMultiplier;
        this.speed = SPEED;
        this.shattered = false;
    }

    move() {
        this.x += Movement.move(this.direction, this.speed).x;
        this.y += Movement.move(this.direction, this.speed).y;
    }

    // laser will shatter when hitting an enemy
    shatter() {
        this.shattered = true;
        game.effects.add(new Animation(this.x, this.y, 'smoke_small'));
    }
}
