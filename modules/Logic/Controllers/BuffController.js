// BUFFS ARE DROPPED BY ORANGE PACKAGES

import { randomInRange } from '../Helpers.js';
import { game } from '../../../app.js';
import { Buffs } from '../../Drops/Buffs.js';

const BUFF_DURATION = 15; // in seconds
const BUFFS = [
    { text: 'QUAD DAMAGE !', buff: Buffs._quaddamage },
    { text: 'INVINCIBILITY !', buff: Buffs._invincibility },
    { text: 'YOU ARE MUTED !', buff: Buffs._mute },
    { text: 'NO SHIELD !', buff: Buffs._noshield },
    { text: 'ENEMIES MUTED !', buff: Buffs._muteenemies },
    { text: 'NO SLOW-MO !', buff: Buffs._noslowmo },
    { text: 'BLANK BULLETS !', buff: Buffs._blankbullets },
    { text: `THOR'S HAMMER !`, buff: Buffs._thorshammer },
];
export class BuffController {
    constructor() {
        // Used to draw the buff's text in Scene.js
        this.text = '';

        // The duration of the buff. Once a buff is activated, the variable will be set
        // to BUFF_DURATION and start countdown to 0
        this.remainingTime = 0;
    }

    drop() {
        const randomBuff = BUFFS[randomInRange(0, BUFFS.length - 1)];
        this.text = randomBuff.text;

        // each buff returns a function to revert its state. we pass this
        // revert function to the countdown to be executed when the buff ends
        this.setCountdown(randomBuff.buff());
    }

    setCountdown(fn) {
        this.remainingTime = BUFF_DURATION;
        this.countdown = setInterval(() => {
            if (!game.state.paused) {
                this.remainingTime--;
            }
            if (this.remainingTime <= 0) {
                fn();
                clearInterval(this.countdown);
            }
        }, 1000);
    }
}
