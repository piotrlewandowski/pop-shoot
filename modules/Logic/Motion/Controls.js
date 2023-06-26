import { game } from '../../../app.js';
import { CANVAS } from '../../Assets/Other.js';

const PAUSEBUTTON = 'Space';

const UP_ARROW = 'ArrowUp';
const DOWN_ARROW = 'ArrowDown';
const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';
const SHOOT_BUTTON = 'KeyS'; // Your actual key may vary
const SLOWMO_BUTTON = 'KeyD'; // Your actual key may vary

export class Controls {
    static addControls() {
        if (this.isMobileDevice()) {
            this.addTouchMovement();
            this.addTouchClicks();
        } else {
            this.addMouseMovement();
            this.addMouseClicks();
            this.addJoystickControls();
        }
        this.addPauseButton();
        this.disableRightClickMenu();
    }

    static isMobileDevice() {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      return isMobile;
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

    static addTouchMovement() {
        CANVAS.addEventListener('touchmove', this._touchMovement);
    }

    static removeTouchMovement() {
        CANVAS.removeEventListener('touchmove', this._touchMovement);
    }

    static addTouchClicks() {
        CANVAS.addEventListener('touchstart', this._touchClicks);
        CANVAS.addEventListener('touchend', this._touchClicksRelease);
    }

    static removeTouchClicks() {
        CANVAS.removeEventListener('touchstart', this._touchClicks);
        CANVAS.removeEventListener('touchend', this._touchClicksRelease);
    }

    static addJoystickControls() {
        document.addEventListener('keydown', this._joystickMovement);
        document.addEventListener('keyup', this._joystickButtonRelease);
    }

    static removeJoystickControls() {
        document.removeEventListener('keydown', this._joystickMovement);
        document.removeEventListener('keyup', this._joystickButtonRelease);
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

    static _touchMovement(evt) {
        const touch = evt.touches[0];
        if (touch) {
            const rect = CANVAS.getBoundingClientRect();
            const scaleX = CANVAS.width / rect.width;
            const scaleY = CANVAS.height / rect.height;
            game.player.x = (touch.clientX - rect.left) * scaleX;
            game.player.y = (touch.clientY - rect.top) * scaleY;
        }
    }

    static _touchClicks(evt) {
        evt.preventDefault();
        if (!game.state.time) {
            game.state.startGame();
            CANVAS.requestFullscreen();
        }
        game.player.unsetShoot();
        game.player.setShoot();
    }

    static _touchClicksRelease() {
        game.player.unsetShoot();
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

    static _joystickMovement(evt) {
        switch (evt.code) {
            case UP_ARROW:
                game.player.y = Math.max(game.player.y - 1, 0);
                break;
            case DOWN_ARROW:
                game.player.y = Math.min(game.player.y + 1, CANVAS.height);
                break;
            case LEFT_ARROW:
                game.player.x = Math.max(game.player.x - 1, 0);
                break;
            case RIGHT_ARROW:
                game.player.x = Math.min(game.player.x + 1, CANVAS.width);
                break;
            default:
                break;
        }
    }

    static _joystickButtonRelease(evt) {
        switch (evt.code) {
            case SHOOT_BUTTON:
                if (!game.state.time) {
                    game.state.startGame();
                    CANVAS.requestFullscreen();
                }
                game.player.unsetShoot(); // used to prevent stuck to autoshooting by accident
                game.player.setShoot();
                break;
            case SLOWMO_BUTTON:
                game.state.toggleSlowmo();
                break;
            default:
                break;
        }
    }
}