import { Enemy } from '../Enemy.js';
import { Movement } from '../../../Logic/Motion/Movement.js';
import { game } from '../../../../app.js';
import { CANVAS } from '../../../Assets/Other.js';
import { randomInRange } from '../../../Logic/Helpers.js';
import { ABUSERSPRITE } from '../../../Assets/Enemies.js';
import { FireLaser } from '../../../Lasers/Hostile/FireLaser.js';
import { SceneUtils } from '../../../Scene/SceneUtils.js';

// MOVEMENT
const SPEED = 30;
const LOWEST_POINT = 65;
const SOUTH = 90; // 0=EAST 90=South 180=WEST 270=NORTH

// SHOOTING
const FIRINGRATE = 75;
const ROWSPEED = 3;
const BURSTSPEED = 10;

// WALLS
const PHASE1_LANGLE = 40; // left lasers (closer to 90 = narrower)
const PHASE1_RANGLE = 135; // right lasers (closer to 90 = narrower)
const PHASE2_LANGLE = 50; // left lasers (closer to 90 = narrower)
const PHASE2_RANGLE = 125; // right lasers (closer to 90 = narrower)
const PHASE3_LANGLE = 60; // left lasers (closer to 90 = narrower)
const PHASE3_RANGLE = 115; // right lasers (closer to 90 = narrower)
const PHASE4_LANGLE = 70; // left lasers (closer to 90 = narrower)
const PHASE4_RANGLE = 105; // right lasers (closer to 90 = narrower)

// HARDEN
const HARDEN_RATE = 2000; // in ticks. lower = faster
const HARDEN_TIME = 15000; // in ms

// STATE
const HP = 100000;
const COINS = 240;
const RADIUS = 50;
const SPRITE = ABUSERSPRITE;
const NAME = 'EMOTIONAL ABUSER';

// PHASES
// hp rates, e.g. 0.75 = when boss reaches 75% HP
const PHASE2_HP = 0.75;
const PHASE3_HP = 0.5;
const PHASE4_HP = 0.25;

export class Abuser extends Enemy {
    constructor() {
        super(RADIUS, HP, COINS, SPRITE, SPEED, FIRINGRATE);
        this.x = CANVAS.width / 2;

        this.name = NAME;
        game.audiocontroller.playSound('icu');
        game.state.toggleBoss();

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
            SceneUtils.shakeScreen(2, 0.25);
            this.fireBurst();
            this.fireRow();
        }
    }

    fireRow() {
        // horizontal laser row
        for (let i = 0; i <= 180; i += 20) {
            game.firelasers.add(new FireLaser(this.x, this.y, i, ROWSPEED));
        }
    }

    fireBurst() {
        // vertical laser burst
        for (let i = 0; i < 300; i += 10) {
            setTimeout(() => {
                game.firelasers.add(new FireLaser(this.x, this.y, SOUTH, BURSTSPEED));
            }, i);
        }
    }

    fireWalls() {
        game.firelasers.add(new FireLaser(this.x, this.y, this.getWallAngles().left, 10));
        game.firelasers.add(new FireLaser(this.x, this.y, this.getWallAngles().right, 10));
    }

    shootShower() {
        for (let i = 20; i <= 160; i += 20) {
            SceneUtils.shakeScreen(20, 0.25);
            game.firelasers.add(new FireLaser(this.x + randomInRange(-2, 2), this.y, i, randomInRange(5, 10)));
        }
    }

    getWallAngles() {
        if (this.hp <= HP * PHASE4_HP) return { left: PHASE4_LANGLE, right: PHASE4_RANGLE };
        if (this.hp <= HP * PHASE3_HP) return { left: PHASE3_LANGLE, right: PHASE3_RANGLE };
        if (this.hp <= HP * PHASE2_HP) return { left: PHASE2_LANGLE, right: PHASE2_RANGLE };
        return { left: PHASE1_LANGLE, right: PHASE1_RANGLE };
    }

    step() {
        super.step();

        // start the walls AFTER entrance is done (aka when lowest point is reached)
        if (this.y >= LOWEST_POINT && !this.hardened) {
            this.fireWalls();
        }

        if (this.hardened) {
            this.shootShower();
        }

        // harden
        if (this.steps % HARDEN_RATE === 0) {
            this.harden();
        }
    }

    soften() {
        this.hardened = false;
        clearInterval(this.flashInterval);
        game.audiocontroller.stopSound('siren');
        SceneUtils.flashScreen();
        SceneUtils.shakeScreen(3, 0.5);
    }

    harden() {
        game.audiocontroller.playSound('siren');
        this.hardened = true;
        this.flashInterval = setInterval(SceneUtils.flashScreen, 1000);
        SceneUtils.flashScreen();
        SceneUtils.shakeScreen(3, 0.5);

        setTimeout(() => {
            this.soften();
        }, HARDEN_TIME);
    }

    // intentionally overridden & kept empty to prevent ugly wall effect if pushback is used
    pushBack() {}

    die() {
        super.die();
        game.audiocontroller.stopSound('siren');
        game.state.toggleBoss();
    }
}
