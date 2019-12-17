import * as PIXI from 'pixi.js';
import GROUPS from './groups.json';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';

export default class ConstellationDetails {
    constructor(app){
        this.detailsBox = new PIXI.Container();
        this.constellationBox = new PIXI.Container();
        // this.textObj = new PIXI.Container();

        this.spaceBg = new PIXI.Sprite(app.loader.resources['spaceBg_02'].texture);
        this.spaceBg.anchor.set(0.5);

        this.constellationBox.x = app.screen.width / 2;
        this.constellationBox.y = app.screen.height / 2;
        this.constellationBox.scale.set(0.7);
        this.detailsBox.addChild(this.constellationBox);

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
        this.constellationBg = new PIXI.Sprite();
        this.constellation = new PIXI.Sprite();
        this.constellationBox.addChild(this.constellationBg , this.constellation);

        this.textBoxContainer = new PIXI.Container();
        this.constellationBox.addChild( this.textBoxContainer);
        this.textBox = new PIXI.Graphics();
        this.textBox.beginFill(0xCAF2FF, 1);
        this.textBox.drawCircle(100, 250, 50);
        this.textBox.endFill();
        this.constellationBox.addChild(this.textBox);
        this.dropShadowFilter = new DropShadowFilter();
        this.dropShadowFilter.alpha = 0.8;
        this.dropShadowFilter.blur = 10;
        this.dropShadowFilter.distance = 0;
        this.dropShadowFilter.quality = 5;
        this.dropShadowFilter.pixelSize = 0.6;
        this.dropShadowFilter.color = 0xCAF2FF;
        this.textBoxContainer.addChild(this.textBox);
        this.textBoxContainer.filters = [this.dropShadowFilter];

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
        this.addTarget(app)
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
        // this.target_LeftTop = new PIXI.Sprite(app.loader.resources['target'].texture);
        // this.target_LeftTop.anchor.set(0.5);
        // this.target_LeftTop.scale.set(0.5 , 0.5);
        // this.target_LeftTop.visible = false;

        // this.target_LeftDown = new PIXI.Sprite(app.loader.resources['target'].texture);
        // this.target_LeftDown.anchor.set(0.5);
        // this.target_LeftDown.scale.set(0.5 , -0.5);
        // this.target_LeftDown.visible = false;

        // this.target_RightTop = new PIXI.Sprite(app.loader.resources['target'].texture);
        // this.target_RightTop.anchor.set(0.5);
        // this.target_RightTop.scale.set(-0.5 , 0.5);
        // this.target_RightTop.visible = false;
        
        // this.target_RightDown = new PIXI.Sprite(app.loader.resources['target'].texture);
        // this.target_RightDown.anchor.set(0.5);
        // this.target_RightDown.scale.set(-0.5 , -0.5);
        // this.target_RightDown.visible = false;

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
            this.star[i].scale.set(0.2);
            this.star[i].interactive = true;
            this.star[i].on('pointerover', function(){
                self.targetOn(this)
            }).on('pointerout', function(){
                self.targetOff(this)
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

    targetOn(self){
        this.target_In.x = self.x;
        this.target_In.y = self.y;
        this.target_Out.x = self.x;
        this.target_Out.y = self.y;
        this.target_In.visible = true;
        this.target_Out.visible = true;

        // this.target_LeftTop.x = self.x - 30;
        // this.target_LeftTop.y = self.y - 30;

        // this.target_LeftDown.x = self.x - 30;
        // this.target_LeftDown.y = self.y + 30;

        // this.target_RightTop.x = self.x + 30;
        // this.target_RightTop.y = self.y - 30;

        // this.target_RightDown.x = self.x + 30;
        // this.target_RightDown.y = self.y + 30;
        // this.target_LeftTop.visible = this.target_LeftDown.visible = this.target_RightTop.visible = this.target_RightDown.visible = true;
        
        this.targetState = true;
    }

    targetOff(){
        this.targetState = false;
        this.target_In.visible = false;
        this.target_Out.visible = false;
        this.target_Out.rotation = 0;
        this.targetStep = 0;
        // this.target_LeftTop.visible = this.target_LeftDown.visible = this.target_RightTop.visible = this.target_RightDown.visible = false;
    }

    onBackButton(){
        game.Manager.enter(1);
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
            // this.target_In.scale.set(Math.sin(this.targetStep) * 0.01 + 0.4);
            // this.target_Out.rotation += 0.02;
            this.target_Out.scale.set(Math.sin(this.targetStep) * 0.02 + 0.4);
            this.targetStep += 0.15;
            this.star[3].scale.set(0.6);
            // if(this.targetMove == false){
            //     this.target_LeftTop.x += 0.2;
            //     this.target_LeftTop.y += 0.2;
    
            //     this.target_LeftDown.x += 0.2;
            //     this.target_LeftDown.y -= 0.2;
    
            //     this.target_RightTop.x -= 0.2;
            //     this.target_RightTop.y += 0.2;
    
            //     this.target_RightDown.x -= 0.2;
            //     this.target_RightDown.y -= 0.2;
    
            //     this.targetStep += 1;
            //     if(this.targetStep >= 20){
            //         this.targetMove = true;
            //     }
            // }else{
            //     this.target_LeftTop.x -= 0.2;
            //     this.target_LeftTop.y -= 0.2;
    
            //     this.target_LeftDown.x -= 0.2;
            //     this.target_LeftDown.y += 0.2;
    
            //     this.target_RightTop.x += 0.2;
            //     this.target_RightTop.y -= 0.2;
    
            //     this.target_RightDown.x += 0.2;
            //     this.target_RightDown.y += 0.2;
    
            //     this.targetStep -= 1;
            //     if(this.targetStep <= 0){
            //         this.targetMove = false;
            //     }
            // }

        }
    }
}