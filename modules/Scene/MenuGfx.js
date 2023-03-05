import { game } from '../../app.js';
import { MENU } from '../Assets/OtherGfx.js';

export class MenuGfx {
    static draw() {
        game.scene.ctx.drawImage(MENU, 0, 0);
    }
}
