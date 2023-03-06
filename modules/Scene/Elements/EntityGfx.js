import { game } from '../../../app.js';
import { DamageNumber } from '../../Effects/Misc/DamageNumber.js';
import { SceneUtils } from '../SceneUtils.js';

const DAMAGENUMBER_FONTSIZE = 30;

export class EntityGfx {
    static draw(entity) {
        if (entity.constructor === DamageNumber) {
            SceneUtils.drawCenteredText(entity.text, entity.x, entity.y, DAMAGENUMBER_FONTSIZE);
        } else {
            game.scene.ctx.drawImage(
                entity.sprite,
                SceneUtils.offsetCoordinates(entity).x,
                SceneUtils.offsetCoordinates(entity).y
            );
        }
    }
}
