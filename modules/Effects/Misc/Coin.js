import { COINSPRITE } from '../../Assets/Effects.js';
import { randomInRange } from '../../Logic/Helpers.js';
import { Movement } from '../../Logic/Motion/Movement.js';
import { game } from '../../../app.js';

const SPRITE = COINSPRITE;
const RADIUS = 10;

// FLOATING PHASE
const FLOATSPEED = 0.5;
const FLOATDURATION = 1000;

export class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.sprite = SPRITE;
        this.radius = RADIUS;

        // Floating Phase
        this.direction = randomInRange(0, 360);
        this.isFloating = true;

        setTimeout(() => {
            this.isFloating = false;
        }, FLOATDURATION);

        // Towards-Player phase
        this.destination_x = game.player.x;
        this.destination_y = game.player.y;
        this.speed = randomInRange(15, 40);

        // Coin will be rendered on screen as long as duration is > 0
        // Duration be flipped to 0 after collision with player
        this.duration = 1;
    }

    move() {
        if (this.isFloating) {
            // Move slowly in random direction on enemy's death
            this.x += Movement.move(this.direction, FLOATSPEED).x;
            this.y += Movement.move(this.direction, FLOATSPEED).y;
        } else {
            // Move towards player
            this.x += Movement.moveTowards(this.x, this.y, game.player.x, game.player.y, this.speed).x;
            this.y += Movement.moveTowards(this.x, this.y, game.player.x, game.player.y, this.speed).y;
        }
    }

    removeAndCount() {
        game.cashcontroller.incrementCash();
        game.cashcontroller.checkPlayerCash();
        this.duration = 0;
    }
}
