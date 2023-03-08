import { Enemy } from '../Enemy.js';
import { DIVERSPRITE } from '../../../Assets/Enemies.js';
import { Movement } from '../../../Logic/Motion/Movement.js';
import { game } from '../../../../app.js';
import { Animation } from '../../../Effects/Misc/Animation.js';
import { Difficulty } from '../../../Logic/State/Difficulty.js';
import { FireLaser } from '../../../Lasers/Hostile/FireLaser.js';
import { randomInRange } from '../../../Logic/Helpers.js';
import { SceneUtils } from '../../../Scene/SceneUtils.js';

// MOVEMENT
const SPEED = 5;
const MOVEDIRECTION = 90; // 0=EAST 90=South 180=WEST 270=NORTH
const DELAY = 60; // in steps. delay entry to screen so that sound effect plays first

// STATE
const HP = Difficulty.baseDiverHp;
const COINS = Difficulty.baseDiverCash;
const RADIUS = 20;
const SPRITE = DIVERSPRITE;

export class Diver extends Enemy {
    constructor() {
        super(RADIUS, HP, COINS, SPRITE, SPEED);
        if (game.state.stage === 1) {
            this.coins *= Difficulty.blueCashMultiplier;
            this.hp *= Difficulty.blueHpMultiplier;
            this.maxhp *= Difficulty.blueHpMultiplier;
        }
        if (game.state.stage === 2) {
            this.coins *= Difficulty.redCashMultiplier;
            this.hp *= Difficulty.redHpMultiplier;
            this.maxhp *= Difficulty.redHpMultiplier;
        }
        if (game.state.stage >= 3) {
            this.coins *= Difficulty.blackCashMultiplier;
            this.hp *= Difficulty.blackHpMultiplier;
            this.maxhp *= Difficulty.blackHpMultiplier;
        }

        game.audiocontroller.playSound('diver');
    }

    move() {
        if (this.steps > DELAY) {
            this.x += Movement.move(MOVEDIRECTION, this.speed).x;
            this.y += Movement.move(MOVEDIRECTION, this.speed).y;
        }
        this.step();
    }

    takeDamage(damage) {
        // diver doesn't take damage before it appears on screen
        if (this.steps > DELAY) {
            super.takeDamage(damage);
        }
    }

    explode() {
        game.firelasers.add(new FireLaser(this.x, this.y, 215, randomInRange(5, 10)));
        game.firelasers.add(new FireLaser(this.x, this.y, 220, randomInRange(5, 10)));
        game.firelasers.add(new FireLaser(this.x, this.y, 225, randomInRange(5, 10)));
        game.firelasers.add(new FireLaser(this.x, this.y, 220, randomInRange(5, 10)));
        game.firelasers.add(new FireLaser(this.x, this.y, 215, randomInRange(5, 10)));

        game.firelasers.add(new FireLaser(this.x, this.y, 305, randomInRange(5, 10)));
        game.firelasers.add(new FireLaser(this.x, this.y, 310, randomInRange(5, 10)));
        game.firelasers.add(new FireLaser(this.x, this.y, 315, randomInRange(5, 10)));
        game.firelasers.add(new FireLaser(this.x, this.y, 310, randomInRange(5, 10)));
        game.firelasers.add(new FireLaser(this.x, this.y, 305, randomInRange(5, 10)));
    }

    die() {
        game.audiocontroller.playSound('phew');
        game.effects.add(new Animation(this.x, this.y, 'explosion_normal'));
        SceneUtils.shakeScreen(3, 0.2);
        this.explode();
        super.die();
    }
}
