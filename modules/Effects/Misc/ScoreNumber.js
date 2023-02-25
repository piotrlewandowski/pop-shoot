import { Movement } from '../../Logic/Motion/Movement.js';

const DURATION = 50; // When DURATION reaches 0, the damage number will be removed by refresh()
const ANIMATIONSPEED = 10; // lower = faster
const INITIALSIZE = 80;
const FINALSIZE = 30;
const MOVESPEED = 0;

export class ScoreNumber {
    constructor(x, y, text) {
        this.x = x;
        this.y = y;

        this.fontSize = INITIALSIZE;
        this.speed = MOVESPEED;
        this.duration = DURATION;
        this.text = `+${text}`;
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
            clearInterval(this.animation);
        }
    }
}
