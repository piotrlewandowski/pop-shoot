import { Enemy } from '../Enemy.js';
import { BLUEEMPERORSPRITE } from '../../../Assets/Enemies.js';
import { Movement } from '../../../Logic/Motion/Movement.js';
import { game } from '../../../../app.js';
import { FireLaser } from '../../../Lasers/Hostile/FireLaser.js';
import { Shake } from '../../../Logic/Helpers.js';
import { Animation } from '../../../Effects/Misc/Animation.js';
import { Difficulty } from '../../../Logic/State/Difficulty.js';

// MOVEMENT
const SPEED = 0.5;
const MOVEDIRECTION = 90; // Angle (0=EAST 90=South 180=WEST 270=NORTH)

// SHOOTING
const LASERSPEED = 10;
const FIRINGRATE = 75;
const LASERDIRECTION = 90; // Angle (0=EAST 90=South 180=WEST 270=NORTH)

// STATE
const HP = Difficulty.baseEmperorHp * Difficulty.blueHpMultiplier;
const SCOREBALLS = Difficulty.baseEmperorScore * Difficulty.blueScoreMultiplier;
const RADIUS = 25;
const SPRITE = BLUEEMPERORSPRITE;

export class BlueEmperor extends Enemy {
    constructor() {
        super(RADIUS, HP, SCOREBALLS, SPRITE, SPEED, FIRINGRATE);
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
        game.audiocontroller.playAnimationSound('exp_normal');
        game.effects.add(new Animation(this.x, this.y, 'explosion_big'));
        Shake.addShake(4, 0.5);
        super.die();
    }
}
