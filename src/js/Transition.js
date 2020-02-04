import * as PIXI from 'pixi.js';

export default class Transition{
    constructor(app){
        this.transitionBox = new PIXI.Container();
        this.app = app;
        this.next = 0;
        this.step = 0;
        this.createBg();
        this.createSpaceShip();
        this.createText();
    }

    createBg(){
        let self = this;
        this.spaceBg = new PIXI.Sprite(this.app.loader.resources['spaceBg_01'].texture);
        this.spaceBg.x = document.documentElement.clientWidth / 2;
        this.spaceBg.y = document.documentElement.clientHeight / 2
        this.spaceBg.anchor.set(0.5);
        this.spaceBg.interactive = true;
        this.spaceBg.on('pointerdown', function(){self.skip()});
        this.transitionBox.addChild(this.spaceBg);
    }

    createText(){
        this.text = new PIXI.Text('クリックでスキップ' , game.fontStyle.KaisoNext);
        this.text.style.fontSize = 40;
        this.text.step = 0;
        this.text.anchor.set(0.5 , 0);
        this.text.position.set(document.documentElement.clientWidth / 2 , document.documentElement.clientHeight - 120);
        this.transitionBox.addChild(this.text);
    }

    createSpaceShip(){
        let spaceShipList = [];
        for(let i = 0 ; i < 4 ; i++){
            spaceShipList[i] = new PIXI.Texture(this.app.loader.resources['spaceship'].texture);
            spaceShipList[i].frame = new PIXI.Rectangle(i * 201 , 0 , 201 , 357);
        }
        this.spaceShip = new PIXI.AnimatedSprite(spaceShipList);
        this.spaceShip.animationSpeed = 0.15;
        this.spaceShip.anchor.set(0.5);
        this.spaceShip.play();
        this.transitionBox.addChild(this.spaceShip);
    }

    skip(){
        game.Manager.enter(this.next);
    }

    enter(){
        this.step = 0;
        this.text.step = 0;
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
                this.spaceShip.x = document.documentElement.clientWidth - (document.documentElement.clientWidth / 180) * this.step;
                this.spaceShip.y = document.documentElement.clientHeight - (document.documentElement.clientHeight / 180) * this.step;
            break;
            case 2:
                this.spaceShip.x = (document.documentElement.clientWidth / 180) * this.step;
                this.spaceShip.y = document.documentElement.clientHeight - (document.documentElement.clientHeight / 180) * this.step;
            break;
        }
        if(this.step > 180){
            game.Manager.enter(this.next);
        }
        this.step++;
        this.text.alpha = Math.sin(this.text.step) * 0.5 + 0.5;
        this.text.step += 0.125;
        this.spaceBg.rotation -= 0.0002;
    }
}