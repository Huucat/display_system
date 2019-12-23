import * as PIXI from 'pixi.js';
import GROUPS from './groups.json';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';

export default class ConstellationDetails {
    constructor(app){
        this.app = app;
        this.detailsBox = new PIXI.Container();
        this.constellationBox = new PIXI.Container();
        this.flame = new PIXI.Container();
        this.messageBox = new PIXI.Container();

        this.spaceBg = new PIXI.Sprite(this.app.loader.resources['spaceBg_02'].texture);
        this.spaceBg.anchor.set(0.5);

        this.constellationBox.x = document.documentElement.clientWidth / 2;
        this.constellationBox.y = document.documentElement.clientHeight / 2;
        this.constellationBox.scale.set(0.7);
        this.detailsBox.addChild(this.constellationBox , this.flame , this.messageBox);

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
        this.targetStep = 0;
        this.clickState = false;


        this.addTarget();
        this.addFlame();
        this.addBackButton();
        this.addInfoButton();
        this.createConstellationInfo();
    }

    addTarget(){
        this.target_In = new PIXI.Sprite(this.app.loader.resources['target_in'].texture);
        this.target_In.anchor.set(0.5);
        this.target_In.scale.set(0.3);
        this.target_In.visible = false;
        this.target_Out = new PIXI.Sprite(this.app.loader.resources['target_out'].texture);
        this.target_Out.anchor.set(0.5);
        this.target_Out.scale.set(0.3);
        this.target_Out.visible = false;

        this.messageBox.addChild(this.target_In , this.target_Out);
    }

    addBackButton(){
        let self = this;
        this.backButton = new PIXI.Sprite(this.app.loader.resources['button_02'].texture);
        this.backButton.interactive = true;
        this.backButton.buttonMode = true;
        this.backButton.position.set(25 , 25);

        this.backButton.on('pointerdown', function(){
            self.onBackButton()
        });
        this.messageBox.addChild(this.backButton);
    }

    addInfoButton(){
        let self = this;
        this.infoButton = new PIXI.Sprite(this.app.loader.resources['button_constellation_info_off'].texture);
        // this.infoButton.scale.set(0.5);
        this.infoButton.interactive = true;
        this.infoButton.buttonMode = true;
        this.infoButton.anchor.set(1 , 0);
        this.infoButton.position.set(document.documentElement.clientWidth - 25 , 25);

        this.infoButton.on('pointerover', function(){
            this.texture = self.app.loader.resources['button_constellation_info_on'].texture
        }).on('pointerout', function(){
            this.texture = self.app.loader.resources['button_constellation_info_off'].texture
        }).on('pointerdown', function(){
            self.showInfo();
        });

        this.messageBox.addChild(this.infoButton);
    }
    
    addFlame(){
        this.flameLeft = new PIXI.Sprite(this.app.loader.resources['flame_left'].texture);
        this.flameLeft.scale.set(0.5);
        this.flameLeft.x = -60;
        this.flameRight = new PIXI.Sprite(this.app.loader.resources['flame_right'].texture);
        this.flameRight.anchor.set(1 , 0);
        this.flameRight.scale.set(0.5);
        this.flameRight.x = document.documentElement.clientWidth + 60;
        this.flameBottom = new PIXI.Sprite(this.app.loader.resources['flame_bottom'].texture);
        this.flameBottom.anchor.set(0.5 , 1);
        this.flameBottom.scale.set(1 , 0.45);
        this.flameBottom.x = document.documentElement.clientWidth / 2;
        this.flameBottom.y = document.documentElement.clientHeight;
        this.line_horizontal = new PIXI.Graphics().lineStyle(1, 0xFFFFFF, 0.5).moveTo(0 , document.documentElement.clientHeight / 2).lineTo(document.documentElement.clientWidth , document.documentElement.clientHeight / 2);
        this.line_vertical = new PIXI.Graphics().lineStyle(1, 0xFFFFFF, 0.5).moveTo(document.documentElement.clientWidth / 2 , 0).lineTo(document.documentElement.clientWidth / 2 , document.documentElement.clientHeight);

        this.buttonLeft = new PIXI.Sprite(this.app.loader.resources['flame_bottom'].texture);
        this.flame.addChild(this.line_horizontal ,this.line_vertical , this.flameLeft , this.flameRight , this.flameBottom );
    }

    createBackground(){
        this.removeChildren();
        this.constellationBg.texture = this.app.loader.resources['group_01_bg'].texture;
        this.constellationBg.anchor.x = 0.5;
        this.constellationBg.anchor.y = 0.5;
        this.constellationBg.alpha = 0.2;
    }

    createConstellation(){
        this.constellation.texture = this.app.loader.resources['group_01'].texture;
        this.constellation.anchor.x = 0.5;
        this.constellation.anchor.y = 0.5;
    }

    createStar(){
        let self = this;
        for (let i = 0; i < GROUPS.groups[this.groupNum].members.length; i++) {
            this.star[i] = new PIXI.Sprite(game.space.constellation[this.groupNum].star[i].texture);
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

    createConstellationInfo(){
        let self = this;
        this.constellationTextBox = new PIXI.Graphics();
        this.constellationTextBox.lineStyle(2, 0xcaf2ff, 2);
        this.constellationTextBox.beginFill(0xcaf2ff, 0.2);
        this.constellationTextBox.drawRoundedRect(document.documentElement.clientWidth - 600 , 25 , 575, 500, 8);
        this.constellationTextBox.endFill();
        this.constellationTextBox.visible = false;

        let dropShadowFilter = new DropShadowFilter();
        dropShadowFilter.alpha = 1;
        dropShadowFilter.blur = 8;
        dropShadowFilter.distance = 0;
        dropShadowFilter.quality = 6;
        dropShadowFilter.color = 0x00a3d5;
        dropShadowFilter.pixelSize = 0.6;
        this.constellationTextBox.filters = [dropShadowFilter];

        this.constellationText = new PIXI.Text('This is a text',this.textStyle);
        this.constellationText.x = document.documentElement.clientWidth - 575;
        this.constellationText.y = 50;
        this.constellationText.visible = false;

        this.closeButton = new PIXI.Sprite(this.app.loader.resources['button_close'].texture);
        this.closeButton.anchor.x = 1;
        this.closeButton.x = document.documentElement.clientWidth - 50;
        this.closeButton.y = 50;
        this.closeButton.interactive = true;
        this.closeButton.buttonMode = true;
        this.closeButton.on('pointerdown', function(){
            self.hideInfo();
        })
        this.closeButton.visible = false;

        this.messageBox.addChild(this.constellationTextBox , this.constellationText , this.closeButton);
    }

    createStudentInfo(){

    }

    showInfo(){
        this.clickState = !this.clickState;
        this.infoButton.visible = false;
        this.backButton.visible = false;
        this.constellationTextBox.visible = true;
        this.constellationText.visible = true;
        this.closeButton.visible = true;

        this.constellationBox.x = document.documentElement.clientWidth / 4;
    }

    hideInfo(){
        this.clickState = !this.clickState;
        this.infoButton.visible = true;
        this.backButton.visible = true;
        this.constellationTextBox.visible = false;
        this.constellationText.visible = false;
        this.closeButton.visible = false;

        this.constellationBox.x = document.documentElement.clientWidth / 2;
    }

    showStudent(){

    }

    hideStudent(){

    }

    targetOn(self){
        if(this.clickState == false){
            this.target_In.x = document.documentElement.clientWidth / 2 + self.x * 0.7;
            this.target_In.y = document.documentElement.clientHeight / 2 + self.y * 0.7;
            this.target_Out.x = document.documentElement.clientWidth / 2 + self.x * 0.7;
            this.target_Out.y = document.documentElement.clientHeight / 2 + self.y * 0.7;
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
        if(this.clickState == false){
            game.Manager.enter(3);
        }
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

    enterDetails(){
        this.createBackground();
        this.createConstellation();
        this.createStar();
    }

    targetAnimation(){
        if(this.targetState == true){
            // this.target_In.rotation += 0.02;
            this.target_Out.scale.set(Math.sin(this.targetStep) * 0.010 + 0.3);
            this.targetStep += 0.15;
        }
    }
}