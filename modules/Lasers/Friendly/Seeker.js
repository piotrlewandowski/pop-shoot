import { Movement } from '../../Logic/Motion/Movement.js';
import { game } from '../../../app.js';
import { BlueLaser } from './BlueLaser.js';
import { SEEKERSPRITE } from '../../Assets/Lasers.js';

export class Seeker extends BlueLaser {
    constructor(target) {
        super();
        this.sprite = SEEKERSPRITE;
        this.damage *= game.itemactioncontroller.seekerrate;
        this.target = target;

        this.alreadyLooped = true; // seekers don't loop so this variable is overridden
    }

    move() {
        if (this.target.hp > 0 && this.target.radius !== -1) {
            this.x += Movement.moveTowards(this.x, this.y, this.target.x, this.target.y, this.speed).x;
            this.y += Movement.moveTowards(this.x, this.y, this.target.x, this.target.y, this.speed).y;
        } else {
            this.shatter();
        }
    }
}
