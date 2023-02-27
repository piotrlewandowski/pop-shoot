import { game } from '../../../app.js';
import { COINSPRITE } from '../../Assets/Effects.js';
import { Movement } from '../../Logic/Motion/Movement.js';
import { Scoreball } from './Scoreball.js';

const DURATION = 40; // When DURATION reaches 0, the score-number will be removed by refresh()
const MOVESPEED = 1;

export class ScoreNumber {
    constructor(x, y, scoreReceived) {
        this.x = x;
        this.y = y;
        this.sprite = COINSPRITE;
        this.speed = MOVESPEED;
        this.duration = DURATION;
        this.text = this.scoreReceived = scoreReceived;
        this.direction = 270; // NORTH
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
