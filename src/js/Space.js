import * as PIXI from 'pixi.js';
import Constellation from './Constellation.js';
import GROUPS from './groups.json';

export default class Space {
    constructor(app){
        this.spaceBox = new PIXI.Container();
        this.flame = new PIXI.Container();
        this.constellationGroups = new PIXI.Container();
        this.spaceBox.addChild(this.constellationGroups , this.flame);
        this.constellation = [];

        this.constellationGroups.x = document.documentElement.clientWidth / 2;
        this.constellationGroups.y = document.documentElement.clientHeight / 2 + 900;
        
        this.addSpaceBg(app);
        this.createConstellation(app);
        this.addFlame(app);
    }

    addSpaceBg(app){
        this.spaceBg = new PIXI.Sprite(app.loader.resources['spaceBg_02'].texture);
        this.spaceBg.anchor.set(0.5);
        this.spaceBg.scale.set(1.25);
        this.constellationGroups.addChild(this.spaceBg);
    }

    addFlame(app){
        this.flameLeft = new PIXI.Sprite(app.loader.resources['flame_left'].texture);
        this.flameLeft.scale.set(0.5);
        this.flameLeft.x = -60;
        this.flameRight = new PIXI.Sprite(app.loader.resources['flame_right'].texture);
        this.flameRight.anchor.set(1 , 0);
        this.flameRight.scale.set(0.5);
        this.flameRight.x = app.screen.width + 60;
        this.flameBottom = new PIXI.Sprite(app.loader.resources['flame_bottom'].texture);
        this.flameBottom.anchor.set(0.5 , 1);
        this.flameBottom.scale.set(1 , 0.45);
        this.flameBottom.x = document.documentElement.clientWidth / 2;
        this.flameBottom.y = document.documentElement.clientHeight;

        this.line_horizontal = new PIXI.Graphics().lineStyle(1, 0xFFFFFF, 0.5).moveTo(0 , document.documentElement.clientHeight / 2).lineTo(document.documentElement.clientWidth , document.documentElement.clientHeight / 2);
        this.line_vertical = new PIXI.Graphics().lineStyle(1, 0xFFFFFF, 0.5).moveTo(document.documentElement.clientWidth / 2 , 0).lineTo(document.documentElement.clientWidth / 2 , document.documentElement.clientHeight);

        this.buttonLeft = new PIXI.Sprite(app.loader.resources['flame_bottom'].texture);
        this.flame.addChild(this.line_horizontal ,this.line_vertical , this.flameLeft , this.flameRight , this.flameBottom );
    }

    createConstellation(app){
        let num = 20;
        for (let i = 0; i < num; i++) {
            this.constellation[i] = new Constellation(app , num , i , GROUPS);
            this.constellationGroups.addChild(this.constellation[i].constellationBox);
        }
    }

    rotation(){
        this.constellationGroups.rotation -= 0.0003;
    }
}