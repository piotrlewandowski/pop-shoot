import { Enemy } from '../Enemy.js';
import { BLUEUFOSPRITE } from '../../../Assets/Enemies.js';
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
const FIRINGRATE = 75;
const BULLETSNUMBER = 3;

// STATE
const HP = Difficulty.baseUfoHp * Difficulty.blueHpMultiplier;
const COINS = Difficulty.baseUfoCash * Difficulty.blueCashMultiplier;
const RADIUS = 17;
const SPRITE = BLUEUFOSPRITE;

export class BlueUfo extends Enemy {
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
            game.firelasers.add(new FireLaser(this.x, this.y, randomInRange(0, 360), LASERSPEED));
        }
    }

    explode() {
        for (let i = 0; i <= 330; i += 30) {
            game.firelasers.add(new FireLaser(this.x, this.y, i, LASERSPEED));
        }
    }

    die() {
        game.audiocontroller.playSound('splash');
        game.effects.add(new Animation(this.x, this.y, 'explosion_normal'));
        SceneUtils.shakeScreen(4, 0.5);
        this.explode();
        super.die();
    }
}
