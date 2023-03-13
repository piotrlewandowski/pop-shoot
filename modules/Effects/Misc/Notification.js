export class Notification {
    constructor(x, y, sprite, duration, type) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.duration = duration;

        // type is either 'stage' or 'item' - used to differentiate
        // & clear notifications to prevent overlap
        this.type = type;
    }

    move() {
        this.duration--;
    }
}
