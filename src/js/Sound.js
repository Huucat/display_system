import spaceship_01 from '@/assets/sounds/spaceship_01.mp3'
import spaceship_02 from '@/assets/sounds/spaceship_02.mp3'
import button_close_01 from '@/assets/sounds/button_close_01.mp3'
import button_close_02 from '@/assets/sounds/button_close_02.mp3'
import button_down_01 from '@/assets/sounds/button_down_01.mp3'
import button_down_02 from '@/assets/sounds/button_down_02.mp3'
import button_down_03 from '@/assets/sounds/button_down_03.mp3'
import button_hover_01 from '@/assets/sounds/button_hover_01.mp3'
import button_hover_02 from '@/assets/sounds/button_hover_02.mp3'
import dididi from '@/assets/sounds/dididi.mp3'
import spaceship_engine_left from '@/assets/sounds/spaceship_engine_left.mp3'
import spaceship_engine_right from '@/assets/sounds/spaceship_engine_right.mp3'

export default class Sound{
    constructor(){
        this.bgm_1 = new Audio();
        this.bgm_2 = new Audio();
        this.sound_1 = new Audio();
        this.sound_2 = new Audio();
        this.bgm_1.volume = 0.7;
        this.bgm_1.loop = true;
        this.bgm_2.volume = 0.7;
        this.bgm_2.loop = true;

        this.spaceship_01 = spaceship_01;
        this.spaceship_02 = spaceship_02;
        this.button_close_01 = button_close_01;
        this.button_close_02 = button_close_02;
        this.button_down_01 = button_down_01;
        this.button_down_02 = button_down_02;
        this.button_down_03 = button_down_03;
        this.button_hover_01 = button_hover_01;
        this.button_hover_02 = button_hover_02;
        this.dididi = dididi;
        this.spaceship_engine_left = spaceship_engine_left;
        this.spaceship_engine_right = spaceship_engine_right;
    }

    gameStart(){
        this.bgm_1.src = this.spaceship_01;
        this.bgm_1.load();
        this.bgm_1.play();
    }

    sound_bgm_1(data){
        this.bgm_1.src = this[data];
        let playPromise = this.bgm_1.play();

        if (playPromise != undefined) {
            playPromise.then(() => {
                this.bgm_1.play();
            }).catch(()=> {
               
            })
        }
    }

    sound_bgm_1_pause(){
        this.bgm_1.pause()
    }

    sound_bgm_2(data){
        this.bgm_2.src = this[data];
        let playPromise = this.bgm_2.play();

        if (playPromise != undefined) {
            playPromise.then(() => {
                this.bgm_2.play();
            }).catch(()=> {
               
            })
        }
    }

    sound_bgm_2_pause(){
        this.bgm_2.pause()
    }

    sound_1Play(data){
        this.sound_1.src = this[data];
        let playPromise = this.sound_1.play();

        if (playPromise != undefined) {
            playPromise.then(() => {
                this.sound_1.play();
            }).catch(()=> {
               
            })
        }
    }

    sound_2Play(data){
        this.sound_2.src = this[data];
        let playPromise = this.sound_2.play();

        if (playPromise != undefined) {
            playPromise.then(() => {
                this.sound_2.play();
            }).catch(()=> {
               
            })
        }
    }
}