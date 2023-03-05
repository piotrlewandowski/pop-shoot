import { SceneUtils } from './SceneUtils.js';
import { CANVAS } from '../Assets/OtherGfx.js';
import { HudGfx } from './HudGfx.js';
import { PlayerGfx } from './PlayerGfx.js';
import { BackgroundGfx } from './BackgroundGfx.js';
import { GameoverGfx } from './GameoverGfx.js';
import { MenuGfx } from './MenuGfx.js';
import { PauseGfx } from './PauseGfx.js';
import { EnemyGfx } from './EnemyGfx.js';
import { game } from '../../app.js';
import { EntityGfx } from './EntityGfx.js';

// CANVAS
const CANVASWIDTH = 1000;
const RATIO = 16 / 9;

export class Scene {
    constructor() {
        CANVAS.width = CANVASWIDTH;
        CANVAS.height = CANVASWIDTH / RATIO;
        this.ctx = CANVAS.getContext('2d');
    }

    clear() {
        this.ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
    }

    drawBackground() {
        BackgroundGfx.drawBack();
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
        GameoverGfx.drawText();
        SceneUtils.unsetFilters();
    }

    drawPause() {
        PauseGfx.drawGlass();
        PauseGfx.drawItemsDescriptions();
    }

    drawHud() {
        HudGfx.drawStageTimeCoin();
        HudGfx.drawShipmentProgress();
        HudGfx.drawItemsIcons();
        HudGfx.drawShieldWarning();
        HudGfx.drawBuffs();
    }
}
