import * as PIXI from 'pixi.js';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';

export default class Star {
    constructor(app){
        this.starBox_All = new PIXI.Container();

        this.starBox = new PIXI.Container();
        this.starBox.x = document.documentElement.clientWidth / 2;
        this.starBox.y = document.documentElement.clientHeight / 2;
        this.starBox_All.addChild(this.starBox);

        this.createSun();
        this.createPlanet_Plan(app);
        this.createPlanet_Design(app);
        this.createPlanet_Coding(app);
        this.createPlanet_Presentation(app);
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

    createPlanet_Plan(app){
        this.planetPlanPosition = Math.PI * 2 * Math.random();
        this.planetPlanOrbitalSpeed = 0.005;
        this.planetPlanOrbital = new PIXI.Graphics().lineStyle(1, 0xFFFFFF, 1).drawCircle(0, 0, 150);
        this.planetPlan = new PIXI.Sprite(app.loader.resources['planet_plan'].texture);
        this.planetPlan.anchor.set(0.5);
        this.planetPlan.scale.set(0.4);
        this.planetPlan.x = Math.cos(this.planetPlanPosition) * 150;
        this.planetPlan.y = Math.sin(this.planetPlanPosition) * 150;
        this.starBox.addChild(this.planetPlanOrbital ,  this.planetPlan);
    }

    createPlanet_Design(app){
        this.planetDesignPosition = Math.PI * 2 * Math.random();
        this.planetDesignOrbitalSpeed = 0.002;
        this.planetDesignOrbital = new PIXI.Graphics().lineStyle(1, 0xFFFFFF, 1).drawCircle(0, 0, 200);
        this.planetDesign = new PIXI.Sprite(app.loader.resources['planet_design'].texture);
        this.planetDesign.anchor.set(0.5);
        this.planetDesign.scale.set(0.4);
        this.planetDesign.x = Math.cos(this.planetDesignPosition) * 200;
        this.planetDesign.y = Math.sin(this.planetDesignPosition) * 200;
        this.starBox.addChild(this.planetDesignOrbital , this.planetDesign);
    }

    createPlanet_Coding(app){
        this.planetCodingPosition = Math.PI * 2 * Math.random();
        this.planetCodingOrbitalSpeed = 0.0008;
        this.planetCodingOrbital = new PIXI.Graphics().lineStyle(1, 0xFFFFFF, 1).drawCircle(0, 0, 250);
        this.planetCoding = new PIXI.Sprite(app.loader.resources['planet_coding'].texture);
        this.planetCoding.anchor.set(0.5);
        this.planetCoding.scale.set(0.4);
        this.planetCoding.x = Math.cos(this.planetCodingPosition) * 250;
        this.planetCoding.y = Math.sin(this.planetCodingPosition) * 250;
        this.starBox.addChild(this.planetCodingOrbital , this.planetCoding);
    }

    createPlanet_Presentation(app){
        this.planetPresentationPosition = Math.PI * 2 * Math.random();
        this.planetPresentationOrbitalSpeed = 0.0005;
        this.planetPresentationOrbital = new PIXI.Graphics().lineStyle(1, 0xFFFFFF, 1).drawCircle(0, 0, 300);
        this.planetPresentation = new PIXI.Sprite(app.loader.resources['planet_presentation'].texture);
        this.planetPresentation.anchor.set(0.5);
        this.planetPresentation.scale.set(0.4);
        this.planetPresentation.x = Math.cos(this.planetPresentationPosition) * 300;
        this.planetPresentation.y = Math.sin(this.planetPresentationPosition) * 300;
        this.starBox.addChild(this.planetPresentationOrbital , this.planetPresentation);
    }


    planetOrbital(){
        this.planetPlan.x = Math.cos(this.planetPlanPosition += this.planetPlanOrbitalSpeed) * 150;
        this.planetPlan.y = Math.sin(this.planetPlanPosition += this.planetPlanOrbitalSpeed) * 150;
        this.planetPlan.rotation -= 0.01;

        this.planetDesign.x = Math.cos(this.planetDesignPosition += this.planetDesignOrbitalSpeed) * 200;
        this.planetDesign.y = Math.sin(this.planetDesignPosition += this.planetDesignOrbitalSpeed) * 200;
        this.planetDesign.rotation += 0.005;

        this.planetCoding.x = Math.cos(this.planetCodingPosition += this.planetCodingOrbitalSpeed) * 250;
        this.planetCoding.y = Math.sin(this.planetCodingPosition += this.planetCodingOrbitalSpeed) * 250;
        this.planetCoding.rotation -= 0.03;

        this.planetPresentation.x = Math.cos(this.planetPresentationPosition += this.planetPresentationOrbitalSpeed) * 300;
        this.planetPresentation.y = Math.sin(this.planetPresentationPosition += this.planetPresentationOrbitalSpeed) * 300;
        this.planetPresentation.rotation -= 0.2;
    }
}