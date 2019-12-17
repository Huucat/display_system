import { GlowFilter } from '@pixi/filter-glow';
import * as PIXI from 'pixi.js';

export default class Constellation {
    constructor(app , n , i , groups){
        this.constellationBox = new PIXI.Container();
        this.constellationBox.x = Math.cos((Math.PI * 2 / n) * i) * 1000;
        this.constellationBox.y = Math.sin((Math.PI * 2 / n) * i) * 1000;
        this.constellationBox.rotation = (Math.PI * 2 / n) * i + (Math.PI * 0.5);
        this.constellationBox.scale.set(0.35);

        this.outLine = new GlowFilter(15, 3, 0, 0xFF00FF, 0.1);
        this.star = [];
        this.groupNum = Math.floor(Math.random() * 2);
        this.addBackground(app);
        this.addLine(app , this.groupNum);
        this.addStar(app , groups);
    }

    addLine(app , i){
        var self = this;
        this.constellation = new PIXI.Sprite(app.loader.resources['group_0' + (this.groupNum + 1)].texture);
        this.constellation.anchor.x = 0.5;
        this.constellation.anchor.y = 0.5;
        this.constellation.interactive = true;

        this.constellation.on('pointerover', function(){
            self.filterOn(this)
        }).on('pointerout', function(){
            self.filterOff(this)
        }).on('pointerdown', function(){
            self.toDetails(app)
        });

        this.constellationBox.addChild(this.constellation);
    }

    addBackground(app){
        this.constellationBg = new PIXI.Sprite(app.loader.resources['group_03'].texture);
        this.constellationBg.anchor.x = 0.5;
        this.constellationBg.anchor.y = 0.5;
        this.constellationBg.alpha = 0.2;
        this.constellationBox.addChild(this.constellationBg);
    }

    addStar(app , groups){
        for (let i = 0; i < groups.groups[this.groupNum].members.length; i++) {
            this.star[i] = new PIXI.Sprite(app.loader.resources['star_01'].texture);
            this.star[i].anchor.x = 0.5;
            this.star[i].anchor.y = 0.5;
            this.star[i].x = groups.groups[this.groupNum].members[i].xy[0];
            this.star[i].y = groups.groups[this.groupNum].members[i].xy[1];
            this.star[i].scale.set(0.6);
            this.constellationBox.addChild(this.star[i]);
        }
    }

    toDetails(app){
        game.constellationDetails.setGroupNum(this.groupNum);
        game.Manager.enter(2 , app);
    }

    filterOn(self){
        self.filters = [this.outLine];
    }

    filterOff(self){
        self.filters = null;
    }
}

