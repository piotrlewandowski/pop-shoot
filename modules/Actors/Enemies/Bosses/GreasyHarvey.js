import { Enemy } from '../Enemy.js';
import { Animation } from '../../../Effects/Misc/Animation.js';
import { Movement } from '../../../Logic/Motion/Movement.js';
import { game } from '../../../../app.js';
import { FireLaser } from '../../../Lasers/Hostile/FireLaser.js';
import { CANVAS } from '../../../Assets/Other.js';
import { randomInRange } from '../../../Logic/Helpers.js';
import { SceneUtils } from '../../../Scene/SceneUtils.js';
import { GREASYHARVEYSPRITE } from '../../../Assets/Enemies.js';

// MOVEMENT
const SPEED = 3;
const LOWEST_POINT = 190;
const SOUTH = 90; // 0=EAST 90=South 180=WEST 270=NORTH

// SHOOTING
const FIRINGRATE = 100;
const BULLETS = 15;

// STATE
const HP = 1750;
const COINS = 15;
const RADIUS = 50;
const SPRITE = GREASYHARVEYSPRITE;
const NAME = 'GREASY HARVEY';

// PHASES
// rates, e.g. 0.75 = when boss reaches 75% of HP
const PHASE2_HP = 0.75;
const PHASE2_BULLETS = 30;
const PHASE3_HP = 0.5;
const PHASE3_BULLETS = 45;
const PHASE4_HP = 0.25;
const PHASE4_BULLETS = 60;

export class GreasyHarvey extends Enemy {
    constructor() {
        super(RADIUS, HP, COINS, SPRITE, SPEED, FIRINGRATE);
        this.x = CANVAS.width / 2;

        this.name = NAME;
        game.audiocontroller.playSound('harvey');
        game.state.toggleBoss();
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

        for (let i = 0; i < this.getBulletsNumber(); i++)
            game.firelasers.add(new FireLaser(this.x, this.y, randomInRange(0, 360), randomInRange(2, 6)));
    }

    getBulletsNumber() {
        if (this.hp < HP * PHASE4_HP) return PHASE4_BULLETS;
        if (this.hp < HP * PHASE3_HP) return PHASE3_BULLETS;
        if (this.hp < HP * PHASE2_HP) return PHASE2_BULLETS;
        return BULLETS;
    }

    takeDamage(damage) {
        // smoke effect
        game.effects.add(new Animation(this.x, this.y - 50, 'smoke_normal'));

        // cosmetic bullets
        for (let i = 0; i < 5; i++) {
            game.firelasers.add(new FireLaser(this.x, this.y - 50, randomInRange(260, 280), randomInRange(5, 15)));
        }

        super.takeDamage(damage);
    }

    die() {
        super.die();
        game.state.toggleBoss();
    }
}
