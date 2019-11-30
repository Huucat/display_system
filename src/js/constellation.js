import * as PIXI from 'pixi.js';

export var Constellation = window.Constellation = function(){
    this.ConstellationBox = new PIXI.Container();
    console.log(game)
}

Constellation.prototype.addConstellation = function(app , n , i){
    var Constellation_1 = new PIXI.Sprite(app.loader.resources['constellation_01'].texture);

    if(i == 0){
        Constellation_1.rotation = 0;
    }else{
        Constellation_1.rotation = (Math.PI * 2 / n) * i;
    }
    Constellation_1.anchor.x = 0.5;
    Constellation_1.anchor.y = 2;
    this.ConstellationBox.addChild(Constellation_1);
}

