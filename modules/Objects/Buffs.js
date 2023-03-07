import { game } from '../../app.js';

export const BUFFS = [
    {
        text: 'QUAD DAMAGE!',
        enable: () => (game.buffcontroller.quaddamage = true),
        disable: () => (game.buffcontroller.quaddamage = false),
    },
    {
        text: 'INVINCIBILITY!',
        enable: () => (game.buffcontroller.invincibility = true),
        disable: () => (game.buffcontroller.invincibility = false),
    },
    {
        text: 'YOU ARE MUTED!',
        enable: () => (game.buffcontroller.mute = true),
        disable: () => (game.buffcontroller.mute = false),
    },
    {
        text: 'NO SHIELD!',
        enable: () => {
            game.player.shield.deplete();
            game.buffcontroller.noshield = true;
        },
        disable: () => (game.buffcontroller.noshield = false),
    },
    {
        text: 'ENEMIES MUTED!',
        enable: () => (game.buffcontroller.muteenemies = true),
        disable: () => (game.buffcontroller.muteenemies = false),
    },
    {
        text: 'NO SLOW-MO!',
        enable: () => (game.buffcontroller.noslowmo = true),
        disable: () => (game.buffcontroller.noslowmo = false),
    },
    {
        text: `THOR'S HAMMER!`,
        enable: () => (game.buffcontroller.thorshammer = true),
        disable: () => (game.buffcontroller.thorshammer = false),
    },
];
