import { game, gameloop } from '../../../app.js';
import { OrangePackage } from '../../Actors/Packages/OrangePackage.js';
import { RedPackage } from '../../Actors/Packages/RedPackage.js';
import { Clock } from '../../Objects/Clock.js';
import { Shotgun } from '../../Objects/Shotgun.js';
import { SceneUtils } from '../../Scene/SceneUtils.js';
import { ItemActionController } from '../Controllers/ItemActionController.js';
import { ItemDropController } from '../Controllers/ItemDropController.js';
import { Controls } from '../Motion/Controls.js';

const UNSETGAMEOVERBUTTON = 'KeyP';
const DROPITEMBUTTON = 'KeyI';
const CLEARITEMSBUTTON = 'KeyC';
const STAGEBUTTONS = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5'];
const BOSSBUTTON = 'KeyB';
const REDPACKAGEBUTTON = 'KeyR';
const ORANGEPACKAGEBUTTON = 'KeyO';
const KILLENEMIESBUTTON = 'KeyK';
const TOGGLEWEATHERBUTTON = 'KeyW';

export class Debugging {
    static addDebuggingControls() {
        this.addUnsetGameOverButton();
        this.addItemDropButton();
        this.addLevelSelectButton();
        this.addBossButton();
        this.addClearItemsButton();
        this.addSpawnRedPackageButton();
        this.addSpawnOrangePackageButton();
        this.addKillEnemiesButton();
        this.addToggleWeatherButton();
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

    static addToggleWeatherButton() {
        document.addEventListener('keydown', (evt) => {
            if (evt.code === TOGGLEWEATHERBUTTON) {
                game.weathercontroller.toggleWeather();
            }
        });
    }

    static addBossButton() {
        document.addEventListener('keydown', (evt) => {
            if (evt.code === BOSSBUTTON) {
                this._warpToStage({ stage: game.state.stage, boss: true });
            }
        });
    }

    static addKillEnemiesButton() {
        document.addEventListener('keydown', (evt) => {
            if (evt.code === KILLENEMIESBUTTON) {
                game.enemies.clear();
            }
        });
    }

    static _warpToStage({ stage, boss }) {
        SceneUtils.flashScreen();
        SceneUtils.shakeScreen(3, 1);
        game.state.boss = false;
        game.state.stage = stage;
        game.state.time = boss ? 300 * stage + 290 : 300 * stage + 1;
        game.audiocontroller.rewindMusic();
        game.audiocontroller.updateMusic();
        game.weathercontroller.stopWeather();
        game.enemies.clear(true);
        game.firelasers.clear();
        game.bluelasers.clear();
        game.state.addStageNotification();
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

    static addSpawnRedPackageButton() {
        document.addEventListener('keydown', (evt) => {
            if (evt.code === REDPACKAGEBUTTON) {
                game.enemies.add(new RedPackage());
            }
        });
    }

    static addSpawnOrangePackageButton() {
        document.addEventListener('keydown', (evt) => {
            if (evt.code === ORANGEPACKAGEBUTTON) {
                game.enemies.add(new OrangePackage());
            }
        });
    }

    static addItemDropButton() {
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
                game.player.shotgun = new Shotgun();
            }
        });
    }
}
