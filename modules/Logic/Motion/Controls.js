import { game } from '../../../app.js';
import { CANVAS } from '../../Assets/Other.js';

const PAUSEBUTTON = 'Space';

export class Controls {
    static addControls() {
        this.addMouseMovement();
        this.addMouseClicks();
        this.addPauseButton();
        this.disableRightClickMenu();
    }

    // EVENTS

    static addMouseMovement() {
        CANVAS.addEventListener('mousemove', this._mouseMovement);
    }

    static removeMouseMovement() {
        CANVAS.removeEventListener('mousemove', this._mouseMovement);
    }

    static addMouseClicks() {
        CANVAS.addEventListener('mousedown', this._mouseClicks);
        CANVAS.addEventListener('mouseup', this._mouseClicksRelease);
    }

    static removeMouseClicks() {
        CANVAS.removeEventListener('mousedown', this._mouseClicks);
    }

    static addPauseButton() {
        document.addEventListener('keydown', this._pauseButton);
    }

    static disableRightClickMenu() {
        CANVAS.addEventListener('contextmenu', (evt) => {
            evt.preventDefault();
        });
    }

    // FUNCTIONS

    static _mouseMovement(evt) {
        game.player.x = evt.clientX > CANVAS.width ? CANVAS.width : evt.clientX;
        game.player.y = evt.clientY > CANVAS.height ? CANVAS.height : evt.clientY;
    }
    static _mouseClicks(evt) {
        // left
        if (evt.button === 0) {
            if (!game.state.time) {
                game.state.startGame();
                CANVAS.requestFullscreen();
            }
            game.player.unsetShoot(); // used to prevent stuck to autoshooting by accident
            game.player.setShoot();
        }

        // right
        if (evt.button === 2) {
            game.state.startSlowmo();
        }
    }

    static _mouseClicksRelease(evt) {
        // left
        if (evt.button === 0) {
            game.player.unsetShoot();
        }

        // right
        if (evt.button === 2) {
            game.state.stopSlowmo();
        }
    }

    static _pauseButton(evt) {
        if (evt.code === PAUSEBUTTON) {
            if (!game.state.over) {
                game.state.togglePause();
            } else {
                game.state.replay();
            }
        }
    }
}
