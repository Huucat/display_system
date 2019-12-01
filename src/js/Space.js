import * as PIXI from 'pixi.js';
import Constellation from './Constellation.js';

export default class Space {
    constructor(app){
        this.spaceBox = new PIXI.Container();

        this.spaceBg = new PIXI.Sprite(app.loader.resources['spaceBg_01'].texture);
        this.spaceBg.anchor.set(0.5);
    
        this.spaceBox.addChild(this.spaceBg);
        this.spaceBox.x = app.screen.width / 2;
        this.spaceBox.y = app.screen.height / 2 + 600;
        // this.spaceBox.scale.x = this.spaceBox.scale.y = 0.3;
        
        app.stage.addChild(this.spaceBox);
        this.creatConstellation(app);
        
    }

    creatConstellation(app){
        this.constellation = new Constellation(app);
        this.spaceBox.addChild(this.constellation.constellationBox);
    }

    rotation(){
        this.spaceBox.rotation -= 0.001;
    }
}