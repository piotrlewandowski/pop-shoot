// SLOW-MO
const SLOWMORATE = 0.2; // Default Slowmo rate. Lower = Slower. 1 = Fullspeed.

export class GameVariables {
    constructor() {
        // buffs
        this.invincibility = false;
        this.mute = false;
        this.noshield = false;
        this.quaddamage = false;
        this.muteenemies = false;
        this.noslowmo = false;
        this.thorshammer = false;

        this.slowmorate = SLOWMORATE;
    }
}
