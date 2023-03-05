import { game } from '../../app.js';
import { SceneVariables } from './SceneVariables.js';

export class SceneUtils {
    // Draw big bar such as the level bar & boss healthbar
    static drawBigBar(x, y, width, height, ratio) {
        SceneUtils.setColor(SceneVariables.WHITE);
        game.scene.ctx.beginPath();
        game.scene.ctx.rect(x, y, width * ratio, height);
        game.scene.ctx.fill();
        game.scene.ctx.beginPath();
        game.scene.ctx.rect(x - 2, y - 2, width + 4, height + 4);
        game.scene.ctx.stroke();
    }

    // Draw bar such as the one above enemies
    static drawBar(x, y, width, height, ratio, color) {
        SceneUtils.setColor(color || SceneVariables.WHITE);
        game.scene.ctx.beginPath();
        game.scene.ctx.rect(x, y, width * ratio, height);
        game.scene.ctx.fill();
    }

    static drawText(text, x, y, font) {
        SceneUtils.setColor(SceneVariables.WHITE);
        game.scene.ctx.textAlign = 'left';
        game.scene.ctx.font = font;
        game.scene.ctx.fillText(text, x, y);
    }

    static drawCenteredText(text, x, y, font) {
        SceneUtils.setColor(SceneVariables.WHITE);
        game.scene.ctx.textAlign = 'center';
        game.scene.ctx.font = font;
        game.scene.ctx.fillText(text, x, y);
    }

    static setColor(color) {
        game.scene.ctx.fillStyle = color;
        game.scene.ctx.strokeStyle = color;
    }

    static setShadow() {
        game.scene.ctx.filter = 'drop-shadow(1px 1px 0 black)';
    }

    static unsetFilters() {
        game.scene.ctx.filter = 'none';
    }

    static drawItemsDescriptions() {
        const numberOfRows = 4;
        const verticalGap = 50;
        const horizontalGap = 220;
        const startingX = 75;
        const startingY = 165;
        let currentX = startingX;
        let currentY = startingY;

        for (let i = 0; i < game.itemcontroller.descriptions.length; i++) {
            // For each new line, return X to its original left position
            // and shift Y down according to verticalGap
            if (i % numberOfRows === 0) {
                currentX = startingX;
                currentY += verticalGap;
            }
            // Draw then shift X right according to horizontalGap
            game.scene.ctx.drawImage(game.itemcontroller.descriptions[i], currentX, currentY);
            currentX += horizontalGap;
        }
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
        const iconYPosition = game.scene.canvas.height - 80;
        const iconTextYPosition = game.scene.canvas.height - 83;
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

    // Canvas.drawImage draws an image starting from the top-left corner of the image,
    // making the x,y coordinates represent the top-left corner. This functions offsets
    // the coordinates so that x,y represent the center of the image.
    static offsetCoordinates(entity) {
        if (entity.sprite.constructor === Array) {
            return { x: entity.x - entity.sprite[0].width / 2, y: entity.y - entity.sprite[0].height / 2 };
        }
        return { x: entity.x - entity.sprite.width / 2, y: entity.y - entity.sprite.height / 2 };
    }
}
