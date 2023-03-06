// ITEMS ARE DROPPED BY RED PACKAGES

import { game } from '../../../app.js';
import { Notification } from '../../Effects/Misc/Notification.js';
import { randomInRange } from '../Helpers.js';
import { ITEMS } from '../../Drops/Items.js';

// NOTIFICATIONS COORDINATES ON ITEM DROP
const NOTIFICATIONX = 190;
const NOTIFICATIONY = 440;

// DROP RATE FOR NON-REPETITIVE POOL
const RATE = 80;

export class ItemController {
    constructor() {
        this.aquiredItems = [];

        // POOLS PREPARATION

        this.pool1 = [ITEMS.uranium, ITEMS.timefreeze];
        this.pool2 = [ITEMS.clock, ITEMS.greed, ITEMS.loopers, ITEMS.debris];

        this.randomfrompool1 = this.pool1[randomInRange(0, this.pool1.length - 1)];
        this.randomfrompool2 = this.pool2[randomInRange(0, this.pool2.length - 1)];

        // FINAL ITEMS POOLS TO BE DROPPED FROM

        this.repetitivePool = [ITEMS.multiplydamage, ITEMS.spray];
        this.itemPool = [
            this.randomfrompool1,
            this.randomfrompool2,
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
            // Pick an item from non-repetitive-item pool & remove it from pool
            const rand = randomInRange(0, this.itemPool.length - 1);
            this.aquireAndActivate(this.itemPool[rand]);
            this.itemPool.splice(rand, 1);
        } else {
            // Pick an item from repetitive-item pool
            const rand = randomInRange(0, this.repetitivePool.length - 1);
            this.aquireAndActivate(this.repetitivePool[rand]);
        }
    }

    aquireAndActivate(item) {
        // If item is already owned, add a 'repeated' property to it,
        // or increment the 'repeated' property if it already exists
        if (this.aquiredItems.includes(item)) {
            const ownedItem = this.aquiredItems[this.aquiredItems.indexOf(item)];
            ownedItem.repeated = (ownedItem.repeated || 1) + 1;
        } else {
            this.aquiredItems.push(item);
        }
        game.effects.add(new Notification(NOTIFICATIONX, NOTIFICATIONY, item.notification, 400));
        item.activate();
    }
}
