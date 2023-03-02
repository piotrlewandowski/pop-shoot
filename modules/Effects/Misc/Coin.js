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
import { DollarSign } from './DollarSign.js';
import { CANVAS } from '../../Assets/OtherGfx.js';

const SPRITE = [COINSPIN0, COINSPIN1, COINSPIN2, COINSPIN3, COINSPIN4, COINSPIN5, COINSPIN6, COINSPIN7];
const RADIUS = 10;

const PROGRESSBAR_X = 223;
const PROGRESSBAR_WIDTH = 565;

const FLOATSPEED = 1.5;
const FLOATDURATION = 500;

export class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.spriteIndex = randomInRange(0, SPRITE.length - 1);
        this.sprite = SPRITE[this.spriteIndex];
        this.radius = RADIUS;

        // Floating Phase
        this.direction = randomInRange(0, 360);
        this.isFloating = true;

        setTimeout(() => {
            this.isFloating = false;
        }, FLOATDURATION);

        // Towards-Destination phase
        this.destinationY = CANVAS.height - 30;
        // destinationX is calculated in the move function in order keep updating as the coin moves
        this.speed = randomInRange(15, 40);

        // Spinning animation
        this.spinAnimation = setInterval(() => {
            this.sprite = SPRITE[this.spriteIndex % SPRITE.length];
            this.spriteIndex++;
        }, 20);

        // Coin will be rendered on screen as long as duration is > 0
        // Duration be flipped to 0 after arrival to destination
        this.duration = 1;
    }

    move() {
        // Remove if coin has become below progress-bar
        if (this.y > this.destinationY) {
            this.removeAndCount();
        }

        if (this.isFloating) {
            // Move slowly in random direction on enemy's death
            this.x += Movement.move(this.direction, FLOATSPEED).x;
            this.y += Movement.move(this.direction, FLOATSPEED).y;
        } else {
            // Get destination coordinates (progress-bar's tail)
            const destinationX = PROGRESSBAR_X + PROGRESSBAR_WIDTH * game.cashcontroller.levelBarPercentage;

            // Move towards destination
            this.x += Movement.moveTowards(this.x, this.y, destinationX, this.destinationY, this.speed).x;
            this.y += Movement.moveTowards(this.x, this.y, destinationX, this.destinationY, this.speed).y;
        }
    }

    removeAndCount() {
        this.blinkProgressBar();
        game.effects.add(new Animation(this.x, this.y, 'smoke_normal'));
        game.effects.add(new DollarSign(this.x, this.y));
        game.audiocontroller.playCoinSound();
        game.cashcontroller.incrementCash();
        clearInterval(this.spinAnimation);
        this.duration = 0;
    }

    // Used to blink progress-bar to yellow during coin pickup
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
