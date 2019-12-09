import * as PIXI from 'pixi.js';
import Constellation from './Constellation.js';
import GROUPS from './groups.json';

export default class Space {
    constructor(app){
        this.spaceBox = new PIXI.Container();
        this.constellation = [];
        this.spaceBg = new PIXI.Sprite(app.loader.resources['spaceBg_02'].texture);
        this.spaceBg.anchor.set(0.5);
        this.spaceBg.scale.x = this.spaceBg.scale.y = 1.25;
        this.spaceBox.addChild(this.spaceBg);
        this.spaceBox.x = app.screen.width / 2;
        this.spaceBox.y = app.screen.height / 2 + 900;
        
        app.stage.addChild(this.spaceBox);
        this.creatConstellation(app);

        this.spaceship_01 = new PIXI.Sprite(app.loader.resources['spaceship_02'].texture);
        this.spaceship_01.width = window.innerWidth;
        this.spaceship_01.height = window.innerHeight;
        // this.spaceship_01.y = - (1080 - window.innerHeight;
        app.stage.addChild(this.spaceship_01);
    }

    creatConstellation(app){
        let num = 20;
        let groups = GROUPS;
        for (let i = 0; i < num; i++) {
            this.constellation[i] = new Constellation(app , num , i , groups);
            this.spaceBox.addChild(this.constellation[i].constellationBox);
        }
    }

    rotation(){
        this.spaceBox.rotation -= 0.0003;
    }
}