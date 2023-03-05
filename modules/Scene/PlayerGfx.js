import { game } from '../../app.js';
import { SHIELDINVINCIBILITYSPRITE } from '../Assets/Player.js';
import { WeatherController } from '../Logic/Controllers/WeatherController.js';
import { SceneUtils } from './SceneUtils.js';

export class PlayerGfx {
    static drawJetFlame() {
        if (game.player.slowmogauge.charge > 15) {
            game.scene.ctx.drawImage(
                game.player.flame.sprite,
                SceneUtils.offsetCoordinates(game.player.flame).x + WeatherController.glitchOffset.x,
                SceneUtils.offsetCoordinates(game.player.flame).y + WeatherController.glitchOffset.y
            );
        }
    }

    static drawPlayer() {
        game.scene.ctx.drawImage(
            game.player.sprite,
            SceneUtils.offsetCoordinates(game.player).x + WeatherController.glitchOffset.x,
            SceneUtils.offsetCoordinates(game.player).y + WeatherController.glitchOffset.y
        );
    }

    static drawShield() {
        if (game.player.shield.isCharged() && !game.state.variables.invincibility) {
            game.player.shield.sprite.forEach((sprite) =>
                game.scene.ctx.drawImage(
                    sprite,
                    SceneUtils.offsetCoordinates(game.player).x + WeatherController.glitchOffset.x,
                    SceneUtils.offsetCoordinates(game.player).y + WeatherController.glitchOffset.y
                )
            );
        }
        if (game.state.variables.invincibility) {
            game.scene.ctx.drawImage(
                SHIELDINVINCIBILITYSPRITE,
                SceneUtils.offsetCoordinates(game.player).x + WeatherController.glitchOffset.x,
                SceneUtils.offsetCoordinates(game.player).y + WeatherController.glitchOffset.y
            );
        }
    }
}
