import { game } from '../../../app.js';
import { Matrix } from '../../Effects/Weather/Matrix.js';
import { Rain } from '../../Effects/Weather/Rain.js';
import { Sand } from '../../Effects/Weather/Sand.js';
import { Vortex } from '../../Effects/Weather/Vortex.js';
import { Wind } from '../../Effects/Weather/Wind.js';

let weather;

export class WeatherController {
    // General weather variables
    static darknessActive = false;
    static weatherActive = false;

    // Glitch offset used by 'matrix' weather type. This will be used
    // in Scene.js to draw the player at an offset
    static glitchOffset = { x: 0, y: 0 };

    static startWeather() {
        if (game.state.stage === 0) {
            weather = new Rain();
            this.weatherActive = 'rain';
        }
        if (game.state.stage === 1) {
            weather = new Wind();
            this.weatherActive = 'wind';
        }
        if (game.state.stage === 2) {
            weather = new Sand();
            this.weatherActive = 'sand';
        }
        if (game.state.stage === 3) {
            weather = new Vortex();
            this.weatherActive = 'vortex';
        }
        if (game.state.stage === 4) {
            weather = new Matrix();
            this.weatherActive = 'matrix';
        }
        game.effects.add(weather);
    }

    static stopWeather() {
        if (weather) {
            weather.stop();
        }
        this.weatherActive = false;
    }

    static startDarkness() {
        this.darknessActive = true;
    }

    static stopDarkness() {
        this.darknessActive = false;
    }
}
