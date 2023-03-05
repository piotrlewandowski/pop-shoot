import { game } from '../../app.js';
import { BLACKSCREENSPRITE } from '../Assets/Effects.js';
import {
    FOG,
    FOGGREEN,
    S0BACK,
    S0FRONT,
    S1BACK,
    S1FRONT,
    S2BACK,
    S2FRONT,
    S3BACK,
    S3FRONT,
    S4BACK,
    S4FRONT,
} from '../Assets/OtherGfx.js';
import { Vortex } from '../Effects/Weather/Vortex.js';
import { WeatherController } from '../Logic/Controllers/WeatherController.js';
import { SceneVariables } from './SceneVariables.js';

const BACKGROUNDS = {
    stage0: { back: S0BACK, front: S0FRONT },
    stage1: { back: S1BACK, front: S1FRONT },
    stage2: { back: S2BACK, front: S2FRONT },
    stage3: { back: S3BACK, front: S3FRONT },
    stage4: { back: S4BACK, front: S4FRONT },
};

export class BackgroundGfx {
    static drawBack() {
        const backgroundback = BACKGROUNDS[`stage${game.state.stage}`].back;

        // Stars
        game.scene.ctx.drawImage(
            backgroundback,
            SceneVariables.backgroundScrollOffset + SceneVariables.shake,
            SceneVariables.shake
        );
        game.scene.ctx.drawImage(
            backgroundback,
            SceneVariables.backgroundScrollOffset + backgroundback.width + SceneVariables.shake,
            SceneVariables.shake
        );

        // Reset offset in case the stars-sprite reaches the end while scrolling
        if (SceneVariables.backgroundScrollOffset <= -backgroundback.width) {
            SceneVariables.backgroundScrollOffset = 0;
        }

        // Darkness
        if (WeatherController.darknessActive) {
            game.scene.ctx.drawImage(BLACKSCREENSPRITE, 0, 0);
        }
    }

    static drawFront() {
        const backgroundfront = BACKGROUNDS[`stage${game.state.stage}`].front;
        game.scene.ctx.drawImage(backgroundfront, SceneVariables.shake, SceneVariables.shake);

        // Only in Vortex
        if (WeatherController.weatherActive.constructor === Vortex) {
            game.scene.ctx.drawImage(HIEROGLYPHSPRITE, SceneVariables.shake, SceneVariables.shake);
        }
    }

    static drawFog() {
        const fogtype = game.state.variables.toxic ? FOGGREEN : FOG;

        if (game.state.slowmo || !game.state.time) {
            game.scene.ctx.drawImage(fogtype, -SceneVariables.backgroundScrollOffset - game.scene.canvas.width, 0);
            game.scene.ctx.drawImage(fogtype, -SceneVariables.backgroundScrollOffset, 0);
        }
    }

    static updateScrollOffset() {
        if (game.state.slowmo || !game.state.time || game.player.clock.active) {
            SceneVariables.backgroundScrollOffset -= game.state.variables.slowmorate;
        } else {
            SceneVariables.backgroundScrollOffset -= 3;
        }
    }
}
