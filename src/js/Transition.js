import * as PIXI from 'pixi.js';

export default class Transition{
    constructor(app){
        this.transitionBox = new PIXI.Container();
        this.meteorBox = new PIXI.Container();
        this.app = app;
        this.next = 0;
        this.step = 0;
        this.createBg();
        this.createMeteor();
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
            spaceShipList[i] = new PIXI.Texture(this.app.loader.resources['item_spaceship'].texture);
            spaceShipList[i].frame = new PIXI.Rectangle(i * 201 , 0 , 201 , 357);
        }
        this.spaceShip = new PIXI.AnimatedSprite(spaceShipList);
        this.spaceShip.animationSpeed = 0.2;
        this.spaceShip.anchor.set(0.5);
        this.spaceShip.play();
        this.transitionBox.addChild(this.spaceShip);
    }

    createMeteor(){
        this.meteorList = [];
        for(let i = 0 ; i < 16 ; i++){
            this.meteorList[i] = new PIXI.Texture(this.app.loader.resources['item_meteor'].texture);
            this.meteorList[i].frame = new PIXI.Rectangle(i * 116 , 0 , 116 , 830);
        }
        this.transitionBox.addChild(this.meteorBox);
    }

    addMeteor(){
        this.meteorBox.removeChildren();
        this.meteor = [];
        let self = this;
        for(let i = 0 ; i < Math.floor(Math.random() * 5) ; i++){
            this.meteor[i] = new PIXI.AnimatedSprite(this.meteorList);
            this.meteor[i].animationSpeed = this.random(15 , 30) / 100;
            this.meteor[i].anchor.set(0.5);
            this.meteor[i].scale.set(this.random(1 , 6) / 10);
            this.meteor[i].loop = false;
            this.meteor[i].x = Math.floor(Math.random() * document.documentElement.clientWidth);
            this.meteor[i].y = Math.floor(Math.random() * document.documentElement.clientHeight);
            if(this.next == 1){
                this.meteor[i].rotation = -Math.atan(document.documentElement.clientWidth / document.documentElement.clientHeight);
            }else{
                this.meteor[i].rotation = Math.atan(document.documentElement.clientWidth / document.documentElement.clientHeight);
            }
            setTimeout(function(){
                self.meteor[i].gotoAndPlay(0);
            }, this.random(0 , 3000))
            this.meteorBox.addChild(this.meteor[i]);
        }
    }

    random(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }

    skip(){
        game.Manager.enter(this.next);
    }

    enter(){
        this.step = 0;
        this.text.step = 0;
        this.addMeteor();

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