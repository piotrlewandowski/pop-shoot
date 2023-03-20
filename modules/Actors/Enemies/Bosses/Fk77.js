import { Enemy } from '../Enemy.js';
import { Movement } from '../../../Logic/Motion/Movement.js';
import { game } from '../../../../app.js';
import { randomInRange } from '../../../Logic/Helpers.js';
import { FK77HARDENEDSPRITE, FK77SPRITE } from '../../../Assets/Enemies.js';
import { FireLaser } from '../../../Lasers/Hostile/FireLaser.js';
import { SceneUtils } from '../../../Scene/SceneUtils.js';
import { CANVAS } from '../../../Assets/Other.js';

// MOVEMENT
const SPEED = 10;
const LOWEST_POINT = 165;
const XPOS = 560;
const SOUTH = 90; // 0=EAST 90=South 180=WEST 270=NORTH

// SHOOTING
const RAYRATE = 150; // shooting rate. lower = faster
const PHASE2_RAYRATE = 75; // shooting rate. lower = faster
const PHASE3_RAYRATE = 50; // shooting rate. lower = faster

// HARDEN
const HARDEN_RATE = 2000; // in ticks. lower = faster
const HARDEN_TIME = 15000; // in ms
const HARDEN_BULLETSPEED = 3;

// STATE
const HP = 40000;
const COINS = 120;
const RADIUS = 50;
const SPRITE = FK77SPRITE;
const NAME = '4K77';

// PHASES
// rates, e.g. 0.75 = when boss reaches 75% of HP
const PHASE2_HP = 0.5;
const PHASE3_HP = 0.25;

export class Fk77 extends Enemy {
    constructor() {
        super(RADIUS, HP, COINS, SPRITE, SPEED);
        this.x = XPOS;

        this.name = NAME;
        game.state.toggleBoss();

        this.hardened = false;
        this.harden();
    }
    move() {
        if (this.y <= LOWEST_POINT) {
            this.x += Movement.move(SOUTH, this.speed).x;
            this.y += Movement.move(SOUTH, this.speed).y;
        }

        this.step();
    }

    takeDamage(damage) {
        if (this.hardened) {
            this.deflect();
        }
        SceneUtils.shakeScreen(2, 0.25);
        super.takeDamage(damage);
    }

    shootRay() {
        game.audiocontroller.playSound('ray');
        const direction = randomInRange(45, 135);

        // ray direction tip
        for (let i = 1; i < 5; i++) {
            game.firelasers.add(new FireLaser(this.x, this.y, direction, i));
        }

        // first ray
        setTimeout(() => {
            for (let i = 1; i < 100; i++) {
                game.firelasers.add(new FireLaser(this.x, this.y, direction, i + 10));
            }
        }, 500);

        // delayed ray
        setTimeout(() => {
            const x = randomInRange(0, CANVAS.width);
            for (let i = 1; i < 100; i++) {
                game.firelasers.add(new FireLaser(x, 0, direction, i + 20));
            }
        }, 2000);
    }

    deflect() {
        game.firelasers.add(new FireLaser(this.x, this.y, randomInRange(0, 360), HARDEN_BULLETSPEED));
    }

    getRayRate() {
        if (this.hp < HP * PHASE3_HP) return PHASE3_RAYRATE;
        if (this.hp < HP * PHASE2_HP) return PHASE2_RAYRATE;
        return RAYRATE;
    }

    step() {
        super.step();

        // shoot ray
        if (this.steps % this.getRayRate() === 0) {
            this.shootRay();
        }

        // harden
        if (this.steps % HARDEN_RATE === 0) {
            this.harden();
        }
    }

    soften() {
        this.hardened = false;
        game.audiocontroller.playSound('swoosh');
        SceneUtils.flashScreen();
        this.sprite = FK77SPRITE;
        SceneUtils.shakeScreen(3, 0.5);
    }

    harden() {
        this.hardened = true;
        game.audiocontroller.playSound('swoosh');
        SceneUtils.flashScreen();
        this.sprite = FK77HARDENEDSPRITE;
        SceneUtils.shakeScreen(3, 0.5);

        setTimeout(() => {
            this.soften();
        }, HARDEN_TIME);
    }

    die() {
        super.die();
        game.state.toggleBoss();
    }
}
