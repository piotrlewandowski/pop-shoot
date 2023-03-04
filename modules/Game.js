import { Scene } from './Scene/Scene.js';
import { Controls } from './Logic/Motion/Controls.js';
import { Player } from './Actors/Player/Player.js';
import { LaserPool } from './Lasers/LaserPool.js';
import { EnemyPool } from './Actors/Enemies/EnemyPool.js';
import { EffectsPool } from './Effects/EffectsPool.js';
import { GameState } from './Logic/State/GameState.js';
import { AudioController } from './Logic/Controllers/AudioController.js';
import { CashController } from './Logic/Controllers/CashController.js';
import { EnemyController } from './Logic/Controllers/EnemyController.js';
import { ItemController } from './Logic/Controllers/ItemController.js';
import { BuffController } from './Logic/Controllers/BuffController.js';

export class Game {
    constructor() {
        this.scene = new Scene();

        // ACTORS
        this.player = new Player();
        this.enemies = new EnemyPool();

        // ENTITIES
        this.bluelasers = new LaserPool();
        this.firelasers = new LaserPool();
        this.effects = new EffectsPool();

        // LOGIC CONTROLLERS
        this.state = new GameState();
        this.controls = new Controls();
        this.itemcontroller = new ItemController();
        this.buffcontroller = new BuffController();
        this.audiocontroller = new AudioController();
        this.cashcontroller = new CashController();
        this.enemycontroller = new EnemyController();
    }

    draw() {
        this.scene.clear();
        this.scene.drawBackground();
        this.scene.drawPlayer();
        this.scene.drawEnemies();
        this.scene.drawEntity(this.firelasers.liveLasers);
        this.scene.drawEntity(this.bluelasers.liveLasers);
        this.scene.drawEntity(this.effects.liveEffects);

        if (this.state.time) {
            return this.scene.drawHud();
        }
        this.scene.drawMenu();
    }

    move() {
        this.enemies.move();
        this.bluelasers.move();
        this.firelasers.move();
        this.effects.move();
    }

    refresh() {
        this.enemies.refresh();
        this.bluelasers.refresh();
        this.firelasers.refresh();
        this.effects.refresh();
    }
}
