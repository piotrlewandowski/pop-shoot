import { CANVAS } from '../../Assets/Other.js';

export class Movement {
    static move(angle, speed) {
        const dx = Math.cos((angle / 180) * Math.PI) * speed;
        const dy = Math.sin((angle / 180) * Math.PI) * speed;
        return { x: dx, y: dy };
    }

    // moves 'entity' towards 'destination'
    static moveTowards(entityX, entityY, destinationX, destinationY, speed) {
        const dx = destinationX - entityX;
        const dy = destinationY - entityY;

        const goal_dist = Math.sqrt(dx * dx + dy * dy);
        const ratio = speed / goal_dist;

        const xIncrement = ratio * dx || 0;
        const yIncrement = ratio * dy || 0;

        return { x: xIncrement, y: yIncrement };
    }

    // moves 2 enemies away from each other
    static moveAway(enemy1, enemy2) {
        if (enemy1.x < enemy2.x) {
            if (!enemy1.name) {
                enemy1.x += Movement.move(180, enemy1.speed).x; // move left
                enemy1.y += Movement.move(180, enemy1.speed).y; // move left
            }
            if (!enemy2.name) {
                enemy2.x += Movement.move(0, enemy2.speed).x; // move right
                enemy2.y += Movement.move(0, enemy2.speed).y; // move right
            }
        } else {
            if (!enemy1.name) {
                enemy1.x += Movement.move(0, enemy1.speed).x; // move right
                enemy1.y += Movement.move(0, enemy1.speed).y; // move right
            }

            if (!enemy2.name) {
                enemy2.x += Movement.move(180, enemy2.speed).x; // move left
                enemy2.y += Movement.move(180, enemy2.speed).y; // move left
            }
        }
    }

    // moves an enemy back to the screen if going out of canvas
    static moveToCanvas(enemy) {
        if (enemy.x > CANVAS.width - enemy.radius) {
            enemy.x += Movement.move(180, enemy.speed).x; // move left
            enemy.y += Movement.move(180, enemy.speed).y; // move left
        }
        if (enemy.x < enemy.radius) {
            enemy.x += Movement.move(0, enemy.speed).x; // move right
            enemy.y += Movement.move(0, enemy.speed).y; // move right
        }
    }
}
