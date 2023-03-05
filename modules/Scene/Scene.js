import { DamageNumber } from '../Effects/Misc/DamageNumber.js';
import { SceneUtils } from './SceneUtils.js';
import { CANVAS } from '../Assets/OtherGfx.js';
import { SceneVariables } from './SceneVariables.js';
import { HudGfx } from './HudGfx.js';
import { PlayerGfx } from './PlayerGfx.js';
import { BackgroundGfx } from './BackgroundGfx.js';
import { GameoverGfx } from './GameoverGfx.js';
import { MenuGfx } from './MenuGfx.js';
import { PauseGfx } from './PauseGfx.js';
import { EnemyGfx } from './EnemyGfx.js';
import { game } from '../../app.js';

// CANVAS
const CANVASWIDTH = 1000;
const RATIO = 16 / 9;

export class Scene {
    constructor() {
        // Canvas
        this.canvas = CANVAS;
        this.canvas.width = CANVASWIDTH;
        this.canvas.height = CANVASWIDTH / RATIO;
        this.ctx = this.canvas.getContext('2d');

        // Background offset is used to scroll the background for parallax effect
        this.backgroundScrollOffset = 0;

        // Set by the shakeScreen helper function. Used for screen-shake effect
        this.shake = 0;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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

    // LASERS AND EFFECTS
    drawEntity(entity) {
        entity.forEach((entity) => {
            if (entity.constructor === DamageNumber) {
                SceneUtils.drawCenteredText(entity.text, entity.x, entity.y, SceneVariables.FONTMEDIUM);
            } else {
                this.ctx.drawImage(
                    entity.sprite,
                    SceneUtils.offsetCoordinates(entity).x,
                    SceneUtils.offsetCoordinates(entity).y
                );
            }
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
