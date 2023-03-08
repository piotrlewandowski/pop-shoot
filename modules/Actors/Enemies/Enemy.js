import { game } from '../../../app.js';
import { randomInRange } from '../../Logic/Helpers.js';
import { CANVAS } from '../../Assets/Other.js';
import { Animation } from '../../Effects/Misc/Animation.js';
import { Coin } from '../../Effects/Misc/Coin.js';

export class Enemy {
    constructor(radius, hp, coins, sprite, speed, firingrate) {
        // Base stats
        this.radius = radius;
        this.hp = this.maxhp = hp;
        this.coins = coins;
        this.sprite = sprite;
        this.speed = speed;
        this.firingrate = firingrate;

        // Spawn coordinates
        this.x = randomInRange(0 + this.radius, CANVAS.width - this.radius);
        this.y = -this.radius;

        // Misc
        this.steps = 0;
        this.hitsound = 'standard';
        this.stunned = false;
    }

    takeDamage(damage) {
        this.hp -= damage;
        if (game.buffcontroller.thorshammer) {
            this.stun();
        }
    }

    pushBack() {
        if (!this.stunned) {
            this.y -= randomInRange(3, 7);
        }
    }

    stun() {
        if (!this.stunned) {
            this.shake();
            this.stunned = true;
            game.effects.add(new Animation(this.x, this.y - 30, 'smoke_normal'));
            setTimeout(() => {
                this.stunned = false;
            }, game.itemactioncontroller.stuntime);
        }
    }

    shake() {
        let flip = true;
        const shakeInterval = setInterval(() => {
            this.x += flip ? 3 : -3;
            flip = !flip;
        }, 40);

        setTimeout(() => clearInterval(shakeInterval), game.itemactioncontroller.stuntime);
    }

    // All enemies have a steps variable in parallel with y.
    // Shooting time and some types of movement (such as sinewave) rely on steps.
    // Steps should be incremented by the move() method.
    step() {
        this.steps++;
        if (this.steps % this.firingrate === 0 && !game.buffcontroller.muteenemies) {
            this.shoot();
        }
    }

    // Release coins when killed.
    // Some enemies & bosses have extra behaviour for this method.
    die() {
        for (let i = 0; i < this.coins * game.itemactioncontroller.greedMultiplier; i++) {
            game.effects.add(new Coin(this.x, this.y));
        }
    }

    get hitRatio() {
        return this.hp / this.maxhp;
    }
}
