import { Enemy } from '../Enemy.js';
import { Animation } from '../../../Effects/Misc/Animation.js';
import { Movement } from '../../../Logic/Motion/Movement.js';
import { game } from '../../../../app.js';
import { FireLaser } from '../../../Lasers/Hostile/FireLaser.js';
import { CANVAS } from '../../../Assets/Other.js';
import { randomInRange } from '../../../Logic/Helpers.js';
import { METALEMPERORHARDENEDSPRITE, METALEMPERORSPRITE } from '../../../Assets/Enemies.js';
import { SceneUtils } from '../../../Scene/SceneUtils.js';

// MOVEMENT
const SPEED = 1;
const LOWEST_POINT = 90;
const SOUTH = 90; // 0=EAST 90=South 180=WEST 270=NORTH
const NORTH = 270; // 0=EAST 90=South 180=WEST 270=NORTH

// SHOOTING
const FIRINGRATE = 15; // lower = faster
const LASERSPEED = 3;

// SHOOTING - BULLET WALL
const BULLETWALL_SPEED = 4;
const GAPSIZE = 150;
const WALLRATE = 200; // rate at which the laser-wall spawns. lower = faster

// HARDEN
const HARDEN_RATE = 2000; // in ticks. lower = faster
const HARDEN_TIME = 10000; // in ms

// STATE
const HP = 7000;
const COINS = 30;
const RADIUS = 50;
const SPRITE = METALEMPERORSPRITE;
const NAME = 'METAL EMPEROR';

// PHASES
// Phase 2
const PHASE2_HP = 0.25;

export class MetalEmperor extends Enemy {
    constructor() {
        super(RADIUS, HP, COINS, SPRITE, SPEED, FIRINGRATE);
        this.x = 250;
        this.y = -this.radius;

        this.name = NAME;
        game.state.toggleBoss();
    }

    move() {
        // if hardened or in Phase 2, move to the center
        if (this.hardened || this.hp <= HP * PHASE2_HP) {
            this.x += Movement.moveTowards(this.x, this.y, CANVAS.width / 2, CANVAS.height / 2 - 100, this.speed * 3).x;
            this.y += Movement.moveTowards(this.x, this.y, CANVAS.width / 2, CANVAS.height / 2 - 100, this.speed * 3).y;
        } else {
            // else move back to upper position
            if (this.y <= LOWEST_POINT) {
                this.x += Movement.move(SOUTH, this.speed * 10).x;
                this.y += Movement.move(SOUTH, this.speed * 10).y;
            }
            if (this.y >= LOWEST_POINT) {
                this.x += Movement.move(NORTH, this.speed * 10).x;
                this.y += Movement.move(NORTH, this.speed * 10).y;
            }
            // move back and forth (left-right)
            this.x += this.speed * Math.sin(this.steps / 275);
        }

        // smoke effect
        if (this.hardened && this.steps % 15 === 0) {
            game.effects.add(new Animation(this.x, this.y, 'smoke_normal'));
        }
        this.step();
    }

    shoot() {
        // set the laser speed according to the boss phase
        let laserspeed = LASERSPEED;

        // fire lasers
        game.firelasers.add(new FireLaser(this.x, this.y, -this.steps % 360, laserspeed));
        game.firelasers.add(new FireLaser(this.x, this.y, this.steps % 360, laserspeed));

        // if hardened or in phase 2, fire additional bullets
        if (this.hardened || this.hp <= HP * PHASE2_HP) {
            game.firelasers.add(new FireLaser(this.x, this.y, -this.steps % 360, laserspeed / 2));
            game.firelasers.add(new FireLaser(this.x, this.y, this.steps % 360, laserspeed / 2));
        }
    }

    shootBulletWall() {
        if (!this.hardened) {
            SceneUtils.shakeScreen(6, 0.75);

            const gapstart = randomInRange(0, CANVAS.width - GAPSIZE);
            for (let i = 0; i < CANVAS.width; i += 15) {
                if (i < gapstart || i > gapstart + GAPSIZE) {
                    // wall bullet shape
                    for (let j = 2; j <= 8; j += 2) {
                        game.firelasers.add(new FireLaser(i, 0 + j, 90, BULLETWALL_SPEED));
                    }
                }
            }
        }
    }

    step() {
        super.step();

        // shoot bullet wall
        if (this.steps % WALLRATE === 0 && this.hp > HP * PHASE2_HP) {
            this.shootBulletWall();
        }

        // harden
        if (this.steps % HARDEN_RATE === 0) {
            this.harden();
        }
    }

    soften() {
        game.audiocontroller.playSound('steam');
        this.hardened = false;
        this.radius = RADIUS;
        SceneUtils.flashScreen();
        this.sprite = METALEMPERORSPRITE;
        SceneUtils.shakeScreen(3, 0.5);
    }

    harden() {
        game.audiocontroller.playSound('steam');
        this.hardened = true;
        this.radius = -1;
        SceneUtils.flashScreen();
        this.sprite = METALEMPERORHARDENEDSPRITE;
        SceneUtils.shakeScreen(3, 0.5);

        setTimeout(() => {
            this.soften();
        }, HARDEN_TIME);
    }

    die() {
        game.audiocontroller.playSound('exp_big');
        super.die();
        SceneUtils.shakeScreen(6, 2);
        game.state.toggleBoss();
    }
}
