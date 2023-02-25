import { SCOREBALLSPRITE } from '../../Assets/Effects.js';
import { randomInRange } from '../../Logic/Helpers.js';
import { Movement } from '../../Logic/Motion/Movement.js';

const DESTINATION_X = 30;
const DESTINATION_Y = 520;
const SPRITE = SCOREBALLSPRITE;

export class Scoreball {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.sprite = SPRITE;
        this.speed = randomInRange(30, 50);

        // Scoreball will be rendered on screen as long as duration is > 0
        // It will be flipped to 0 once destination is reached
        this.duration = 1;
    }

    // Move the scoreball towards the scoreboard
    move() {
        this.x += Movement.moveTowards(this.x, this.y, DESTINATION_X, DESTINATION_Y, this.speed).x;
        this.y += Movement.moveTowards(this.x, this.y, DESTINATION_X, DESTINATION_Y, this.speed).y;

        if (this.x <= DESTINATION_X + 30 && this.y <= DESTINATION_Y + 30) {
            // +10 because exact destination will never be reached
            this.duration = 0;
        }
    }
}
