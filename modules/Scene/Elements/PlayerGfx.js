import { game } from '../../../app.js';
import { SHIELDEMPSPRITE, SHIELDINVINCIBILITYSPRITE } from '../../Assets/Player.js';
import { SceneUtils } from '../SceneUtils.js';

const MIN_SLOWMO_CHARGE = 15; // min charge that slowmo should be at in order for the flame to be drawn
const EMP_SHIELD_Y_OFFSET = 3; // emp shield will be drawn some px above the shield

export class PlayerGfx {
    static drawJetFlame() {
        if (game.player.slowmogauge.charge > MIN_SLOWMO_CHARGE) {
            game.scene.ctx.drawImage(
                game.player.flame.sprite,
                SceneUtils.offsetCoordinates(game.player.flame).x + game.weathercontroller.glitchOffset.x,
                SceneUtils.offsetCoordinates(game.player.flame).y + game.weathercontroller.glitchOffset.y
            );
        }
    }

    static drawPlayer() {
        game.scene.ctx.drawImage(
            game.player.sprite,
            SceneUtils.offsetCoordinates(game.player).x + game.weathercontroller.glitchOffset.x,
            SceneUtils.offsetCoordinates(game.player).y + game.weathercontroller.glitchOffset.y
        );
    }

    static drawShield() {
        if (game.buffcontroller.invincibility) {
            return game.scene.ctx.drawImage(
                SHIELDINVINCIBILITYSPRITE,
                SceneUtils.offsetCoordinates(game.player).x + game.weathercontroller.glitchOffset.x,
                SceneUtils.offsetCoordinates(game.player).y + game.weathercontroller.glitchOffset.y
            );
        }

        if (game.player.shield.isCharged()) {
            game.scene.ctx.drawImage(
                game.player.shield.sprite,
                SceneUtils.offsetCoordinates(game.player).x + game.weathercontroller.glitchOffset.x,
                SceneUtils.offsetCoordinates(game.player).y + game.weathercontroller.glitchOffset.y
            );
        }

        if (game.player.shield.isCharged() && game.itemactioncontroller.emp) {
            game.scene.ctx.drawImage(
                SHIELDEMPSPRITE,
                SceneUtils.offsetCoordinates(game.player).x + game.weathercontroller.glitchOffset.x,
                SceneUtils.offsetCoordinates(game.player).y -
                    EMP_SHIELD_Y_OFFSET +
                    game.weathercontroller.glitchOffset.y
            );
        }
    }
}
