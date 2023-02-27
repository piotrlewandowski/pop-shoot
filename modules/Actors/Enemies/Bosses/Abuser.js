import { Enemy } from '../Enemy.js';
import { Movement } from '../../../Logic/Motion/Movement.js';
import { game } from '../../../../app.js';
import { CANVAS } from '../../../Assets/OtherGfx.js';
import { flashScreen, randomInRange, shakeScreen } from '../../../Logic/Helpers.js';
import { ABUSERSPRITE } from '../../../Assets/Enemies.js';
import { FireLaser } from '../../../Lasers/Hostile/FireLaser.js';

// MOVEMENT
const SPEED = 30;
const LOWEST_POINT = 65;
const SOUTH = 90; // Angle (0=EAST 90=South 180=WEST 270=NORTH)

// SHOOTING
const FIRINGRATE = 75;
const ROWSPEED = 3;
const BURSTSPEED = 10;

// WALLS
const PHASE1_LANGLE = 40; // left angle (closer to 90 = narrower)
const PHASE1_RANGLE = 135; // right angle (closer to 90 = narrower)
const PHASE2_LANGLE = 50; // left angle (closer to 90 = narrower)
const PHASE2_RANGLE = 125; // right angle (closer to 90 = narrower)
const PHASE3_LANGLE = 60; // left angle (closer to 90 = narrower)
const PHASE3_RANGLE = 115; // right angle (closer to 90 = narrower)
const PHASE4_LANGLE = 70; // left angle (closer to 90 = narrower)
const PHASE4_RANGLE = 105; // right angle (closer to 90 = narrower)

// HARDEN
const HARDEN_RATE = 2000; // in ticks. lower = faster
const HARDEN_TIME = 15000; // in ms

// STATE
const HP = 100000;
const COINS = 240;
const RADIUS = 50;
const SPRITE = ABUSERSPRITE;
const NAME = 'EMOTIONAL ABUSER';

// PHASES (Rates, e.g. 0.75 = when boss reaches 75% of HP)
// When the boss reaches a certain HP amount, it will fire
// an additional layer of lasers
const PHASE2_HP = 0.75;
const PHASE3_HP = 0.5;
const PHASE4_HP = 0.25;

export class Abuser extends Enemy {
    constructor() {
        super(RADIUS, HP, COINS, SPRITE, SPEED, FIRINGRATE);
        this.x = CANVAS.width / 2;

        // BOSS SPECIFIC ------------
        this.name = NAME;
        game.state.toggleBoss();
        // --------------------------
        this.hardened = false;
    }

    move() {
        if (this.y <= LOWEST_POINT) {
            this.x += Movement.move(SOUTH, this.speed).x;
            this.y += Movement.move(SOUTH, this.speed).y;
        }

        // follow player on the X axis
        this.x += Movement.moveTowards(this.x, this.y, game.player.x, game.player.y, this.speed).x;

        this.step();
    }

    shoot() {
        if (!this.hardened) {
            shakeScreen(2, 0.25);
            this.fireBurst();
            this.fireRow();
        }
    }

    fireRow() {
        // laser horizontal row
        for (let i = 0; i <= 180; i += 20) {
            game.firelasers.add(new FireLaser(this.x, this.y, i, ROWSPEED));
        }
    }

    fireBurst() {
        // laser line burst
        for (let i = 0; i < 300; i += 10) {
            setTimeout(() => {
                game.firelasers.add(new FireLaser(this.x, this.y, SOUTH, BURSTSPEED));
            }, i);
        }
    }

    fireWalls() {
        if (!this.hardened) {
            if (this.hp <= HP * PHASE4_HP) {
                game.firelasers.add(new FireLaser(this.x, this.y, PHASE4_LANGLE, 10));
                game.firelasers.add(new FireLaser(this.x, this.y, PHASE4_RANGLE, 10));
            } else if (this.hp <= HP * PHASE3_HP) {
                game.firelasers.add(new FireLaser(this.x, this.y, PHASE3_LANGLE, 10));
                game.firelasers.add(new FireLaser(this.x, this.y, PHASE3_RANGLE, 10));
            } else if (this.hp <= HP * PHASE2_HP) {
                game.firelasers.add(new FireLaser(this.x, this.y, PHASE2_LANGLE, 10));
                game.firelasers.add(new FireLaser(this.x, this.y, PHASE2_RANGLE, 10));
            } else {
                game.firelasers.add(new FireLaser(this.x, this.y, PHASE1_LANGLE, 10));
                game.firelasers.add(new FireLaser(this.x, this.y, PHASE1_RANGLE, 10));
            }
        } else {
            for (let i = 20; i <= 160; i += 20) {
                shakeScreen(20, 0.25);
                game.firelasers.add(new FireLaser(this.x + randomInRange(-2, 2), this.y, i, randomInRange(5, 10)));
            }
        }
    }

    step() {
        super.step();

        // Start the walls AFTER entrance is done (aka when lowest point is reached)
        if (this.y >= LOWEST_POINT) {
            this.fireWalls();
        }

        // Harden
        if (this.steps % HARDEN_RATE === 0) {
            this.harden();
        }
    }

    soften() {
        this.hardened = false;
        clearInterval(this.flashInterval);
        game.audiocontroller.stopSirenSound();
        flashScreen();
        shakeScreen(3, 0.5);
    }

    harden() {
        game.audiocontroller.playSirenSound();
        this.hardened = true;
        this.flashInterval = setInterval(flashScreen, 1000);
        flashScreen();
        shakeScreen(3, 0.5);

        setTimeout(() => {
            this.soften();
        }, HARDEN_TIME);
    }

    takeDamage(damage) {
        super.takeDamage(damage);
    }

    // Intentionally overridden & kept empty to prevent ugly wall effect
    // if pushback is used
    pushBack() {}

    die() {
        super.die();
        game.audiocontroller.playAnimationSound('exp_big');
        shakeScreen(6, 2);
        game.state.toggleBoss();
    }
}
