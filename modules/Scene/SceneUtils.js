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
