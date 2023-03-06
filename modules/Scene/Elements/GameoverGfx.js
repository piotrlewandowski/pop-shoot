import { game } from '../../../app.js';
import { GLASSGAMEOVERSPRITE } from '../../Assets/Hud.js';
import { getGametimeToMMSS } from '../../Logic/Helpers.js';
import { SceneUtils } from '../SceneUtils.js';

// GLASS COORDINATES
const GLASS_X = 320;
const GLASS_Y = 200;

// TEXT COORDINATES
const TITLE_X = 500;
const TITLE_Y = 240;
const STATS_X = 500;
// STATS_Y is calculated with a gap starting from TITLE_Y for each line

// FONT
const TITLE_FONTSIZE = 60;
const STATS_FONTSIZE = 30;

export class GameoverGfx {
    static drawGlass() {
        game.scene.ctx.drawImage(GLASSGAMEOVERSPRITE, GLASS_X, GLASS_Y);
    }

    static drawStats() {
        SceneUtils.drawCenteredText(`GAMEOVER !`, TITLE_X, TITLE_Y, TITLE_FONTSIZE);
        SceneUtils.drawCenteredText(
            `YOU SURVIVED ${getGametimeToMMSS()} MINUTES`,
            STATS_X,
            TITLE_Y + 20,
            STATS_FONTSIZE
        );
        SceneUtils.drawCenteredText(`YOU DIED AT STAGE ${game.state.stage + 1}`, STATS_X, TITLE_Y + 40, STATS_FONTSIZE);
        SceneUtils.drawCenteredText(`EARNED CASH: ${game.cashcontroller.cash}`, STATS_X, TITLE_Y + 60, STATS_FONTSIZE);
        SceneUtils.drawCenteredText(`PRESS SPACE TO REPLAY`, STATS_X, TITLE_Y + 95, STATS_FONTSIZE);
    }
}
