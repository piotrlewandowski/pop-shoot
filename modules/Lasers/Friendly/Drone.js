import { game } from '../../../app.js';
import { randomInRange } from '../../Logic/Helpers.js';
import { BlueLaser } from './BlueLaser.js';
import { DRONES0SPRITE, DRONES1SPRITE, DRONES2SPRITE, DRONES3SPRITE } from '../../Assets/Lasers.js';

const SPRITE = [DRONES0SPRITE, DRONES1SPRITE, DRONES2SPRITE, DRONES3SPRITE];

export class Drone extends BlueLaser {
    constructor() {
        super();
        this.x = game.player.x + randomInRange(-20, +20);
        this.y = game.player.y + randomInRange(-50, 0);
        this.sprite = SPRITE[randomInRange(0, SPRITE.length - 1)];

        this.speed = randomInRange(10, 20);
        this.damage *= game.itemcontroller.dronesrate;
    }
}
