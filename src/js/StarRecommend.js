import * as PIXI from 'pixi.js';
import GROUPS from './groups.json';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';

export default class StarRecommend{
    constructor(app){
        this.app = app;

        this.studentId = "";
        this.position = [
            {x : -(document.documentElement.clientWidth / 3) , y : -(document.documentElement.clientHeight / 4) + 50},
            {x : document.documentElement.clientWidth / 3 , y : -(document.documentElement.clientHeight / 4) + 50},
            {x : -(document.documentElement.clientWidth / 3) , y : document.documentElement.clientHeight / 4 - 50},
            {x : document.documentElement.clientWidth / 3 , y : document.documentElement.clientHeight / 4 - 50}
        ];
        this.othersStarBox = [];

        this.starRecommendBox = new PIXI.Container();
        this.backgroundBox = new PIXI.Container();
        this.othersAllBox = new PIXI.Container();
        this.ownStarBox = new PIXI.Container();
        this.buttonBox = new PIXI.Container();
        this.backButtonBox = new PIXI.Container();

        this.backgroundBox.x = this.ownStarBox.x = this.othersAllBox.x = this.buttonBox.x = document.documentElement.clientWidth / 2;
        this.backgroundBox.y = this.ownStarBox.y = this.othersAllBox.y = document.documentElement.clientHeight / 2;

        this.starRecommendBox.addChild(this.backgroundBox , this.othersAllBox , this.ownStarBox , this.buttonBox , this.backButtonBox);

        this.createBackground();
        this.createOwnBg();
        this.createOwnStar();
        this.createOwnName();
        this.createButton();

        this.createBackButton();
    }

    createBackground(){
        this.spaceBg = new PIXI.Sprite(this.app.loader.resources['background_spaceship'].texture);
        this.spaceBg.anchor.set(0.5);
        this.backgroundBox.addChild(this.spaceBg);
    }

    createOwnBg(){
        let shadowFilter = new DropShadowFilter();
        shadowFilter.alpha = 0.8;
        shadowFilter.blur = 8;
        shadowFilter.distance = 0;
        shadowFilter.quality = 8;
        shadowFilter.pixelSize = 0.5;
        shadowFilter.color = 0x00A3D5;
        let ownBg = new PIXI.Graphics();
        ownBg.lineStyle(2, 0xFFFFFF, 3);
        ownBg.beginFill(0x044455);
        ownBg.drawRoundedRect(-160 , -200 , 320 , 400, 8);
        ownBg.endFill();
        ownBg.filters = [shadowFilter];
        this.ownStarBox.addChild(ownBg);
    }

    createOwnStar(){
        this.ownStar = new PIXI.Graphics();
        this.ownStar.y = -60;
        this.ownStarBox.addChild(this.ownStar);
    }

    createOwnName(){
        this.ownName = new PIXI.Text('フレハス ジョシュア カイル', game.fontStyle_SmartPhoneUI_White);
        this.ownName.style.fontSize = 30;
        this.ownName.style.align = "center";
        this.ownName.style.wordWrap = true;
        this.ownName.style.wordWrapWidth = 300;
        this.ownName.style.lineHeight = 50;
        this.ownName.x = 0
        this.ownName.y = 70;
        this.ownName.anchor.x = 0.5;
        this.ownStarBox.addChild(this.ownName);
    }

    createButton(){
        let self = this;
        let poly = new PIXI.Polygon(
            new PIXI.Point(-120 , -60),
            new PIXI.Point(120 , -60),
            new PIXI.Point(160 , 0),
            new PIXI.Point(120 , 60),
            new PIXI.Point(-120 , 60),
            new PIXI.Point(-160 , 0)
        );
        this.buttonClose = new PIXI.Sprite(this.app.loader.resources['button_close_off'].texture);
        this.buttonClose.anchor.set(0.5 , 0.5);
        this.buttonClose.x = -180;
        this.buttonClose.y = document.documentElement.clientHeight - 120;
        this.buttonClose.hitArea = poly;
        this.buttonClose.interactive = true;
        this.buttonClose.buttonMode = true;
        this.buttonClose.on('pointerover', function(){
            this.texture = self.app.loader.resources['button_close_on'].texture
        }).on('pointerout', function(){
            this.texture = self.app.loader.resources['button_close_off'].texture
        }).on('pointerdown', function(){
            self.setButtonOff();
        });

        this.buttonToStar = new PIXI.Sprite(this.app.loader.resources['button_tostar_off'].texture);
        this.buttonToStar.anchor.set(0.5 , 0.5);
        this.buttonToStar.x = 180;
        this.buttonToStar.y = document.documentElement.clientHeight - 120;
        this.buttonToStar.hitArea = poly;
        this.buttonToStar.interactive = true;
        this.buttonToStar.buttonMode = true;
        this.buttonToStar.on('pointerover', function(){
            this.texture = self.app.loader.resources['button_tostar_on'].texture
        }).on('pointerout', function(){
            this.texture = self.app.loader.resources['button_tostar_off'].texture
        }).on('pointerdown', function(){
            
        });

        this.buttonBox.addChild(this.buttonClose , this.buttonToStar);
    }

    createBackButton(){
        this.title = new PIXI.Sprite(this.app.loader.resources['title_recommend'].texture);
        this.title.scale.set(0.8);
        this.buttonBack = new PIXI.Sprite(this.app.loader.resources['button_02'].texture);
        this.buttonBack.scale.set(0.8);
        this.buttonBack.anchor.set(0.5);
        this.buttonBack.position.set(60 , 43);
        this.buttonBack.interactive = true;
        this.buttonBack.buttonMode = true;
        this.buttonBack.on('pointerdown', function(){
            game.Manager.enter(3);
        });

        this.backButtonBox.addChild(this.title , this.buttonBack);
    }

    addOthersBg(i){
        let self = this;
        this.othersStarBox[i].container = new PIXI.Container();
        this.othersStarBox[i].container.x = this.position[i].x;
        this.othersStarBox[i].container.y = this.position[i].y;
        this.othersAllBox.addChild(this.othersStarBox[i].container);

        let shadowFilter = new DropShadowFilter();
        shadowFilter.alpha = 0.8;
        shadowFilter.blur = 8;
        shadowFilter.distance = 0;
        shadowFilter.quality = 8;
        shadowFilter.pixelSize = 0.5;
        shadowFilter.color = 0x00A3D5;

        this.othersStarBox[i].othersBg = new PIXI.Graphics();
        this.othersStarBox[i].othersBg.lineStyle(2, 0xFFFFFF, 3);
        this.othersStarBox[i].othersBg.beginFill(0xCAF2FF , 0.2);
        this.othersStarBox[i].othersBg.drawRoundedRect(-160 , -200 , 320 , 400, 8);
        this.othersStarBox[i].othersBg.endFill();
        this.othersStarBox[i].othersBg.filters = [shadowFilter];
        this.othersStarBox[i].othersBg.interactive = true;
        this.othersStarBox[i].othersBg.buttonMode = true;
        this.othersStarBox[i].othersBg.on('pointerdown', function(){
            self.setButtonOn(Number(i));
        });
        
        this.othersStarBox[i].container.addChild(this.othersStarBox[i].othersBg);
    }

    addOthersStar(i){
        this.othersStarBox[i].othersStar = new PIXI.Graphics();
        this.othersStarBox[i].othersStar.y = -60;
        this.setStarColor(this.othersStarBox[i].othersStar , GROUPS.students[this.studentId].recommend[i])
        this.othersStarBox[i].container.addChild(this.othersStarBox[i].othersStar);
    }

    addOthersName(i){
        this.othersStarBox[i].othersName = new PIXI.Text(GROUPS.students[GROUPS.students[this.studentId].recommend[i]].name, game.fontStyle_SmartPhoneUI_White);
        this.othersStarBox[i].othersName.style.fontSize = 30;
        this.othersStarBox[i].othersName.style.align = "center";
        this.othersStarBox[i].othersName.style.wordWrap = true;
        this.othersStarBox[i].othersName.style.wordWrapWidth = 300;
        this.othersStarBox[i].othersName.style.lineHeight = 50;
        this.othersStarBox[i].othersName.x = 0
        this.othersStarBox[i].othersName.y = 70;
        this.othersStarBox[i].othersName.anchor.x = 0.5;
        this.othersStarBox[i].container.addChild(this.othersStarBox[i].othersName);
    }

    addOthersLine(i){
        this.othersStarBox[i].othersLine = new PIXI.Graphics();
        this.othersStarBox[i].othersLine.lineStyle(3, 0xFFFFFF, 1);
        switch(Number(i)){
            case 0:
                this.othersStarBox[i].othersLine.moveTo(160 , 0);
                this.othersStarBox[i].othersLine.lineTo(240 , 0);
                this.othersStarBox[i].othersLine.lineTo(320 , 180);
                this.othersStarBox[i].othersLine.lineTo(document.documentElement.clientWidth / 3 , 180);
            break;
            case 1:
                this.othersStarBox[i].othersLine.moveTo(-160 , 0);
                this.othersStarBox[i].othersLine.lineTo(-240 , 0);
                this.othersStarBox[i].othersLine.lineTo(-320 , 180);
                this.othersStarBox[i].othersLine.lineTo(-document.documentElement.clientWidth / 3 , 180);
            break;
            case 2:
                this.othersStarBox[i].othersLine.moveTo(160 , 0);
                this.othersStarBox[i].othersLine.lineTo(240 , 0);
                this.othersStarBox[i].othersLine.lineTo(320 , -180);
                this.othersStarBox[i].othersLine.lineTo(document.documentElement.clientWidth / 3 , -180);
            break;
            case 3:
                this.othersStarBox[i].othersLine.moveTo(-160 , 0);
                this.othersStarBox[i].othersLine.lineTo(-240 , 0);
                this.othersStarBox[i].othersLine.lineTo(-320 , -180);
                this.othersStarBox[i].othersLine.lineTo(-document.documentElement.clientWidth / 3 , -180);
            break;
        }
        this.othersStarBox[i].container.addChild(this.othersStarBox[i].othersLine);
    }

    setStudentId(studentId){
        this.studentId = studentId;
    }
    
    setButtonOn(num){
        for(let i in this.othersStarBox){
            this.othersStarBox[i].container.alpha = 0.2;
        }
        this.othersStarBox[num].container.alpha = 1;
        this.buttonBox.visible = true;
    }

    
    setButtonOff(){
        for(let i in this.othersStarBox){
            this.othersStarBox[i].container.alpha = 1;
        }
        this.buttonClose.texture = this.app.loader.resources['button_close_off'].texture
        this.buttonToStar.texture = this.app.loader.resources['button_tostar_off'].texture
        this.buttonBox.visible = false;
    }

    setStarColor(star , studentId){
        star.filters = [];
        star.clear();

        let sunShadowFilter = new DropShadowFilter();
        sunShadowFilter.alpha = 1;
        sunShadowFilter.blur = 40;
        sunShadowFilter.distance = 0;
        sunShadowFilter.quality = 8;
        sunShadowFilter.pixelSize = 0.5;

        switch(GROUPS.students[studentId].color){
            case "star_plan":
                star.beginFill(0xFFF390, 1);
                star.drawCircle(0, 0, 80);
                star.endFill();
                sunShadowFilter.color = 0xFFF390;
                star.filters = [sunShadowFilter];
            break;
            case "star_design":
                star.beginFill(0xFF99FF, 1);
                star.drawCircle(0, 0, 80);
                star.endFill();
                sunShadowFilter.color = 0xFF99FF;
                star.filters = [sunShadowFilter];
            break;
            case "star_coding":
                star.beginFill(0x99CCFF, 1);
                star.drawCircle(0, 0, 80);
                star.endFill();
                sunShadowFilter.color = 0x99CCFF;
                star.filters = [sunShadowFilter];
            break;
            case "star_presentation":
                star.beginFill(0xAAFFAA, 1);
                star.drawCircle(0, 0, 80);
                star.endFill();
                sunShadowFilter.color = 0xAAFFAA;
                star.filters = [sunShadowFilter];
            break;
        }
    }

    enter(){
        this.othersStarBox = [];
        this.buttonBox.visible = false;
        this.othersAllBox.removeChildren();
        this.setStarColor(this.ownStar , this.studentId);
        for(let i in GROUPS.students[this.studentId].recommend){
            this.othersStarBox[i] = {};
            this.addOthersBg(i);
            this.addOthersStar(i);
            this.addOthersName(i);
            this.addOthersLine(i);
        }
    }

    update(){

    }
}