import { Enemy } from '../Enemy.js';
import { Animation } from '../../../Effects/Misc/Animation.js';
import { Movement } from '../../../Logic/Motion/Movement.js';
import { game } from '../../../../app.js';
import { FireLaser } from '../../../Lasers/Hostile/FireLaser.js';
import { CANVAS } from '../../../Assets/Other.js';
import { randomInRange } from '../../../Logic/Helpers.js';
import { FAMILIARSIGHTHARDENEDSPRITE, FAMILIARSIGHTSPRITE } from '../../../Assets/Enemies.js';
import { SceneUtils } from '../../../Scene/SceneUtils.js';

// MOVEMENT
const SPEED = 4;
const ENGAGEDISTANCE = 300; // distance kept when engaging player
const SOUTH = 90; // 0=EAST 90=South 180=WEST 270=NORTH
const NORTH = 270; // 0=EAST 90=South 180=WEST 270=NORTH

// SHOOTING
const BURSTSPEED = 10;
const BURSTRATE = 75;
const BURSTLENGTH = 100;
const MACHINEGUN_SPEED = 8;
const MACHINEGUN_RATE = 3;

// PHASES
// rates, e.g. 0.75 = when boss reaches 75% of HP
const PHASE2_HP = 0.5;
const PHASE2_BURSTLENGTH = 175;
const PHASE3_HP = 0.2;
const PHASE3_BURSTLENGTH = 250;

// HARDEN
const HARDEN_RATE = 2000; // in ticks. lower = faster
const HARDEN_TIME = 10000; // in ms

// STATE
const HP = 15000;
const COINS = 60;
const RADIUS = 40;
const SPRITE = FAMILIARSIGHTSPRITE;
const NAME = 'FAMILIAR SIGHT';

export class FamiliarSight extends Enemy {
    constructor() {
        super(RADIUS, HP, COINS, SPRITE, SPEED, BURSTRATE);

        this.name = NAME;
        game.audiocontroller.playSound('appear');
        game.state.toggleBoss();

        this.hardened = false;
    }

    move() {
        if (!this.hardened) {
            // if out of screen, move back in
            if (this.y <= this.radius) {
                this.x += Movement.move(SOUTH, this.speed).x;
                this.y += Movement.move(SOUTH, this.speed).y;
            } else {
                // if lower than middle of screen, go back up
                if (this.y >= CANVAS.height * 0.5) {
                    this.x += Movement.move(NORTH, this.speed).x;
                    this.y += Movement.move(NORTH, this.speed).y;
                }

                // follow player
                this.x += Movement.moveTowards(
                    this.x,
                    this.y,
                    game.player.x,
                    game.player.y - ENGAGEDISTANCE,
                    this.speed
                ).x;
                this.y += Movement.moveTowards(
                    this.x,
                    this.y,
                    game.player.x,
                    game.player.y - ENGAGEDISTANCE,
                    this.speed
                ).y;
            }
        } else {
            // move towards "hardened" position coordinates
            this.x += Movement.moveTowards(this.x, this.y, CANVAS.width / 2, 90, this.speed).x;
            this.y += Movement.moveTowards(this.x, this.y, CANVAS.width / 2, 90, this.speed).y;
        }

        this.step();
    }

    shoot() {
        if (this.hardened) {
            this.fireMachinegun();
        } else {
            this.fireBursts();
        }
    }

    fireBursts() {
        const randomOffset = randomInRange(-60, 60);

        for (let i = 0; i < this.getBurstLength(); i += 10) {
            setTimeout(() => {
                game.firelasers.add(new FireLaser(this.x, this.y, SOUTH - 90 + randomOffset, BURSTSPEED));
                game.firelasers.add(new FireLaser(this.x, this.y, SOUTH - 60 + randomOffset, BURSTSPEED));
                game.firelasers.add(new FireLaser(this.x, this.y, SOUTH - 30 + randomOffset, BURSTSPEED));
                game.firelasers.add(new FireLaser(this.x, this.y, SOUTH + randomOffset, BURSTSPEED));
                game.firelasers.add(new FireLaser(this.x, this.y, SOUTH + 30 + randomOffset, BURSTSPEED));
                game.firelasers.add(new FireLaser(this.x, this.y, SOUTH + 60 + randomOffset, BURSTSPEED));
                game.firelasers.add(new FireLaser(this.x, this.y, SOUTH + 90 + randomOffset, BURSTSPEED));
            }, i);
        }
    }

    getBurstLength() {
        if (this.hp < HP * PHASE3_HP) return PHASE3_BURSTLENGTH;
        if (this.hp < HP * PHASE2_HP) return PHASE2_BURSTLENGTH;
        return BURSTLENGTH;
    }

    fireMachinegun() {
        SceneUtils.shakeScreen(5, 0.25);

        const randomDirection = randomInRange(0, 180);

        for (let i = 0; i <= 6; i += 2) {
            game.firelasers.add(new FireLaser(this.x, this.y + i, randomDirection, MACHINEGUN_SPEED));
        }
    }

    takeDamage(damage) {
        super.takeDamage(damage);
        SceneUtils.shakeScreen(2, 0.25);
    }

    step() {
        super.step();

        // harden
        if (this.steps % HARDEN_RATE === 0) {
            this.harden();
        }

        // smoke effect
        if (this.steps % 10 === 0) {
            game.effects.add(new Animation(this.x, this.y - 45, 'smoke_normal'));
        }
    }

    soften() {
        game.audiocontroller.playSound('powerDown');
        game.audiocontroller.stopSound('familiarMg');
        this.sprite = FAMILIARSIGHTSPRITE;
        this.firingrate = game.state.slowmo ? BURSTRATE / game.slowmocontroller.slowmorate : BURSTRATE;
        this.hardened = false;
        SceneUtils.flashScreen();
        SceneUtils.shakeScreen(3, 0.5);
    }

    harden() {
        game.audiocontroller.playSound('powerDown');
        game.audiocontroller.playSound('familiarMg');
        this.firingrate = game.state.slowmo ? MACHINEGUN_RATE / game.slowmocontroller.slowmorate : MACHINEGUN_RATE;
        this.sprite = FAMILIARSIGHTHARDENEDSPRITE;
        this.hardened = true;
        SceneUtils.flashScreen();
        SceneUtils.shakeScreen(3, 0.5);

        setTimeout(() => {
            this.soften();
        }, HARDEN_TIME);
    }

    die() {
        super.die();
        game.audiocontroller.stopSound('familiarMg');
        game.state.toggleBoss();
    }
}
