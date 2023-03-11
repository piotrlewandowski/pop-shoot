import { Enemy } from '../Enemy.js';
import { BLACKEMPERORSPRITE } from '../../../Assets/Enemies.js';
import { Movement } from '../../../Logic/Motion/Movement.js';
import { game } from '../../../../app.js';
import { FireLaser } from '../../../Lasers/Hostile/FireLaser.js';
import { Animation } from '../../../Effects/Misc/Animation.js';
import { Difficulty } from '../../../Logic/State/Difficulty.js';
import { SceneUtils } from '../../../Scene/SceneUtils.js';

// MOVEMENT
const SPEED = 0.5;
const MOVEDIRECTION = 90; // 0=EAST 90=South 180=WEST 270=NORTH

// SHOOTING
const LASERSPEED = 12;
const FIRINGRATE = 40;
const LASERDIRECTION = 90; // 0=EAST 90=South 180=WEST 270=NORTH

// STATE
const HP = Difficulty.baseEmperorHp * Difficulty.blackHpMultiplier;
const COINS = Difficulty.baseEmperorCash * Difficulty.blackCashMultiplier;
const RADIUS = 25;
const SPRITE = BLACKEMPERORSPRITE;

export class BlackEmperor extends Enemy {
    constructor() {
        super(RADIUS, HP, COINS, SPRITE, SPEED, FIRINGRATE);
    }

    move() {
        this.x += Movement.move(MOVEDIRECTION, this.speed).x;
        this.y += Movement.move(MOVEDIRECTION, this.speed).y;
        this.step();
    }

    shoot() {
        game.firelasers.add(new FireLaser(this.x - 20, this.y, LASERDIRECTION, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x - 10, this.y, LASERDIRECTION, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x + 10, this.y, LASERDIRECTION, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x + 20, this.y, LASERDIRECTION, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y + 10, LASERDIRECTION, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x + 10, this.y + 10, LASERDIRECTION, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x - 10, this.y + 10, LASERDIRECTION, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y + 20, LASERDIRECTION, LASERSPEED));
    }

    die() {
        game.audiocontroller.playSound('explosion');
        game.effects.add(new Animation(this.x, this.y, 'explosion_big'));
        SceneUtils.shakeScreen(3, 0.75);
        super.die();
    }
}
