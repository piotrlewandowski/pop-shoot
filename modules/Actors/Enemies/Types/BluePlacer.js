import { Enemy } from '../Enemy.js';
import { BLUEPLACERSPRITE } from '../../../Assets/Enemies.js';
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
const FIRINGRATE = 30;
const BULLETSNUMBER = 3;

// STATE
const HP = Difficulty.basePlacerHp * Difficulty.blueHpMultiplier;
const COINS = Difficulty.basePlacerCash * Difficulty.blueCashMultiplier;
const RADIUS = 17;
const SPRITE = BLUEPLACERSPRITE;

export class BluePlacer extends Enemy {
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
        for (let i = 245; i <= 295; i += 5) {
            game.firelasers.add(new FireLaser(this.x, this.y, i, randomInRange(1, 5)));
        }
    }

    die() {
        game.audiocontroller.playSound('phew');
        game.effects.add(new Animation(this.x, this.y, 'explosion_normal'));
        SceneUtils.shakeScreen(4, 0.5);
        this.explode();
        super.die();
    }
}
