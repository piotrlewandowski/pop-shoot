import { game } from '../../app.js';
import { randomInRange } from '../Logic/Helpers.js';

const FONTNAME = 'thaleahfatmedium';
const WHITE = '#FFFFFF';
const YELLOW = '#FFD800';

export class SceneUtils {
    static drawBigBar(x, y, width, height, ratio) {
        SceneUtils.setColor(WHITE);
        game.scene.ctx.beginPath();
        game.scene.ctx.rect(x, y, width * ratio, height);
        game.scene.ctx.fill();
        game.scene.ctx.beginPath();
        game.scene.ctx.rect(x - 2, y - 2, width + 4, height + 4);
        game.scene.ctx.stroke();
    }

    static drawBar(x, y, width, height, ratio, blink) {
        SceneUtils.setColor(blink ? YELLOW : WHITE);
        game.scene.ctx.beginPath();
        game.scene.ctx.rect(x, y, width * ratio, height);
        game.scene.ctx.fill();
    }

    static drawText(text, x, y, fontsize) {
        SceneUtils.setColor(WHITE);
        game.scene.ctx.textAlign = 'left';
        game.scene.ctx.font = `${fontsize}px ${FONTNAME}`;
        game.scene.ctx.fillText(text, x, y);
    }

    static drawCenteredText(text, x, y, fontsize) {
        SceneUtils.setColor(WHITE);
        game.scene.ctx.textAlign = 'center';
        game.scene.ctx.font = `${fontsize}px ${FONTNAME}`;
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

    static flashScreen() {
        if (!game.scene.flashscreen) {
            game.scene.flashscreen = true;
            setTimeout(() => (game.scene.flashscreen = false), 100);
        }
    }

    static shakeScreen(intensity, duration) {
        const shake = setInterval(() => (game.scene.shake = randomInRange(-intensity, intensity)), 16);
        setTimeout(() => {
            game.scene.shake = 0;
            clearInterval(shake);
        }, duration * 1000);
    }

    // canvas.drawImage draws an image starting from the top-left corner of the image,
    // making the x,y coordinates represent the top-left corner. This functions offsets
    // the coordinates so that x,y represent the center of the image.
    static offsetCoordinates(entity) {
        if (entity.sprite.constructor === Array) {
            return { x: entity.x - entity.sprite[0].width / 2, y: entity.y - entity.sprite[0].height / 2 };
        }
        return { x: entity.x - entity.sprite.width / 2, y: entity.y - entity.sprite.height / 2 };
    }
}
