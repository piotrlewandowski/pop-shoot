import { game, gameloop } from '../../../app.js';
import {
    GLASSSTAGE1SPRITE,
    GLASSSTAGE2SPRITE,
    GLASSSTAGE3SPRITE,
    GLASSSTAGE4SPRITE,
    GLASSSTAGE5SPRITE,
} from '../../Assets/Hud.js';
import { Notification } from '../../Effects/Misc/Notification.js';
import { GameVariables } from './GameVariables.js';
import { SlowMo } from './SlowMo.js';
import { CashController } from '../Controllers/CashController.js';
import { Clock } from '../../Objects/Clock.js';
import { BuffController } from '../Controllers/BuffController.js';
import { Animation } from '../../Effects/Misc/Animation.js';
import { SceneUtils } from '../../Scene/SceneUtils.js';
import { Controls } from '../Motion/Controls.js';
import { DropController } from '../Controllers/DropController.js';

// STAGE NOTIFICATION
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

        this.variables = new GameVariables();
    }

    // Set an interval to increment the game time by 1 every second.
    // Will not increment if the game is paused, or in game-over state.
    startGame() {
        this.time += 1;
        game.audiocontroller.updateMusic();
        this.addStageNotification();
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
            !game.state.variables.noslowmo &&
            game.player.slowmogauge.charge > 0
        ) {
            this.slowmo = true;
            SlowMo.start();
            game.audiocontroller.updateMusic();
        } else {
            SceneUtils.shakeScreen(2, 0.25);
            game.effects.add(new Animation(game.player.x, game.player.y + 20, 'smoke_normal'));
            game.audiocontroller.playSound('slowmoEmpty');
        }
    }

    stopSlowmo() {
        // if statement to prevent from accidentally running the function several times
        if (this.slowmo) {
            this.slowmo = false;
            SlowMo.stop();
            game.audiocontroller.updateMusic();
        }
    }

    toggleBoss() {
        if (!this.boss) {
            this.boss = true;
            SceneUtils.shakeScreen(6, 0.75);
            game.weathercontroller.startDarkness();
        } else {
            this.boss = false;
            game.weathercontroller.stopDarkness();
            this.time = this.stage === 4 ? 1 : this.time + 1;
            this.stage = this.stage === 4 ? 0 : this.stage + 1;
            this.addStageNotification();
            game.enemies.clear();
            game.firelasers.clear();
            game.bluelasers.clear();
        }
        SceneUtils.flashScreen();
        game.weathercontroller.stopWeather();
        game.audiocontroller.updateMusic();
    }

    togglePause() {
        // Only pause if game has started, or game is not on gameover screen
        if (this.time && !this.over) {
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

    // This function is only used for development purposes
    // ----------------------------------------------------
    unsetGameOver() {
        this.over = false;
        Controls.addMouseClicks();
        Controls.addPauseButton();
        game.firelasers.clear();
        game.bluelasers.clear();
        game.player.shield.charge = 100;
        window.requestAnimationFrame(gameloop);
        game.audiocontroller.updateMusic();
    }
    // ----------------------------------------------------

    replay() {
        // CLEAR SCREEN
        game.enemies.clear(true);
        game.firelasers.clear();
        game.bluelasers.clear();
        game.weathercontroller.stopWeather();
        game.weathercontroller.stopDarkness();

        // RESET GAME STATE
        this.time = 1;
        this.stage = 0;
        this.boss = false;
        this.over = false;
        game.state.variables = new GameVariables();

        // RESTORE CONTROLS
        Controls.addMouseClicks();
        Controls.addPauseButton();

        // RESET PLAYER STATE
        game.player.shield.charge = 100;
        game.player.slowmogauge.charge = 100;
        game.player.clock = new Clock();
        game.dropcontroller = new DropController();
        game.buffcontroller = new BuffController();
        game.cashcontroller = new CashController();

        // GRAPHICS
        SceneUtils.flashScreen();
        this.addStageNotification();

        // AUDIO
        game.audiocontroller.rewindMusic();
        game.audiocontroller.updateMusic();

        window.requestAnimationFrame(gameloop);
    }

    addStageNotification() {
        game.effects.add(
            new Notification(NOTIFICATION_X, NOTIFICATION_Y, STAGESPRITES[this.stage], NOTIFICATION_DURATION)
        );
    }
}
