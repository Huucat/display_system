import * as PIXI from 'pixi.js';
import Constellation from './Constellation.js';

export default class Space {
    constructor(app){
        this.app = app;
        this.spaceBox = new PIXI.Container();
        this.flameBox = new PIXI.Container();
        this.constellationGroups = new PIXI.Container();
        this.spaceBox.addChild(this.constellationGroups , this.flameBox);
        this.constellation = [];

        this.constellationGroups.x = document.documentElement.clientWidth / 2;
        this.constellationGroups.y = document.documentElement.clientHeight / 2 + 1350;
        
        this.addSpaceBg();
        this.createConstellation();
        this.addFlame();
    }

    addSpaceBg(){
        this.spaceBg = new PIXI.Sprite(this.app.loader.resources['spaceBg_01'].texture);
        this.spaceBg.anchor.set(0.5);
        this.constellationGroups.addChild(this.spaceBg);
    }

    addFlame(){
        this.flame = new PIXI.Sprite(this.app.loader.resources['flame'].texture);
        this.flame.x = document.documentElement.clientWidth / 2;
        this.flame.anchor.set(0.5 , 0);
        this.flame.width = document.documentElement.clientWidth + 50;
        this.flame.height = document.documentElement.clientHeight;
        let flame_bottom_list = []
        for(let i = 0 ; i < 6 ; i++){
            flame_bottom_list[i] = new PIXI.Texture(this.app.loader.resources['flame_bottom'].texture);
            flame_bottom_list[i].frame = new PIXI.Rectangle(i * 1920 , 0 , 1920 , 180);
        }
        this.flameBottom = new PIXI.AnimatedSprite(flame_bottom_list);
        this.flameBottom.animationSpeed = 0.1;
        this.flameBottom.play();
        this.flameBottom.anchor.set(0.5 , 1);
        this.flameBottom.width = document.documentElement.clientWidth;
        this.flameBottom.height = 120;
        this.flameBottom.x = document.documentElement.clientWidth / 2;
        this.flameBottom.y = document.documentElement.clientHeight;

        this.title = new PIXI.Text('星座一覧' , game.fontStyle.KaisoNext);
        this.title.style.fontSize = 50;
        this.title.anchor.set(0.5 , 0);
        this.title.position.set(document.documentElement.clientWidth / 2 , 50);

        this.line_horizontal = new PIXI.Graphics().lineStyle(1, 0xFFFFFF, 0.5).moveTo(0 , document.documentElement.clientHeight / 2).lineTo(document.documentElement.clientWidth , document.documentElement.clientHeight / 2);
        this.line_vertical = new PIXI.Graphics().lineStyle(1, 0xFFFFFF, 0.5).moveTo(document.documentElement.clientWidth / 2 , 0).lineTo(document.documentElement.clientWidth / 2 , document.documentElement.clientHeight);

        this.flameBox.addChild(this.title , this.line_horizontal ,this.line_vertical , this.flame , this.flameBottom );
    }

    createConstellation(){
        let num = game.Manager.data.userData.groups.length;
        for (let i in game.Manager.data.userData.groups) {
            this.constellation[i] = new Constellation(this.app , i);
            this.constellation[i].constellationBox.x = Math.cos((Math.PI * 2 / num) * i) * 1500;
            this.constellation[i].constellationBox.y = Math.sin((Math.PI * 2 / num) * i) * 1500;
            this.constellation[i].constellationBox.rotation = (Math.PI * 2 / num) * i + (Math.PI * 0.5);
            this.constellation[i].constellationBox.scale.set(0.3);
            this.constellation[i].addEvent();
            this.constellationGroups.addChild(this.constellation[i].constellationBox);
        }
    }

    resetStarColor(){
        for(let i in this.constellation){
            this.constellation[i].resetStarColor();
        }
    }

    resetStarSize(){
        for(let i in this.constellation){
            this.constellation[i].resetStarSize();
        }
    }

    update(){
        this.constellationGroups.rotation -= 0.002;
    }
}