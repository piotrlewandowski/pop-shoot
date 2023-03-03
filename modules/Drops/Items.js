import { game } from '../../app.js';
import { Debris } from '../Lasers/Friendly/Debris.js';
import { randomInRange } from '../Logic/Helpers.js';

export class Items {
    static _darts() {
        // Action
        game.state.variables.darts = true;

        // Graphics
        game.itemcontroller.drawAll('darts');
    }

    static _bomb() {
        // Action
        game.state.variables.bomb = true;

        // Graphics
        game.itemcontroller.drawAll('bomb');
    }

    static _airstrike() {
        // Action
        game.state.variables.airstrike = true;

        // Graphics
        game.itemcontroller.drawAll('airstrike');
    }

    static _machinegun() {
        // Action
        game.state.variables.machinegun = true;

        // Graphics
        game.itemcontroller.drawAll('machinegun');
    }

    static _loopers() {
        // Action
        game.state.variables.loopers = true;

        // Graphics
        game.itemcontroller.drawAll('loopers');
    }

    static _rocket() {
        // Action
        game.state.variables.rocket = true;

        // Graphics
        game.itemcontroller.drawAll('rocket');
    }

    static _seekers() {
        // Action
        game.state.variables.seekers = true;

        // Graphics
        game.itemcontroller.drawAll('seekers');
    }

    static _timefreeze() {
        // Action
        game.state.variables.slowmorate = 0.05;

        // Graphics
        game.itemcontroller.drawAll('timefreeze');
    }

    static _uraniumfuel() {
        // Action
        game.state.variables.uranium = true;

        // Graphics
        game.itemcontroller.drawAll('uranium');
    }

    static _nitrogen() {
        // Action
        game.state.variables.nitrogen = true;

        // Graphics
        game.itemcontroller.drawAll('nitrogen');
    }

    static _metalshield() {
        // Action
        game.state.variables.metalshield = true;

        // Graphics
        game.itemcontroller.drawAll('metalshield');
    }

    static _emp() {
        // Action
        game.state.variables.emp = true;

        // Graphics
        game.itemcontroller.drawAll('emp');
    }

    static _greed() {
        // Action
        game.state.variables.greed = true;

        // Graphics
        game.itemcontroller.drawAll('greed');
    }

    static _drones() {
        // Action
        game.state.variables.drones = true;

        // Graphics
        game.itemcontroller.drawAll('drones');
    }

    static _toxic() {
        // Action
        game.state.variables.toxic = true;

        setInterval(() => {
            if (game.state.slowmo && game.state.variables.toxic) {
                game.enemies.damageAll(
                    randomInRange(2, 6) * game.state.variables.damageMultiplier * game.state.variables.toxicrate
                );
            }
        }, 500);

        // Graphics
        game.itemcontroller.drawAll('toxic');
    }

    static _clock() {
        // Action
        game.player.clock.owned = true;

        // Graphics
        game.state.variables.clockIconPosition = game.itemcontroller.icons.length; // Get icon position
        game.itemcontroller.drawAll('clock');
    }

    static _debris() {
        // Action
        setInterval(() => {
            if (Debris.count < Debris.maxDebris) {
                game.bluelasers.add(new Debris());
                Debris.count++;
            }
        }, Debris.respawnRate);

        // Graphics
        game.itemcontroller.drawAll('debris');
    }

    static _multiplydamage() {
        // Graphics
        // If statement executes the first time the upgrade is acquired
        if (game.state.variables.dmgMultiplier === 1) {
            game.state.variables.dmgIconPosition = game.itemcontroller.icons.length; // Get icon position
            game.itemcontroller.drawIcon('damage');
            game.itemcontroller.drawPauseDescription('damage');
        }
        game.itemcontroller.drawNotification('damage');

        // Action
        game.state.variables.incrementDamageMultiplier();
    }

    static _spray() {
        // Graphics
        // If statement executes the first time the upgrade is acquired
        if (game.state.variables.spray === 0) {
            game.state.variables.sprayIconPosition = game.itemcontroller.icons.length; // Get icon position
            game.itemcontroller.drawIcon('spray');
            game.itemcontroller.drawPauseDescription('spray');
        }
        game.itemcontroller.drawNotification('spray');

        // Action
        game.state.variables.spray++;
    }
}
