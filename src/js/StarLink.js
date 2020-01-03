import * as PIXI from 'pixi.js';
import Constellation from './Constellation.js'
import GROUPS from './groups.json';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';

export default class StarLink{
    constructor(app){
        this.app = app;
        this.studentId = "";
        this.constellation = [];
        this.mouseOver = false;

        this.starLinkBox = new PIXI.Container();
        this.backgroundBox = new PIXI.Container();
        this.starBox = new PIXI.Container();
        this.constellationBox = new PIXI.Container();
        this.flameBox = new PIXI.Container();
        this.buttonBox = new PIXI.Container();

        this.backgroundBox.x = this.starBox.x = this.constellationBox.x = document.documentElement.clientWidth / 2;
        this.backgroundBox.y = this.starBox.y = this.constellationBox.y = document.documentElement.clientHeight / 2;

        this.starLinkBox.addChild(this.backgroundBox , this.starBox , this.constellationBox , this.flameBox , this.buttonBox);

        this.createBackground();
        this.createSun();
        this.createName();

        this.createFlame();
        this.createBackButton();
    }

    createBackground(){
        this.spaceBg = new PIXI.Sprite(this.app.loader.resources['spaceBg_01'].texture);
        this.spaceBg.anchor.set(0.5);
        this.spaceBg.scale.set(0.7);
        this.spaceBg.rotation = Math.PI * Math.random() * 2;
        this.backgroundBox.addChild(this.spaceBg);
    }

    createSun(){
        this.sun = new PIXI.Graphics();
        this.starBox.addChild(this.sun);
    }

    createName(){
        this.studentName = new PIXI.Text('', game.fontStyle_SmartPhoneUI);
        this.studentName.style.fontSize = 26;
        this.studentName.x = 0
        this.studentName.y = 70;
        this.studentName.anchor.x = 0.5;
        this.starBox.addChild(this.studentName);
    }

    createFlame(){
        let flameLeft = new PIXI.Sprite(this.app.loader.resources['flame_left'].texture);
        flameLeft.scale.set(0.5);
        flameLeft.x = -60;
        let flameRight = new PIXI.Sprite(this.app.loader.resources['flame_right'].texture);
        flameRight.anchor.set(1 , 0);
        flameRight.scale.set(0.5);
        flameRight.x = document.documentElement.clientWidth + 60;
        let flameBottom = new PIXI.Sprite(this.app.loader.resources['flame_bottom'].texture);
        flameBottom.anchor.set(0.5 , 1);
        flameBottom.scale.set(1 , 0.45);
        flameBottom.x = document.documentElement.clientWidth / 2;
        flameBottom.y = document.documentElement.clientHeight;
        let line_horizontal = new PIXI.Graphics().lineStyle(1, 0xFFFFFF, 0.5).moveTo(0 , document.documentElement.clientHeight / 2).lineTo(document.documentElement.clientWidth , document.documentElement.clientHeight / 2);
        let line_vertical = new PIXI.Graphics().lineStyle(1, 0xFFFFFF, 0.5).moveTo(document.documentElement.clientWidth / 2 , 0).lineTo(document.documentElement.clientWidth / 2 , document.documentElement.clientHeight);

        this.flameBox.addChild(line_horizontal , line_vertical , flameLeft , flameRight , flameBottom);
    }

    createBackButton(){
        let title = new PIXI.Sprite(this.app.loader.resources['title_link'].texture);
        title.scale.set(0.8);
        let buttonBack = new PIXI.Sprite(this.app.loader.resources['button_02'].texture);
        buttonBack.scale.set(0.8);
        buttonBack.anchor.set(0.5);
        buttonBack.position.set(60 , 43);
        buttonBack.interactive = true;
        buttonBack.buttonMode = true;
        buttonBack.on('pointerdown', function(){
            game.Manager.enter(3);
        })
        this.buttonBox.addChild(title , buttonBack);
    }

    addConstellation(){
        let self = this;
        this.constellation = [];
        this.constellationBox.removeChildren();
        let num =  GROUPS.students[this.studentId].groups.length;
        for(let i in GROUPS.students[this.studentId].groups){
            for (let j in GROUPS.groups){
                if(GROUPS.groups[j].groupName == GROUPS.students[this.studentId].groups[i]){
                    this.constellation[i] = new Constellation(this.app , j);
                    this.constellation[i].position = (Math.PI * 2 / num) * i;
                    this.constellation[i].constellationBox.x = Math.cos(this.constellation[i].position) * 400;
                    this.constellation[i].constellationBox.y = Math.sin(this.constellation[i].position) * 400;
                    this.constellation[i].constellationBox.scale.set(0.30);
                    this.constellation[i].addEvent();
                    this.constellation[i].constellation.on('pointerover', function(){
                        self.mouseOver = true;
                    }).on('pointerout', function(){
                        self.mouseOver = false;
                    })
                    this.constellationBox.addChild(this.constellation[i].constellationBox);
                    break;
                }
            }
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
        
        switch(GROUPS.students[this.studentId].color){
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

    setStudentId(studentId){
        this.studentId = studentId;
    }

    enter(){
        this.studentName.text = GROUPS.students[this.studentId].name;
        this.mouseOver = false;
        this.setSunColor();
        this.addConstellation();
    }

    update(){
        if(this.mouseOver){

        }else{
            for(let i in this.constellation){
                this.constellation[i].constellationBox.x = Math.cos(this.constellation[i].position -= 0.0015) * 400;
                this.constellation[i].constellationBox.y = Math.sin(this.constellation[i].position -= 0.0015) * 400;
            }
        }
        this.spaceBg.rotation -= 0.0003;
    }
}