import { game } from '../../../app.js';
import { Movement } from '../../Logic/Motion/Movement.js';
import { Scoreball } from './Scoreball.js';

const DURATION = 50; // When DURATION reaches 0, the damage number will be removed by refresh()
const ANIMATIONSPEED = 10; // lower = faster
const INITIALSIZE = 80;
const FINALSIZE = 30;
const MOVESPEED = 0;

export class ScoreNumber {
    constructor(x, y, scoreReceived) {
        this.x = x;
        this.y = y;

        this.scoreReceived = scoreReceived;
        this.text = `+${scoreReceived}`;
        this.fontSize = INITIALSIZE;

        this.speed = MOVESPEED;
        this.duration = DURATION;
        this.direction = 270; // NORTH

        this.animation = setInterval(() => {
            if (this.fontSize > FINALSIZE) {
                this.fontSize -= 5;
            }
        }, ANIMATIONSPEED);
    }

    move() {
        this.x += Movement.move(this.direction, this.speed).x;
        this.y += Movement.move(this.direction, this.speed).y;
        this.duration--;

        if (this.duration === 0) {
            this.releaseScoreballs();
            clearInterval(this.animation);
        }
    }

    releaseScoreballs() {
        for (let i = 0; i < this.scoreReceived; i++) {
            game.effects.add(new Scoreball(this.x, this.y));
        }
    }
}
