import { game } from '../../../app.js';

// SLOW-MO
const SLOWMORATE = 0.2; // Default Slowmo rate. Lower = Slower. 1 = Fullspeed.

// OFFENSIVE ITEMS MODIFIERS
const ROCKETCHANCE = 15; // Percentage chance of firing a rocket
const ROCKETDAMAGE = 3; // Rocket damage multiplier
const DRONESRATE = 0.2; // Damage rate dealt by drones (1 = full damage)
const DRONESNUMBER = 5; // Number of drones released
const DARTSSTUNCHANCE = 15; // Percentage chance to stun enemy when darts is upgraded
const DARTSSTUNTIME = 750; // Time to stun enemies in ms (1000 = 1 second)
const DARTSRATE = 3; // Damage rate dealt by darts when stun successful (1 = full damage)
const MACHINEGUNRATE = 110; // Shooting rate of the machine gun. Lower = Faster (rate without upgrade is 150)
const BOMBRATE = 0.2; // Damage rate dealt to other enemies on screen (1 = full damage)
const TOXICRATE = 0.4; // Damage rate dealt to enemies in slowmo (1 = full damage)
const SEEKERRATE = 0.5; // Damage rate dealt by seekers (1 = full damage);
const AIRSTRIKERATE = 2; // Damage rate dealt by airstrike (1 = full damage);
const AIRSTRIKECHANCE = 10; // Percentage chance of triggering an airstrike
const EMPRATE = 0.2; // Multiplier to damage dealt to enemies when player is hit

// DEFENSIVE ITEMS MODIFIERS
const METALSHIELDTIME = 2; // Invincibility time after being hit. In seconds (time without upgrade is 1)
const NITROGENRATE = 2; // How much faster should shield recharge. (default without upgrade is 1)
const URANIUMRATE = 0.6; // How much slower should slowmo deplete. (lower = slower. default without upgrade is 0.75)
const GREEDCHANCE = 20; // Percentage chance of receiving double scoreballs

export class GameVariables {
    constructor() {
        // Upgrades icons positions. Set by their respective functions by ItemController
        this.clockIconPosition;
        this.sprayIconPosition;

        // darts
        this.darts = false;
        this.dartsstunchance = DARTSSTUNCHANCE;
        this.dartsstuntime = DARTSSTUNTIME;
        this.dartsrate = DARTSRATE;

        // loopers
        this.loopers = false;

        // seekers
        this.seekers = false;
        this.seekerrate = SEEKERRATE;

        // bomb
        this.bomb = false;
        this.bombdamagerate = BOMBRATE;

        // rocket
        this.rocket = false;

        // rocket
        this.rocketchance = ROCKETCHANCE;
        this.rocketdamage = ROCKETDAMAGE;

        // machinegun
        this.machinegun = false;
        this.machinegunrate = MACHINEGUNRATE;

        // airstrike
        this.airstrike = false;
        this.airstrikerate = AIRSTRIKERATE;
        this.airstrikechance = AIRSTRIKECHANCE;

        // drones
        this.drones = false;
        this.dronesrate = DRONESRATE;
        this.dronesnumber = DRONESNUMBER;

        // shield
        this.metalshield = false;
        this.metalshieldtime = METALSHIELDTIME;
        this.nitrogen = false;
        this.nitrogenrate = NITROGENRATE;
        this.emp = false;
        this.emprate = EMPRATE;

        // slowmo
        this.slowmorate = SLOWMORATE;
        this.uranium = false;
        this.uraniumrate = URANIUMRATE;
        this.toxic = false;
        this.toxicrate = TOXICRATE;

        // greed
        this.greed = false;
        this.greedchance = GREEDCHANCE;

        // buffs
        this.invincibility = false;
        this.mute = false;
        this.noshield = false;
        this.quaddamage = false;
        this.muteenemies = false;
        this.noslowmo = false;

        // repetitive
        this.dmgMultiplier = 1;
        this.spray = 0;
    }

    get damageMultiplier() {
        if (game.state.variables.quaddamage) {
            return this.dmgMultiplier * 4;
        }
        return this.dmgMultiplier;
    }

    incrementDamageMultiplier() {
        this.dmgMultiplier += 0.5;
    }
}
