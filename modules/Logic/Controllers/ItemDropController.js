// ITEMS ARE DROPPED BY RED PACKAGES

import { game } from '../../../app.js';
import { Notification } from '../../Effects/Misc/Notification.js';
import { randomInRange } from '../Helpers.js';
import { ITEMS } from '../../Objects/Items.js';

// NOTIFICATIONS COORDINATES & DURATION ON ITEM DROP
const NOTIFICATION_DURATION = 400; // in ticks. higher = longer
const NOTIFICATION_X = 190;
const NOTIFICATION_Y = 440;

// DROP RATE FOR NON-REPETITIVE POOL
const RATE = 80;

export class ItemDropController {
    constructor() {
        this.aquiredItems = [];

        // POOLS PREPARATION

        this.pool1 = [ITEMS.uranium, ITEMS.timefreeze];
        this.pool2 = [ITEMS.clock, ITEMS.greed, ITEMS.loopers];

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
            ITEMS.shotgun,
            ITEMS.machinegun,
            ITEMS.rocket,
            ITEMS.nitrogen,
            ITEMS.airstrike,
            ITEMS.bomb,
            ITEMS.emp,
            ITEMS.metalshield,
        ];

        // add 'repeated' property only to repeatable items,
        // to be incremented every time the item is aquired
        this.repetitivePool.forEach((item) => (item.repeated = 0));
    }

    drop() {
        const roll = randomInRange(0, 100);

        if (roll <= RATE && this.itemPool.length) {
            // pick an item from non-repetitive-item pool & remove it from pool
            const randomIndex = randomInRange(0, this.itemPool.length - 1);
            this.aquireAndActivate(this.itemPool[randomIndex]);
            this.itemPool.splice(randomIndex, 1);
        } else {
            // pick an item from repetitive-item pool
            const randomIndex = randomInRange(0, this.repetitivePool.length - 1);
            this.aquireAndActivate(this.repetitivePool[randomIndex]);
        }
    }

    aquireAndActivate(item) {
        if (this.aquiredItems.includes(item)) {
            const ownedItem = this.aquiredItems[this.aquiredItems.indexOf(item)];
            ownedItem.repeated++;
        } else {
            this.aquiredItems.push(item);
        }
        this.addItemNotification(item);
        item.activate();
    }

    addItemNotification(item) {
        game.effects.clearNotifications('item');
        game.effects.add(
            new Notification(NOTIFICATION_X, NOTIFICATION_Y, item.notification, NOTIFICATION_DURATION, 'item')
        );
    }
}
