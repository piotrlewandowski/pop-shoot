import { game } from '../../../app.js';
import { Airstrike } from '../../Lasers/Friendly/Airstrike.js';
import { BlueLaser } from '../../Lasers/Friendly/BlueLaser.js';
import { Dart } from '../../Lasers/Friendly/Dart.js';
import { Debris } from '../../Lasers/Friendly/Debris.js';
import { Drone } from '../../Lasers/Friendly/Drone.js';
import { Rocket } from '../../Lasers/Friendly/Rocket.js';
import { Seeker } from '../../Lasers/Friendly/Seeker.js';
import { getClosestEnemyTo, randomInRange } from '../Helpers.js';

// OFFENSIVE ITEMS MODIFIERS
const AIRSTRIKECHANCE = 10; // Percentage chance of triggering an airstrike
const AIRSTRIKERATE = 2; // Damage rate dealt by airstrike (1 = full damage);
const BOMBRATE = 0.2; // Damage rate dealt to other enemies on screen (1 = full damage)
const DARTSRATE = 0.3; // Damage rate dealt by darts when stun successful (1 = full damage)
const DARTSSTUNCHANCE = 15; // Percentage chance to stun enemy when darts is upgraded
const DEBRISNUMBER = 50; // Number of flying debris around player
const DEBRISRATE = 0.5; // Damage rate dealt by debris
const DEBRISRESPAWNRATE = 200; // Rate in ms at which a shattered debris takes to respawn
const DRONESRATE = 0.2; // Damage rate dealt by drones (1 = full damage)
const DRONESNUMBER = 5; // Number of drones released
const EMPRATE = 0.2; // Damage rate dealt by emp to enemies when player is hit
const MACHINEGUNRATE = 110; // Shooting rate of the machine gun. Lower = Faster (rate without upgrade is 150)
const ROCKETCHANCE = 15; // Percentage chance of firing a rocket
const ROCKETDAMAGE = 3; // Rocket damage multiplier
const SEEKERRATE = 0.5; // Damage rate dealt by seekers (1 = full damage);
const STUNTIME = 1250; // Time to stun enemies in ms (1000 = 1 second)
const TOXICRATE = 0.4; // Damage rate dealt to enemies in slowmo (1 = full damage)

// DEFENSIVE ITEMS MODIFIERS
const GREEDCHANCE = 20; // Percentage chance of receiving double coins
const METALSHIELDTIME = 2; // Invincibility time after being hit. In seconds (time without upgrade is 1)
const NITROGENRATE = 2; // How much faster should shield recharge. (default without upgrade is 1)
const URANIUMRATE = 0.6; // How much slower should slowmo deplete. (lower = slower. default without upgrade is 0.75)

export class ItemActionController {
    constructor() {
        this.airstrike = false;
        this.bomb = false;
        this.darts = false;
        this.drones = false;
        this.emp = false;
        this.greed = false;
        this.loopers = false;
        this.machinegun = false;
        this.nitrogen = false;
        this.metalshield = false;
        this.rocket = false;
        this.toxic = false;
        this.seekers = false;
        this.uranium = false;

        this.airstrikechance = AIRSTRIKECHANCE;
        this.airstrikerate = AIRSTRIKERATE;
        this.bombdamagerate = BOMBRATE;
        this.dartsrate = DARTSRATE;
        this.dartsstunchance = DARTSSTUNCHANCE;
        this.debrisrate = DEBRISRATE;
        this.debrisrespawnrate = DEBRISRESPAWNRATE;
        this.debrisnumber = DEBRISNUMBER;
        this.dronesnumber = DRONESNUMBER;
        this.dronesrate = DRONESRATE;
        this.emprate = EMPRATE;
        this.greedchance = GREEDCHANCE;
        this.machinegunrate = MACHINEGUNRATE;
        this.metalshieldtime = METALSHIELDTIME;
        this.nitrogenrate = NITROGENRATE;
        this.rocketdamage = ROCKETDAMAGE;
        this.rocketchance = ROCKETCHANCE;
        this.seekerrate = SEEKERRATE;
        this.stuntime = STUNTIME;
        this.toxicrate = TOXICRATE;
        this.uraniumrate = URANIUMRATE;

        this.debriscount = 0;
        this.spray = 0;
        this.dmgMultiplier = 1;
    }

    addDebris() {
        setInterval(() => {
            if (this.debriscount < this.debrisnumber) {
                game.bluelasers.add(new Debris());
                this.debriscount++;
            }
        }, this.debrisrespawnrate);
    }

    blowEmp() {
        game.enemies.damageAll(randomInRange(2, 6) * this.damageMultiplier * this.emprate);
        game.firelasers.clear();
    }

    bombAll(laser) {
        game.enemies.damageAll(laser.damage * this.bombdamagerate);
    }

    get damageMultiplier() {
        if (game.buffcontroller.quaddamage) {
            return this.dmgMultiplier * 4;
        }
        if (game.buffcontroller.thorshammer) {
            return this.dmgMultiplier * 2;
        }
        return this.dmgMultiplier;
    }

    get greedMultiplier() {
        const greedroll = randomInRange(0, 100);
        if (this.greed && greedroll < this.greedchance) {
            return 2;
        }
        return 1;
    }

    getWeaponType() {
        const rocketroll = randomInRange(0, 100);
        if (this.rocket && rocketroll < this.rocketchance) {
            return Rocket;
        } else {
            return BlueLaser;
        }
    }

    incrementDamageMultiplier() {
        this.dmgMultiplier += 0.5;
    }

    sendAirstrike(laser) {
        const airstrikeroll = randomInRange(0, 100);
        if (
            game.enemies.enemiesOnScreen() &&
            airstrikeroll < this.airstrikechance &&
            laser.constructor !== Airstrike &&
            laser.constructor !== Drone &&
            laser.constructor !== Dart
        ) {
            game.enemies.liveEnemies.forEach((enemy, index) => {
                setTimeout(() => {
                    game.bluelasers.add(new Airstrike(enemy));
                }, 100 * index);
            });
        }
    }

    shootDart() {
        game.bluelasers.add(new Dart());
    }

    shootDrone() {
        for (let i = 0; i < this.dronesnumber; i++) {
            game.bluelasers.add(new Drone());
        }
    }

    shootSeeker() {
        game.bluelasers.add(new Seeker(getClosestEnemyTo(game.player)));
    }

    startToxic() {
        this.toxic = true;
        setInterval(() => {
            if (game.state.slowmo && this.toxic) {
                game.enemies.damageAll(randomInRange(2, 6) * this.damageMultiplier * this.toxicrate);
            }
        }, 500);
    }

    stunWithDart(laser, enemy) {
        const stunroll = randomInRange(0, 100);
        if (stunroll < this.dartsstunchance) {
            enemy.stun();
            enemy.takeDamage(laser.damage * this.dartsrate);
        }
    }
}
