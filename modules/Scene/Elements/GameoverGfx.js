import { game } from '../../../app.js';
import { GLASSGAMEOVERSPRITE } from '../../Assets/Hud.js';
import { getGametimeToMMSS } from '../../Logic/Helpers.js';
import { SceneUtils } from '../SceneUtils.js';
import { SceneVariables } from '../SceneVariables.js';

export class GameoverGfx {
    static drawGlass() {
        game.scene.ctx.drawImage(GLASSGAMEOVERSPRITE, 320, 205);
    }

    static drawText() {
        SceneUtils.drawText(`GAMEOVER !`, 370, 245, SceneVariables.FONTXLARGE);
        SceneUtils.drawText(`YOU SURVIVED ${getGametimeToMMSS()} MINUTES`, 330, 270, SceneVariables.FONTMEDIUM);
        SceneUtils.drawText(`YOU DIED AT STAGE ${game.state.stage + 1}`, 380, 290, SceneVariables.FONTMEDIUM);
        SceneUtils.drawText(`EARNED CASH: ${game.cashcontroller.cash}`, 405, 310, SceneVariables.FONTMEDIUM);
        SceneUtils.drawText(`PRESS SPACE TO REPLAY`, 355, 340, SceneVariables.FONTMEDIUM);
    }
}
