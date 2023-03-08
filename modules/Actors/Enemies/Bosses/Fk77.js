import { Enemy } from '../Enemy.js';
import { Movement } from '../../../Logic/Motion/Movement.js';
import { game } from '../../../../app.js';
import { randomInRange } from '../../../Logic/Helpers.js';
import { YellowUfo } from '../Types/YellowUfo.js';
import { FK77HARDENEDSPRITE, FK77SPRITE } from '../../../Assets/Enemies.js';
import { FireLaser } from '../../../Lasers/Hostile/FireLaser.js';
import { SceneUtils } from '../../../Scene/SceneUtils.js';

// MOVEMENT
const SPEED = 5;
const LOWEST_POINT = 165;
const XPOS = 560;
const SOUTH = 90; // 0=EAST 90=South 180=WEST 270=NORTH

// SHOOTING
const SPAWN_RATE = 150; // ufo spawn rate. lower = faster
const P2_SPAWN_RATE = 100; // ufo spawn rate. lower = faster
const P3_SPAWN_RATE = 50; // ufo spawn rate. lower = faster

// HARDEN
const HARDEN_RATE = 2000; // in ticks. lower = faster
const HARDEN_TIME = 15000; // in ms
const HARDEN_BULLETSPEED = 3;

// STATE
const HP = 50000;
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

        this.spawnUfo();
        this.hardened = false;
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
            this.shoot();
        }
        SceneUtils.shakeScreen(2, 0.25);
        super.takeDamage(damage);
    }

    shoot() {
        game.firelasers.add(new FireLaser(XPOS, LOWEST_POINT, randomInRange(0, 360), HARDEN_BULLETSPEED));
    }

    step() {
        super.step();

        // set ufo spawnrate according to boss phase & spawn it
        let spawnrate = SPAWN_RATE;
        if (this.hp < HP * PHASE2_HP) {
            spawnrate = P2_SPAWN_RATE;
        }
        if (this.hp < HP * PHASE3_HP) {
            spawnrate = P3_SPAWN_RATE;
        }
        if (this.steps % spawnrate === 0) {
            this.spawnUfo();
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
        game.enemies.clear();
        SceneUtils.flashScreen();
        this.sprite = FK77HARDENEDSPRITE;
        SceneUtils.shakeScreen(3, 0.5);

        setTimeout(() => {
            this.soften();
        }, HARDEN_TIME);
    }

    spawnUfo() {
        if (!this.hardened) {
            const coordinates = [randomInRange(30, 400), randomInRange(680, 920)];
            const roll = coordinates[randomInRange(0, coordinates.length - 1)];
            game.enemies.add(new YellowUfo(roll));
        }
    }

    die() {
        super.die();
        game.audiocontroller.playSound('exp_big');
        SceneUtils.shakeScreen(6, 2);
        game.state.toggleBoss();
    }
}
