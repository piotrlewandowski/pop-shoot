import { game } from '../../../app.js';
import { randomInRange } from '../../Logic/Helpers.js';
import { CANVAS } from '../../Assets/OtherGfx.js';
import { Scoreball } from '../../Effects/Misc/Scoreball.js';
import { Animation } from '../../Effects/Misc/Animation.js';
import { ScoreNumber } from '../../Effects/Misc/ScoreNumber.js';

export class Enemy {
    constructor(radius, hp, scoreballs, sprite, speed, firingrate) {
        // Base stats
        this.radius = radius;
        this.hp = this.maxhp = hp;
        this.scoreballs = scoreballs;
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
        if (game.state.variables.thorshammer) {
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
            }, game.state.variables.stuntime);
        }
    }

    shake() {
        let flip = true;
        const shakeInterval = setInterval(() => {
            this.x += flip ? 3 : -3;
            flip = !flip;
        }, 40);

        setTimeout(() => clearInterval(shakeInterval), game.state.variables.stuntime);
    }

    // All enemies have a steps variable in parallel with y.
    // Shooting time and some types of movement (such as sinewave) rely on steps.
    // Steps should be incremented by the move() method.
    step() {
        this.steps++;
        if (this.steps % this.firingrate === 0 && !game.state.variables.muteenemies) {
            this.shoot();
        }
    }

    // Release scoreballs when killed.
    // Some enemies & bosses have extra behaviour for this method.
    die() {
        // SCOREBALLS
        let scoreReceived = this.scoreballs;

        // Roll a dice to calculate greed chance
        const greedroll = randomInRange(0, 100);
        if (game.state.variables.greed && greedroll < game.state.variables.greedchance) {
            scoreReceived *= 2;
        }

        for (let i = 0; i < scoreReceived; i++) {
            game.scorecontroller.incrementScore();
            game.scorecontroller.checkPlayerScore();
            game.effects.add(new ScoreNumber(this.x, this.y, scoreReceived));
            if (i < 10) {
                // limit max scoreballs to 10 to prevent ugly effect
                game.effects.add(new Scoreball(this.x + randomInRange(-80, 80), this.y + randomInRange(-80, 80)));
            }
        }
    }
}
