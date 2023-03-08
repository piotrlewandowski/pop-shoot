import { Enemy } from '../Enemies/Enemy.js';
import { Movement } from '../../Logic/Motion/Movement.js';
import { game } from '../../../app.js';
import { Animation } from '../../Effects/Misc/Animation.js';
import { REDPACKAGESPRITE } from '../../Assets/Enemies.js';
import { SceneUtils } from '../../Scene/SceneUtils.js';

// MOVEMENT
const SPEED = 0.5;
const MOVEDIRECTION = 90; // 0=EAST 90=South 180=WEST 270=NORTH

// STATE
const HP = 150;
const COINS = 0;
const RADIUS = 17;
const SPRITE = REDPACKAGESPRITE;

export class RedPackage extends Enemy {
    constructor() {
        super(RADIUS, HP, COINS, SPRITE, SPEED);
        this.hitsound = 'metal';
        game.audiocontroller.playSound('beepRed');
        SceneUtils.shakeScreen(4, 1);
        RedPackage.incrementCount();
    }

    move() {
        this.x += Movement.move(MOVEDIRECTION, this.speed).x;
        this.y += Movement.move(MOVEDIRECTION, this.speed).y;
    }

    die() {
        game.audiocontroller.playSound('reload');
        game.effects.add(new Animation(this.x, this.y, 'explosion_normal'));
        game.itemdropcontroller.drop();
        RedPackage.decrementCount();
        SceneUtils.flashScreen();
        SceneUtils.shakeScreen(4, 1);

        if (!game.state.boss) {
            game.weathercontroller.toggleWeather();
        }
    }

    // called by refresh() when redpackage has left the screen
    vanish() {
        game.audiocontroller.playSound('drain');
        RedPackage.decrementCount();
        SceneUtils.shakeScreen(4, 1);
        SceneUtils.flashScreen();
        this.hp = 0;
    }

    static count = 0;

    static incrementCount() {
        RedPackage.count++;
    }

    static decrementCount() {
        RedPackage.count--;
    }
}
