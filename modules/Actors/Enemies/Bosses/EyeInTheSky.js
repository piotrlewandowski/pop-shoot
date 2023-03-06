import { Enemy } from '../Enemy.js';
import { Animation } from '../../../Effects/Misc/Animation.js';
import { Movement } from '../../../Logic/Motion/Movement.js';
import { game } from '../../../../app.js';
import { FireLaser } from '../../../Lasers/Hostile/FireLaser.js';
import { CANVAS } from '../../../Assets/Other.js';
import { randomInRange } from '../../../Logic/Helpers.js';
import { EYEINTHESKYSPRITE } from '../../../Assets/Enemies.js';
import { SceneUtils } from '../../../Scene/SceneUtils.js';

// MOVEMENT
const SPEED = 2;
const LOWEST_POINT = 190;
const SOUTH = 90; // Angle (0=EAST 90=South 180=WEST 270=NORTH)

// SHOOTING
const FIRINGRATE = 100;
const BULLETSNUMBER = 15;

// STATE
const HP = 1500;
const COINS = 15;
const RADIUS = 50;
const SPRITE = EYEINTHESKYSPRITE;
const NAME = 'EYE IN THE SKY';

// PHASES (Rates, e.g. 0.75 = when boss reaches 75% of HP)
// When the boss reaches a certain HP amount, the number of bullets fired will increase

// Phase 2
const PHASE2_HP = 0.75;
const PHASE2_BULLETS = 30;

// Phase 3
const PHASE3_HP = 0.5;
const PHASE3_BULLETS = 45;

// Phase 4
const PHASE4_HP = 0.25;
const PHASE4_BULLETS = 60;

export class EyeInTheSky extends Enemy {
    constructor() {
        super(RADIUS, HP, COINS, SPRITE, SPEED, FIRINGRATE);
        this.x = CANVAS.width / 2;

        // BOSS SPECIFIC ------------
        this.name = NAME;
        game.state.toggleBoss();
        // --------------------------
    }

    move() {
        if (this.y <= LOWEST_POINT) {
            this.x += Movement.move(SOUTH, this.speed).x;
            this.y += Movement.move(SOUTH, this.speed).y;
        }
        this.step();
    }

    shoot() {
        SceneUtils.shakeScreen(4, 0.5);

        // Set the number of lasers to shoot according to boss phase
        let bulletsnumber = BULLETSNUMBER;

        if (this.hp < HP * PHASE2_HP) {
            bulletsnumber = PHASE2_BULLETS;
        }
        if (this.hp < HP * PHASE3_HP) {
            bulletsnumber = PHASE3_BULLETS;
        }
        if (this.hp < HP * PHASE4_HP) {
            bulletsnumber = PHASE4_BULLETS;
        }

        // Fire lasers
        for (let i = 0; i < bulletsnumber; i++)
            game.firelasers.add(new FireLaser(this.x, this.y, randomInRange(0, 360), randomInRange(2, 6)));
    }

    takeDamage(damage) {
        // SMOKE EFFECTS
        game.effects.add(new Animation(this.x, this.y - 50, 'smoke_normal'));

        // COSMETIC BULLETS
        for (let i = 0; i < 5; i++) {
            game.firelasers.add(new FireLaser(this.x, this.y - 50, randomInRange(260, 280), randomInRange(5, 15)));
        }

        super.takeDamage(damage);
    }

    die() {
        super.die();
        game.audiocontroller.playSound('exp_big');
        SceneUtils.shakeScreen(6, 2);
        game.state.toggleBoss();
    }
}
