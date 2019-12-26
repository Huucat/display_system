import * as PIXI from 'pixi.js';
import GROUPS from './groups.json';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';

export default class StarInfo{
    constructor(app){
        this.app = app;
        this.studentId = "";

        this.starInfoBox = new PIXI.Container();
        this.backgroundBox = new PIXI.Container();
        this.starBox = new PIXI.Container();
        this.workBox = new PIXI.Container();
        this.tagBox = new PIXI.Container();
        this.buttonBox = new PIXI.Container();

        this.backgroundBox.x = document.documentElement.clientWidth / 2;
        this.backgroundBox.y = document.documentElement.clientHeight / 2;

        this.starBox.x = document.documentElement.clientWidth / 4;
        this.starBox.y = document.documentElement.clientHeight / 2;
        this.starBox.scale.set(0.8);

        this.starInfoBox.addChild(this.backgroundBox , this.starBox , this.workBox , this.tagBox , this.buttonBox);
        this.createBackground();
        this.createSun();
        this.createPlanet_Plan();
        this.createPlanet_Design();
        this.createPlanet_Coding();
        this.createPlanet_Presentation();
        this.createName();
        this.createBackButton();
    }

    createBackground(){
        this.spaceBg = new PIXI.Sprite(this.app.loader.resources['background_spaceship'].texture);
        this.spaceBg.anchor.set(0.5);
        this.backgroundBox.addChild(this.spaceBg);
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

        this.starBox.addChild(this.sun);
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
        this.starBox.addChild(this.planetPlanOrbital ,  this.planetPlan);
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
        this.starBox.addChild(this.planetDesignOrbital , this.planetDesign);
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
        this.starBox.addChild(this.planetCodingOrbital , this.planetCoding);
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
        this.starBox.addChild(this.planetPresentationOrbital , this.planetPresentation);
    }
    
    createName(){
        this.studentName = new PIXI.Text('', game.fontStyle_SmartPhoneUI);
        this.studentName.style.fontSize = 50;
        this.studentName.y = 440;
        this.studentName.anchor.x = 0.5;
        this.starBox.addChild(this.studentName);
    }

    createBackButton(){
        this.title = new PIXI.Sprite(this.app.loader.resources['title_info'].texture);
        this.title.scale.set(0.8);
        this.buttonBack = new PIXI.Sprite(this.app.loader.resources['button_02'].texture);
        this.buttonBack.scale.set(0.8);
        this.buttonBack.anchor.set(0.5);
        this.buttonBack.position.set(60 , 43);
        this.buttonBack.interactive = true;
        this.buttonBack.buttonMode = true;
        this.buttonBack.on('pointerdown', function(){
            game.Manager.enter(3);
        })
        this.buttonBox.addChild(this.title , this.buttonBack);
    }

    setStudentId(studentId){
        this.studentId = studentId;
    }

    enter(){
        this.studentName.text = "ヤング ジャクリン サウミン"
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
    }
}