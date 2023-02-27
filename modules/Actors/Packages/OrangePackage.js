// ORANGE PACKAGES DROP TEMPORARY BUFFS

import { Enemy } from '../Enemies/Enemy.js';
import { Movement } from '../../Logic/Motion/Movement.js';
import { game } from '../../../app.js';
import { Animation } from '../../Effects/Misc/Animation.js';
import { ORANGEPACKAGESPRITE } from '../../Assets/Enemies.js';
import { shakeScreen } from '../../Logic/Helpers.js';

// MOVEMENT
const SPEED = 0.5;
const MOVEDIRECTION = 90; // Angle (0=EAST 90=South 180=WEST 270=NORTH)

// STATE
const HP = 50;
const COINS = 0;
const RADIUS = 17;
const SPRITE = ORANGEPACKAGESPRITE;

export class OrangePackage extends Enemy {
    constructor() {
        super(RADIUS, HP, COINS, SPRITE, SPEED);
        this.hitsound = 'metal';
        game.audiocontroller.playBeepOrangeSound();
    }

    move() {
        this.x += Movement.move(MOVEDIRECTION, this.speed).x;
        this.y += Movement.move(MOVEDIRECTION, this.speed).y;
    }

    die() {
        game.audiocontroller.playAnimationSound('splash');
        game.effects.add(new Animation(this.x, this.y, 'explosion_normal'));
        game.buffcontroller.drop();
        shakeScreen(4, 0.5);
    }
}
