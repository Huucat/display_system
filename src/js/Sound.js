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

export default class Sound{
    constructor(){
        this.bgm = new Audio();
        this.sound_1 = new Audio();
        this.sound_2 = new Audio();
        this.bgm.volume = 0.7;
        this.bgm.loop = true;

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
    }

    gameStart(){
        this.bgm.src = this.spaceship_01;
        this.bgm.load();
        let playPromise = this.bgm.play();

        if (playPromise != undefined) {
            playPromise.then(() => {
                this.bgm.play();
            }).catch(()=> {
               
            })
        }
    }

    sound_bgm(data){
        this.bgm.src = this[data];
        this.bgm.load();
        let playPromise = this.bgm.play();

        if (playPromise != undefined) {
            playPromise.then(() => {
                this.bgm.play();
            }).catch(()=> {
               
            })
        }
    }

    sound_1Play(data){
        this.sound_1.src = this[data];
        this.sound_1.load();
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
        this.sound_2.load();
        let playPromise = this.sound_2.play();

        if (playPromise != undefined) {
            playPromise.then(() => {
                this.sound_2.play();
            }).catch(()=> {
               
            })
        }
    }
}