import * as PIXI from 'pixi.js';

export default class Transition{
    constructor(app){
        this.transitionBox = new PIXI.Container();
        this.app = app;
        this.next = 0;
        this.step = 0;
        this.createBg();
        this.createSpaceShip();
    }

    createBg(){
        this.spaceBg = new PIXI.Sprite(this.app.loader.resources['spaceBg_01'].texture);
        this.spaceBg.x = document.documentElement.clientWidth / 2;
        this.spaceBg.y = document.documentElement.clientHeight / 2
        this.spaceBg.anchor.set(0.5);
        this.transitionBox.addChild(this.spaceBg);
    }

    createSpaceShip(){
        this.spaceShip = new PIXI.Sprite(this.app.loader.resources['spaceship'].texture);
        this.spaceShip.anchor.set(0.5);
        this.transitionBox.addChild(this.spaceShip);
    }

    enter(){
        this.step = 0;
        switch(this.next){
            case 1:
                game.sound.sound_1Play("spaceship_engine_right");
                this.spaceShip.x = document.documentElement.clientWidth;
                this.spaceShip.y = document.documentElement.clientHeight;
                this.spaceShip.rotation = -Math.atan(document.documentElement.clientWidth / document.documentElement.clientHeight);
            break;
            case 2:
                game.sound.sound_1Play("spaceship_engine_left");
                this.spaceShip.x = 0;
                this.spaceShip.y = document.documentElement.clientHeight;
                this.spaceShip.rotation = Math.atan(document.documentElement.clientWidth / document.documentElement.clientHeight);
            break;
        }
    }

    update(){
        switch(this.next){
            case 1:
                this.spaceShip.x = document.documentElement.clientWidth - document.documentElement.clientWidth / 240 * this.step;
                this.spaceShip.y = document.documentElement.clientHeight - document.documentElement.clientHeight / 240 * this.step;
            break;
            case 2:
                this.spaceShip.x = document.documentElement.clientWidth / 240 * this.step;
                this.spaceShip.y = document.documentElement.clientHeight - document.documentElement.clientHeight / 240 * this.step;
            break;
        }
        if(this.step > 240){
            game.Manager.enter(this.next);
        }
        this.step++
        this.spaceBg.rotation -= 0.0002;
    }
}