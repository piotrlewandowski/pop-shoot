import { game, gameloop } from '../../../app.js';
import {
    GLASSSTAGE1SPRITE,
    GLASSSTAGE2SPRITE,
    GLASSSTAGE3SPRITE,
    GLASSSTAGE4SPRITE,
    GLASSSTAGE5SPRITE,
} from '../../Assets/Hud.js';
import { Notification } from '../../Effects/Misc/Notification.js';
import { CashController } from '../Controllers/CashController.js';
import { Clock } from '../../Objects/Clock.js';
import { BuffController } from '../Controllers/BuffController.js';
import { Animation } from '../../Effects/Misc/Animation.js';
import { SceneUtils } from '../../Scene/SceneUtils.js';
import { Controls } from '../Motion/Controls.js';
import { ItemActionController } from '../Controllers/ItemActionController.js';
import { ItemDropController } from '../Controllers/ItemDropController.js';
import { Debugging } from './Debugging.js';
import { Shotgun } from '../../Objects/Shotgun.js';

const STAGESPRITES = [GLASSSTAGE1SPRITE, GLASSSTAGE2SPRITE, GLASSSTAGE3SPRITE, GLASSSTAGE4SPRITE, GLASSSTAGE5SPRITE];
const NOTIFICATION_DURATION = 400; // in ticks. higher = longer
const NOTIFICATION_X = 500;
const NOTIFICATION_Y = 80;

export class GameState {
    constructor() {
        this.time = 0;
        this.stage = 0;

        this.slowmo = false;
        this.boss = false;

        this.paused = false;
        this.over = false;
    }

    // set an interval to increment the game time by 1 every second.
    // will not increment if the game is paused, clock, or game-over state.
    startGame() {
        this.time += 1;
        game.audiocontroller.updateMusic();
        this.addStageNotification();
        Debugging.addDebuggingControls();
        setInterval(() => {
            if (!this.paused && !this.over && !this.boss && !game.player.clock.active) {
                this.time++;
            }
        }, 1000);
    }

    startSlowmo() {
        if (
            !this.slowmo &&
            !game.player.clock.active &&
            !game.buffcontroller.noslowmo &&
            game.player.slowmogauge.charge > 0 &&
            this.time
        ) {
            this.slowmo = true;
            game.slowmocontroller.start();
            game.audiocontroller.updateMusic();
        } else {
            SceneUtils.shakeScreen(2, 0.25);
            game.effects.add(new Animation(game.player.x, game.player.y + 20, 'smoke_normal'));
            game.audiocontroller.playSound('slowmoEmpty');
        }
    }

    stopSlowmo() {
        // the 'if' is there to prevent from accidentally running the function several times
        if (this.slowmo) {
            this.slowmo = false;
            game.slowmocontroller.stop();
            game.audiocontroller.updateMusic();
        }
    }

    toggleBoss() {
        if (!this.boss) {
            this.boss = true;
            game.weathercontroller.stopWeather();
        } else {
            this.boss = false;
            game.audiocontroller.playSound('explosion');
            this.time = this.stage === 4 ? 1 : this.time + 1;
            this.stage = this.stage === 4 ? 0 : this.stage + 1;
            this.addStageNotification();
            game.firelasers.clear();
            game.bluelasers.clear();
        }
        SceneUtils.shakeScreen(3, 1);
        SceneUtils.flashScreen();
        game.audiocontroller.updateMusic();
    }

    togglePause() {
        // only pause if game has started, or game is not on gameover screen
        if (this.time) {
            if (!this.paused) {
                Controls.removeMouseClicks();
                this.paused = true;
            } else {
                this.paused = false;
                Controls.addMouseClicks();
                window.requestAnimationFrame(gameloop);
            }
        }
    }

    setGameOver() {
        this.stopSlowmo();
        this.over = true;
        Controls.removeMouseClicks();
        game.audiocontroller.updateMusic();
    }

    replay() {
        // clear screen
        game.enemies.clear(true);
        game.firelasers.clear();
        game.bluelasers.clear();
        game.weathercontroller.stopWeather();

        // reset game state
        this.time = 1;
        this.stage = 0;
        this.boss = false;
        this.over = false;

        // restore controls
        Controls.addMouseClicks();
        Controls.addPauseButton();

        // add more controls for touch and joystick 

        // reset player state
        game.player.shield.charge = 100;
        game.player.slowmogauge.charge = 100;
        game.player.clock = new Clock();
        game.player.shotgun = new Shotgun();
        game.itemdropcontroller = new ItemDropController();
        game.itemactioncontroller = new ItemActionController();
        game.buffcontroller = new BuffController();
        game.cashcontroller = new CashController();

        // graphics
        SceneUtils.flashScreen();
        this.addStageNotification();

        // audio
        game.audiocontroller.rewindMusic();
        game.audiocontroller.updateMusic();

        window.requestAnimationFrame(gameloop);
    }

    addStageNotification() {
        game.effects.clearNotifications('stage');
        game.effects.add(
            new Notification(NOTIFICATION_X, NOTIFICATION_Y, STAGESPRITES[this.stage], NOTIFICATION_DURATION, 'stage')
        );
    }
}
