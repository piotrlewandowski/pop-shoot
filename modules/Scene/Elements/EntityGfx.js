import { game } from '../../../app.js';
import { DamageNumber } from '../../Effects/Misc/DamageNumber.js';
import { SceneUtils } from '../SceneUtils.js';

export class EntityGfx {
    static draw(entity) {
        if (entity.constructor === DamageNumber) {
            SceneUtils.drawCenteredText(entity.text, entity.x, entity.y, 30);
        } else {
            game.scene.ctx.drawImage(
                entity.sprite,
                SceneUtils.offsetCoordinates(entity).x,
                SceneUtils.offsetCoordinates(entity).y
            );
        }
    }
}
