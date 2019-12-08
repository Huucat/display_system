import { GlowFilter } from '@pixi/filter-glow';
import * as PIXI from 'pixi.js';

export default class Constellation {
    constructor(app , n , i , groups , membersNum){
        this.constellationBox = new PIXI.Container();
        this.constellationBox.x = Math.cos((Math.PI * 2 / n) * i) * 1000;
        this.constellationBox.y = Math.sin((Math.PI * 2 / n) * i) * 1000;
        this.constellationBox.rotation = (Math.PI * 2 / n) * i + (Math.PI * 0.5);

        this.outLine = new GlowFilter(15, 5, 0, 0xFF00FF, 0.1);
        this.star = [];

        this.addLine(app);
        this.addStar(app , groups , membersNum);
    }

    addLine(app){
        var self = this;
        this.constellation = new PIXI.Sprite(app.loader.resources['constellation_02'].texture);
        this.constellation.anchor.x = 0.5;
        this.constellation.anchor.y = 0.5;
        this.constellation.scale.set(0.3);
        this.constellation.interactive = true;

        this.constellation.on('pointerover', function(){
            self.filterOn(this)
        }).on('pointerout', function(){
            self.filterOff(this)
        });

        this.constellationBox.addChild(this.constellation);
    }

    addStar(app , groups , membersNum){
        for (let i = 0; i < membersNum; i++) {
            this.star[i] = new PIXI.Sprite(app.loader.resources['star_01'].texture);
            this.star[i].anchor.x = 0.5;
            this.star[i].anchor.y = 0.5;
            this.star[i].x = groups.groups[0].members[i].xy[0];
            this.star[i].y = groups.groups[0].members[i].xy[1];
            this.star[i].scale.set(0.1);
            this.constellationBox.addChild(this.star[i]);
        }
    }

    filterOn(self){
        self.filters = [this.outLine];
    }

    filterOff(self){
        self.filters = null;
    }
}

