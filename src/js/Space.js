import * as PIXI from 'pixi.js';
import Constellation from './Constellation.js';

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
    }

    creatConstellation(app){
        let num = 20;
        let starObj = [
            {
                num : 6,
                xy:[
                    [-20 , -50],
                    [-65 , 30],
                    [-20 , 110],
                    [75 , 110],
                    [120 , 30],
                    [75 , -50]
                ]
            },
        ];
        for (let i = 0; i < num; i++) {
            this.constellation[i] = new Constellation(app , num , i , starObj[0].num , starObj[0].xy);
            this.spaceBox.addChild(this.constellation[i].constellationBox);
        }
    }

    rotation(){
        this.spaceBox.rotation -= 0.0005;
    }
}