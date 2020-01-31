import * as PIXI from 'pixi.js';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';

export default class StarInfo{
    constructor(app){
        this.app = app;
        this.studentId = "";

        this.starInfoBox = new PIXI.Container();
        this.backgroundBox = new PIXI.Container();
        this.starBox = new PIXI.Container();
        this.worksBox = new PIXI.Container();
        this.tagBoxOwn = new PIXI.Container();
        this.tagBoxOthers = new PIXI.Container();
        this.ownScrollBarBox = new PIXI.Container();
        this.othersScrollBarBox = new PIXI.Container();
        this.buttonBox = new PIXI.Container();

        this.backgroundBox.x = document.documentElement.clientWidth / 2;
        this.backgroundBox.y = document.documentElement.clientHeight / 2;

        this.starBox.x = document.documentElement.clientWidth / 4;
        this.starBox.y = document.documentElement.clientHeight / 2;
        this.starBox.scale.set(0.8);

        this.worksBox.x = document.documentElement.clientWidth * 0.75;
        this.worksBox.y = document.documentElement.clientHeight / 2 - 300;

        this.tagBoxOwn.x = document.documentElement.clientWidth * 0.75;
        this.tagBoxOwn.y = document.documentElement.clientHeight / 2 - 70;

        this.tagBoxOthers.x = document.documentElement.clientWidth * 0.75;
        this.tagBoxOthers.y = document.documentElement.clientHeight / 2 + 160;

        this.starInfoBox.addChild(this.backgroundBox , this.starBox , this.worksBox , this.tagBoxOwn , this.tagBoxOthers , this.buttonBox);

        this.createBackground();
        this.createSun();
        this.createPlanet_Plan();
        this.createPlanet_Design();
        this.createPlanet_Coding();
        this.createPlanet_Presentation();
        this.createName();
        this.createWorks();

        this.createOwnTags();
        this.createOwnScrollBar();
        this.createOwnMask();

        this.createOthersTags();
        this.createOthersScrollBar();
        this.createOthersMask();

        this.createBackButton();
    }

    createBackground(){
        this.spaceBg = new PIXI.Sprite(this.app.loader.resources['background_spaceship'].texture);
        this.spaceBg.anchor.set(0.5);
        this.spaceBg.width = document.documentElement.clientWidth;
        this.backgroundBox.addChild(this.spaceBg);
    }

    createSun(){
        this.sun = new PIXI.Graphics();
        this.starBox.addChild(this.sun);
    }

    createPlanet_Plan(){
        this.planetPlanPosition = Math.PI * 2 * Math.random();
        this.planetPlanOrbitalSpeed = 0.003;

        this.planetPlanOrbital = new PIXI.Graphics().lineStyle(0.5, 0xFFFFFF, 0.5).drawCircle(0, 0, 200);

        let planet_Plan_list = []
        for(let i = 0 ; i < 15 ; i++){
            planet_Plan_list[i] = new PIXI.Texture(this.app.loader.resources['planet_plan'].texture);
            planet_Plan_list[i].frame = new PIXI.Rectangle(i * 200 , 0 , 200 , 200);
        }
        this.planetPlan = new PIXI.AnimatedSprite(planet_Plan_list);
        this.planetPlan.animationSpeed = 0.2;
        this.planetPlan.rotation = Math.PI * 2 / 8;
        this.planetPlan.anchor.set(0.5);
        this.planetPlan.scale.set(0.2);
        this.planetPlan.x = Math.cos(this.planetPlanPosition) * 200;
        this.planetPlan.y = Math.sin(this.planetPlanPosition) * 200;
        this.starBox.addChild(this.planetPlanOrbital ,  this.planetPlan);
    }

    createPlanet_Design(){
        this.planetDesignPosition = Math.PI * 2 * Math.random();
        this.planetDesignOrbitalSpeed = 0.002;

        this.planetDesignOrbital = new PIXI.Graphics().lineStyle(0.5, 0xFFFFFF, 0.5).drawCircle(0, 0, 250);

        let planet_Design_list = []
        for(let i = 0 ; i < 7 ; i++){
            planet_Design_list[i] = new PIXI.Texture(this.app.loader.resources['planet_design'].texture);
            planet_Design_list[i].frame = new PIXI.Rectangle(i * 200 , 0 , 200 , 200);
        }
        this.planetDesign = new PIXI.AnimatedSprite(planet_Design_list);
        this.planetDesign.animationSpeed = 0.1;
        this.planetDesign.anchor.set(0.5);
        this.planetDesign.scale.set(0.2);
        this.planetDesign.x = Math.cos(this.planetDesignPosition) * 250;
        this.planetDesign.y = Math.sin(this.planetDesignPosition) * 250;
        this.starBox.addChild(this.planetDesignOrbital , this.planetDesign);
    }

    createPlanet_Coding(){
        this.planetCodingPosition = Math.PI * 2 * Math.random();
        this.planetCodingOrbitalSpeed = 0.0008;

        this.planetCodingOrbital = new PIXI.Graphics().lineStyle(0.5, 0xFFFFFF, 0.5).drawCircle(0, 0, 300);

        let planet_Coding_list = [];
        for(let i = 0 ; i < 13 ; i++){
            planet_Coding_list[i] = new PIXI.Texture(this.app.loader.resources['planet_coding'].texture);
            planet_Coding_list[i].frame = new PIXI.Rectangle(i * 200 , 0 , 200 , 200);
        }
        this.planetCoding = new PIXI.AnimatedSprite(planet_Coding_list);
        this.planetCoding.animationSpeed = 0.1;
        this.planetCoding.anchor.set(0.5);
        this.planetCoding.scale.set(0.2);
        this.planetCoding.x = Math.cos(this.planetCodingPosition) * 300;
        this.planetCoding.y = Math.sin(this.planetCodingPosition) * 300;
        this.starBox.addChild(this.planetCodingOrbital , this.planetCoding);
    }

    createPlanet_Presentation(){
        this.planetPresentationPosition = Math.PI * 2 * Math.random();
        this.planetPresentationOrbitalSpeed = 0.0005;

        this.planetPresentationOrbital = new PIXI.Graphics().lineStyle(0.5, 0xFFFFFF, 0.5).drawCircle(0, 0, 350);

        let planet_Presentation_list = [];
        for(let i = 0 ; i < 11 ; i++){
            planet_Presentation_list[i] = new PIXI.Texture(this.app.loader.resources['planet_presentation'].texture);
            planet_Presentation_list[i].frame = new PIXI.Rectangle(i * 200 , 0 , 200 , 200);
        }
        this.planetPresentation = new PIXI.AnimatedSprite(planet_Presentation_list);
        this.planetPresentation.animationSpeed = 0.1;
        this.planetPresentation.anchor.set(0.5);
        this.planetPresentation.scale.set(0.2);
        this.planetPresentation.x = Math.cos(this.planetPresentationPosition) * 350;
        this.planetPresentation.y = Math.sin(this.planetPresentationPosition) * 350;
        this.starBox.addChild(this.planetPresentationOrbital , this.planetPresentation);
    }
    
    createName(){
        this.studentName = new PIXI.Text('', game.fontStyle.SmartPhoneUI);
        this.studentName.style.fontSize = 50;
        this.studentName.y = 440;
        this.studentName.anchor.x = 0.5;
        this.starBox.addChild(this.studentName);
    }

    createWorks(){
        this.worksBg = new PIXI.Graphics();
        this.worksBg.lineStyle(2, 0xcaf2ff, 2);
        this.worksBg.beginFill(0xcaf2ff, 0.2);
        this.worksBg.drawRoundedRect(0 , 0 , 700 , 160, 8);
        this.worksBg.endFill();
        this.worksBg.x = -500;

        this.worksTitle = new PIXI.Text('作品：', game.fontStyle.KaisoNext);
        this.worksTitle.style.fontSize = 32;
        this.worksTitle.x = this.worksBg.x;
        this.worksTitle.y = this.worksBg.y - 50;

        this.worksText = new PIXI.Text('', game.fontStyle.SmartPhoneUI_White);
        this.worksText.style.fontSize = 30;
        this.worksText.style.lineHeight = 55;
        this.worksText.x = this.worksBg.x + 25;
        this.worksText.y = this.worksBg.y + 30;

        this.worksBox.addChild(this.worksTitle , this.worksBg , this.worksText);
    }

    createOwnTags(){
        this.ownTagsBg = new PIXI.Graphics();
        this.ownTagsBg.lineStyle(2, 0xcaf2ff, 2);
        this.ownTagsBg.beginFill(0xcaf2ff, 0.2);
        this.ownTagsBg.drawRoundedRect(0 , 0 , 700 , 160, 8);
        this.ownTagsBg.endFill();
        this.ownTagsBg.x = -500;

        let tagsTitle = new PIXI.Text('私の特徴：', game.fontStyle.KaisoNext);
        tagsTitle.style.fontSize = 32;
        tagsTitle.x = this.ownTagsBg.x;
        tagsTitle.y = this.ownTagsBg.y - 50;

        this.tagBox_1 = new PIXI.Container();
        this.tagBox_1.x = this.ownTagsBg.x + 25;
        this.tagBox_1.y = this.ownTagsBg.y + 15;
        this.tagBoxOwn.addChild(this.ownTagsBg , tagsTitle , this.tagBox_1);
    }

    createOthersTags(){
        this.othersTagsBg = new PIXI.Graphics();
        this.othersTagsBg.lineStyle(2, 0xcaf2ff, 2);
        this.othersTagsBg.beginFill(0xcaf2ff, 0.2);
        this.othersTagsBg.drawRoundedRect(0 , 0 , 700 , 220, 8);
        this.othersTagsBg.endFill();
        this.othersTagsBg.x = -500;

        let tagsTitle = new PIXI.Text('みんなから見た私の特徴：', game.fontStyle.KaisoNext);
        tagsTitle.style.fontSize = 32;
        tagsTitle.x = this.ownTagsBg.x;
        tagsTitle.y = this.ownTagsBg.y - 50;

        this.tagBox_2 = new PIXI.Container();
        this.tagBox_2.x = this.othersTagsBg.x + 25;
        this.tagBox_2.y = this.othersTagsBg.y + 15;
        this.tagBoxOthers.addChild(this.othersTagsBg , tagsTitle , this.tagBox_2);
    }

    createOwnScrollBar(){
        this.ownScrollBarBox.position.set(180 , 10);
        this.tagBoxOwn.addChild(this.ownScrollBarBox);
        
        var self = this;
        this.ownScrollBar = new PIXI.Graphics();
        this.ownScrollBar.beginFill(0xcaf2ff);
        this.ownScrollBar.drawRoundedRect(0 , 0 , 8 , 160, 4);
        this.ownScrollBar.endFill();
        this.ownScrollBar.visible = false;
        this.ownScrollBar.moving = false;
        this.ownScrollBar.pointY = 0;
        this.ownScrollBar.interactive = true;
        this.ownScrollBar.on('pointerdown', function(){self.moveStart(this)})
            .on('pointerupoutside', function(){self.moveEnd(this)})
            .on('pointerup', function(){self.moveEnd(this)})
            .on('pointermove', function(){self.moveOn(this , self.tagBox_1 , 140)});
        this.ownScrollBarBox.addChild(this.ownScrollBar);
    }

    createOthersScrollBar(){
        this.othersScrollBarBox.position.set(180 , 10);
        this.tagBoxOthers.addChild(this.othersScrollBarBox);
        
        var self = this;
        this.othersScrollBar = new PIXI.Graphics();
        this.othersScrollBar.beginFill(0xcaf2ff);
        this.othersScrollBar.drawRoundedRect(0 , 0 , 8 , 200, 4);
        this.othersScrollBar.endFill();
        this.othersScrollBar.visible = false;
        this.othersScrollBar.moving = false;
        this.othersScrollBar.pointY = 0;
        this.othersScrollBar.interactive = true;
        this.othersScrollBar.on('pointerdown', function(){self.moveStart(this)})
            .on('pointerupoutside', function(){self.moveEnd(this)})
            .on('pointerup', function(){self.moveEnd(this)})
            .on('pointermove', function(){self.moveOn(this , self.tagBox_2 , 200)});
        this.othersScrollBarBox.addChild(this.othersScrollBar);
    }

    moveStart(_this){
        _this.pointY = this.app.renderer.plugins.interaction.mouse.global.y - (document.documentElement.clientHeight / 2) - _this.y;
        _this.moving = true;
    }

    moveEnd(_this){
        _this.moving = false;
    }

    moveOn(_this , box ,boxheight){
        if(_this.moving == true){
            let newPosition = this.app.renderer.plugins.interaction.mouse.global.y;
            _this.y = (newPosition - document.documentElement.clientHeight / 2) - _this.pointY;
            if(_this.y < 0){
                _this.y = 0
            }else if(_this.y > boxheight - _this.height){
                _this.y = boxheight - _this.height
            }
            box.y = 15 + (-box.height - 15) * (_this.y / (boxheight - _this.height)) + boxheight * (_this.y / (boxheight - _this.height));
        }
    }

    createOwnMask(){
        let maskBox = new PIXI.Graphics();
        maskBox.beginFill(0xFF0000);
        maskBox.drawRect(0, 0, 700, 156);
        maskBox.endFill();
        maskBox.x = this.ownTagsBg.x
        maskBox.y = this.ownTagsBg.y + 2;
        this.tagBoxOwn.addChild(maskBox);
        this.tagBox_1.mask = maskBox;
    }

    createOthersMask(){
        let maskBox = new PIXI.Graphics();
        maskBox.beginFill(0xFF0000);
        maskBox.drawRect(0, 0, 700, 216);
        maskBox.endFill();
        maskBox.x = this.othersTagsBg.x
        maskBox.y = this.othersTagsBg.y + 2;
        this.tagBoxOthers.addChild(maskBox);
        this.tagBox_2.mask = maskBox;
    }

    addOwntag(){
        let nowHeight = 0;
        let nowWidth = 0;
        let allWidth = 650;
        let tag_list = [];
        for (let i in game.Manager.data.userData.students[this.studentId].tags.own) {
            tag_list[i] = new PIXI.Container();
            let tag_1 = new PIXI.Sprite(this.app.loader.resources['tag_own_01'].texture);
            let tag_2 = new PIXI.Sprite(this.app.loader.resources['tag_own_02'].texture);
            let tag_3 = new PIXI.Sprite(this.app.loader.resources['tag_own_03'].texture);
            let tagText = new PIXI.Text(game.Manager.data.userData.students[this.studentId].tags.own[i], game.fontStyle.SmartPhoneUI_White);

            tagText.style.fill = 0x4A6C76;

            tag_2.x = tag_1.width;
            tag_2.width = tagText.width + 4;
            tagText.x = tag_2.x + 2;
            tagText.y = 10; 
            tag_3.x = tag_2.x + tag_2.width;
            tag_list[i].addChild(tag_1 , tag_2 , tag_3 , tagText);

            if(nowWidth + tag_list[i].width + 20 <= allWidth){
                tag_list[i].x = nowWidth;
                tag_list[i].y = nowHeight;
            }else{
                nowHeight += 70;
                nowWidth = 0;
                tag_list[i].x = nowWidth;
                tag_list[i].y = nowHeight;
            }
            nowWidth += tag_list[i].width + 20;
            this.tagBox_1.addChild(tag_list[i]);
        }
    }

    addOtherstag(){
        let nowHeight = 0;
        let nowWidth = 0;
        let allWidth = 650;
        let tag_list = [];

        for (let i in this.tags_Others){
            tag_list[i] = new PIXI.Container();
            let tag_1 = new PIXI.Sprite(this.app.loader.resources['tag_others_01'].texture);
            let tag_2 = new PIXI.Sprite(this.app.loader.resources['tag_others_02'].texture);
            let tag_3 = new PIXI.Sprite(this.app.loader.resources['tag_others_03'].texture);
            let tagText = new PIXI.Text("", game.fontStyle.SmartPhoneUI_White);
            if(this.tags_Others[i].num <= 1){
                tagText.text = this.tags_Others[i].tag
            }else{
                tagText.text = this.tags_Others[i].tag + "(" + this.tags_Others[i].num +")";
            }
            
            tagText.style.fill = 0xFFFFFF;

            tag_2.x = tag_1.width;
            tag_2.width = tagText.width + 4;
            tagText.x = tag_2.x + 2;
            tagText.y = 10;
            tag_3.x = tag_2.x + tag_2.width;
            tag_list[i].addChild(tag_1 , tag_2 , tag_3 , tagText);

            if(nowWidth + tag_list[i].width + 20 <= allWidth){
                tag_list[i].x = nowWidth;
                tag_list[i].y = nowHeight;
            }else{
                nowHeight += 70; 
                nowWidth = 0;
                tag_list[i].x = nowWidth;
                tag_list[i].y = nowHeight;
            }
            nowWidth += tag_list[i].width + 20;
            this.tagBox_2.addChild(tag_list[i]);
        }
    }
    
    setTagsOthers(){
        this.tags_Others = [];
        let tags = []
        if(game.Manager.data.userData.students[this.studentId].tags.others){
            tags = game.Manager.data.userData.students[this.studentId].tags.others.slice().reverse();
        }

        loop: 
        for(let i in tags){
            for(let j in this.tags_Others){
                if(game.Manager.data.userData.students[this.studentId].tags.others[i] == this.tags_Others[j].tag){
                    let number = this.tags_Others[j].num + 1;
                    this.tags_Others.splice(j , 1);
                    this.tags_Others.unshift({tag : game.Manager.data.userData.students[this.studentId].tags.others[i] , num : number})
                    continue loop;
                }
            }
            this.tags_Others.unshift({tag : game.Manager.data.userData.students[this.studentId].tags.others[i] , num : 1}); 
        }
    }

    createBackButton(){
        let self = this;
        this.title = new PIXI.Sprite(this.app.loader.resources['title_info'].texture);
        this.title.scale.set(0.8);
        this.buttonBack = new PIXI.Sprite(this.app.loader.resources['button_02_on'].texture);
        this.buttonBack.scale.set(0.8);
        this.buttonBack.anchor.set(0.5);
        this.buttonBack.position.set(60 , 43);
        this.buttonBack.interactive = true;
        this.buttonBack.buttonMode = true;
        this.buttonBack.on('pointerover', function(){
            this.texture = self.app.loader.resources['button_02_off'].texture
        }).on('pointerout', function(){
            this.texture = self.app.loader.resources['button_02_on'].texture
        }).on('pointerdown', function(){
            game.Manager.enter(3);
        });
        this.buttonBox.addChild(this.title , this.buttonBack);
    }

    setStudentId(studentId){
        this.studentId = studentId;
    }

    setStarSize(){
        let totalCoding = 0;
        let totalDesign = 0;
        let totalPlan = 0;
        let totalPresentation = 0;
        
        if(game.Manager.data.userData.students[this.studentId].comments){
            for(let i in game.Manager.data.userData.students[this.studentId].comments){
                let comments = game.Manager.data.userData.students[this.studentId].comments[i];
                totalCoding += comments.coding;
                totalDesign += comments.design;
                totalPlan += comments.plan;
                totalPresentation += comments.presentation;
            }
            totalCoding = Number((totalCoding / 300).toFixed(3));
            totalDesign = Number((totalDesign / 300).toFixed(3));
            totalPlan = Number((totalPlan / 300).toFixed(3));
            totalPresentation = Number((totalPresentation / 300).toFixed(3));
            if(totalCoding > 0.5){
                totalCoding = 0.5;
            }
            if(totalDesign > 0.5){
                totalDesign = 0.5;
            }
            if(totalPlan > 0.5){
                totalPlan = 0.5;
            }
            if(totalPresentation > 0.5){
                totalPresentation = 0.5;
            }
            console.log(totalCoding , totalDesign , totalPlan , totalPresentation);
            this.planetCoding.scale.set(0.2 + totalCoding);
            this.planetDesign.scale.set(0.2 + totalDesign);
            this.planetPlan.scale.set(0.2 + totalPlan);
            this.planetPresentation.scale.set(0.2 + totalPresentation);
        }else{
            this.planetCoding.scale.set(0.2);
            this.planetDesign.scale.set(0.2);
            this.planetPlan.scale.set(0.2);
            this.planetPresentation.scale.set(0.2);
        }
    }

    setOwnScrollBar(){
        if(this.tagBox_1.height > 160){
            this.ownScrollBar.visible = true;
            this.ownScrollBar.height = 160 * (160 / this.tagBox_1.height);
            this.ownScrollBar.y = 0;
            this.ownScrollBar.buttonMode = true;
        }else{
            this.ownScrollBar.visible = false;
        }
    }

    setOthersScrollBar(){
        if(this.tagBox_2.height > 220){
            this.othersScrollBar.visible = true;
            this.othersScrollBar.height = 220 * (220 / this.tagBox_2.height);
            this.othersScrollBar.y = 0;
            this.othersScrollBar.buttonMode = true;
        }else{
            this.othersScrollBar.visible = false;
        }
    }

    setSunColor(){
        this.sun.filters = [];
        this.sun.clear();

        let sunShadowFilter = new DropShadowFilter();
        sunShadowFilter.alpha = 1;
        sunShadowFilter.blur = 50;
        sunShadowFilter.distance = 0;
        sunShadowFilter.quality = 8;
        sunShadowFilter.pixelSize = 0.6;
        
        switch(game.Manager.data.userData.students[this.studentId].color){
            case "star_plan":
                this.sun.beginFill(0xFFF390, 1);
                this.sun.drawCircle(0, 0, 50);
                this.sun.endFill();
                sunShadowFilter.color = 0xFFF390;
                this.sun.filters = [sunShadowFilter];
            break;
            case "star_design":
                this.sun.beginFill(0xFF99FF, 1);
                this.sun.drawCircle(0, 0, 50);
                this.sun.endFill();
                sunShadowFilter.color = 0xFF99FF;
                this.sun.filters = [sunShadowFilter];
            break;
            case "star_coding":
                this.sun.beginFill(0x99CCFF, 1);
                this.sun.drawCircle(0, 0, 50);
                this.sun.endFill();
                sunShadowFilter.color = 0x99CCFF;
                this.sun.filters = [sunShadowFilter];
            break;
            case "star_presentation":
                this.sun.beginFill(0xAAFFAA, 1);
                this.sun.drawCircle(0, 0, 50);
                this.sun.endFill();
                sunShadowFilter.color = 0xAAFFAA;
                this.sun.filters = [sunShadowFilter];
            break;
        }
    }

    enter(){
        this.studentId = game.star.studentId;
        this.studentName.text = game.Manager.data.userData.students[this.studentId].name;
        this.worksText.text = '';
        for(let i in game.Manager.data.userData.students[this.studentId].worktitle){
            this.worksText.text += '#' + game.Manager.data.userData.students[this.studentId].worktitle[i].boothnumber + ' ' + game.Manager.data.userData.students[this.studentId].worktitle[i].worktitle + '\n'
        }
        this.setSunColor();
        this.setStarSize();
        this.planetPlan.play();
        this.planetDesign.play();
        this.planetCoding.play();
        this.planetPresentation.play();
        this.tagBox_1.removeChildren();
        this.tagBox_2.removeChildren();
        this.addOwntag();
        this.setOwnScrollBar();
        this.setTagsOthers();
        this.addOtherstag();
        this.setOthersScrollBar();
        this.tagBox_1.y = this.ownTagsBg.y + 15;
    }

    update(){
        this.planetPlan.x = Math.cos(this.planetPlanPosition -= this.planetPlanOrbitalSpeed) * 200;
        this.planetPlan.y = Math.sin(this.planetPlanPosition -= this.planetPlanOrbitalSpeed) * 200;

        this.planetDesign.x = Math.cos(this.planetDesignPosition -= this.planetDesignOrbitalSpeed) * 250;
        this.planetDesign.y = Math.sin(this.planetDesignPosition -= this.planetDesignOrbitalSpeed) * 250;

        this.planetCoding.x = Math.cos(this.planetCodingPosition -= this.planetCodingOrbitalSpeed) * 300;
        this.planetCoding.y = Math.sin(this.planetCodingPosition -= this.planetCodingOrbitalSpeed) * 300;

        this.planetPresentation.x = Math.cos(this.planetPresentationPosition -= this.planetPresentationOrbitalSpeed) * 350;
        this.planetPresentation.y = Math.sin(this.planetPresentationPosition -= this.planetPresentationOrbitalSpeed) * 350;
    }
}