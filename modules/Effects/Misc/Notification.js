export class Notification {
    constructor(x, y, sprite, duration) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.duration = duration;
    }

    move() {
        this.duration--;
    }
}
