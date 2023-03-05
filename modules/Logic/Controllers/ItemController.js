// ITEMS ARE DROPPED BY RED PACKAGES

import { game } from '../../../app.js';
import { Notification } from '../../Effects/Misc/Notification.js';
import { randomInRange } from '../Helpers.js';
import { ITEMS } from '../../Drops/Items.js';

// NOTIFIATIONS COORDINATES ON OBJECT DROP
const NOTIFICATIONX = 190;
const NOTIFICATIONY = 440;

// DROP RATES
const RATE = 80;

export class ItemController {
    constructor() {
        this.aquiredItems = {};

        Object.keys(ITEMS).forEach((key) => {
            this.aquiredItems[key] = 0;
        });

        // ITEM PREPARATIONS
        this.pool1 = [ITEMS.uranium, ITEMS.timefreeze];
        this.pool2 = [ITEMS.clock, ITEMS.greed, ITEMS.loopers, ITEMS.debris];

        this.randompool1 = this.pool1[randomInRange(0, this.pool1.length - 1)];
        this.randompool2 = this.pool2[randomInRange(0, this.pool2.length - 1)];

        // FINAL ITEMS
        this.repetitivePool = [ITEMS.multiplydamage, ITEMS.spray];

        this.itemPool = [
            this.randompool1,
            this.randompool2,
            ITEMS.darts,
            ITEMS.seekers,
            ITEMS.toxic,
            ITEMS.drones,
            ITEMS.machinegun,
            ITEMS.rocket,
            ITEMS.nitrogen,
            ITEMS.airstrike,
            ITEMS.bomb,
            ITEMS.emp,
            ITEMS.metalshield,
        ];
    }

    drop() {
        const roll = randomInRange(0, 100);
        if (roll <= RATE && this.itemPool.length) {
            // pick from non-repetitive items
            const rand = randomInRange(0, this.itemPool.length - 1);
            this.aquireAndActivate(this.itemPool[rand]);
            this.itemPool.splice(rand, 1);
        } else {
            // pick from repetitive pool
            const rand = randomInRange(0, this.repetitivePool.length - 1);
            this.aquireAndActivate(this.repetitivePool[rand]);
        }
    }

    aquireAndActivate(item) {
        this.aquiredItems[item.name]++;
        game.effects.add(new Notification(NOTIFICATIONX, NOTIFICATIONY, item.notification, 400));
        item.activate();
    }
}
