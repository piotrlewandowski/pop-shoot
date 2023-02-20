import { game } from '../../../app.js';
import { Matrix } from '../../Effects/Weather/Matrix.js';
import { Rain } from '../../Effects/Weather/Rain.js';
import { Sand } from '../../Effects/Weather/Sand.js';
import { Vortex } from '../../Effects/Weather/Vortex.js';
import { Wind } from '../../Effects/Weather/Wind.js';

const weathers = [Rain, Wind, Sand, Vortex, Matrix];

export class WeatherController {
    // General weather variables
    static darknessActive = false;
    static weatherActive = false;

    // Glitch offset used by 'matrix' weather type. This will be used
    // in Scene.js to draw the player at an offset
    static glitchOffset = { x: 0, y: 0 };

    static startWeather() {
        // get weather according to stage
        const stageWeather = weathers[game.state.stage];

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
