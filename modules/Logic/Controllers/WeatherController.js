import { game } from '../../../app.js';
import { Matrix } from '../../Effects/Weather/Matrix.js';
import { Rain } from '../../Effects/Weather/Rain.js';
import { Sand } from '../../Effects/Weather/Sand.js';
import { Vortex } from '../../Effects/Weather/Vortex.js';
import { Wind } from '../../Effects/Weather/Wind.js';

const WEATHERS = {
    stage0: Rain,
    stage1: Wind,
    stage2: Sand,
    stage3: Vortex,
    stage4: Matrix,
};

export class WeatherController {
    constructor() {
        // General weather variables
        this.darknessActive = false;
        this.weatherActive = false;

        // Glitch offset used by 'matrix' weather type. This will be used
        // in PlayerGfx.js to draw the player at an offset
        this.glitchOffset = { x: 0, y: 0 };
    }

    startWeather() {
        // get weather according to stage
        const stageWeather = WEATHERS[`stage${game.state.stage}`];

        // activate weather
        this.weatherActive = new stageWeather();
        game.effects.add(this.weatherActive);
    }

    stopWeather() {
        if (this.weatherActive) {
            this.weatherActive.stop();
            this.weatherActive = false;
        }
    }

    startDarkness() {
        this.darknessActive = true;
    }

    stopDarkness() {
        this.darknessActive = false;
    }
}
