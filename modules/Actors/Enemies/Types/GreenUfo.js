import { Enemy } from '../Enemy.js';
import { GREENUFOSPRITE } from '../../../Assets/Enemies.js';
import { Movement } from '../../../Logic/Motion/Movement.js';
import { game } from '../../../../app.js';
import { FireLaser } from '../../../Lasers/Hostile/FireLaser.js';
import { randomInRange } from '../../../Logic/Helpers.js';
import { Animation } from '../../../Effects/Misc/Animation.js';
import { Difficulty } from '../../../Logic/State/Difficulty.js';
import { SceneUtils } from '../../../Scene/SceneUtils.js';

// MOVEMENT
const SPEED = 1;
const MOVEDIRECTION = 90; // 0=EAST 90=South 180=WEST 270=NORTH

// SHOOTING
const LASERSPEED = 3;
const FIRINGRATE = 100;
const BULLETSNUMBER = 2;

// STATE
const HP = Difficulty.baseUfoHp;
const COINS = Difficulty.baseUfoCash;
const RADIUS = 17;
const SPRITE = GREENUFOSPRITE;

export class GreenUfo extends Enemy {
    constructor() {
        super(RADIUS, HP, COINS, SPRITE, SPEED, FIRINGRATE, FIRINGRATE);
    }

    move() {
        this.x = this.speed * Math.sin(this.y / 30) + this.x;
        this.y += Movement.move(MOVEDIRECTION, this.speed).y;
        this.step();
    }

    shoot() {
        for (let i = 0; i < BULLETSNUMBER; i++) {
            game.firelasers.add(new FireLaser(this.x, this.y, randomInRange(0, 360), LASERSPEED));
        }
    }

    explode() {
        for (let i = 0; i < 360; i += 60) {
            game.firelasers.add(new FireLaser(this.x, this.y, i, LASERSPEED));
        }
    }

    die() {
        game.audiocontroller.playSound('splash');
        game.effects.add(new Animation(this.x, this.y, 'explosion_normal'));
        SceneUtils.shakeScreen(3, 0.2);
        this.explode();
        super.die();
    }
}
