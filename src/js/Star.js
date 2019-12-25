import * as PIXI from 'pixi.js';
import GROUPS from './groups.json';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';

export default class Star {
    constructor(app){
        this.app = app;

        this.starBox = new PIXI.Container();
        this.planetBox = new PIXI.Container();
        this.flameBox = new PIXI.Container();
        this.messageBox = new PIXI.Container();

        this.studentId = '';

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
        this.createFlame();
        this.createButton();
    }

    createBackground(){
        this.spaceBg = new PIXI.Sprite(this.app.loader.resources['spaceBg_01'].texture);
        this.spaceBg.anchor.set(0.5);
        this.planetBox.addChild(this.spaceBg);
    }


    createSun(){
        this.sun = new PIXI.Graphics();
        this.sun.beginFill(0xCAF2FF, 1);
        this.sun.drawCircle(0, 0, 50);
        this.sun.endFill();
        this.sunShadowFilter = new DropShadowFilter();
        this.sunShadowFilter.alpha = 1;
        this.sunShadowFilter.blur = 50;
        this.sunShadowFilter.distance = 0;
        this.sunShadowFilter.quality = 8;
        this.sunShadowFilter.pixelSize = 0.6;
        this.sunShadowFilter.color = 0xCAF2FF;
        this.sun.filters = [this.sunShadowFilter];

        this.planetBox.addChild(this.sun);
    }

    createPlanet_Plan(){
        this.planetPlanPosition = Math.PI * 2 * Math.random();
        this.planetPlanOrbitalSpeed = 0.005;
        this.planetPlanOrbital = new PIXI.Graphics().lineStyle(0.5, 0xFFFFFF, 0.5).drawCircle(0, 0, 200);
        this.planetPlan = new PIXI.Sprite(this.app.loader.resources['planet_plan'].texture);
        this.planetPlan.anchor.set(0.5);
        this.planetPlan.scale.set(0.4);
        this.planetPlan.x = Math.cos(this.planetPlanPosition) * 200;
        this.planetPlan.y = Math.sin(this.planetPlanPosition) * 200;
        this.planetBox.addChild(this.planetPlanOrbital ,  this.planetPlan);
    }

    createPlanet_Design(){
        this.planetDesignPosition = Math.PI * 2 * Math.random();
        this.planetDesignOrbitalSpeed = 0.002;
        this.planetDesignOrbital = new PIXI.Graphics().lineStyle(0.5, 0xFFFFFF, 0.5).drawCircle(0, 0, 250);
        this.planetDesign = new PIXI.Sprite(this.app.loader.resources['planet_design'].texture);
        this.planetDesign.anchor.set(0.5);
        this.planetDesign.scale.set(0.4);
        this.planetDesign.x = Math.cos(this.planetDesignPosition) * 250;
        this.planetDesign.y = Math.sin(this.planetDesignPosition) * 250;
        this.planetBox.addChild(this.planetDesignOrbital , this.planetDesign);
    }

    createPlanet_Coding(){
        this.planetCodingPosition = Math.PI * 2 * Math.random();
        this.planetCodingOrbitalSpeed = 0.0008;
        this.planetCodingOrbital = new PIXI.Graphics().lineStyle(0.5, 0xFFFFFF, 0.5).drawCircle(0, 0, 300);
        this.planetCoding = new PIXI.Sprite(this.app.loader.resources['planet_coding'].texture);
        this.planetCoding.anchor.set(0.5);
        this.planetCoding.scale.set(0.4);
        this.planetCoding.x = Math.cos(this.planetCodingPosition) * 300;
        this.planetCoding.y = Math.sin(this.planetCodingPosition) * 300;
        this.planetBox.addChild(this.planetCodingOrbital , this.planetCoding);
    }

    createPlanet_Presentation(){
        this.planetPresentationPosition = Math.PI * 2 * Math.random();
        this.planetPresentationOrbitalSpeed = 0.0005;
        this.planetPresentationOrbital = new PIXI.Graphics().lineStyle(0.5, 0xFFFFFF, 0.5).drawCircle(0, 0, 350);
        this.planetPresentation = new PIXI.Sprite(this.app.loader.resources['planet_presentation'].texture);
        this.planetPresentation.anchor.set(0.5);
        this.planetPresentation.scale.set(0.4);
        this.planetPresentation.x = Math.cos(this.planetPresentationPosition) * 350;
        this.planetPresentation.y = Math.sin(this.planetPresentationPosition) * 350;
        this.planetBox.addChild(this.planetPresentationOrbital , this.planetPresentation);
    }

    createName(){
        this.studentName = new PIXI.Text('', game.fontStyle_SmartPhoneUI);
        this.studentName.style.fontSize = 26;
        this.studentName.x = 0
        this.studentName.y = 70;
        this.studentName.anchor.x = 0.5;
        this.planetBox.addChild(this.studentName);
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

        this.flameBox.addChild(this.line_horizontal ,this.line_vertical , this.flameLeft , this.flameRight , this.flameBottom , this.target[0] , this.target[1] , this.target[2] , this.target[3]);
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
            
        this.buttonBack = new PIXI.Sprite(this.app.loader.resources['button_back_off'].texture);
        this.buttonBack.anchor.set(0.5);
        this.buttonBack.position.set(200 , document.documentElement.clientHeight - 200);
        this.buttonBack.hitArea = poly;
        this.buttonBack.interactive = true;
        this.buttonBack.buttonMode = true;
        this.buttonBack.on('pointerover', function(){
            this.texture = self.app.loader.resources['button_back_on'].texture
        }).on('pointerout', function(){
            this.texture = self.app.loader.resources['button_back_off'].texture
        }).on('pointerdown', function(){
            game.Manager.enter(2);
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
        });

        this.messageBox.addChild(this.buttonBack , this.buttonStarInfo , this.buttonLink , this.buttonRecommend);
    }

    setStudentId(studentId){
        this.studentId = studentId;
    }

    enter(){
        this.studentName.text = "ヤング ジャクリン サウミン";
        // GROUPS.students[this.studentId].name
    }

    update(){
        this.planetPlan.x = Math.cos(this.planetPlanPosition -= this.planetPlanOrbitalSpeed) * 200;
        this.planetPlan.y = Math.sin(this.planetPlanPosition -= this.planetPlanOrbitalSpeed) * 200;
        this.planetPlan.rotation -= 0.01;

        this.planetDesign.x = Math.cos(this.planetDesignPosition -= this.planetDesignOrbitalSpeed) * 250;
        this.planetDesign.y = Math.sin(this.planetDesignPosition -= this.planetDesignOrbitalSpeed) * 250;
        this.planetDesign.rotation += 0.005;

        this.planetCoding.x = Math.cos(this.planetCodingPosition -= this.planetCodingOrbitalSpeed) * 300;
        this.planetCoding.y = Math.sin(this.planetCodingPosition -= this.planetCodingOrbitalSpeed) * 300;
        this.planetCoding.rotation -= 0.03;

        this.planetPresentation.x = Math.cos(this.planetPresentationPosition -= this.planetPresentationOrbitalSpeed) * 350;
        this.planetPresentation.y = Math.sin(this.planetPresentationPosition -= this.planetPresentationOrbitalSpeed) * 350;
        this.planetPresentation.rotation -= 0.2;

        this.spaceBg.rotation -= 0.0003
    }
}