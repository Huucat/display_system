import * as PIXI from 'pixi.js';
import GROUPS from './groups.json';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';

export default class ConstellationDetails {
    constructor(app){
        this.detailsBox = new PIXI.Container();
        this.constellationBox = new PIXI.Container();
        this.textObj = new PIXI.Container();

        this.spaceBg = new PIXI.Sprite(app.loader.resources['spaceBg_02'].texture);
        this.spaceBg.anchor.set(0.5);

        this.constellationBox.x = app.screen.width / 2 - 200;
        this.constellationBox.y = app.screen.height / 2;
        this.constellationBox.scale.set(0.7);
        this.detailsBox.addChild( this.constellationBox, this.textObj);
        this.groupNum = 0;
        this.star = [];


        this.textBox = new PIXI.Graphics();
        this.textBox.lineStyle(2, 0xcaf2ff, 2);
        this.textBox.beginFill(0xcaf2ff, 0.2);
        this.textBox.drawRoundedRect(150, 440, 200, 100, 8);
        this.textBox.endFill();

        this.text = new PIXI.Text('This is a text',{fontFamily : 'Arial', fontSize: 24, fill : 0xffffff, align : 'center'});
        this.text.x = 160;
        this.text.y = 450;

        this.textObj.addChild(this.textBox , this.text);
        var dropShadowFilter = new DropShadowFilter();
        dropShadowFilter.alpha = 0.8;
        dropShadowFilter.blur = 8;
        dropShadowFilter.distance = 2;
        dropShadowFilter.quality = 5;
        dropShadowFilter.color = 0x00a3d5;
        this.textBox.filters = [dropShadowFilter]
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
        // this.backButton.filters = [new GlowFilter(10, 1, 0, 0x00A3D5, 0.1)]
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