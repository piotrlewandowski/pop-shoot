import { game } from '../../app.js';
import { DamageNumber } from '../Effects/Misc/DamageNumber.js';
import { SceneUtils } from './SceneUtils.js';
import { getGametimeToMMSS } from '../Logic/Helpers.js';
import {
    CANVAS,
    FOG,
    FOGGREEN,
    MENU,
    S0BACK,
    S0FRONT,
    S1BACK,
    S1FRONT,
    S2BACK,
    S2FRONT,
    S3BACK,
    S3FRONT,
    S4BACK,
    S4FRONT,
} from '../Assets/OtherGfx.js';
import {
    GLASSBARSPRITE,
    GLASSPAUSESPRITE,
    GLASSSHIELDDOWNSPRITE,
    GLASSGAMEOVERSPRITE,
    COINSPRITE,
    CLOCKSPRITE,
    FLOPPYSPRITE,
    VLINESPRITE,
    GLASSPACKAGESPRITE,
    GLASSNUMBERSPRITE,
} from '../Assets/Hud.js';
import { SHIELDINVINCIBILITYSPRITE } from '../Assets/Player.js';
import { WeatherController } from '../Logic/Controllers/WeatherController.js';
import { BLACKSCREENSPRITE, HIEROGLYPHSPRITE, LIGHTBEAMSPRITE } from '../Assets/Effects.js';
import { Vortex } from '../Effects/Weather/Vortex.js';
import { Coin } from '../Effects/Misc/Coin.js';
import { RedPackage } from '../Actors/Packages/RedPackage.js';

// CANVAS
const CANVASWIDTH = 1000;
const RATIO = 16 / 9;

// FONTS
const FONTSMALL = '20px thaleahfatmedium';
const FONTSMALLMEDIUM = '25px thaleahfatmedium';
const FONTMEDIUM = '30px thaleahfatmedium';
const FONTLARGE = '40px thaleahfatmedium';
const FONTXLARGE = '60px thaleahfatmedium';

// BACKGROUNDS
const BACKGROUNDS = {
    stage0: { back: S0BACK, front: S0FRONT },
    stage1: { back: S1BACK, front: S1FRONT },
    stage2: { back: S2BACK, front: S2FRONT },
    stage3: { back: S3BACK, front: S3FRONT },
    stage4: { back: S4BACK, front: S4FRONT },
};

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
        const backgroundback = BACKGROUNDS[`stage${game.state.stage}`].back;
        const backgroundfront = BACKGROUNDS[`stage${game.state.stage}`].front;

        // BACKPART - Parallax Effect

        // Draw stars
        this.ctx.drawImage(backgroundback, this.backgroundScrollOffset + this.shake, this.shake);
        this.ctx.drawImage(backgroundback, this.backgroundScrollOffset + backgroundback.width + this.shake, this.shake);

        // Reset the offset in case the background reaches the end while scrolling
        if (this.backgroundScrollOffset <= -backgroundback.width) {
            this.backgroundScrollOffset = 0;
        }

        // BACKPART - Darkness
        if (WeatherController.darknessActive) {
            this.ctx.drawImage(BLACKSCREENSPRITE, 0, 0);
        }

        // FRONTPART - Draw the front part of the background
        this.ctx.drawImage(backgroundfront, this.shake, this.shake);
        if (WeatherController.weatherActive.constructor === Vortex) {
            this.ctx.drawImage(HIEROGLYPHSPRITE, this.shake, this.shake);
        }

        // LOGIC - Slow the stars & draw the fog during slowmo
        const fogtype = game.state.variables.toxic ? FOGGREEN : FOG;
        if (game.state.slowmo || !game.state.time || game.player.clock.active) {
            this.ctx.drawImage(fogtype, -this.backgroundScrollOffset - backgroundback.width, 0);
            this.ctx.drawImage(fogtype, -this.backgroundScrollOffset, 0);
            this.backgroundScrollOffset -= game.state.variables.slowmorate;
        } else {
            this.backgroundScrollOffset -= 3;
        }
    }

    drawPlayer() {
        // Glitch offset used by matrix weather
        const glitchOffset = WeatherController.glitchOffset;

        // JET FLAME
        if (game.player.slowmogauge.charge > 15) {
            this.ctx.drawImage(
                game.player.flame.sprite,
                SceneUtils.offsetCoordinates(game.player.flame).x + glitchOffset.x,
                SceneUtils.offsetCoordinates(game.player.flame).y + glitchOffset.y
            );
        }

        // PLAYER
        this.ctx.drawImage(
            game.player.sprite,
            SceneUtils.offsetCoordinates(game.player).x + glitchOffset.x,
            SceneUtils.offsetCoordinates(game.player).y + glitchOffset.y
        );

        // SHIELD
        if (game.player.shield.isCharged() && !game.state.variables.invincibility) {
            game.player.shield.sprite.forEach((sprite) =>
                this.ctx.drawImage(
                    sprite,
                    SceneUtils.offsetCoordinates(game.player).x + glitchOffset.x,
                    SceneUtils.offsetCoordinates(game.player).y + glitchOffset.y
                )
            );
        }
        if (game.state.variables.invincibility) {
            this.ctx.drawImage(
                SHIELDINVINCIBILITYSPRITE,
                SceneUtils.offsetCoordinates(game.player).x + glitchOffset.x,
                SceneUtils.offsetCoordinates(game.player).y + glitchOffset.y
            );
        }

        // BUFFS
        if (game.state.variables.mute) {
            SceneUtils.drawText(
                'X',
                game.player.x - 5 + glitchOffset.x,
                game.player.y - 15 + glitchOffset.y,
                FONTSMALL
            );
        }
        if (game.buffcontroller.remainingTime) {
            SceneUtils.drawCenteredText(game.buffcontroller.text, 500, 440, FONTLARGE);
            SceneUtils.drawCenteredText(`${game.buffcontroller.remainingTime} SECONDS REMAINING`, 500, 460, FONTMEDIUM);
        }
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
                SceneUtils.drawBigBar(690, 10, 296, 11, hitPercentage);
                SceneUtils.drawText(enemy.name, 690, 40, FONTMEDIUM);
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
                return SceneUtils.drawText(entity.text, entity.x, entity.y, FONTMEDIUM);
            }
            this.ctx.drawImage(
                entity.sprite,
                SceneUtils.offsetCoordinates(entity).x,
                SceneUtils.offsetCoordinates(entity).y
            );
        });
    }

    drawMenu() {
        this.ctx.drawImage(MENU, 0, 0);
    }

    drawGameOver() {
        this.ctx.drawImage(GLASSGAMEOVERSPRITE, 320, 205);
        this.ctx.filter = 'drop-shadow(1px 1px 0 black)';
        SceneUtils.drawText(`GAMEOVER !`, 370, 245, FONTXLARGE);
        SceneUtils.drawText(`YOU SURVIVED ${getGametimeToMMSS()} MINUTES`, 330, 270, FONTMEDIUM);
        SceneUtils.drawText(`YOU DIED AT STAGE ${game.state.stage + 1}`, 380, 290, FONTMEDIUM);
        SceneUtils.drawText(`EARNED CASH: ${game.cashcontroller.cash}`, 405, 310, FONTMEDIUM);
        SceneUtils.drawText(`PRESS SPACE TO REPLAY`, 355, 340, FONTMEDIUM);
        this.ctx.filter = 'none';
    }

    drawPause() {
        // PAUSE SPRITE
        this.ctx.drawImage(GLASSPAUSESPRITE, 360, 125);

        // ITEMS DESCRIPTIONS
        const numberOfRows = 4;
        const verticalGap = 50;
        const horizontalGap = 220;
        const startingX = 75;
        const startingY = 165;
        let x = startingX;
        let y = startingY;

        for (let i = 0; i < game.itemcontroller.descriptions.length; i++) {
            if (i % numberOfRows === 0) {
                x = startingX;
                y += verticalGap;
            }
            this.ctx.drawImage(game.itemcontroller.descriptions[i], x, y);
            x += horizontalGap;
        }
    }

    drawHud() {
        // ---------------
        // LEFT - TOP
        // ---------------

        // Stage & Time
        this.ctx.drawImage(VLINESPRITE, 4, 12);
        this.ctx.drawImage(FLOPPYSPRITE, 10, 10);
        SceneUtils.drawText(`STAGE ${game.state.stage + 1}`, 31, 24, FONTSMALLMEDIUM);

        this.ctx.drawImage(CLOCKSPRITE, 10, 30);
        if (!game.state.boss) {
            SceneUtils.drawText(getGametimeToMMSS(), 31, 44, FONTSMALLMEDIUM);
        } else {
            SceneUtils.drawText(`BOSS FIGHT`, 31, 44, FONTSMALLMEDIUM);
        }

        // Cash
        this.ctx.drawImage(COINSPRITE, 10, 50);
        SceneUtils.drawText(game.cashcontroller.cash, 31, 64, FONTSMALLMEDIUM);

        // ---------------
        // MIDDLE - BOTTOM
        // ---------------

        // UPGRADES ICONS
        const dmgPos = game.state.variables.dmgIconPosition;
        const dmgStacked = game.state.variables.dmgMultiplier > 1.5;

        const sprayPos = game.state.variables.sprayIconPosition;
        const sprayStacked = game.state.variables.spray > 1;

        const clockPos = game.state.variables.clockIconPosition;
        const clockReady = game.player.clock.ready;
        const clockChargePositive = game.player.clock.currentCharge > 0;

        let iconXPosition = 170;
        const iconYPosition = CANVAS.height - 80;
        const iconTextYPosition = CANVAS.height - 83;
        const iconGap = 45;

        for (let i = 0; i < game.itemcontroller.icons.length; i++) {
            // This loop will draw the aquired upgrades icons.
            // In case of repetitive items or items with timers,
            // it will check if additional text should be drawn above the icon, and draw it.
            // e.g multiply-damage or spray is stacked, or cosmic-clock is recharging
            if (i === clockPos && !clockReady && clockChargePositive) {
                SceneUtils.drawText(
                    `${game.player.clock.currentCharge}`,
                    iconXPosition + 9,
                    iconTextYPosition,
                    FONTSMALL
                );
            }
            if (i === dmgPos && dmgStacked) {
                SceneUtils.drawText(
                    `x${(game.state.variables.dmgMultiplier - 1) * 2}`,
                    iconXPosition + 9,
                    iconTextYPosition,
                    FONTSMALL
                );
            }
            if (i === sprayPos && sprayStacked) {
                SceneUtils.drawText(`x${game.state.variables.spray}`, iconXPosition + 9, iconTextYPosition, FONTSMALL);
            }
            // Draw icon
            this.ctx.drawImage(game.itemcontroller.icons[i], iconXPosition, iconYPosition);
            iconXPosition += iconGap;
        }

        // SHIPMENT-PROGRESS BAR

        // Airplane, Glassbar & "Shipment Progress" text
        this.ctx.drawImage(GLASSPACKAGESPRITE, 170, CANVAS.height - 36);
        this.ctx.drawImage(GLASSBARSPRITE, 218, CANVAS.height - 23);
        SceneUtils.drawText(`SHIPMENT PROGRESS`, 220, CANVAS.height - 26, FONTSMALL);

        // Glassbar filling
        // Change fill-color to yellow exceptionally if the progress bar is blinking during coin pickup
        SceneUtils.drawBar(
            223,
            CANVAS.height - 18,
            565,
            6,
            game.cashcontroller.levelBarPercentage,
            Coin.blinking ? SceneUtils.YELLOW : SceneUtils.WHITE
        );

        // Shipment Number
        const shipmentNo =
            RedPackage.count > 0 || game.cashcontroller.shipmentnumber > 99 ? '!' : game.cashcontroller.shipmentnumber;
        this.ctx.drawImage(GLASSNUMBERSPRITE, 796, CANVAS.height - 36);
        SceneUtils.drawText(`SHIPMENT #`, 706, CANVAS.height - 26, FONTSMALL);
        SceneUtils.drawCenteredText(shipmentNo, 815, CANVAS.height - 17, FONTSMALLMEDIUM);

        // ---------------
        // MIDDLE - TOP
        // ---------------

        // Shield Warning
        if (!game.player.shield.isCharged()) {
            this.ctx.drawImage(GLASSSHIELDDOWNSPRITE, 390, 5);
            SceneUtils.drawText(`RECHARGING ${game.player.shield.getCharge()}%`, 440, 42, FONTSMALL);
        }
    }
}
