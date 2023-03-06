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

export class HudGfx {
    static drawStageTimeCoin() {
        // Vertical Line
        game.scene.ctx.drawImage(VLINESPRITE, 4, 12);

        // Stage
        game.scene.ctx.drawImage(FLOPPYSPRITE, 10, 10);
        SceneUtils.drawText(`STAGE ${game.state.stage + 1}`, 31, 24, 25);

        // Time
        game.scene.ctx.drawImage(CLOCKSPRITE, 10, 30);
        if (!game.state.boss) {
            SceneUtils.drawText(getGametimeToMMSS(), 31, 44, 25);
        } else {
            SceneUtils.drawText(`BOSS FIGHT`, 31, 44, 25);
        }

        // Cash
        game.scene.ctx.drawImage(COINSPRITE, 10, 50);
        SceneUtils.drawText(game.cashcontroller.cash, 31, 64, 25);
    }

    static drawShieldWarning() {
        // Shield Warning
        if (!game.player.shield.isCharged()) {
            game.scene.ctx.drawImage(GLASSSHIELDDOWNSPRITE, 390, 5);
            SceneUtils.drawText(`RECHARGING ${game.player.shield.getCharge()}%`, 440, 42, 20);
        }
    }

    static drawShipmentProgressBar() {
        SceneUtils.drawText(`SHIPMENT PROGRESS`, 220, CANVAS.height - 26, 20);
        game.scene.ctx.drawImage(GLASSPACKAGESPRITE, 170, CANVAS.height - 36);
        game.scene.ctx.drawImage(GLASSBARSPRITE, 218, CANVAS.height - 23);
        SceneUtils.drawBar(
            223,
            CANVAS.height - 18,
            565,
            6,
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
