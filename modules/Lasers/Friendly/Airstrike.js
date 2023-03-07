import { Movement } from '../../Logic/Motion/Movement.js';
import { game } from '../../../app.js';
import { BlueLaser } from './BlueLaser.js';
import { AIRSTRIKESPRITE } from '../../Assets/Lasers.js';
import { Animation } from '../../Effects/Misc/Animation.js';
import { SceneUtils } from '../../Scene/SceneUtils.js';

export class Airstrike extends BlueLaser {
    constructor(target) {
        super();
        this.x = target.x;
        this.y = 0;
        this.sprite = AIRSTRIKESPRITE;

        this.speed = 25;
        this.damage *= game.itemactioncontroller.airstrikerate;
        this.target = target;

        this.alreadyLooped = true; // airstrikes don't loop so this variable is overridden
    }

    move() {
        if (this.target.hp > 0 && this.target.radius !== -1) {
            this.x += Movement.moveTowards(this.x, this.y, this.target.x, this.target.y, this.speed).x;
            this.y += Movement.moveTowards(this.x, this.y, this.target.x, this.target.y, this.speed).y;
        } else {
            this.shatter();
        }
    }

    shatter() {
        this.shattered = true;
        SceneUtils.shakeScreen(3, 0.25);
        game.effects.add(new Animation(this.x, this.y, 'explosion_normal'));
    }
}
