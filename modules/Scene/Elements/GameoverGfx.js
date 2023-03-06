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
const SURVIVED_X = 500;
const SURVIVED_Y = 260;
const DIED_X = 500;
const DIED_Y = 280;
const EARNED_X = 500;
const EARNED_Y = 300;
const SPACE_X = 500;
const SPACE_Y = 335;

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
            SURVIVED_X,
            SURVIVED_Y,
            STATS_FONTSIZE
        );
        SceneUtils.drawCenteredText(`YOU DIED AT STAGE ${game.state.stage + 1}`, DIED_X, DIED_Y, STATS_FONTSIZE);
        SceneUtils.drawCenteredText(`EARNED CASH: ${game.cashcontroller.cash}`, EARNED_X, EARNED_Y, STATS_FONTSIZE);
        SceneUtils.drawCenteredText(`PRESS SPACE TO REPLAY`, SPACE_X, SPACE_Y, STATS_FONTSIZE);
    }
}
