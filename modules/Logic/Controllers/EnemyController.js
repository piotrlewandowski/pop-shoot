import { game } from '../../../app.js';
import { RedInvader } from '../../Actors/Enemies/Types/RedInvader.js';
import { GreenInvader } from '../../Actors/Enemies/Types/GreenInvader.js';
import { GreenTerror } from '../../Actors/Enemies/Types/GreenTerror.js';
import { GreenEmperor } from '../../Actors/Enemies/Types/GreenEmperor.js';
import { GreenUfo } from '../../Actors/Enemies/Types/GreenUfo.js';
import { GreenPlacer } from '../../Actors/Enemies/Types/GreenPlacer.js';
import { RedUfo } from '../../Actors/Enemies/Types/RedUfo.js';
import { RedEmperor } from '../../Actors/Enemies/Types/RedEmperor.js';
import { RedTerror } from '../../Actors/Enemies/Types/RedTerror.js';
import { BlackEmperor } from '../../Actors/Enemies/Types/BlackEmperor.js';
import { BlackPlacer } from '../../Actors/Enemies/Types/BlackPlacer.js';
import { BlackInvader } from '../../Actors/Enemies/Types/BlackInvader.js';
import { RedPlacer } from '../../Actors/Enemies/Types/RedPlacer.js';
import { BlackTerror } from '../../Actors/Enemies/Types/BlackTerror.js';
import { YellowUfo } from '../../Actors/Enemies/Types/YellowUfo.js';
import { FamiliarSight } from '../../Actors/Enemies/Bosses/FamiliarSight.js';
import { OrangePackage } from '../../Actors/Packages/OrangePackage.js';
import { Abuser } from '../../Actors/Enemies/Bosses/Abuser.js';
import { BlueInvader } from '../../Actors/Enemies/Types/BlueInvader.js';
import { BlueUfo } from '../../Actors/Enemies/Types/BlueUfo.js';
import { BluePlacer } from '../../Actors/Enemies/Types/BluePlacer.js';
import { BlueEmperor } from '../../Actors/Enemies/Types/BlueEmperor.js';
import { BlueTerror } from '../../Actors/Enemies/Types/BlueTerror.js';
import { Fk77 } from '../../Actors/Enemies/Bosses/Fk77.js';
import { Diver } from '../../Actors/Enemies/Types/Diver.js';
import { GreasyHarvey } from '../../Actors/Enemies/Bosses/GreasyHarvey.js';
import { MetalEmperor } from '../../Actors/Enemies/Bosses/MetalEmperor.js';

export class EnemyController {
    constructor() {
        this.enemiesToSpawn = [];
        this.bossesToSpawn = [];

        this.addEnemies();
        this.spawnEnemies();
        this.spawnBosses();
    }

    addEnemies() {
        // type, start, end, interval

        // STAGE 1
        this.addEnemy(GreenInvader, 4, 290, 4);
        this.addEnemy(GreenUfo, 17, 290, 11);
        this.addEnemy(Diver, 60, 290, 60);
        this.addEnemy(GreenTerror, 45, 290, 45);
        this.addEnemy(GreenPlacer, 60, 290, 50);
        this.addEnemy(GreenEmperor, 120, 290, 55);
        this.addEnemy(BlueInvader, 90, 290, 35);
        this.addEnemy(BlueUfo, 90, 290, 40);

        // boss
        this.addBoss(GreasyHarvey, 300);
        // orange package
        this.addEnemy(OrangePackage, 180, 270, 90);

        // STAGE 2
        this.addEnemy(GreenInvader, 301, 590, 4);
        this.addEnemy(GreenUfo, 301, 590, 11);
        this.addEnemy(Diver, 360, 590, 60);
        this.addEnemy(BlueInvader, 317, 590, 11);
        this.addEnemy(BlueUfo, 330, 590, 17);
        this.addEnemy(BlueTerror, 365, 590, 40);
        this.addEnemy(BluePlacer, 360, 590, 35);
        this.addEnemy(BlueEmperor, 420, 590, 45);
        this.addEnemy(RedInvader, 390, 590, 25);
        this.addEnemy(RedUfo, 415, 590, 25);

        // boss
        this.addBoss(MetalEmperor, 600);
        // orange package
        this.addEnemy(OrangePackage, 360, 570, 90);

        // STAGE 3
        this.addEnemy(BlueInvader, 601, 890, 4);
        this.addEnemy(BlueUfo, 601, 890, 11);
        this.addEnemy(Diver, 660, 890, 60);
        this.addEnemy(RedInvader, 605, 890, 11);
        this.addEnemy(RedUfo, 635, 890, 14);
        this.addEnemy(RedTerror, 740, 890, 40);
        this.addEnemy(RedPlacer, 685, 890, 35);
        this.addEnemy(RedEmperor, 730, 890, 45);

        // boss
        this.addBoss(FamiliarSight, 900);
        // orange package
        this.addEnemy(OrangePackage, 630, 870, 90);

        // STAGE 4
        this.addEnemy(RedInvader, 905, 1185, 4);
        this.addEnemy(RedUfo, 910, 1185, 11);
        this.addEnemy(RedPlacer, 960, 1185, 30);
        this.addEnemy(RedEmperor, 990, 1185, 40);
        this.addEnemy(RedTerror, 1050, 1185, 35);
        this.addEnemy(Diver, 960, 1185, 60);
        this.addEnemy(BlackInvader, 1050, 1185, 20);
        this.addEnemy(YellowUfo, 1050, 1185, 14);
        // boss
        this.addBoss(Fk77, 1200);
        // orange package
        this.addEnemy(OrangePackage, 950, 1170, 90);

        // STAGE 5
        this.addEnemy(BlackInvader, 1205, 1490, 4);
        this.addEnemy(Diver, 1260, 1490, 60);
        this.addEnemy(YellowUfo, 1210, 1490, 11);
        this.addEnemy(BlackPlacer, 1260, 1490, 30);
        this.addEnemy(BlackEmperor, 1290, 1490, 40);
        this.addEnemy(BlackTerror, 1320, 1490, 35);
        // boss
        this.addBoss(Abuser, 1500);
        // orange package
        this.addEnemy(OrangePackage, 1250, 1470, 90);
    }

    spawnEnemies() {
        setInterval(() => {
            this.enemiesToSpawn.forEach((enemyToSpawn) => {
                if (this.shouldSpawn(enemyToSpawn)) {
                    game.enemies.add(new enemyToSpawn.enemyType());
                }
            });
        }, 1000);
    }

    spawnBosses() {
        setInterval(() => {
            this.bossesToSpawn.forEach((bossToSpawn) => {
                if (bossToSpawn.spawnTime === game.state.time && !game.state.boss) {
                    game.enemies.add(new bossToSpawn.bossType());
                }
            });
        }, 1000);
    }

    addEnemy(enemyType, startTime, endTime, interval) {
        this.enemiesToSpawn.push({
            enemyType: enemyType,
            startTime: startTime,
            endTime: endTime,
            interval: interval,
        });
    }

    addBoss(bossType, spawnTime) {
        this.bossesToSpawn.push({
            bossType: bossType,
            spawnTime: spawnTime,
        });
    }

    shouldSpawn(enemy) {
        // enemy is in specified time bracket
        const isInRange = game.state.time >= enemy.startTime && game.state.time <= enemy.endTime;

        // game is not in boss/paused/clock state
        const isInState = !game.state.boss && !game.state.paused && !game.player.clock.active;

        // enemy's interval is reached (not in slowmo mode)
        const isInSpawnTime = game.state.time % enemy.interval === 0 && !game.state.slowmo;

        // enemy's interval is reached (in slowmo mode)
        const isInSlowmoSpawntime =
            game.state.time % (enemy.interval / game.slowmocontroller.slowmorate) === 0 && game.state.slowmo;

        // check for all conditions
        return isInRange && isInState && (isInSpawnTime || isInSlowmoSpawntime);
    }
}
