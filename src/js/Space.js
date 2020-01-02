import * as PIXI from 'pixi.js';
import Constellation from './Constellation.js';
import GROUPS from './groups.json';

export default class Space {
    constructor(app){
        this.app = app;
        this.spaceBox = new PIXI.Container();
        this.flameBox = new PIXI.Container();
        this.constellationGroups = new PIXI.Container();
        this.spaceBox.addChild(this.constellationGroups , this.flameBox);
        this.constellation = [];

        this.constellationGroups.x = document.documentElement.clientWidth / 2;
        this.constellationGroups.y = document.documentElement.clientHeight / 2 + 1000;
        
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
        this.flameLeft = new PIXI.Sprite(this.app.loader.resources['flame_left'].texture);
        this.flameLeft.scale.set(0.5);
        this.flameLeft.x = -60;
        this.flameRight = new PIXI.Sprite(this.app.loader.resources['flame_right'].texture);
        this.flameRight.anchor.set(1 , 0);
        this.flameRight.scale.set(0.5);
        this.flameRight.x = document.documentElement.clientWidth + 60;
        this.flameBottom = new PIXI.Sprite(this.app.loader.resources['flame_bottom'].texture);
        this.flameBottom.anchor.set(0.5 , 1);
        this.flameBottom.scale.set(1 , 0.45);
        this.flameBottom.x = document.documentElement.clientWidth / 2;
        this.flameBottom.y = document.documentElement.clientHeight;

        this.line_horizontal = new PIXI.Graphics().lineStyle(1, 0xFFFFFF, 0.5).moveTo(0 , document.documentElement.clientHeight / 2).lineTo(document.documentElement.clientWidth , document.documentElement.clientHeight / 2);
        this.line_vertical = new PIXI.Graphics().lineStyle(1, 0xFFFFFF, 0.5).moveTo(document.documentElement.clientWidth / 2 , 0).lineTo(document.documentElement.clientWidth / 2 , document.documentElement.clientHeight);

        this.flameBox.addChild(this.line_horizontal ,this.line_vertical , this.flameLeft , this.flameRight , this.flameBottom );
    }

    createConstellation(){
        let num = GROUPS.groups.length;
        for (let i in GROUPS.groups) {
            this.constellation[i] = new Constellation(this.app , i);
            this.constellation[i].constellationBox.x = Math.cos((Math.PI * 2 / num) * i) * 1100;
            this.constellation[i].constellationBox.y = Math.sin((Math.PI * 2 / num) * i) * 1100;
            this.constellation[i].constellationBox.rotation = (Math.PI * 2 / num) * i + (Math.PI * 0.5);
            this.constellation[i].constellationBox.scale.set(0.35);
            this.constellation[i].addEvent();
            this.constellationGroups.addChild(this.constellation[i].constellationBox);
        }
    }

    update(){
        this.constellationGroups.rotation -= 0.001;
    }
}