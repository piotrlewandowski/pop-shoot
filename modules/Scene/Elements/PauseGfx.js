import { game } from '../../../app.js';
import { GLASSPAUSESPRITE } from '../../Assets/Hud.js';
import { ITEMS } from '../../Drops/Items.js';

export class PauseGfx {
    static drawGlass() {
        game.scene.ctx.drawImage(GLASSPAUSESPRITE, 360, 125);
    }

    static drawItemsDescriptions() {
        // Row specs
        const numberOfRows = 4;
        const verticalGap = 50;
        const horizontalGap = 220;

        // X coordinates of left-side
        const startingX = 75;

        // Current drawing position
        let currentX = startingX;
        let currentY = 165;

        Object.keys(game.itemcontroller.aquiredItems)
            .filter((key) => game.itemcontroller.aquiredItems[key])
            .forEach((key, index) => {
                // Check if line is full
                if (index % numberOfRows === 0) {
                    currentX = startingX;
                    currentY += verticalGap;
                }
                // Draw, then shift X right according to horizontalGap
                game.scene.ctx.drawImage(ITEMS[key].pause, currentX, currentY);
                currentX += horizontalGap;
            });
    }
}
