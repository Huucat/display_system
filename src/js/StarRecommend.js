import * as PIXI from 'pixi.js';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';

export default class StarRecommend{
    constructor(app){
        this.app = app;

        this.studentId = "";
        this.selectedStudentId = "";
        this.selected = false;
        this.targetStep = 0;

        this.othersStarBox = [];

        this.starRecommendBox = new PIXI.Container();
        this.backgroundBox = new PIXI.Container();
        this.ownNameBox = new PIXI.Container();
        this.othersAllBox = new PIXI.Container();
        this.targetBox = new PIXI.Container();
        this.buttonBox = new PIXI.Container();
        this.backButtonBox = new PIXI.Container();

        this.backgroundBox.x = this.ownNameBox.x = this.buttonBox.x = document.documentElement.clientWidth / 2;
        this.backgroundBox.y = this.othersAllBox.y = this.targetBox.y = document.documentElement.clientHeight / 2;

        this.starRecommendBox.addChild(this.backgroundBox , this.ownNameBox , this.othersAllBox , this.targetBox , this.buttonBox , this.backButtonBox);

        this.createBackground();
        this.createOwnName();
        this.createTarget();
        this.createButton();
        this.createBackButton();
    }

    createBackground(){
        this.spaceBg = new PIXI.Sprite(this.app.loader.resources['background_spaceship'].texture);
        this.spaceBg.anchor.set(0.5);
        this.spaceBg.width = document.documentElement.clientWidth;
        this.backgroundBox.addChild(this.spaceBg);
    }

    createOwnName(){
        this.ownName = new PIXI.Text('', game.fontStyle.KaisoNext);
        this.ownName.style.fontSize = 50;
        this.ownName.style.align = "center";
        this.ownName.x = 0
        this.ownName.y = 150;
        this.ownName.anchor.x = 0.5;
        this.ownNameBox.addChild(this.ownName);
    }

    createTarget(){
        this.target = [
            new PIXI.Sprite(this.app.loader.resources['target_arrow'].texture),
            new PIXI.Sprite(this.app.loader.resources['target'].texture),
            new PIXI.Sprite(this.app.loader.resources['target'].texture),
            new PIXI.Sprite(this.app.loader.resources['target'].texture),
            new PIXI.Sprite(this.app.loader.resources['target'].texture)
        ];

        this.target[0].anchor.set(0.5);

        this.target[2].scale.set(1 , -1);
        this.target[3].scale.set(-1 , 1);
        this.target[4].scale.set(-1 , -1);



        this.targetBox.addChild(this.target[0] , this.target[1] , this.target[2] , this.target[3] , this.target[4]);
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
            self.toStar();
        });

        this.buttonBox.addChild(this.buttonClose , this.buttonToStar);
    }

    createBackButton(){
        let self = this;
        this.title = new PIXI.Sprite(this.app.loader.resources['title_recommend'].texture);
        this.title.scale.set(0.8);
        this.buttonBack = new PIXI.Sprite(this.app.loader.resources['button_02'].texture);
        this.buttonBack.scale.set(0.8);
        this.buttonBack.anchor.set(0.5);
        this.buttonBack.position.set(60 , 43);
        this.buttonBack.interactive = true;
        this.buttonBack.buttonMode = true;
        this.buttonBack.on('pointerdown', function(){
            self.back();
        });

        this.backButtonBox.addChild(this.title , this.buttonBack);
    }

    addOthersBg(){
        let self = this;
        let membersNum = game.Manager.data.userData.students[this.studentId].recommend.length;
        let shadowFilter = new DropShadowFilter();
        shadowFilter.alpha = 0.8;
        shadowFilter.blur = 8;
        shadowFilter.distance = 0;
        shadowFilter.quality = 8;
        shadowFilter.pixelSize = 0.5;
        shadowFilter.color = 0x00A3D5;
        for(let i = 0 ; i < membersNum ; i++){
            this.othersStarBox[i] = new PIXI.Container();
            this.othersStarBox[i].position.x = document.documentElement.clientWidth / 2 - (membersNum - 1)  * 175 + i * 350;
            this.othersAllBox.addChild(this.othersStarBox[i]);

            let othersBg = new PIXI.Graphics();
            othersBg.lineStyle(2, 0xFFFFFF, 3);
            othersBg.beginFill(0xCAF2FF , 0.2);
            othersBg.drawRoundedRect(-150 , -200 , 300 , 400, 8);
            othersBg.endFill();
            othersBg.filters = [shadowFilter];
            othersBg.interactive = true;
            othersBg.buttonMode = true;
            othersBg.on('pointerdown', function(){
                self.setButtonOn(Number(i));
            });
            
            this.othersStarBox[i].addChild(othersBg);
        }
    }

    addOthersStar(){
        for(let i in game.Manager.data.userData.students[this.studentId].recommend){
            let othersStar = new PIXI.Graphics();
            othersStar.y = -120;
            this.setStarColor(othersStar , game.Manager.data.userData.students[this.studentId].recommend[i].id);
            this.othersStarBox[i].addChild(othersStar);
        }
    }

    addOthersName(){
        for(let i in game.Manager.data.userData.students[this.studentId].recommend){
            let othersName = new PIXI.Text(game.Manager.data.userData.students[game.Manager.data.userData.students[this.studentId].recommend[i].id].name, game.fontStyle.SmartPhoneUI_White);
            if(game.Manager.data.userData.students[this.studentId].recommend[i].id.indexOf("18aw") != -1){
                othersName.style.fill = 0x63D9FF;
            }else{
                othersName.style.fill = 0xFFD692;
            }
            othersName.style.fontSize = 30;
            othersName.style.align = "center";
            othersName.style.wordWrap = true;
            othersName.style.wordWrapWidth = 300;
            othersName.style.lineHeight = 30;
            othersName.y = -60;
            othersName.anchor.x = 0.5;
            this.othersStarBox[i].addChild(othersName);
        }
    }

    addOthersInfo(){
        for(let i in game.Manager.data.userData.students[this.studentId].recommend){
            let line = new PIXI.Graphics();
            line.lineStyle(2, 0xFFFFFF, 1);
            line.moveTo(-140 , 50);
            line.lineTo(140 , 50);

            let othersInfo = new PIXI.Text(game.Manager.data.userData.students[this.studentId].recommend[i].message, game.fontStyle.SmartPhoneUI_White);
            othersInfo.style.fontSize = 24;
            othersInfo.style.align = "left";
            othersInfo.style.wordWrap = true;
            othersInfo.style.wordWrapWidth = 275;
            othersInfo.style.breakWords = true;
            othersInfo.style.lineHeight = 30;
            othersInfo.y = 60;
            othersInfo.anchor.x = 0.5;

            this.othersStarBox[i].addChild(line , othersInfo);
        }
    }
    
    setButtonOn(num){
        for(let i in this.othersStarBox){
            this.othersStarBox[i].alpha = 0.2;
        }
        this.selectedStudentId = game.Manager.data.userData.students[this.studentId].recommend[num].id;
        this.othersStarBox[num].alpha = 1;
        this.target[0].position.set(this.othersStarBox[num].x , -220);
        this.target[1].position.set(this.othersStarBox[num].x - 168 , -215);
        this.target[2].position.set(this.othersStarBox[num].x - 168, 215);
        this.target[3].position.set(this.othersStarBox[num].x + 168 , -215);
        this.target[4].position.set(this.othersStarBox[num].x + 168 , 215);
        this.buttonBox.visible = true;
        this.targetBox.visible = true;
        this.selected = true;
    }

    
    setButtonOff(){
        for(let i in this.othersStarBox){
            this.othersStarBox[i].alpha = 1;
        }
        this.targetStep = 0;
        this.buttonClose.texture = this.app.loader.resources['button_close_off'].texture;
        this.buttonToStar.texture = this.app.loader.resources['button_tostar_off'].texture;
        this.buttonBox.visible = false;
        this.targetBox.visible = false;
        this.selected = false;
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

        switch(game.Manager.data.userData.students[studentId].color){
            case "star_plan":
                star.beginFill(0xFFF390, 1);
                star.drawCircle(0, 0, 40);
                star.endFill();
                sunShadowFilter.color = 0xFFF390;
                star.filters = [sunShadowFilter];
            break;
            case "star_design":
                star.beginFill(0xFF99FF, 1);
                star.drawCircle(0, 0, 40);
                star.endFill();
                sunShadowFilter.color = 0xFF99FF;
                star.filters = [sunShadowFilter];
            break;
            case "star_coding":
                star.beginFill(0x99CCFF, 1);
                star.drawCircle(0, 0, 40);
                star.endFill();
                sunShadowFilter.color = 0x99CCFF;
                star.filters = [sunShadowFilter];
            break;
            case "star_presentation":
                star.beginFill(0xAAFFAA, 1);
                star.drawCircle(0, 0, 40);
                star.endFill();
                sunShadowFilter.color = 0xAAFFAA;
                star.filters = [sunShadowFilter];
            break;
        }
    }

    toStar(){
        game.star.beforeId.push({managerNum : 6 , number : this.studentId});
        game.star.setStudentId(this.selectedStudentId);
        game.Manager.enter(3);
    }

    enter(){
        this.studentId = game.star.studentId;
        this.buttonClose.texture = this.app.loader.resources['button_close_off'].texture;
        this.buttonToStar.texture = this.app.loader.resources['button_tostar_off'].texture;
        this.ownName.text = game.Manager.data.userData.students[this.studentId].name + "のおすすめ";
        this.buttonBox.visible = false;
        this.targetBox.visible = false;
        this.targetStep = 0;
        this.othersAllBox.removeChildren();
        this.othersStarBox = [];
        this.addOthersBg();
        this.addOthersStar();
        this.addOthersName();
        this.addOthersInfo();
    }

    back(){
        game.Manager.enter(3);
    }

    update(){
        if(this.selected){
            this.target[0].y = -220 + Math.sin(this.targetStep) * 3;
            this.targetStep += 0.4;
        }
    }
}