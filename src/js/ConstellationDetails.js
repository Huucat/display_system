import * as PIXI from 'pixi.js';
import GROUPS from './groups.json';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';

export default class ConstellationDetails {
    constructor(app){
        this.detailsBox = new PIXI.Container();
        this.constellationBox = new PIXI.Container();
        this.flame = new PIXI.Container();
        this.spaceBg = new PIXI.Sprite(app.loader.resources['spaceBg_02'].texture);
        this.spaceBg.anchor.set(0.5);

        this.constellationBox.x = document.documentElement.clientWidth / 2;
        this.constellationBox.y = document.documentElement.clientHeight / 2;
        this.constellationBox.scale.set(0.7);
        this.detailsBox.addChild(this.constellationBox , this.flame);

        this.constellationBg = new PIXI.Sprite();
        this.constellation = new PIXI.Sprite();
        this.constellationBox.addChild(this.constellationBg , this.constellation);

        this.groupNum = 0;
        this.textStyle = {
            fontFamily : 'Arial',
            fontSize: 24,
            fill : 0xCAF2FF,
            align : 'center',
            dropShadow : true,
            dropShadowBlur : 10,
            dropShadowColor : '#00A3D5',
            dropShadowDistance : 0,
        }
        this.star = [];
        this.name = [];
        this.targetState = false;
        // this.targetMove = false;
        this.targetStep = 0;
        this.clickState = false;


        // this.textBox = new PIXI.Graphics();
        // this.textBox.lineStyle(2, 0xcaf2ff, 2);
        // this.textBox.beginFill(0xcaf2ff, 0.2);
        // this.textBox.drawRoundedRect(150, 440, 200, 100, 8);
        // this.textBox.endFill();

        // this.text = new PIXI.Text('This is a text',{fontFamily : 'Arial', fontSize: 24, fill : 0xffffff, align : 'center'});
        // this.text.x = 160;
        // this.text.y = 450;

        // this.textObj.addChild(this.textBox , this.text);
        // this.dropShadowFilter = new DropShadowFilter();
        // this.dropShadowFilter.alpha = 1;
        // this.dropShadowFilter.blur = 10;
        // this.dropShadowFilter.distance = 0;
        // this.dropShadowFilter.quality = 10;
        // this.dropShadowFilter.color = 0x00a3d5;
        // this.dropShadowFilter.pixelSize = 0.6;
        // this.textBox.filters = [dropShadowFilter]
        this.addBackButton(app);
        this.addInfoButton(app);
        this.addTarget(app);
        this.addFlame(app);
    }

    addTarget(app){
        this.target_In = new PIXI.Sprite(app.loader.resources['target_in'].texture);
        this.target_In.anchor.set(0.5);
        this.target_In.scale.set(0.4);
        this.target_In.visible = false;
        this.target_Out = new PIXI.Sprite(app.loader.resources['target_out'].texture);
        this.target_Out.anchor.set(0.5);
        this.target_Out.scale.set(0.4);
        this.target_Out.visible = false;

        this.constellationBox.addChild(this.target_In , this.target_Out);
    }

    addBackButton(app){
        let self = this;
        this.backButton = new PIXI.Sprite(app.loader.resources['button_02'].texture);
        // this.backButton.scale.set(0.5);
        this.backButton.interactive = true;
        this.backButton.buttonMode = true;
        this.backButton.position.set(25 , 25);

        this.backButton.on('pointerdown', function(){
            self.onBackButton()
        });
        this.detailsBox.addChild(this.backButton);
    }

    addInfoButton(app){
        let self = this;
        this.infoButton = new PIXI.Sprite(app.loader.resources['button_constellation_info_off'].texture);
        // this.infoButton.scale.set(0.5);
        this.infoButton.interactive = true;
        this.infoButton.buttonMode = true;
        this.infoButton.anchor.set(1 , 0);
        this.infoButton.position.set(document.documentElement.clientWidth - 25 , 25);

        this.infoButton.on('pointerover', function(){
            this.texture = app.loader.resources['button_constellation_info_on'].texture
        }).on('pointerout', function(){
            this.texture = app.loader.resources['button_constellation_info_off'].texture
        }).on('pointerdown', function(){
            self.showInfo();
        });

        this.detailsBox.addChild(this.infoButton);
    }
    
    addFlame(app){
        this.flameLeft = new PIXI.Sprite(app.loader.resources['flame_left'].texture);
        this.flameLeft.scale.set(0.5);
        this.flameLeft.x = -60;
        this.flameRight = new PIXI.Sprite(app.loader.resources['flame_right'].texture);
        this.flameRight.anchor.set(1 , 0);
        this.flameRight.scale.set(0.5);
        this.flameRight.x = app.screen.width + 60;
        this.flameBottom = new PIXI.Sprite(app.loader.resources['flame_bottom'].texture);
        this.flameBottom.anchor.set(0.5 , 1);
        this.flameBottom.scale.set(1 , 0.45);
        this.flameBottom.x = document.documentElement.clientWidth / 2;
        this.flameBottom.y = document.documentElement.clientHeight;
        this.line_horizontal = new PIXI.Graphics().lineStyle(1, 0xFFFFFF, 0.5).moveTo(0 , document.documentElement.clientHeight / 2).lineTo(document.documentElement.clientWidth , document.documentElement.clientHeight / 2);
        this.line_vertical = new PIXI.Graphics().lineStyle(1, 0xFFFFFF, 0.5).moveTo(document.documentElement.clientWidth / 2 , 0).lineTo(document.documentElement.clientWidth / 2 , document.documentElement.clientHeight);

        this.buttonLeft = new PIXI.Sprite(app.loader.resources['flame_bottom'].texture);
        this.flame.addChild(this.line_horizontal ,this.line_vertical , this.flameLeft , this.flameRight , this.flameBottom );
    }

    createBackground(app){
        this.removeChildren();
        this.constellationBg.texture = app.loader.resources['group_03'].texture;
        this.constellationBg.anchor.x = 0.5;
        this.constellationBg.anchor.y = 0.5;
        this.constellationBg.alpha = 0.2;
        this.createConstellation(app);
    }

    createConstellation(app){
        this.constellation.texture = app.loader.resources['group_0' + (this.groupNum + 1)].texture;
        this.constellation.anchor.x = 0.5;
        this.constellation.anchor.y = 0.5;
        this.createStar(app);
    }

    createStar(app){
        let self = this;
        for (let i = 0; i < GROUPS.groups[this.groupNum].members.length; i++) {
            this.star[i] = new PIXI.Sprite(app.loader.resources['star_01'].texture);
            this.star[i].anchor.x = 0.5;
            this.star[i].anchor.y = 0.5;
            this.star[i].x = GROUPS.groups[this.groupNum].members[i].xy[0];
            this.star[i].y = GROUPS.groups[this.groupNum].members[i].xy[1];
            this.star[i].scale.set(0.5);
            this.star[i].interactive = true;
            this.star[i].on('pointerover', function(){
                self.targetOn(this)
            }).on('pointerout', function(){
                self.targetOff(this)
            }).on('pointerdown', function(){
                self.toStar()
            });
            this.constellationBox.addChild(this.star[i]);
            this.creatName(i);
        }
    }

    creatName(i){
        this.name[i] = new PIXI.Text(GROUPS.students[GROUPS.groups[this.groupNum].members[i].id].name , this.textStyle);
        this.name[i].anchor.x = 0.5;
        this.name[i].x = this.star[i].x;
        this.name[i].y = this.star[i].y + 50;
        this.constellationBox.addChild(this.name[i]);
    }

    showInfo(){
        this.clickState = !this.clickState;
    }

    hideInfo(){

    }

    targetOn(self){
        if(this.clickState == false){
            this.target_In.x = self.x;
            this.target_In.y = self.y;
            this.target_Out.x = self.x;
            this.target_Out.y = self.y;
            this.target_In.visible = true;
            this.target_Out.visible = true;
            this.targetState = true;
        }
    }

    targetOff(){
        if(this.clickState == false){
            this.targetState = false;
            this.target_In.visible = false;
            this.target_In.rotation = 0;
            this.target_Out.visible = false;
            this.targetStep = 0;
        }
    }

    onBackButton(){
        game.Manager.enter(1);
    }

    toStar(){
        game.Manager.enter(3);
    }

    removeChildren(){
        for (let i = 0; i < this.star.length; i++) {
            this.constellationBox.removeChild(this.star[i] , this.name[i]);
        }
        this.star = [];
        this.name = [];
    }

    setGroupNum(groupNum){
        this.groupNum = groupNum;
    }

    targetAnimation(){
        if(this.targetState == true){
            // this.target_In.rotation += 0.02;
            this.target_Out.scale.set(Math.sin(this.targetStep) * 0.015 + 0.4);
            this.targetStep += 0.15;
        }
    }
}