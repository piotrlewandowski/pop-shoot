import { game } from '../../../app.js';
import { CANVAS } from '../../Assets/OtherGfx.js';

const PAUSEBUTTON = 'Space';
const UNSETGAMEOVERBUTTON = 'KeyP';

export class Controls {
    constructor() {
        this.addMouseMove();
        this.addMouseClicks();
        this.addPauseButton();
        this.addUnsetGameOverButton();
        this.disableRightClickMenu();
        this.shootInterval;
    }

    // Most event listeners have named functions are bound to them
    // because event listeners can't be removed if using anonymous functions.

    // MOUSE MOVEMENT
    // ****************************
    addMouseMove() {
        CANVAS.addEventListener('mousemove', (evt) => {
            // If the cursor moves beyond the canvas height or width, set the player's X or Y
            // to be equal to the canvas height or width to prevent going over the canvas limits
            game.player.x = evt.clientX;
            game.player.y = evt.clientY;

            if (game.player.y > CANVAS.height) {
                game.player.y = CANVAS.height;
            }
            if (game.player.x > CANVAS.width) {
                game.player.x = CANVAS.width;
            }
        });
    }

    // MOUSE CLICKS
    // ****************************
    addMouseClicks() {
        CANVAS.addEventListener('mousedown', this._mouseClicks); // SET LEFT-CLICK & RIGHT-CLICK
        CANVAS.addEventListener('mouseup', this._mouseClicksRelease); // SET LEFT-RELEASE & RIGHT-RELEASE
    }

    removeMouseClicks() {
        CANVAS.removeEventListener('mousedown', this._mouseClicks); // UNSET LEFT-CLICK & RIGHT-CLICK
    }

    _mouseClicks(evt) {
        // LEFT-CLICK
        if (evt.button === 0) {
            game.player.unsetShoot(); // unset first in case stuck to autoshooting by accident
            game.player.setShoot();
            if (!game.state.time) {
                game.state.startGame();
                // CANVAS.requestFullscreen();
            }
        }
        // RIGHT-CLICK
        if (evt.button === 2) {
            game.state.startSlowmo();
        }
    }

    _mouseClicksRelease(evt) {
        // LEFT-RELEASE
        if (evt.button === 0) {
            game.player.unsetShoot();
        }

        // RIGHT-RELEASE
        if (evt.button === 2) {
            game.state.stopSlowmo();
        }
    }

    // PAUSE BUTTON
    // ****************************
    addPauseButton() {
        document.addEventListener('keydown', this._pauseButton);
    }

    _pauseButton(evt) {
        if (evt.code === PAUSEBUTTON) {
            if (!game.state.over) {
                game.state.togglePause();
            } else {
                game.state.replay();
            }
        }
    }

    // UNSET GAMEOVER BUTTON
    // ****************************
    addUnsetGameOverButton() {
        document.addEventListener('keydown', this._unsetGameOverButton);
    }

    _unsetGameOverButton(evt) {
        if (evt.code === UNSETGAMEOVERBUTTON) {
            if (game.state.over) {
                game.state.unsetGameOver();
            }
        }
    }

    // DISABLE CANVAS RIGHT CLICK
    // ****************************
    disableRightClickMenu() {
        CANVAS.addEventListener('contextmenu', (evt) => {
            evt.preventDefault();
        });
    }
}
