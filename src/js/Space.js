import * as PIXI from 'pixi.js';
import { Constellation } from './Constellation.js';

export var Space = window.Space = function(app){
    this.spaceBox = new PIXI.Container();

    this.spaceBg = new PIXI.Sprite(app.loader.resources['spaceBg_01'].texture);
    this.spaceBg.anchor.set(0.5);

    this.spaceBox.addChild(this.spaceBg);
    this.spaceBox.x = app.screen.width / 2;
    this.spaceBox.y = app.screen.height / 2 + 600;
    
    app.stage.addChild(this.spaceBox);
    this.creatConstellation(app)
}

Space.prototype.creatConstellation = function(app){
    this.Constellation = new Constellation(app);
    this.spaceBox.addChild(this.Constellation.ConstellationBox);
    let n = 20;
    for(let i = 0 ; i < n ; i++){
        this.Constellation.addConstellation(app , n , i);
    }
}

Space.prototype.rotation = function(){
    this.spaceBox.rotation -= 0.001;
}