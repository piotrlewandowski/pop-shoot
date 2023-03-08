import { game } from '../../../app.js';
import {
    FLAME0SPRITE,
    FLAME1SPRITE,
    FLAME2SPRITE,
    FLAME3SPRITE,
    FLAME4SPRITE,
    FLAME5SPRITE,
    FLAME6SPRITE,
    FLAME7SPRITE,
    FLAME8SPRITE,
    FLAME9SPRITE,
    FLAME10SPRITE,
    FLAME11SPRITE,
} from '../../Assets/Player.js';
import { Animation } from '../../Effects/Misc/Animation.js';
import { randomInRange } from '../../Logic/Helpers.js';

const SPRITE = [
    FLAME0SPRITE,
    FLAME1SPRITE,
    FLAME2SPRITE,
    FLAME3SPRITE,
    FLAME4SPRITE,
    FLAME5SPRITE,
    FLAME6SPRITE,
    FLAME7SPRITE,
    FLAME8SPRITE,
    FLAME9SPRITE,
    FLAME10SPRITE,
    FLAME11SPRITE,
];

const SPRITECHANGESPEED = 100; // sprite change speed in ms
const SLOWMOCHANGESPEED = 300; // sprite change speed when in slowmo
const VERTICAL_OFFSET = 26; // offset of y position below the player where the flame is drawn
const SMOKE_OFFSET = 10; // offset of y position below the player where the flame is drawn

export class Flame {
    constructor() {
        this.yOffset = VERTICAL_OFFSET;
        this.sprite = FLAME0SPRITE;
        this.spriteChanger = setInterval(() => {
            this.sprite = SPRITE[randomInRange(0, SPRITE.length - 1)];
        }, SPRITECHANGESPEED);
    }

    get x() {
        return game.player.x;
    }

    get y() {
        return game.player.y + this.yOffset;
    }

    move({ smoketype }) {
        this.yOffset = game.player.slowmogauge.charge * (VERTICAL_OFFSET / 100);
        if (Math.round(this.yOffset) % 2 === 0 && smoketype)
            game.effects.add(new Animation(game.player.x, game.player.y + this.yOffset + SMOKE_OFFSET, smoketype));
    }

    toggleSpriteSpeed() {
        clearInterval(this.spriteChanger);
        let speed = SPRITECHANGESPEED;

        if (game.state.slowmo) {
            speed = SLOWMOCHANGESPEED;
        }

        this.spriteChanger = setInterval(() => {
            this.sprite = SPRITE[randomInRange(0, SPRITE.length - 1)];
        }, speed);
    }
}
