import { game } from '../../../app.js';
import { Coin } from '../../Effects/Misc/Coin.js';
import { DamageNumber } from '../../Effects/Misc/DamageNumber.js';

const SLOWMORATE = 0.2; // default rate. lower = slower. 1 = Fullspeed

export class SlowmoController {
    constructor() {
        this.slowmorate = SLOWMORATE;
    }

    start() {
        this.applyToAllEnemies();
        this.applyToAllLasers();
        this.applyToAllEffects();
        game.player.flame.toggleSpriteSpeed();
    }

    stop() {
        this.removeFromAllEnemies();
        this.removeFromAllLasers();
        this.removeFromAllEffects();
        game.player.flame.toggleSpriteSpeed();
    }

    // ENEMIES

    applyToAllEnemies() {
        game.enemies.liveEnemies.forEach((enemy) => this.applyToOneEnemy(enemy));
    }

    removeFromAllEnemies() {
        game.enemies.liveEnemies.forEach((enemy) => this.removeFromOneEnemy(enemy));
    }

    applyToOneEnemy(enemy) {
        enemy.speed *= this.slowmorate;
        enemy.firingrate /= this.slowmorate;
    }

    removeFromOneEnemy(enemy) {
        enemy.speed /= this.slowmorate;
        enemy.firingrate *= this.slowmorate;
    }

    // LASERS

    applyToAllLasers() {
        game.bluelasers.liveLasers.forEach((laser) => this.applyToOneLaser(laser));
        game.firelasers.liveLasers.forEach((laser) => this.applyToOneLaser(laser));
    }

    removeFromAllLasers() {
        game.bluelasers.liveLasers.forEach((laser) => this.removeFromOneLaser(laser));
        game.firelasers.liveLasers.forEach((laser) => this.removeFromOneLaser(laser));
    }

    applyToOneLaser(laser) {
        laser.speed *= this.slowmorate;
    }

    removeFromOneLaser(laser) {
        laser.speed /= this.slowmorate;
    }

    // EFFECTS

    applyToAllEffects() {
        game.effects.liveEffects.forEach((effect) => this.applyToOneEffect(effect));
    }

    removeFromAllEffects() {
        game.effects.liveEffects.forEach((effect) => this.removeFromOneEffect(effect));
    }

    applyToOneEffect(effect) {
        if (effect.constructor === DamageNumber || effect.constructor === Coin) {
            effect.speed *= game.slowmocontroller.slowmorate;
            effect.duration /= game.slowmocontroller.slowmorate;
        }
    }

    removeFromOneEffect(effect) {
        if (effect.constructor === DamageNumber || effect.constructor === Coin) {
            effect.speed /= game.slowmocontroller.slowmorate;
            effect.duration *= game.slowmocontroller.slowmorate;
        }
    }
}
