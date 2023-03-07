import { game } from '../../../app.js';
import { randomInRange } from '../../Logic/Helpers.js';
import { BlueLaser } from './BlueLaser.js';
import { DARTS0SPRITE, DARTS1SPRITE, DARTS2SPRITE, DARTS3SPRITE } from '../../Assets/Lasers.js';

const SPRITE = [DARTS0SPRITE, DARTS1SPRITE, DARTS2SPRITE, DARTS3SPRITE];

export class Dart extends BlueLaser {
    constructor() {
        super();
        this.x = game.player.x + randomInRange(-20, +20);
        this.y = game.player.y + randomInRange(-50, 0);
        this.sprite = SPRITE[randomInRange(0, SPRITE.length - 1)];

        this.speed = randomInRange(10, 20);
        this.damage *= game.itemactioncontroller.dartsrate;
    }
}
