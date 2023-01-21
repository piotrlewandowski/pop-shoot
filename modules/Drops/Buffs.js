import { game } from '../../app.js';

export class Buffs {
    // Each buff will:
    // 1- Modify the game variable corresponding to the buff
    // 2- Return a function that reverts the change. This function
    // will be used in the buff controller in a timer.

    static _quaddamage() {
        game.state.variables.quaddamage = true;
        return () => (game.state.variables.quaddamage = false);
    }

    static _invincibility() {
        game.state.variables.invincibility = true;
        return () => (game.state.variables.invincibility = false);
    }

    static _mute() {
        game.state.variables.mute = true;
        return () => (game.state.variables.mute = false);
    }

    static _noshield() {
        game.state.variables.noshield = true;
        game.player.shield.deplete();
        return () => (game.state.variables.noshield = false);
    }

    static _muteenemies() {
        game.state.variables.muteenemies = true;
        return () => (game.state.variables.muteenemies = false);
    }

    static _noslowmo() {
        game.state.variables.noslowmo = true;
        return () => (game.state.variables.noslowmo = false);
    }

    static _blankbullets() {
        game.state.variables.blankbullets = true;
        return () => (game.state.variables.blankbullets = false);
    }
}
