import { randomInRange } from '../../Logic/Helpers.js';
import { Movement } from '../../Logic/Motion/Movement.js';
import { game } from '../../../app.js';
import { Animation } from './Animation.js';
import {
    COINSPIN0,
    COINSPIN1,
    COINSPIN2,
    COINSPIN3,
    COINSPIN4,
    COINSPIN5,
    COINSPIN6,
    COINSPIN7,
} from '../../Assets/Animations.js';

const SPRITE = [COINSPIN0, COINSPIN1, COINSPIN2, COINSPIN3, COINSPIN4, COINSPIN5, COINSPIN6, COINSPIN7];
const RADIUS = 10;

const FLOATSPEED = 1.5;
const FLOATDURATION = 500;

export class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.spriteIndex = randomInRange(0, SPRITE.length - 1);
        this.sprite = SPRITE[this.spriteIndex];
        this.radius = RADIUS;

        // floating phase
        this.direction = randomInRange(0, 360);
        this.isFloating = true;

        setTimeout(() => {
            this.isFloating = false;
        }, FLOATDURATION);

        // towards-player phase
        this.speed = randomInRange(15, 40);

        // spinning animation
        this.spinAnimation = setInterval(() => {
            this.sprite = SPRITE[this.spriteIndex % SPRITE.length];
            this.spriteIndex++;
        }, 20);

        // coin will be rendered on screen as long as duration is > 0,
        // duration be flipped to 0 after collision with player
        this.duration = 1;
    }

    move() {
        if (this.isFloating) {
            // move slowly in random direction on enemy's death
            this.x += Movement.move(this.direction, FLOATSPEED).x;
            this.y += Movement.move(this.direction, FLOATSPEED).y;
        } else {
            // move towards player
            this.x += Movement.moveTowards(this.x, this.y, game.player.x, game.player.y, this.speed).x;
            this.y += Movement.moveTowards(this.x, this.y, game.player.x, game.player.y, this.speed).y;
        }
    }

    removeAndCount() {
        this.blinkProgressBar();
        game.effects.add(new Animation(this.x, this.y, 'smoke_normal'));
        game.audiocontroller.playSound('coin');
        game.cashcontroller.incrementCash();
        clearInterval(this.spinAnimation);
        this.duration = 0;
    }

    // used to blink progress-bar to yellow during coin pickup
    static blinking = false;
    static revertBlinking;

    blinkProgressBar() {
        clearTimeout(Coin.revertBlinking);
        Coin.blinking = true;
        Coin.revertBlinking = setTimeout(() => {
            Coin.blinking = false;
        }, 250);
    }
}
