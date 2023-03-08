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
const AIRSTRIKECHANCE = 10; // % of triggering an airstrike
const AIRSTRIKERATE = 2; // damage multiplier dealt by airstrike (1 = full damage);
const BOMBRATE = 0.2; // damage multiplier dealt to other enemies on screen (1 = full damage)
const DARTSRATE = 0.3; // damage multiplier dealt by darts when stun successful (1 = full damage)
const DARTSSTUNCHANCE = 15; // % to stun enemy when darts is upgraded
const DEBRISNUMBER = 50; // # of flying debris around player
const DEBRISRATE = 0.5; // damage multiplier dealt by debris (1 = full damage)
const DEBRISRESPAWNRATE = 200; // rate in ms at which a shattered debris takes to respawn
const DRONESRATE = 0.2; // damage multiplier dealt by drones (1 = full damage)
const DRONESNUMBER = 5; // # of drones released
const EMPRATE = 0.2; // damage multiplier dealt by emp to enemies when player is hit (1 = full damage)
const MACHINEGUNRATE = 110; // shooting-rate of the machine gun. lower = faster (rate without upgrade is 150)
const ROCKETCHANCE = 15; // % of firing a rocket
const ROCKETDAMAGE = 3; // damage multiplier dealth by rocket (1 = full damage)
const SEEKERRATE = 0.5; // damage multiplier dealt by seekers (1 = full damage)
const STUNTIME = 1250; // time to stun enemies in ms
const TOXICRATE = 0.4; // damage multiplier dealt to enemies by toxic slowmo (1 = full damage)

// DEFENSIVE ITEMS MODIFIERS
const GREEDCHANCE = 20; // % of receiving double coins
const METALSHIELDTIME = 2; // invincibility time after being hit, in seconds (time without upgrade is 1)
const NITROGENRATE = 2; // rate at which shield recharges with nitrogen (higher = faster. default without upgrade is 1)
const URANIUMRATE = 0.6; // rate at which slowmo depletes (lower = slower. default without upgrade is 0.75)

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
