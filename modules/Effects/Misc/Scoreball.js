import { COINSPRITE } from '../../Assets/Effects.js';
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

        this.direction = randomInRange(0, 360);

        this.toplayer = false;

        setTimeout(() => {
            this.toplayer = true;
        }, 1000);

        // Scoreball will be rendered on screen as long as duration is > 0
        // It will be flipped to 0 once destination is reached
        this.duration = 1;
    }

    move() {
        // Move the scoreball towards the player
        if (this.toplayer) {
            this.x += Movement.moveTowards(this.x, this.y, game.player.x, game.player.y, this.speed).x;
            this.y += Movement.moveTowards(this.x, this.y, game.player.x, game.player.y, this.speed).y;
        } else {
            this.x += Movement.move(this.direction, 0.5).x;
            this.y += Movement.move(this.direction, 0.5).y;
        }
    }

    removeAndCount() {
        game.scorecontroller.incrementScore();
        game.scorecontroller.checkPlayerScore();
        this.duration = 0;
    }
}
