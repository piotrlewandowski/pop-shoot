import { game } from '../../../app.js';
import { RedPackage } from '../../Actors/Packages/RedPackage.js';
import { LIGHTBEAMSPRITE } from '../../Assets/Effects.js';
import { SceneUtils } from '../SceneUtils.js';

export class EnemyGfx {
    static drawHealthbar(enemy) {
        // Normal Enemy
        if (enemy.hitRatio !== 1 && !enemy.name) {
            SceneUtils.drawBar(
                enemy.x - enemy.sprite.width / 2,
                enemy.y - enemy.sprite.height / 1.25,
                enemy.sprite.width,
                1.5,
                enemy.hitRatio
            );
        }

        // Boss
        if (enemy.name) {
            SceneUtils.drawBigBar(690, 10, 296, 11, enemy.hitRatio);
            SceneUtils.drawText(enemy.name, 690, 40, 30);
        }
    }

    static drawLightbeam(enemy) {
        if (enemy.constructor === RedPackage) {
            game.scene.ctx.drawImage(LIGHTBEAMSPRITE, enemy.x - LIGHTBEAMSPRITE.width / 2, 0);
        }
    }

    static drawSprite(enemy) {
        // Enemy Sprite
        game.scene.ctx.drawImage(
            enemy.sprite,
            SceneUtils.offsetCoordinates(enemy).x,
            SceneUtils.offsetCoordinates(enemy).y
        );
    }
}
