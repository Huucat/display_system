import * as PIXI from 'pixi.js';
import GROUPS from './groups.json';
import { GlowFilter } from '@pixi/filter-glow';

export default class ConstellationDetails {
    constructor(app){
        this.detailsBox = new PIXI.Container();
        this.constellationBox = new PIXI.Container();
        this.constellationBox.x = app.screen.width / 2 - 200;
        this.constellationBox.y = app.screen.height / 2;
        this.constellationBox.scale.set(0.7);
        this.detailsBox.addChild(this.constellationBox);
        this.groupNum = 0;
        this.star = [];

        this.addBackButton(app);
    }

    createConstellation(app){
        this.removeChildren();
        this.constellation = new PIXI.Sprite(app.loader.resources['group_0' + (this.groupNum + 1)].texture);
        this.constellation.anchor.x = 0.5;
        this.constellation.anchor.y = 0.5;
        this.constellationBox.addChild(this.constellation);
        this.createStar(app);
    }

    createStar(app){
        for (let i = 0; i < GROUPS.groups[this.groupNum].members.length; i++) {
            this.star[i] = new PIXI.Sprite(app.loader.resources['star_01'].texture);
            this.star[i].anchor.x = 0.5;
            this.star[i].anchor.y = 0.5;
            this.star[i].x = GROUPS.groups[this.groupNum].members[i].xy[0];
            this.star[i].y = GROUPS.groups[this.groupNum].members[i].xy[1];
            this.star[i].scale.set(0.5);
            this.constellationBox.addChild(this.star[i]);
        }
    }

    addBackButton(app){
        let self = this;
        this.backButton = new PIXI.Sprite(app.loader.resources['button_01'].texture);
        this.backButton.scale.set(0.5);
        this.backButton.interactive = true;
        this.backButton.buttonMode = true;
        this.backButton.filters = [new GlowFilter(10, 1, 0, 0x00A3D5, 0.1)]
        this.backButton.on('pointerdown', function(){
            self.onBackButton()
        });
        this.detailsBox.addChild(this.backButton);
    }

    onBackButton(){
        game.Manager.enter(1);
    }

    removeChildren(){
        this.constellationBox.removeChildren();
    }

    setGroupNum(groupNum){
        this.groupNum = groupNum;
    }
}