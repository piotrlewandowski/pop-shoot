import { Enemy } from '../Enemy.js';
import { GREENPLACERSPRITE } from '../../../Assets/Enemies.js';
import { Movement } from '../../../Logic/Motion/Movement.js';
import { game } from '../../../../app.js';
import { FireLaser } from '../../../Lasers/Hostile/FireLaser.js';
import { randomInRange } from '../../../Logic/Helpers.js';
import { Animation } from '../../../Effects/Misc/Animation.js';
import { Difficulty } from '../../../Logic/State/Difficulty.js';
import { SceneUtils } from '../../../Scene/SceneUtils.js';

// MOVEMENT
const SPEED = 2;
const MOVEDIRECTION = 90; // 0=EAST 90=South 180=WEST 270=NORTH

// SHOOTING
const LASERSPEED = 1;
const FIRINGRATE = 50;
const BULLETSNUMBER = 2;

// STATE
const HP = Difficulty.basePlacerHp;
const COINS = Difficulty.basePlacerCash;
const RADIUS = 17;
const SPRITE = GREENPLACERSPRITE;

export class GreenPlacer extends Enemy {
    constructor() {
        super(RADIUS, HP, COINS, SPRITE, SPEED, FIRINGRATE);
    }

    move() {
        this.x += Movement.move(MOVEDIRECTION, this.speed).x;
        this.y += Movement.move(MOVEDIRECTION, this.speed).y;
        this.step();
    }

    shoot() {
        for (let i = 0; i < BULLETSNUMBER; i++) {
            game.firelasers.add(new FireLaser(this.x, this.y, randomInRange(0, 360), LASERSPEED));
        }
    }

    explode() {
        game.firelasers.add(new FireLaser(this.x, this.y, 260, randomInRange(1, 5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 265, randomInRange(1, 5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 270, randomInRange(1, 5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 265, randomInRange(1, 5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 260, randomInRange(1, 5)));
    }

    die() {
        game.audiocontroller.playSound('phew');
        game.effects.add(new Animation(this.x, this.y, 'explosion_normal'));
        SceneUtils.shakeScreen(3, 0.2);
        this.explode();
        super.die();
    }
}
