import { game } from '../../../app.js';
import { RedPackage } from '../../Actors/Packages/RedPackage.js';
import { WHITESCREENSPRITE } from '../../Assets/Effects.js';
import {
    CLOCKSPRITE,
    COINSPRITE,
    FLOPPYSPRITE,
    GLASSBARSPRITE,
    GLASSNUMBERSPRITE,
    GLASSPACKAGESPRITE,
    GLASSSHIELDDOWNSPRITE,
    VLINESPRITE,
} from '../../Assets/Hud.js';
import { Coin } from '../../Effects/Misc/Coin.js';
import { getGametimeToMMSS } from '../../Logic/Helpers.js';
import { SceneUtils } from '../SceneUtils.js';

// STAGE, TIME & COIN
// Vertical Line
const VLINE_X = 4;
const VLINE_Y = 12;

// Stage
const FLOPPY_X = 10;
const FLOPPY_Y = 10;
const STAGE_X = 31;
const STAGE_Y = 24;
const STAGE_FONT = 25;

// Time
const CLOCK_X = 10;
const CLOCK_Y = 30;
const TIME_X = 31;
const TIME_Y = 44;
const TIME_FONT = 25;

// Cash
const COIN_X = 10;
const COIN_Y = 50;
const CASH_X = 31;
const CASH_Y = 64;
const CASH_FONT = 25;

// SHIELD WARNING
const SHIELDWARNING_X = 390;
const SHIELDWARNING_Y = 5;
const SHIELDRECHARGING_X = 440;
const SHIELDRECHARGING_Y = 42;
const SHIELDRECHARGING_FONT = 20;

// SHIPMENT PROGRESS
const SPTEXT_X = 220;
const SPTEXT_Y = 536;
const SPAIRPLANE_X = 170;
const SPAIRPLANE_Y = 526;
const SPGLASSBAR_X = 218;
const SPGLASSBAR_Y = 539;
const SPBAR_X = 223;
const SPBAR_Y = 544;
const SPBAR_WIDTH = 565;
const SPBAR_HEIGHT = 6;
const SP_FONT = 20;

// SHIPMENT NUMBER
const SNGLASS_X = 796;
const SNGLASS_Y = 526;
const SNTEXT_X = 706;
const SNTEXT_Y = 536;
const SNNUMBER_X = 815;
const SNNUMBER_Y = 545;
const SNNUMBER_FONT = 25;
const SNTEXT_FONT = 20;

// BUFFS
const BUFFNAME_X = 500;
const BUFFNAME_Y = 440;
const BUFFNAME_FONT = 40;
const BUFFTIME_X = 500;
const BUFFTIME_Y = 460;
const BUFFTIME_FONT = 30;

// ICONS
const ICON_STARTINGX = 170;
const ICON_Y = 482;
const ICONTEXT_Y = 480;
const ICONTEXT_FONT = 20;
const ICONTEXT_SHIFT = 18; // Text above dmg, spray & clock should be shifted to be aligned with the icon
const ICON_GAP = 45;
const SHOTGUNBAR_Y = 475;
const SHOTGUNBAR_X_OFFSET = 3;
const SHOTGUNBAR_WIDTH = 29;
const SHOTGUNBAR_HEIGHT = 2;

export class HudGfx {
    static drawStageTimeCash() {
        // vertical line
        game.scene.ctx.drawImage(VLINESPRITE, VLINE_X, VLINE_Y);

        // stage
        game.scene.ctx.drawImage(FLOPPYSPRITE, FLOPPY_X, FLOPPY_Y);
        SceneUtils.drawText(`STAGE ${game.state.stage + 1}`, STAGE_X, STAGE_Y, STAGE_FONT);

        // time
        game.scene.ctx.drawImage(CLOCKSPRITE, CLOCK_X, CLOCK_Y);
        if (!game.state.boss) {
            SceneUtils.drawText(getGametimeToMMSS(), TIME_X, TIME_Y, TIME_FONT);
        } else {
            SceneUtils.drawText(`BOSS FIGHT`, TIME_X, TIME_Y, TIME_FONT);
        }

        // cash
        game.scene.ctx.drawImage(COINSPRITE, COIN_X, COIN_Y);
        SceneUtils.drawText(game.cashcontroller.cash, CASH_X, CASH_Y, CASH_FONT);
    }

    static drawShieldWarning() {
        if (!game.player.shield.isCharged()) {
            game.scene.ctx.drawImage(GLASSSHIELDDOWNSPRITE, SHIELDWARNING_X, SHIELDWARNING_Y);
            SceneUtils.drawText(
                `RECHARGING ${game.player.shield.currentCharge}%`,
                SHIELDRECHARGING_X,
                SHIELDRECHARGING_Y,
                SHIELDRECHARGING_FONT
            );
        }
    }

    static drawShipmentProgressBar() {
        SceneUtils.drawText(`SHIPMENT PROGRESS`, SPTEXT_X, SPTEXT_Y, SP_FONT);
        game.scene.ctx.drawImage(GLASSPACKAGESPRITE, SPAIRPLANE_X, SPAIRPLANE_Y);
        game.scene.ctx.drawImage(GLASSBARSPRITE, SPGLASSBAR_X, SPGLASSBAR_Y),
            SceneUtils.drawBar(
                SPBAR_X,
                SPBAR_Y,
                SPBAR_WIDTH,
                SPBAR_HEIGHT,
                game.cashcontroller.levelBarPercentage,
                Coin.blinking ? 1 : 0
            );
    }

    static drawShipmentNumber() {
        const shipmentNo =
            RedPackage.count > 0 || game.cashcontroller.shipmentnumber > 99 ? '!' : game.cashcontroller.shipmentnumber;
        game.scene.ctx.drawImage(GLASSNUMBERSPRITE, SNGLASS_X, SNGLASS_Y);
        SceneUtils.drawText(`SHIPMENT #`, SNTEXT_X, SNTEXT_Y, SNTEXT_FONT);
        SceneUtils.drawCenteredText(shipmentNo, SNNUMBER_X, SNNUMBER_Y, SNNUMBER_FONT);
    }

    static drawItemsIcons() {
        let currentx = ICON_STARTINGX;

        game.itemdropcontroller.aquiredItems.forEach((item) => {
            game.scene.ctx.drawImage(item.icon, currentx, ICON_Y);
            // spray or dmg aquired more than once
            if (item.repeated) {
                SceneUtils.drawCenteredText(
                    `x${item.repeated + 1}`,
                    currentx + ICONTEXT_SHIFT,
                    ICONTEXT_Y,
                    ICONTEXT_FONT
                );
            }
            // clock status
            if (item.name === 'clock') {
                SceneUtils.drawCenteredText(
                    game.player.clock.active ? '!' : game.player.clock.isReady ? '' : game.player.clock.countdown,
                    currentx + ICONTEXT_SHIFT,
                    ICONTEXT_Y,
                    ICONTEXT_FONT
                );
            }
            // shotgun
            if (item.name === 'shotgun') {
                SceneUtils.drawBigBar(
                    currentx + SHOTGUNBAR_X_OFFSET,
                    SHOTGUNBAR_Y,
                    SHOTGUNBAR_WIDTH,
                    SHOTGUNBAR_HEIGHT,
                    game.player.shotgun.chargeRatio
                );
            }
            currentx += ICON_GAP;
        });
    }

    static drawBuffs() {
        if (game.buffcontroller.activeBuff) {
            SceneUtils.drawCenteredText(game.buffcontroller.activeBuff.text, BUFFNAME_X, BUFFNAME_Y, BUFFNAME_FONT);
            SceneUtils.drawCenteredText(
                `${game.buffcontroller.countdown} SECONDS REMAINING`,
                BUFFTIME_X,
                BUFFTIME_Y,
                BUFFTIME_FONT
            );
        }
    }

    static drawFlashScreen() {
        if (game.scene.flashscreen) {
            game.scene.ctx.drawImage(WHITESCREENSPRITE, 0, 0);
        }
    }
}
