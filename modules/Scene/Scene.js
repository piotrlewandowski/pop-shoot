import { game } from '../../app.js';
import { DamageNumber } from '../Effects/Misc/DamageNumber.js';
import { SceneUtils } from './SceneUtils.js';
import { CANVAS, MENU } from '../Assets/OtherGfx.js';
import { GLASSPAUSESPRITE } from '../Assets/Hud.js';
import { LIGHTBEAMSPRITE } from '../Assets/Effects.js';
import { RedPackage } from '../Actors/Packages/RedPackage.js';
import { SceneVariables } from './SceneVariables.js';
import { HudGfx } from './HudGfx.js';
import { PlayerGfx } from './PlayerGfx.js';
import { BackgroundGfx } from './BackgroundGfx.js';
import { GameoverGfx } from './GameoverGfx.js';

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
            // Setup
            const isBoss = enemy.name;
            const isHit = enemy.hitRatio !== 1;
            const isRedPackage = enemy.constructor === RedPackage;

            // Healthbar - Normal Enemy
            if (isHit && !isBoss) {
                SceneUtils.drawBar(
                    enemy.x - enemy.sprite.width / 2,
                    enemy.y - enemy.sprite.height / 1.25,
                    enemy.sprite.width,
                    1.5,
                    enemy.hitRatio
                );
            }

            // Healthbar - Boss
            if (isBoss) {
                SceneUtils.drawBigBar(690, 10, 296, 11, enemy.hitRatio);
                SceneUtils.drawText(enemy.name, 690, 40, SceneVariables.FONTMEDIUM);
            }

            // Lightbeam - Only if enemy is a RedPackage
            if (isRedPackage) {
                this.ctx.drawImage(LIGHTBEAMSPRITE, enemy.x - LIGHTBEAMSPRITE.width / 2, 0);
            }

            // Enemy Sprite
            this.ctx.drawImage(
                enemy.sprite,
                SceneUtils.offsetCoordinates(enemy).x,
                SceneUtils.offsetCoordinates(enemy).y
            );
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
        this.ctx.drawImage(MENU, 0, 0);
    }

    drawGameOver() {
        GameoverGfx.drawGlass();
        SceneUtils.setShadow();
        GameoverGfx.drawText();
        SceneUtils.unsetFilters();
    }

    drawPause() {
        this.ctx.drawImage(GLASSPAUSESPRITE, 360, 125);
        SceneUtils.drawItemsDescriptions();
    }

    drawHud() {
        HudGfx.drawStageTimeCoin();
        HudGfx.drawShipmentProgress();
        HudGfx.drawItemsIcons();
        HudGfx.drawShieldWarning();
        HudGfx.drawBuffs();
    }
}
