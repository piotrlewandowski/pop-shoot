// RED PACKAGES DROP ITEMS

import { Enemy } from '../Enemies/Enemy.js';
import { Movement } from '../../Logic/Motion/Movement.js';
import { game } from '../../../app.js';
import { Animation } from '../../Effects/Misc/Animation.js';
import { REDPACKAGESPRITE } from '../../Assets/Enemies.js';
import { WeatherController } from '../../Logic/Controllers/WeatherController.js';
import { shakeScreen } from '../../Logic/Helpers.js';

// MOVEMENT
const SPEED = 0.5;
const MOVEDIRECTION = 90; // Angle (0=EAST 90=South 180=WEST 270=NORTH)

// STATE
const HP = 150;
const COINS = 0;
const RADIUS = 17;
const SPRITE = REDPACKAGESPRITE;

export class RedPackage extends Enemy {
    constructor() {
        super(RADIUS, HP, COINS, SPRITE, SPEED);
        this.hitsound = 'metal';
        game.audiocontroller.playBeepRedSound();
    }

    move() {
        this.x += Movement.move(MOVEDIRECTION, this.speed).x;
        this.y += Movement.move(MOVEDIRECTION, this.speed).y;
    }

    die() {
        game.audiocontroller.playAnimationSound('reload');
        game.effects.add(new Animation(this.x, this.y, 'explosion_normal'));
        game.itemcontroller.drop();
        shakeScreen(4, 0.5);

        // Weather - Only toggle if not in boss-mode
        if (!game.state.boss) {
            if (WeatherController.weatherActive) {
                WeatherController.stopWeather();
                WeatherController.stopDarkness();
            } else {
                WeatherController.startWeather();
                WeatherController.startDarkness();
            }
        }
    }
}
