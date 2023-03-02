import { game } from '../../../app.js';
import { OrangePackage } from '../../Actors/Packages/OrangePackage.js';
import { RedPackage } from '../../Actors/Packages/RedPackage.js';
import {
    LASERSOUND,
    RELOADSOUND,
    SHIELDDOWNSOUND,
    SHIELDUPSOUND,
    MUSICS0,
    MUSICS1,
    MUSICS2,
    MUSICS3,
    MUSICBOSS0,
    MUSICBOSS1,
    MUSICBOSS2,
    MUSICSLOWMO,
    MUSICGAMEOVER,
    HITSOUND,
    HITQUADSOUND,
    HITMETALSOUND,
    MUSICCLOCK,
    MUSICBOSS3,
    MUSICBOSS4,
    MUSICS4,
    DIVERSOUND,
    SLOWMOCHARGESOUND,
    SLOWMOEMPTYSOUND,
    RAINSOUND,
    THUNDER0SOUND,
    THUNDER1SOUND,
    WINDSOUND,
    SANDSOUND,
    SANDFXSOUND,
    VORTEXSOUND,
    GLITCHSOUND,
    MATRIXSOUND,
    ANXIETYSOUND,
    PHASESOUND,
    SPLASHSOUND,
    PHEWSOUND,
    EXPLOSIONNORMALSOUND,
    EXPLOSIONBIGSOUND,
    SMOKESOUND,
    SWOOSHSOUND,
    STEAMSOUND,
    BEEPREDSOUND,
    BEEPORANGESOUND,
    POWERDOWNSOUND,
    FAMILIARMGSOUND,
    SIRENSOUND,
    COINSOUND,
} from '../../Assets/Audio.js';

const MUSIC = {
    stage0: MUSICS0,
    stage1: MUSICS1,
    stage2: MUSICS2,
    stage3: MUSICS3,
    stage4: MUSICS4,
    boss0: MUSICBOSS0,
    boss1: MUSICBOSS1,
    boss2: MUSICBOSS2,
    boss3: MUSICBOSS3,
    boss4: MUSICBOSS4,
    slowmo: MUSICSLOWMO,
    gameover: MUSICGAMEOVER,
    clock: MUSICCLOCK,
};

const ANIMATION_SOUNDS = {
    phase: PHASESOUND,
    splash: SPLASHSOUND,
    phew: PHEWSOUND,
    exp_normal: EXPLOSIONNORMALSOUND,
    exp_big: EXPLOSIONBIGSOUND,
    smoke: SMOKESOUND,
    reload: RELOADSOUND,
};

const HITSOUNDS = { standard: HITSOUND, quad: HITQUADSOUND, metal: HITMETALSOUND };

// SOUNDS LIMITS
const MAX_CONCURRENT_HITS = 5;
const MAX_CONCURRENT_COINS = 10;
const HITSOUND_VOLUME = 0.5;
const LASER_VOLUME = 0.7;

export class AudioController {
    constructor() {
        for (const key in MUSIC) {
            MUSIC[key].loop = true;
        }
        RAINSOUND.loop = true;
        WINDSOUND.loop = true;
        SANDSOUND.loop = true;
        VORTEXSOUND.loop = true;
        MATRIXSOUND.loop = true;
        SIRENSOUND.loop = true;
        this.currentlyPlayingHits = 0;
        this.currentlyPlayingCoins = 0;
    }

    rewind() {
        for (const key in MUSIC) {
            MUSIC[key].currentTime = 0;
        }
    }

    playTrack(track) {
        for (const key in MUSIC)
            if (key === track) {
                if (key === 'slowmo') {
                    MUSIC[key].currentTime = 0;
                }
                MUSIC[key].play();
            } else {
                MUSIC[key].pause();
            }
    }

    playHitSound(enemy) {
        // PACKAGES
        if (enemy.constructor === RedPackage || enemy.constructor === OrangePackage) {
            const metalSound = HITSOUNDS['metal'].cloneNode(true);
            metalSound.volume = HITSOUND_VOLUME;
            return this.queueHitSound(metalSound);
        }

        // QUAD-DAMAGE
        if (game.state.variables.quaddamage) {
            const quadSound = HITSOUNDS['quad'].cloneNode(true);
            quadSound.volume = HITSOUND_VOLUME;
            return this.queueHitSound(quadSound);
        }

        // NORMAL ENEMIES
        const hitSound = HITSOUNDS['standard'].cloneNode(true);
        hitSound.volume = HITSOUND_VOLUME;
        this.queueHitSound(hitSound);
    }

    queueHitSound(hitSound) {
        hitSound.onended = () => {
            this.currentlyPlayingHits--;
        };

        if (this.currentlyPlayingHits <= MAX_CONCURRENT_HITS) {
            this.currentlyPlayingHits++;
            hitSound.play();
        }
    }

    playAnimationSound(type) {
        ANIMATION_SOUNDS[type].cloneNode(true).play();
    }

    playLaserSound() {
        const laserSound = LASERSOUND.cloneNode(true);
        laserSound.volume = LASER_VOLUME;
        laserSound.play();
    }

    playBeepRedSound() {
        BEEPREDSOUND.play();
    }

    playBeepOrangeSound() {
        BEEPORANGESOUND.play();
    }

    playShieldUpSound() {
        SHIELDUPSOUND.play();
    }

    playShieldDownSound() {
        SHIELDDOWNSOUND.play();
    }

    playDiverSound() {
        DIVERSOUND.play();
    }

    playSlowmoEmptySound() {
        SLOWMOEMPTYSOUND.cloneNode(true).play();
    }

    playSlowmoChargeSound() {
        SLOWMOCHARGESOUND.play();
    }

    stopSlowmoChargeSound() {
        SLOWMOCHARGESOUND.pause();
        SLOWMOCHARGESOUND.currentTime = 0;
    }

    playRainSound() {
        RAINSOUND.play();
    }

    stopRainSound() {
        RAINSOUND.pause();
    }

    playWindSound() {
        WINDSOUND.play();
    }

    stopWindSound() {
        WINDSOUND.pause();
    }

    playBigThunderSound() {
        THUNDER0SOUND.play();
    }

    playSmallThunderSound() {
        THUNDER1SOUND.play();
    }

    playSandSound() {
        SANDSOUND.play();
    }

    stopSandSound() {
        SANDSOUND.pause();
    }

    playSandFxSound() {
        SANDFXSOUND.play();
    }

    playVortexSound() {
        VORTEXSOUND.play();
    }

    stopVortexSound() {
        VORTEXSOUND.pause();
    }

    playGlitchSound() {
        GLITCHSOUND.play();
    }

    playMatrixSound() {
        MATRIXSOUND.play();
    }

    stopMatrixSound() {
        MATRIXSOUND.pause();
    }

    playAnxietySound() {
        ANXIETYSOUND.cloneNode(true).play();
    }

    playSwooshSound() {
        SWOOSHSOUND.play();
    }

    playSteamSound() {
        STEAMSOUND.play();
    }

    playPowerdownSound() {
        POWERDOWNSOUND.play();
    }

    playFamiliarMgSound() {
        FAMILIARMGSOUND.play();
    }

    stopFamiliarMgSound() {
        FAMILIARMGSOUND.pause();
        FAMILIARMGSOUND.currentTime = 0;
    }

    playSirenSound() {
        SIRENSOUND.play();
    }

    stopSirenSound() {
        SIRENSOUND.pause();
        SIRENSOUND.currentTime = 0;
    }

    playCoinSound() {
        this.queueCoinSound(COINSOUND.cloneNode(true));
    }

    queueCoinSound(coinSound) {
        coinSound.onended = () => {
            this.currentlyPlayingCoins--;
        };

        if (this.currentlyPlayingCoins <= MAX_CONCURRENT_COINS) {
            this.currentlyPlayingCoins++;
            coinSound.play();
        }
    }
}
