import { game } from '../../../app.js';
import { GLASSPAUSESPRITE } from '../../Assets/Hud.js';

// GLASS
const GLASS_X = 360;
const GLASS_Y = 125;

// ITEM ROWS
const NUMBEROFROWS = 4; // # of items per line
const VERTICALGAP = 50; // gap in px between lines
const HORIZONTALGAP = 220; // gap in px between items
const STARTINGX = 75; // X coordinate of first item to be drawn
const STARTINGY = 165; // Y coordinate of first item to be drawn

export class PauseGfx {
    static drawGlass() {
        game.scene.ctx.drawImage(GLASSPAUSESPRITE, GLASS_X, GLASS_Y);
    }

    static drawItemsDescriptions() {
        // coordinates of current item being drawn
        let currentx = STARTINGX;
        let currenty = STARTINGY;

        game.itemdropcontroller.aquiredItems.forEach((item, index) => {
            // newline in case end-of-current-line is reached
            if (index % NUMBEROFROWS === 0) {
                currentx = STARTINGX;
                currenty += VERTICALGAP;
            }
            // draw icon, then shift X right according to horizontalGap
            game.scene.ctx.drawImage(item.pause, currentx, currenty);
            currentx += HORIZONTALGAP;
        });
    }
}
