// ITEMS ARE DROPPED BY RED PACKAGES

import { game } from '../../../app.js';
import { Notification } from '../../Effects/Misc/Notification.js';
import { randomInRange } from '../Helpers.js';
import { Items } from '../../Drops/Items.js';

import {
    BOMBS_NOTIFICATION,
    CLOCK_NOTIFICATION,
    DAMAGE_NOTIFICATION,
    BOMBS_PAUSE,
    CLOCK_PAUSE,
    DAMAGE_PAUSE,
    EMP_PAUSE,
    LOOPERS_PAUSE,
    METALSHIELD_PAUSE,
    NITROGEN_PAUSE,
    DARTS_PAUSE,
    ROCKET_PAUSE,
    SEEKERS_PAUSE,
    SPRAY_PAUSE,
    TIMEFREEZE_PAUSE,
    URANIUM_PAUSE,
    EMP_NOTIFICATION,
    BOMBS_ICON,
    CLOCK_ICON,
    DAMAGE_ICON,
    EMP_ICON,
    LOOPERS_ICON,
    METALSHIELD_ICON,
    NITROGEN_ICON,
    DARTS_ICON,
    ROCKET_ICON,
    SEEKERS_ICON,
    SPRAY_ICON,
    TIMEFREEZE_ICON,
    URANIUM_ICON,
    LOOPERS_NOTIFICATION,
    METALSHIELD_NOTIFICATION,
    NITROGEN_NOTIFICATION,
    DARTS_NOTIFICATION,
    ROCKET_NOTIFICATION,
    SEEKERS_NOTIFICATION,
    SPRAY_NOTIFICATION,
    TIMEFREEZE_NOTIFICATION,
    URANIUM_NOTIFICATION,
    GREED_ICON,
    GREED_PAUSE,
    GREED_NOTIFICATION,
    MACHINEGUN_ICON,
    MACHINEGUN_PAUSE,
    MACHINEGUN_NOTIFICATION,
    TOXIC_ICON,
    TOXIC_NOTIFICATION,
    TOXIC_PAUSE,
    DRONES_ICON,
    DRONES_NOTIFICATION,
    DRONES_PAUSE,
    AIRSTRIKE_ICON,
    AIRSTRIKE_PAUSE,
    AIRSTRIKE_NOTIFICATION,
    DEBRIS_ICON,
    DEBRIS_PAUSE,
    DEBRIS_NOTIFICATION,
} from '../../Assets/Hud.js';

const DRAWINGS = {
    darts: { icon: DARTS_ICON, pause: DARTS_PAUSE, notification: DARTS_NOTIFICATION },
    bomb: { icon: BOMBS_ICON, pause: BOMBS_PAUSE, notification: BOMBS_NOTIFICATION },
    drones: { icon: DRONES_ICON, pause: DRONES_PAUSE, notification: DRONES_NOTIFICATION },
    toxic: { icon: TOXIC_ICON, pause: TOXIC_PAUSE, notification: TOXIC_NOTIFICATION },
    machinegun: { icon: MACHINEGUN_ICON, pause: MACHINEGUN_PAUSE, notification: MACHINEGUN_NOTIFICATION },
    greed: { icon: GREED_ICON, pause: GREED_PAUSE, notification: GREED_NOTIFICATION },
    loopers: { icon: LOOPERS_ICON, pause: LOOPERS_PAUSE, notification: LOOPERS_NOTIFICATION },
    uranium: { icon: URANIUM_ICON, pause: URANIUM_PAUSE, notification: URANIUM_NOTIFICATION },
    timefreeze: { icon: TIMEFREEZE_ICON, pause: TIMEFREEZE_PAUSE, notification: TIMEFREEZE_NOTIFICATION },
    emp: { icon: EMP_ICON, pause: EMP_PAUSE, notification: EMP_NOTIFICATION },
    damage: { icon: DAMAGE_ICON, pause: DAMAGE_PAUSE, notification: DAMAGE_NOTIFICATION },
    spray: { icon: SPRAY_ICON, pause: SPRAY_PAUSE, notification: SPRAY_NOTIFICATION },
    metalshield: { icon: METALSHIELD_ICON, pause: METALSHIELD_PAUSE, notification: METALSHIELD_NOTIFICATION },
    nitrogen: { icon: NITROGEN_ICON, pause: NITROGEN_PAUSE, notification: NITROGEN_NOTIFICATION },
    rocket: { icon: ROCKET_ICON, pause: ROCKET_PAUSE, notification: ROCKET_NOTIFICATION },
    seekers: { icon: SEEKERS_ICON, pause: SEEKERS_PAUSE, notification: SEEKERS_NOTIFICATION },
    clock: { icon: CLOCK_ICON, pause: CLOCK_PAUSE, notification: CLOCK_NOTIFICATION },
    airstrike: { icon: AIRSTRIKE_ICON, pause: AIRSTRIKE_PAUSE, notification: AIRSTRIKE_NOTIFICATION },
    debris: { icon: DEBRIS_ICON, pause: DEBRIS_PAUSE, notification: DEBRIS_NOTIFICATION },
};

const NOTIFICATIONX = 520;
const NOTIFICATIONY = 440;

// DROP RATES
const RATE = 80;

export class ItemController {
    constructor() {
        this.icons = [];
        this.descriptions = [];

        // ITEM PREPARATIONS

        this.pool1 = [Items._uraniumfuel, Items._timefreeze];
        this.pool2 = [Items._clock, Items._greed, Items._loopers, Items._debris];

        this.randompool1 = this.pool1[randomInRange(0, this.pool1.length - 1)];
        this.randompool2 = this.pool2[randomInRange(0, this.pool2.length - 1)];

        // FINAL ITEMS

        this.repetitive = [Items._multiplydamage, Items._spray];

        this.items = [
            this.randompool1,
            this.randompool2,
            Items._darts,
            Items._seekers,
            Items._toxic,
            Items._drones,
            Items._machinegun,
            Items._rocket,
            Items._nitrogen,
            Items._airstrike,
            Items._bomb,
            Items._emp,
            Items._metalshield,
        ];
    }

    drop() {
        const roll = randomInRange(0, 100);

        if (roll <= RATE && this.items.length) {
            // pick from normal items
            const rand = randomInRange(0, this.items.length - 1);
            this.items[rand]();
            this.items.splice(rand, 1);
        } else {
            // pick from repetitive pool
            const rand = randomInRange(0, this.repetitive.length - 1);
            this.repetitive[rand]();
        }
    }

    // DRAWING FUNCTIONS
    // Responsible for drawing the item's icon, pause description
    // and notification upon pickup

    drawAll(type) {
        this.drawIcon(type);
        this.drawNotification(type);
        this.drawPauseDescription(type);
    }

    drawIcon(type) {
        this.icons.push(DRAWINGS[type].icon);
    }

    drawNotification(type) {
        game.effects.add(new Notification(NOTIFICATIONX, NOTIFICATIONY, DRAWINGS[type].notification, 400));
    }

    drawPauseDescription(type) {
        this.descriptions.push(DRAWINGS[type].pause);
    }
}
