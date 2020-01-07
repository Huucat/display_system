import * as PIXI from 'pixi.js';
import { GlowFilter } from '@pixi/filter-glow';

export default class Constellation {
    constructor(app , i){
        this.constellationBox = new PIXI.Container();
        this.app = app;
        this.outLine = new GlowFilter(15, 3, 0, 0xFF00FF, 0.1);
        this.student = {};
        this.star = [];
        this.groupNum = i;
        this.addBackground();
        this.addLine();
        this.addStar();
    }

    addLine(){
        var self = this;
        this.constellation = new PIXI.Sprite(this.app.loader.resources['group_01'].texture);
        this.constellation.anchor.x = 0.5;
        this.constellation.anchor.y = 0.5;
        this.constellation.interactive = true;
        this.constellationBox.addChild(this.constellation);
    }

    addBackground(){
        this.constellationBg = new PIXI.Sprite(this.app.loader.resources['group_01_bg'].texture);
        this.constellationBg.anchor.x = 0.5;
        this.constellationBg.anchor.y = 0.5;
        this.constellationBg.alpha = 0.2;
        this.constellationBox.addChild(this.constellationBg);
    }

    addStar(){
        for (let i = 0; i < game.Manager.data.userData.groups[this.groupNum].members.length; i++) {
            this.star[i] = new PIXI.Sprite(this.app.loader.resources[game.Manager.data.userData.students[game.Manager.data.userData.groups[this.groupNum].members[i].id].color].texture);
            this.star[i].anchor.x = 0.5;
            this.star[i].anchor.y = 0.5;
            this.star[i].x = game.Manager.data.userData.groups[this.groupNum].members[i].xy[0];
            this.star[i].y = game.Manager.data.userData.groups[this.groupNum].members[i].xy[1];
            this.star[i].scale.set(0.3);
            this.constellationBox.addChild(this.star[i]);
        }
    }

    resetStarColor(){
        for (let i = 0; i < game.Manager.data.userData.groups[this.groupNum].members.length; i++) {
            this.star[i].texture = this.app.loader.resources[game.Manager.data.userData.students[game.Manager.data.userData.groups[this.groupNum].members[i].id].color].texture;
        }
    }

    setStarSize(){
        
    }

    addEvent(){
        let self = this;
        this.constellation.on('pointerover', function(){
            self.filterOn(this)
        }).on('pointerout', function(){
            self.filterOff(this)
        }).on('pointerdown', function(){
            self.toDetails(self.app)
        });
    }

    toDetails(){
        game.constellationDetails.setGroupNum(this.groupNum);
        game.Manager.enter(2 , this.app);
    }

    filterOn(self){
        self.filters = [this.outLine];
    }

    filterOff(self){
        self.filters = null;
    }
}

