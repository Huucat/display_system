import { GlowFilter } from '@pixi/filter-glow';
import * as PIXI from 'pixi.js';

export default class Constellation {
    constructor(app){
        this.constellationBox = new PIXI.Container();
        this.outLine = new GlowFilter(15, 2, 0, 0xFF00FF, 0.5);
        this.constellationBoxList = [];
        this.init(app);
    }

    init(app){
        let self = this;
        let n = 30;

        for(let i = 0 ; i < n ; i++){
            this.constellationBoxList[i] = new PIXI.Sprite(app.loader.resources['constellation_01'].texture);
            if(i == 0){
                this.constellationBoxList[i].rotation = 0;
            }else{
                this.constellationBoxList[i].rotation = (Math.PI * 2 / n) * i;
            }
            this.constellationBoxList[i].anchor.x = 0.5;
            this.constellationBoxList[i].anchor.y = 5;
            this.constellationBoxList[i].interactive = true;
            this.constellationBoxList[i].id = i;
            this.constellationBoxList[i].scale.x = this.constellationBoxList[i].scale.y = 0.5;
            this.constellationBoxList[i].on('pointerover', function(){
                self.filterOn(this)
            }).on('pointerout', function(){
                self.filterOff(this)
            });
            this.constellationBox.addChild(this.constellationBoxList[i]);
        }
    }

    filterOn(self){
        self.filters = [this.outLine];
    }

    filterOff(self){
        self.filters = null;
    }
}

