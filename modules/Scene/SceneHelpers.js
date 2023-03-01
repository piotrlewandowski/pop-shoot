import { game } from '../../app.js';

export class SceneHelpers {
    // Draw big bar such as the level bar & boss healthbar
    static drawBigBar(x, y, width, height, ratio) {
        game.scene.ctx.beginPath();
        game.scene.ctx.rect(x, y, width * ratio, height);
        game.scene.ctx.fill();
        game.scene.ctx.beginPath();
        game.scene.ctx.rect(x - 2, y - 2, width + 4, height + 4);
        game.scene.ctx.stroke();
    }

    // Draw bar such as the one above enemies
    static drawBar(x, y, width, height, ratio) {
        game.scene.ctx.beginPath();
        game.scene.ctx.rect(x, y, width * ratio, height);
        game.scene.ctx.fill();
    }

    static drawText(text, x, y, font) {
        game.scene.ctx.textAlign = 'left';
        game.scene.ctx.font = font;
        game.scene.ctx.fillText(text, x, y);
    }

    static drawCenteredText(text, x, y, font) {
        game.scene.ctx.textAlign = 'center';
        game.scene.ctx.font = font;
        game.scene.ctx.fillText(text, x, y);
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
