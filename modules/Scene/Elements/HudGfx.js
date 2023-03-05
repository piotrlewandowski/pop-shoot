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
import { WeatherController } from '../../Logic/Controllers/WeatherController.js';
import { getGametimeToMMSS } from '../../Logic/Helpers.js';
import { SceneUtils } from '../SceneUtils.js';
import { SceneVariables } from '../SceneVariables.js';

export class HudGfx {
    static drawStageTimeCoin() {
        // Vertical Line
        game.scene.ctx.drawImage(VLINESPRITE, 4, 12);

        // Stage
        game.scene.ctx.drawImage(FLOPPYSPRITE, 10, 10);
        SceneUtils.drawText(`STAGE ${game.state.stage + 1}`, 31, 24, SceneVariables.FONTSMALLMEDIUM);

        // Time
        game.scene.ctx.drawImage(CLOCKSPRITE, 10, 30);
        if (!game.state.boss) {
            SceneUtils.drawText(getGametimeToMMSS(), 31, 44, SceneVariables.FONTSMALLMEDIUM);
        } else {
            SceneUtils.drawText(`BOSS FIGHT`, 31, 44, SceneVariables.FONTSMALLMEDIUM);
        }

        // Cash
        game.scene.ctx.drawImage(COINSPRITE, 10, 50);
        SceneUtils.drawText(game.cashcontroller.cash, 31, 64, SceneVariables.FONTSMALLMEDIUM);
    }

    static drawShieldWarning() {
        // Shield Warning
        if (!game.player.shield.isCharged()) {
            game.scene.ctx.drawImage(GLASSSHIELDDOWNSPRITE, 390, 5);
            SceneUtils.drawText(`RECHARGING ${game.player.shield.getCharge()}%`, 440, 42, SceneVariables.FONTSMALL);
        }
    }

    static drawShipmentProgress() {
        // Shipment Progress Bar
        SceneUtils.drawText(`SHIPMENT PROGRESS`, 220, CANVAS.height - 26, SceneVariables.FONTSMALL);
        game.scene.ctx.drawImage(GLASSPACKAGESPRITE, 170, CANVAS.height - 36);
        game.scene.ctx.drawImage(GLASSBARSPRITE, 218, CANVAS.height - 23);
        SceneUtils.drawBar(
            223,
            CANVAS.height - 18,
            565,
            6,
            game.cashcontroller.levelBarPercentage,
            Coin.blinking ? SceneVariables.YELLOW : SceneVariables.WHITE
        );

        // Shipment Number
        const shipmentNo =
            RedPackage.count > 0 || game.cashcontroller.shipmentnumber > 99 ? '!' : game.cashcontroller.shipmentnumber;
        game.scene.ctx.drawImage(GLASSNUMBERSPRITE, 796, CANVAS.height - 36);
        SceneUtils.drawText(`SHIPMENT #`, 706, CANVAS.height - 26, SceneVariables.FONTSMALL);
        SceneUtils.drawCenteredText(shipmentNo, 815, CANVAS.height - 17, SceneVariables.FONTSMALLMEDIUM);
    }

    static drawItemsIcons() {
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
                    SceneVariables.FONTSMALL
                );
            }
            if (i === dmgPos && dmgStacked) {
                SceneUtils.drawText(
                    `x${(game.state.variables.dmgMultiplier - 1) * 2}`,
                    iconXPosition + 9,
                    iconTextYPosition,
                    SceneVariables.FONTSMALL
                );
            }
            if (i === sprayPos && sprayStacked) {
                SceneUtils.drawText(
                    `x${game.state.variables.spray}`,
                    iconXPosition + 9,
                    iconTextYPosition,
                    SceneVariables.FONTSMALL
                );
            }
            // Draw icon
            game.scene.ctx.drawImage(game.itemcontroller.icons[i], iconXPosition, iconYPosition);
            iconXPosition += iconGap;
        }
    }

    static drawBuffs() {
        // Buffs
        if (game.state.variables.mute) {
            SceneUtils.drawText(
                'X',
                game.player.x - 5 + WeatherController.glitchOffset.x,
                game.player.y - 15 + WeatherController.glitchOffset.y,
                SceneVariables.FONTSMALL
            );
        }
        if (game.buffcontroller.remainingTime) {
            SceneUtils.drawCenteredText(game.buffcontroller.text, 500, 440, SceneVariables.FONTLARGE);
            SceneUtils.drawCenteredText(
                `${game.buffcontroller.remainingTime} SECONDS REMAINING`,
                500,
                460,
                SceneVariables.FONTMEDIUM
            );
        }
    }
}
