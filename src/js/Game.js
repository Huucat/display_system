import * as PIXI from 'pixi.js';
import FILE_PATH from './FILE_PATH.js';
import Manager from './Manager.js';
import GROUPS from './groups.json';

export default class Game{
    constructor(){
        this.app = new PIXI.Application({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            antialias: true,
        });
        this.fontStyle_KaisoNext = {
            fontFamily : 'KaisoNext',
            fill : 0xCAF2FF,
            align : 'center',
            dropShadow : true,
            dropShadowBlur : 10,
            dropShadowColor : '#00A3D5',
            dropShadowDistance : 0,
        }
        this.fontStyle_KaisoNext_White = {
            fontFamily : 'KaisoNext',
            fill : 0xFFFFFF,
            align : 'left',
            dropShadow : true
        }
        this.fontStyle_SmartPhoneUI = {
            fontFamily : 'SmartPhoneUI',
            fill : 0xCAF2FF,
            align : 'center',
            dropShadow : true,
            dropShadowBlur : 10,
            dropShadowColor : '#00A3D5',
            dropShadowDistance : 0,
        }
        this.fontStyle_SmartPhoneUI_White = {
            fontFamily : 'SmartPhoneUI',
            fill : 0xFFFFFF,
            align : 'left'
        }
        this.init();
    }

    init(){
        document.getElementById("app").appendChild(this.app.view);
        this.setStarColor();
        this.loadFonts();
    }

    loadFonts(){
        let self = this;
        document.fonts.load("12px 'KaisoNext'").then(function(){
            document.fonts.load("12px 'SmartPhoneUI'")
        }).then(function(){
            self.loadAssets();
        });
    }

    loadAssets(){
        let self = this;
        this.app.loader.add(FILE_PATH.images).load(function(){
            self.gameStart()
        });
    }

    setStarColor(){
        for(let i in GROUPS.students){
            let arr = {
                plan : 0,
                design : 0,
                coding : 0,
                presentation : 0
            };

            let max = 0;
            let index = [];

            if(GROUPS.students[i].comments){
                let comments = GROUPS.students[i].comments;
                for(let j in comments){
                    arr.plan += comments[j].plan;
                    arr.design += comments[j].design;
                    arr.coding += comments[j].coding;
                    arr.presentation += comments[j].presentation;
                }
            }

            for(let j in arr){
                if(max < arr[j]){
                    max = arr[j];
                    index = [];
                    index[0] = j;
                }else if(max == arr[j]){
                    max = arr[j]
                    index.push(j);
                }
            }

            switch(index[Math.floor(Math.random() * index.length)]){
                case 'plan':
                    GROUPS.students[i].color = "star_plan";
                break;
                case 'design':
                    GROUPS.students[i].color = "star_design";
                break;
                case 'coding':
                    GROUPS.students[i].color = "star_coding";
                break;
                case 'presentation':
                    GROUPS.students[i].color = "star_presentation";
                break;
            }
        }
    }

    gameStart(){
        var self = this;
        this.Manager = new Manager(this.app)
        this.app.ticker.add(() => {
            self.Manager.update();
        });
    }
}
