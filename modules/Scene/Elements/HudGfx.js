import { game } from '../../../app.js';
import { RedPackage } from '../../Actors/Packages/RedPackage.js';
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
import { CANVAS } from '../../Assets/Other.js';
import { Coin } from '../../Effects/Misc/Coin.js';
import { getGametimeToMMSS } from '../../Logic/Helpers.js';
import { SceneUtils } from '../SceneUtils.js';

// STAGE, TIME & COIN (TOP-LEFT)

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

export class HudGfx {
    static drawStageTimeCash() {
        // Vertical Line
        game.scene.ctx.drawImage(VLINESPRITE, VLINE_X, VLINE_Y);

        // Stage
        game.scene.ctx.drawImage(FLOPPYSPRITE, FLOPPY_X, FLOPPY_Y);
        SceneUtils.drawText(`STAGE ${game.state.stage + 1}`, STAGE_X, STAGE_Y, STAGE_FONT);

        // Time
        game.scene.ctx.drawImage(CLOCKSPRITE, CLOCK_X, CLOCK_Y);
        if (!game.state.boss) {
            SceneUtils.drawText(getGametimeToMMSS(), TIME_X, TIME_Y, TIME_FONT);
        } else {
            SceneUtils.drawText(`BOSS FIGHT`, TIME_X, TIME_Y, TIME_FONT);
        }

        // Cash
        game.scene.ctx.drawImage(COINSPRITE, COIN_X, COIN_Y);
        SceneUtils.drawText(game.cashcontroller.cash, CASH_X, CASH_Y, CASH_FONT);
    }

    static drawShieldWarning() {
        // Shield Warning
        if (!game.player.shield.isCharged()) {
            game.scene.ctx.drawImage(GLASSSHIELDDOWNSPRITE, SHIELDWARNING_X, SHIELDWARNING_Y);
            SceneUtils.drawText(
                `RECHARGING ${game.player.shield.getCharge()}%`,
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
        game.scene.ctx.drawImage(GLASSNUMBERSPRITE, 796, CANVAS.height - 36);
        SceneUtils.drawText(`SHIPMENT #`, 706, CANVAS.height - 26, 20);
        SceneUtils.drawCenteredText(shipmentNo, 815, CANVAS.height - 17, 25);
    }

    static drawItemsIcons() {
        let iconXPosition = 170;
        const iconYPosition = CANVAS.height - 80;
        const iconGap = 45;

        game.itemcontroller.aquiredItems.forEach((item) => {
            game.scene.ctx.drawImage(item.icon, iconXPosition, iconYPosition);
            // Spray or DMG aquired more than once
            if (item.repeated > 1) {
                SceneUtils.drawCenteredText(`x${item.repeated}`, iconXPosition + 18, iconYPosition - 2, 20);
            }
            // Clock status
            if (item.name === 'clock') {
                SceneUtils.drawCenteredText(
                    game.player.clock.active ? '!' : game.player.clock.countdown > 0 ? game.player.clock.countdown : '',
                    iconXPosition + 18,
                    iconYPosition - 2,
                    20
                );
            }
            iconXPosition += iconGap;
        });
    }

    static drawBuffs() {
        // Buffs
        if (game.buffcontroller.activeBuff) {
            SceneUtils.drawCenteredText(game.buffcontroller.activeBuff.text, 500, 440, 40);
            SceneUtils.drawCenteredText(`${game.buffcontroller.countdown} SECONDS REMAINING`, 500, 460, 30);
        }
    }
}
