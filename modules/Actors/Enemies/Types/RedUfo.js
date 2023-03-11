import { Enemy } from '../Enemy.js';
import { REDUFOSPRITE } from '../../../Assets/Enemies.js';
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
const LASERSPEED = 4;
const FIRINGRATE = 50;
const BULLETSNUMBER = 4;

// STATE
const HP = Difficulty.baseUfoHp * Difficulty.redHpMultiplier;
const COINS = Difficulty.baseUfoCash * Difficulty.redCashMultiplier;
const RADIUS = 17;
const SPRITE = REDUFOSPRITE;

export class RedUfo extends Enemy {
    constructor() {
        super(RADIUS, HP, COINS, SPRITE, SPEED, FIRINGRATE);
    }

    move() {
        this.x = this.speed * Math.sin(this.y / 30) + this.x;
        this.y += Movement.move(MOVEDIRECTION, this.speed).y;
        this.step();
    }

    shoot() {
        for (let i = 0; i < BULLETSNUMBER; i++) {
            game.firelasers.add(new FireLaser(this.x, this.y, randomInRange(0, 360), randomInRange(1, 5)));
        }
    }

    explode() {
        for (let i = 0; i < 360; i += 15) {
            game.firelasers.add(new FireLaser(this.x, this.y, i, LASERSPEED));
        }
    }

    die() {
        game.audiocontroller.playSound('splash');
        game.effects.add(new Animation(this.x, this.y, 'explosion_normal'));
        SceneUtils.shakeScreen(5, 0.75);
        this.explode();
        super.die();
    }
}
