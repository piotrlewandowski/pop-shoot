import { game } from '../../app.js';

export const BUFFS = [
    {
        text: 'QUAD DAMAGE!',
        enable: () => (game.state.variables.quaddamage = true),
        disable: () => (game.state.variables.quaddamage = false),
    },
    {
        text: 'INVINCIBILITY!',
        enable: () => (game.state.variables.invincibility = true),
        disable: () => (game.state.variables.invincibility = false),
    },
    {
        text: 'YOU ARE MUTED!',
        enable: () => (game.state.variables.mute = true),
        disable: () => (game.state.variables.mute = false),
    },
    {
        text: 'NO SHIELD!',
        enable: () => {
            game.player.shield.deplete();
            game.state.variables.noshield = true;
        },
        disable: () => (game.state.variables.noshield = false),
    },
    {
        text: 'ENEMIES MUTED!',
        enable: () => (game.state.variables.muteenemies = true),
        disable: () => (game.state.variables.muteenemies = false),
    },
    {
        text: 'NO SLOW-MO!',
        enable: () => (game.state.variables.noslowmo = true),
        disable: () => (game.state.variables.noslowmo = false),
    },
    {
        text: `THOR'S HAMMER!`,
        enable: () => (game.state.variables.thorshammer = true),
        disable: () => (game.state.variables.thorshammer = false),
    },
];
