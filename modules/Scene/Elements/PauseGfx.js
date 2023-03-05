import { game } from '../../../app.js';
import { GLASSPAUSESPRITE } from '../../Assets/Hud.js';

export class PauseGfx {
    static drawGlass() {
        game.scene.ctx.drawImage(GLASSPAUSESPRITE, 360, 125);
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
}
