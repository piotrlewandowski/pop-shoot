import { game, gameloop } from '../../../app.js';
import { RedPackage } from '../../Actors/Packages/RedPackage.js';
import { Clock } from '../../Objects/Clock.js';
import { SceneUtils } from '../../Scene/SceneUtils.js';
import { ItemActionController } from '../Controllers/ItemActionController.js';
import { ItemDropController } from '../Controllers/ItemDropController.js';
import { Controls } from '../Motion/Controls.js';

const UNSETGAMEOVERBUTTON = 'KeyP';
const DROPITEMBUTTON = 'KeyO';
const CLEARITEMSBUTTON = 'KeyI';
const STAGEBUTTONS = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5'];
const BOSSBUTTONS = ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT'];
const REDPACKAGEBUTTON = 'KeyU';

export class Debugging {
    static addDebuggingControls() {
        this.addUnsetGameOverButton();
        this.addItemDropButton();
        this.addLevelSelectButton();
        this.addBossSelectButton();
        this.addClearItemsButton();
        this.addSpawnRedpackageButton();
    }

    static addLevelSelectButton() {
        document.addEventListener('keydown', (evt) => {
            STAGEBUTTONS.forEach((button, index) => {
                if (evt.code === button) {
                    this._warpToStage({ stage: index, boss: false });
                }
            });
        });
    }

    static addBossSelectButton() {
        document.addEventListener('keydown', (evt) => {
            BOSSBUTTONS.forEach((button, index) => {
                if (evt.code === button) {
                    this._warpToStage({ stage: index, boss: true });
                }
            });
        });
    }

    static _warpToStage({ stage, boss }) {
        SceneUtils.flashScreen();
        SceneUtils.shakeScreen(3, 1);
        game.state.stage = stage;
        game.state.time = boss ? 300 * stage + 290 : 300 * stage + 1;
        game.audiocontroller.rewindMusic();
        game.audiocontroller.updateMusic();
        game.weathercontroller.stopWeather();
        game.enemies.clear(true);
        game.firelasers.clear();
        game.bluelasers.clear();
        game.state.boss = false;
    }

    static addUnsetGameOverButton() {
        document.addEventListener('keydown', (evt) => {
            if (evt.code === UNSETGAMEOVERBUTTON && game.state.over) {
                game.state.over = false;
                Controls.addMouseClicks();
                Controls.addPauseButton();
                game.firelasers.clear();
                game.bluelasers.clear();
                game.player.shield.charge = 100;
                window.requestAnimationFrame(gameloop);
                game.audiocontroller.updateMusic();
            }
        });
    }

    static addItemDropButton() {
        document.addEventListener('keydown', (evt) => {
            if (evt.code === REDPACKAGEBUTTON) {
                game.enemies.add(new RedPackage());
            }
        });
    }

    static addSpawnRedpackageButton() {
        document.addEventListener('keydown', (evt) => {
            if (evt.code === DROPITEMBUTTON) {
                game.itemdropcontroller.drop();
            }
        });
    }

    static addClearItemsButton() {
        document.addEventListener('keydown', (evt) => {
            if (evt.code === CLEARITEMSBUTTON) {
                game.itemdropcontroller = new ItemDropController();
                game.itemactioncontroller = new ItemActionController();
                game.player.clock = new Clock();
            }
        });
    }
}
