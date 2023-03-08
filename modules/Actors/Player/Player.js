import { game } from '../../../app.js';
import { PLAYERSPRITE } from '../../Assets/Player.js';
import { Shield } from './Shield.js';
import { Flame } from './Flame.js';
import { Clock } from '../../Objects/Clock.js';
import { SlowmoGauge } from './SlowmoGauge.js';
import { Animation } from '../../Effects/Misc/Animation.js';
import { SceneUtils } from '../../Scene/SceneUtils.js';

const SPRAYDISTANCE = 5; // distance between laser streams when spray upgrade is acquired
const LASERANGLE = 270; // default laser direction. 270 = NORTH
const RADIUS = 13; // player hitbox radius. 13 matches the current sprite
const DEFAULTSHOOTINGRATE = 150; // default shooting rate (speed) if not upgraded to machine gun

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
        if (game.buffcontroller.mute || this.clock.active) {
            SceneUtils.shakeScreen(2, 0.25);
            game.effects.add(new Animation(game.player.x, game.player.y - 15, 'smoke_normal'));
            game.audiocontroller.playSound('noammo');
        } else {
            // AUDIO
            game.audiocontroller.playSound('laser');

            // ROCKETS
            let weapon = game.itemactioncontroller.getWeaponType();

            // SPRAY

            // if the spray number is even, skew the laser's angle by 2.5 degrees
            let direction = game.itemactioncontroller.spray % 2 ? LASERANGLE - 2.5 : LASERANGLE;

            // fire the first laser
            game.bluelasers.add(new weapon(direction));

            // calculate the remaning sprays directions & fire them
            let spraycount = 1;
            for (let i = 0; i < game.itemactioncontroller.spray; i++) {
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

            // SEEKERS
            if (game.enemies.enemiesOnScreen() && game.itemactioncontroller.seekers) {
                game.itemactioncontroller.shootSeeker();
            }

            // DRONES
            if (game.itemactioncontroller.drones) {
                game.itemactioncontroller.shootDrone();
            }

            // DARTS
            if (game.itemactioncontroller.darts) {
                game.itemactioncontroller.shootDart();
            }

            // QUAD-DAMAGE & THOR'S HAMMER
            if (game.buffcontroller.quaddamage || game.buffcontroller.thorshammer) {
                SceneUtils.shakeScreen(3, 0.25);
            }
        }
    }

    setShoot() {
        const rate = game.itemactioncontroller.machinegun
            ? game.itemactioncontroller.machinegunrate
            : DEFAULTSHOOTINGRATE;
        this.shoot();
        this.shootInterval = setInterval(this.shoot.bind(this), rate);
    }

    unsetShoot() {
        clearInterval(this.shootInterval);
    }
}
