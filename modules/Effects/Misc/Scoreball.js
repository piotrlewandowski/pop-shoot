import { COINSPRITE, SCOREBALLSPRITE } from '../../Assets/Effects.js';
import { randomInRange } from '../../Logic/Helpers.js';
import { Movement } from '../../Logic/Motion/Movement.js';
import { game } from '../../../app.js';

const SPRITE = COINSPRITE;
const RADIUS = 10;

export class Scoreball {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.destination_x = game.player.x;
        this.destination_y = game.player.y;

        this.radius = RADIUS;

        this.sprite = SPRITE;
        this.speed = randomInRange(15, 40);

        // Scoreball will be rendered on screen as long as duration is > 0
        // It will be flipped to 0 once destination is reached
        this.duration = 1;
    }

    // Move the scoreball towards the scoreboard
    move() {
        this.x += Movement.moveTowards(this.x, this.y, game.player.x, game.player.y, this.speed).x;
        this.y += Movement.moveTowards(this.x, this.y, game.player.x, game.player.y, this.speed).y;
    }

    remove() {
        this.duration = 0;
    }
}
