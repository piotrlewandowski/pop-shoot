import { game } from '../../../app.js';
import { Matrix } from '../../Effects/Weather/Matrix.js';
import { Rain } from '../../Effects/Weather/Rain.js';
import { Sand } from '../../Effects/Weather/Sand.js';
import { Vortex } from '../../Effects/Weather/Vortex.js';
import { Wind } from '../../Effects/Weather/Wind.js';

const WEATHERS = {
    stage0: Rain,
    stage1: Wind,
    stage2: Vortex,
    stage3: Sand,
    stage4: Matrix,
};

export class WeatherController {
    constructor() {
        // active-weather tracking
        this.weatherActive = false;

        // glitch offset used by 'matrix' weather type
        this.glitchOffset = { x: 0, y: 0 };
    }

    toggleWeather() {
        if (!game.state.boss) {
            if (this.weatherActive) {
                this.stopWeather();
            } else {
                this.startWeather();
            }
        }
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
}
