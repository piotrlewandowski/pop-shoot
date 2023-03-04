import { game } from '../../../app.js';
import { Matrix } from '../../Effects/Weather/Matrix.js';
import { Rain } from '../../Effects/Weather/Rain.js';
import { Sand } from '../../Effects/Weather/Sand.js';
import { Vortex } from '../../Effects/Weather/Vortex.js';
import { Wind } from '../../Effects/Weather/Wind.js';

// Each stage has a corresponding weather
// Stage1 -> Rain, Stage2 -> Wind etc...
// Counting starts from 0, so Stage1 = 0, Stage2 = 1 etc...
const weathers = {
    stage0: Rain,
    stage1: Wind,
    stage2: Sand,
    stage3: Vortex,
    stage4: Matrix,
};

export class WeatherController {
    // General weather variables
    static darknessActive = false;
    static weatherActive = false;

    // Glitch offset used by 'matrix' weather type. This will be used
    // in Scene.js to draw the player at an offset
    static glitchOffset = { x: 0, y: 0 };

    static startWeather() {
        // get weather according to stage
        const stageWeather = weathers[`stage${game.state.stage}`];

        // activate weather
        this.weatherActive = new stageWeather();
        game.effects.add(this.weatherActive);
    }

    static stopWeather() {
        if (this.weatherActive) {
            this.weatherActive.stop();
            this.weatherActive = false;
        }
    }

    static startDarkness() {
        this.darknessActive = true;
    }

    static stopDarkness() {
        this.darknessActive = false;
    }
}
