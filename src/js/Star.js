import * as PIXI from 'pixi.js';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';

export default class Star {
    constructor(app){
        this.app = app;

        this.starBox = new PIXI.Container();
        this.planetBox = new PIXI.Container();
        this.flameBox = new PIXI.Container();
        this.messageBox = new PIXI.Container();

        this.studentId = "";
        this.beforeId = [];

        this.showStarText = "";
        this.showStar = {};

        this.planetBox.x = document.documentElement.clientWidth / 2;
        this.planetBox.y = document.documentElement.clientHeight / 2;
        this.starBox.addChild(this.planetBox , this.flameBox , this.messageBox);

        this.createBackground();
        this.createSun();
        this.createPlanet_Plan();
        this.createPlanet_Design();
        this.createPlanet_Coding();
        this.createPlanet_Presentation();
        this.createName();
        this.createStarText();
        this.createFlame();
        this.createButton();
    }

    createBackground(){
        let self = this;
        this.spaceBg = new PIXI.Sprite(this.app.loader.resources['spaceBg_01'].texture);
        this.spaceBg.anchor.set(0.5);
        this.spaceBg.scale.set(0.7);
        this.spaceBg.rotation = Math.PI * Math.random() * 2;
        this.spaceBg.interactive = true;
        this.spaceBg.on('pointerdown', function(){
            self.starTextOff();
        });
        this.planetBox.addChild(this.spaceBg);
    }

    createSun(){
        this.sun = new PIXI.Graphics();
        this.planetBox.addChild(this.sun);
    }

    createPlanet_Plan(){
        let self = this;
        this.planetPlanPosition = Math.PI * 2 * Math.random();
        this.planetPlanOrbitalSpeed = 0.005;

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
        this.planetPlan.interactive = true;
        this.planetPlan.buttonMode = true;
        this.planetPlan.on('pointerdown', function(){
            self.starTextOn(this , "text_plan_");
        });
        this.planetBox.addChild(this.planetPlanOrbital ,  this.planetPlan);
    }

    createPlanet_Design(){
        let self = this;
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
        this.planetDesign.interactive = true;
        this.planetDesign.buttonMode = true;
        this.planetDesign.on('pointerdown', function(){
            self.starTextOn(this , "text_design_");
        });
        this.planetBox.addChild(this.planetDesignOrbital , this.planetDesign);
    }

    createPlanet_Coding(){
        let self = this;
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
        this.planetCoding.interactive = true;
        this.planetCoding.buttonMode = true;
        this.planetCoding.on('pointerdown', function(){
            self.starTextOn(this , "text_coding_");
        });
        this.planetBox.addChild(this.planetCodingOrbital , this.planetCoding);
    }

    createPlanet_Presentation(){
        let self = this;
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
        this.planetPresentation.interactive = true;
        this.planetPresentation.buttonMode = true;
        this.planetPresentation.on('pointerdown', function(){
            self.starTextOn(this , "text_presentation_");
        });
        this.planetBox.addChild(this.planetPresentationOrbital , this.planetPresentation);
    }

    createName(){
        this.studentName = new PIXI.Text('', game.fontStyle.SmartPhoneUI);
        this.studentName.style.fontSize = 26;
        this.studentName.x = 0
        this.studentName.y = 70;
        this.studentName.anchor.x = 0.5;
        this.planetBox.addChild(this.studentName);
    }

    createStarText(){
        this.starText = new PIXI.Sprite();
        this.starText.anchor.set(0 , 1);
        this.planetBox.addChild(this.starText);
    }

    createFlame(){
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
        this.title = new PIXI.Sprite(this.app.loader.resources['title_star'].texture);
        this.title.scale.set(0.8);
        this.target = [
            new PIXI.Sprite(this.app.loader.resources['target'].texture),
            new PIXI.Sprite(this.app.loader.resources['target'].texture),
            new PIXI.Sprite(this.app.loader.resources['target'].texture),
            new PIXI.Sprite(this.app.loader.resources['target'].texture)
        ];

        this.target[0].anchor.set(0.5);
        this.target[1].anchor.set(0.5);
        this.target[2].anchor.set(0.5);
        this.target[3].anchor.set(0.5);

        this.target[1].scale.set(1 , -1);
        this.target[2].scale.set(-1 , 1);
        this.target[3].scale.set(-1 , -1);

        this.target[0].position.set(document.documentElement.clientWidth / 4 , document.documentElement.clientHeight / 4);
        this.target[1].position.set(document.documentElement.clientWidth / 4 , document.documentElement.clientHeight / 4 * 3);
        this.target[2].position.set(document.documentElement.clientWidth / 4 * 3 , document.documentElement.clientHeight / 4);
        this.target[3].position.set(document.documentElement.clientWidth / 4 * 3, document.documentElement.clientHeight / 4 * 3);

        this.target[3].alpha = 0.2;

        this.flameBox.addChild(this.line_horizontal ,this.line_vertical , this.flameLeft , this.flameRight , this.flameBottom , this.target[0] , this.target[1] , this.target[2] , this.target[3] , this.title);
    }

    createButton(){
        let self = this;
        let poly = new PIXI.Polygon(
            new PIXI.Point(-70 , -115),
            new PIXI.Point(-130 , 0),
            new PIXI.Point(-70 , 115),
            new PIXI.Point(70 , 115),
            new PIXI.Point(130 , 0),
            new PIXI.Point(70 , -115)
        );
            
        this.buttonHome = new PIXI.Sprite(this.app.loader.resources['button_home_off'].texture);
        this.buttonHome.anchor.set(0.5);
        this.buttonHome.position.set(200 , document.documentElement.clientHeight - 200);
        this.buttonHome.hitArea = poly;
        this.buttonHome.interactive = true;
        this.buttonHome.buttonMode = true;
        this.buttonHome.on('pointerover', function(){
            this.texture = self.app.loader.resources['button_home_on'].texture
        }).on('pointerout', function(){
            this.texture = self.app.loader.resources['button_home_off'].texture
        }).on('pointerdown', function(){
            self.buttonHome_On();
        });

        this.buttonStarInfo = new PIXI.Sprite(this.app.loader.resources['button_starinfo_off'].texture);
        this.buttonStarInfo.anchor.set(0.5);
        this.buttonStarInfo.position.set(document.documentElement.clientWidth - 200 , document.documentElement.clientHeight - 550);
        this.buttonStarInfo.hitArea = poly;
        this.buttonStarInfo.interactive = true;
        this.buttonStarInfo.buttonMode = true;
        this.buttonStarInfo.on('pointerover', function(){
            this.texture = self.app.loader.resources['button_starinfo_on'].texture
        }).on('pointerout', function(){
            this.texture = self.app.loader.resources['button_starinfo_off'].texture
        }).on('pointerdown', function(){
            self.toStarInfo();
        });

        this.buttonLink = new PIXI.Sprite(this.app.loader.resources['button_link_off'].texture);
        this.buttonLink.anchor.set(0.5);
        this.buttonLink.position.set(document.documentElement.clientWidth - 200 , document.documentElement.clientHeight - 320);
        this.buttonLink.hitArea = poly;
        this.buttonLink.interactive = true;
        this.buttonLink.buttonMode = true;
        this.buttonLink.on('pointerover', function(){
            this.texture = self.app.loader.resources['button_link_on'].texture
        }).on('pointerout', function(){
            this.texture = self.app.loader.resources['button_link_off'].texture
        }).on('pointerdown', function(){
            self.toStarLink();
        });

        this.buttonRecommend = new PIXI.Sprite(this.app.loader.resources['button_recommend_off'].texture);
        this.buttonRecommend.anchor.set(0.5);
        this.buttonRecommend.position.set(document.documentElement.clientWidth - 400 , document.documentElement.clientHeight - 200);
        this.buttonRecommend.hitArea = poly;
        this.buttonRecommend.interactive = true;
        this.buttonRecommend.buttonMode = true;
        this.buttonRecommend.on('pointerover', function(){
            this.texture = self.app.loader.resources['button_recommend_on'].texture
        }).on('pointerout', function(){
            this.texture = self.app.loader.resources['button_recommend_off'].texture
        }).on('pointerdown', function(){
            self.toStarRecommend();
        });

        this.messageBox.addChild(this.buttonHome , this.buttonStarInfo , this.buttonLink , this.buttonRecommend);
    }

    starTextOn(_this , star){
        this.showStarText = star;
        this.showStar = _this;
        this.starText.visible = true;
    }

    starTextOff(_this){
        this.showStarText = "";
        this.starText.visible = false;
    }

    setStudentId(studentId){
        this.studentId = studentId;
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
            this.planetCoding.scale.set(0.2 + totalCoding);
            this.planetDesign.scale.set(0.2 + totalDesign);
            this.planetPlan.scale.set(0.2 + totalPlan);
            this.planetPresentation.scale.set(0.2 + totalPresentation);
        }
    }

    toStarInfo(){
        game.starInfo.setStudentId(this.studentId);
        game.Manager.enter(4);
    }

    toStarLink(){
        game.starLink.setStudentId(this.studentId);
        game.Manager.enter(5);
    }

    toStarRecommend(){
        game.starRecommend.setStudentId(this.studentId);
        game.Manager.enter(6);
    }

    enter(){
        this.showStarText = "";
        this.starText.visible = false;
        this.studentName.text = game.Manager.data.userData.students[this.studentId].name;
        this.buttonHome.texture = this.app.loader.resources['button_home_off'].texture;
        this.buttonStarInfo.texture = this.app.loader.resources['button_starinfo_off'].texture;
        this.buttonLink.texture = this.app.loader.resources['button_link_off'].texture;
        this.buttonRecommend.texture = this.app.loader.resources['button_recommend_off'].texture;
        this.setSunColor();
        this.setStarSize();
        this.planetPlan.play();
        this.planetDesign.play();
        this.planetCoding.play();
        this.planetPresentation.play();
    }

    buttonHome_On(){
        game.Manager.enter(1);
    }

    update(){
        this.planetPlan.x = Math.cos(this.planetPlanPosition -= this.planetPlanOrbitalSpeed) * 200;
        this.planetPlan.y = Math.sin(this.planetPlanPosition -= this.planetPlanOrbitalSpeed) * 200;
        // this.planetPlan.rotation -= 0.01;

        this.planetDesign.x = Math.cos(this.planetDesignPosition -= this.planetDesignOrbitalSpeed) * 250;
        this.planetDesign.y = Math.sin(this.planetDesignPosition -= this.planetDesignOrbitalSpeed) * 250;
        // this.planetDesign.rotation += 0.005;

        this.planetCoding.x = Math.cos(this.planetCodingPosition -= this.planetCodingOrbitalSpeed) * 300;
        this.planetCoding.y = Math.sin(this.planetCodingPosition -= this.planetCodingOrbitalSpeed) * 300;
        // this.planetCoding.rotation -= 0.03;

        this.planetPresentation.x = Math.cos(this.planetPresentationPosition -= this.planetPresentationOrbitalSpeed) * 350;
        this.planetPresentation.y = Math.sin(this.planetPresentationPosition -= this.planetPresentationOrbitalSpeed) * 350;
        // this.planetPresentation.rotation -= 0.2;
        if(this.showStarText != ""){
            if(this.showStar.x < 0){
                this.starText.texture = this.app.loader.resources[this.showStarText + "left"].texture;
                this.starText.x = this.showStar.x - 20;
                this.starText.y = this.showStar.y - 20;
                this.starText.anchor.x = 1;
            }else{
                this.starText.texture = this.app.loader.resources[this.showStarText + "right"].texture;
                this.starText.x = this.showStar.x + 20;
                this.starText.y = this.showStar.y - 20;
                this.starText.anchor.x = 0;
            }
        }
        this.spaceBg.rotation -= 0.0003
    }
}