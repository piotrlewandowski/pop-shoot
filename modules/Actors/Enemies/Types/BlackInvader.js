import { Enemy } from '../Enemy.js';
import { BLACKINVADERSPRITE } from '../../../Assets/Enemies.js';
import { Movement } from '../../../Logic/Motion/Movement.js';
import { game } from '../../../../app.js';
import { FireLaser } from '../../../Lasers/Hostile/FireLaser.js';
import { Animation } from '../../../Effects/Misc/Animation.js';
import { Difficulty } from '../../../Logic/State/Difficulty.js';

// MOVEMENT
const SPEED = 1;
const MOVEDIRECTION = 90; // 0=EAST 90=South 180=WEST 270=NORTH
const RANGETOENGAGE = 75; // when player approaches proximity (X coordinates), invader will engage
const ENGAGEDISTANCE = 200; // distance kept when engaging player

// SHOOTING
const LASERSPEED = 5;
const FIRINGRATE = 50;
const LASERDIRECTION1 = 75; // 0=EAST 90=South 180=WEST 270=NORTH
const LASERDIRECTION2 = 80; // 0=EAST 90=South 180=WEST 270=NORTH
const LASERDIRECTION3 = 85; // 0=EAST 90=South 180=WEST 270=NORTH
const LASERDIRECTION4 = 90; // 0=EAST 90=South 180=WEST 270=NORTH
const LASERDIRECTION5 = 95; // 0=EAST 90=South 180=WEST 270=NORTH
const LASERDIRECTION6 = 100; // 0=EAST 90=South 180=WEST 270=NORTH
const LASERDIRECTION7 = 105; // 0=EAST 90=South 180=WEST 270=NORTH

// STATE
const HP = Difficulty.baseInvaderHp * Difficulty.blackHpMultiplier;
const COINS = Difficulty.baseInvaderCash * Difficulty.blackCashMultiplier;
const RADIUS = 17;
const SPRITE = BLACKINVADERSPRITE;

export class BlackInvader extends Enemy {
    constructor() {
        super(RADIUS, HP, COINS, SPRITE, SPEED, FIRINGRATE);
    }

    move() {
        const invaderStillInCanvas = this.y >= this.radius;
        const invaderAbovePlayer = game.player.y > this.y;
        const playerInProximity = Math.abs(game.player.x - this.x) < RANGETOENGAGE;

        if (invaderStillInCanvas && invaderAbovePlayer && playerInProximity) {
            // engage player
            this.x += Movement.moveTowards(this.x, this.y, game.player.x, game.player.y - ENGAGEDISTANCE, this.speed).x;
            this.y += Movement.moveTowards(this.x, this.y, game.player.x, game.player.y - ENGAGEDISTANCE, this.speed).y;
        } else {
            // move south
            this.x += Movement.move(MOVEDIRECTION, this.speed).x;
            this.y += Movement.move(MOVEDIRECTION, this.speed).y;
        }

        this.step();
    }

    shoot() {
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION1, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION2, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION3, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION4, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION5, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION6, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION7, LASERSPEED));
    }

    die() {
        game.audiocontroller.playSound('phase');
        game.effects.add(new Animation(this.x, this.y, 'blackinvader_death'));
        super.die();
    }
}
