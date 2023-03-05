import { game } from '../../../app.js';
import { BlueLaser } from '../../Lasers/Friendly/BlueLaser.js';
import { PLAYERSPRITE } from '../../Assets/Player.js';
import { Shield } from './Shield.js';
import { Flame } from './Flame.js';
import { getClosestEnemyTo, randomInRange, shakeScreen } from '../../Logic/Helpers.js';
import { Rocket } from '../../Lasers/Friendly/Rocket.js';
import { Seeker } from '../../Lasers/Friendly/Seeker.js';
import { Clock } from '../../Drops/Clock.js';
import { SlowmoGauge } from './SlowmoGauge.js';
import { Drone } from '../../Lasers/Friendly/Drone.js';
import { Dart } from '../../Lasers/Friendly/Dart.js';
import { Animation } from '../../Effects/Misc/Animation.js';

const SPRAYDISTANCE = 5; // Distance between laser streams when spray upgrade is acquired
const LASERANGLE = 270; // Default laser direction. 270 = NORTH
const RADIUS = 13; // Player hitbox radius. 13 matches the current sprite
const DEFAULTSHOOTINGRATE = 150; // Default shooting rate (speed) if not upgraded to machine gun

export class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.radius = RADIUS;
        this.sprite = PLAYERSPRITE;

        this.flame = new Flame();
        this.slowmogauge = new SlowmoGauge();
        this.shield = new Shield();
        this.clock = new Clock();
    }

    shoot() {
        if (game.state.variables.mute || this.clock.active) {
            shakeScreen(2, 0.25);
            game.effects.add(new Animation(game.player.x, game.player.y - 15, 'smoke_normal'));
            game.audiocontroller.playSound('noammo');
        } else {
            // ***** AUDIO *****
            game.audiocontroller.playSound('laser');

            // ***** ROCKETS *****
            let weapon;
            const rocketroll = randomInRange(0, 100);
            if (game.state.variables.rocket && rocketroll < game.state.variables.rocketchance) {
                weapon = Rocket;
            } else {
                weapon = BlueLaser;
            }

            // ***** SPRAY *****

            // In case the spray number is even, skew the laser's angle by 2.5 degrees
            let direction = game.state.variables.spray % 2 ? LASERANGLE - 2.5 : LASERANGLE;

            // Fire the first laser
            game.bluelasers.add(new weapon(direction));

            // Calculate the remaning sprays directions & fire them
            let spraycount = 1;
            for (let i = 0; i < game.state.variables.spray; i++) {
                // spray left
                if (i % 2) {
                    game.bluelasers.add(new weapon(direction - SPRAYDISTANCE * spraycount));
                    spraycount++;
                }
                // spray right
                else {
                    game.bluelasers.add(new weapon(direction + SPRAYDISTANCE * spraycount));
                }
            }

            // ***** SEEKERS *****
            if (game.enemies.enemiesOnScreen() && game.state.variables.seekers) {
                game.bluelasers.add(new Seeker(getClosestEnemyTo(this)));
            }

            // ***** DRONES *****
            if (game.state.variables.drones) {
                for (let i = 0; i < game.state.variables.dronesnumber; i++) {
                    game.bluelasers.add(new Drone());
                }
            }

            // ***** DARTS *****
            if (game.state.variables.darts) {
                game.bluelasers.add(new Dart());
            }

            // ***** QUAD-DAMAGE & THOR'S HAMMER *****
            if (game.state.variables.quaddamage || game.state.variables.thorshammer) {
                shakeScreen(3, 0.25);
            }
        }
    }

    setShoot() {
        const rate = game.state.variables.machinegun ? game.state.variables.machinegunrate : DEFAULTSHOOTINGRATE;
        this.shoot();
        this.shootInterval = setInterval(this.shoot.bind(this), rate);
    }

    unsetShoot() {
        clearInterval(this.shootInterval);
    }
}
