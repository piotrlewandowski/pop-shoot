import { SceneUtils } from './SceneUtils.js';
import { CANVAS } from '../Assets/Other.js';
import { HudGfx } from './Elements/HudGfx.js';
import { PlayerGfx } from './Elements/PlayerGfx.js';
import { BackgroundGfx } from './Elements/BackgroundGfx.js';
import { GameoverGfx } from './Elements/GameoverGfx.js';
import { MenuGfx } from './Elements/MenuGfx.js';
import { PauseGfx } from './Elements/PauseGfx.js';
import { EnemyGfx } from './Elements/EnemyGfx.js';
import { EntityGfx } from './Elements/EntityGfx.js';
import { game } from '../../app.js';

const CANVASWIDTH = 1000;
const RATIO = 16 / 9;

export class Scene {
    constructor() {
        // CANVAS SETUP
        CANVAS.width = CANVASWIDTH;
        CANVAS.height = CANVASWIDTH / RATIO;
        this.ctx = CANVAS.getContext('2d');

        // SCENE MODIFIERS
        this.bgScrollOffset = 0; // used by BackgroundGfx for parallax effect
        this.shake = 0; // used by SceneUtils.shakeScreen()
        this.flashscreen = 0; // used by SceneUtils.flashScreen()
    }

    clear() {
        this.ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
    }

    drawBackground() {
        BackgroundGfx.drawBack();
        BackgroundGfx.drawMid();
        BackgroundGfx.drawFront();
        BackgroundGfx.drawFog();
        BackgroundGfx.updateScrollOffset();
    }

    drawPlayer() {
        PlayerGfx.drawJetFlame();
        PlayerGfx.drawPlayer();
        PlayerGfx.drawShield();
    }

    drawEnemies() {
        game.enemies.liveEnemies.forEach((enemy) => {
            EnemyGfx.drawHealthbar(enemy);
            EnemyGfx.drawLightbeam(enemy);
            EnemyGfx.drawSprite(enemy);
        });
    }

    drawEntity(entity) {
        entity.forEach((entity) => {
            EntityGfx.draw(entity);
        });
    }

    drawMenu() {
        MenuGfx.draw();
    }

    drawGameOver() {
        GameoverGfx.drawGlass();
        SceneUtils.setShadow();
        GameoverGfx.drawStats();
        SceneUtils.unsetFilters();
    }

    drawPause() {
        PauseGfx.drawGlass();
        PauseGfx.drawItemsDescriptions();
    }

    drawHud() {
        HudGfx.drawStageTimeCash();
        HudGfx.drawShipmentProgressBar();
        HudGfx.drawShipmentNumber();
        HudGfx.drawItemsIcons();
        HudGfx.drawShieldWarning();
        HudGfx.drawBuffs();
        HudGfx.drawFlashScreen();
    }
}
