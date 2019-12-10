import * as PIXI from 'pixi.js';
import Constellation from './Constellation.js';
import GROUPS from './groups.json';

export default class Space {
    constructor(app){
        this.spaceBox = new PIXI.Container();
        this.constellationGroups = new PIXI.Container();
        this.spaceBox.addChild(this.constellationGroups);

        this.constellation = [];

        this.spaceBg = new PIXI.Sprite(app.loader.resources['spaceBg_02'].texture);
        this.spaceBg.anchor.set(0.5);
        this.spaceBg.scale.x = this.spaceBg.scale.y = 1.25;
        this.constellationGroups.addChild(this.spaceBg);

        this.constellationGroups.x = app.screen.width / 2;
        this.constellationGroups.y = app.screen.height / 2 + 900;
        
        this.createConstellation(app);
        this.addCab(app)
    }

    createConstellation(app){
        let num = 20;
        for (let i = 0; i < num; i++) {
            this.constellation[i] = new Constellation(app , num , i , GROUPS);
            this.constellationGroups.addChild(this.constellation[i].constellationBox);
        }
    }

    addCab(app){
        this.spaceship_01 = new PIXI.Sprite(app.loader.resources['spaceship_02'].texture);
        this.spaceship_01.width = window.innerWidth;
        this.spaceship_01.height = window.innerHeight;
        this.spaceBox.addChild(this.spaceship_01);
    }

    rotation(){
        this.constellationGroups.rotation -= 0.0003;
    }
}