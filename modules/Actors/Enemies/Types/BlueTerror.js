import { Enemy } from '../Enemy.js';
import { BLUETERRORSPRITE } from '../../../Assets/Enemies.js';
import { CANVAS } from '../../../Assets/Other.js';
import { game } from '../../../../app.js';
import { FireLaser } from '../../../Lasers/Hostile/FireLaser.js';
import { Movement } from '../../../Logic/Motion/Movement.js';
import { Animation } from '../../../Effects/Misc/Animation.js';
import { Difficulty } from '../../../Logic/State/Difficulty.js';

// MOVEMENT
const SPEED = 0.75;
const SPEEDBOOST_X = 20;

// SHOOTING
const LASERSPEED = 4;
const FIRINGRATE = 75;
const LASERDIRECTION1 = 85; // 0=EAST 90=South 180=WEST 270=NORTH
const LASERDIRECTION2 = 90; // 0=EAST 90=South 180=WEST 270=NORTH
const LASERDIRECTION3 = 95; // 0=EAST 90=South 180=WEST 270=NORTH

// STATE
const HP = Difficulty.baseTerrorHp * Difficulty.blueHpMultiplier;
const COINS = Difficulty.baseTerrorCash * Difficulty.blueCashMultiplier;
const RADIUS = 19;
const SPRITE = BLUETERRORSPRITE;

export class BlueTerror extends Enemy {
    constructor() {
        super(RADIUS, HP, COINS, SPRITE, SPEED, FIRINGRATE);
    }

    move() {
        this.x += Movement.moveTowards(this.x, this.y, game.player.x, CANVAS.height, this.speed * SPEEDBOOST_X).x;
        this.y += Movement.moveTowards(this.x, this.y, game.player.x, CANVAS.height, this.speed).y;
        this.step();
    }

    shoot() {
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION1, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION2, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION3, LASERSPEED));
    }

    die() {
        game.audiocontroller.playSound('smoke');
        game.effects.add(new Animation(this.x, this.y, 'smoke_normal'));
        super.die();
    }
}
