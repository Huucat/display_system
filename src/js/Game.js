import * as PIXI from 'pixi.js';
import FILE_PATH from './FILE_PATH.js';
import Manager from './Manager.js';

export default class Game{
    constructor(){
        let self = this;
        this.app = new PIXI.Application({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            antialias: true,
        });


        this.fontStyle = {
            KaisoNext : {
                fontFamily : 'KaisoNext',
                fill : 0xCAF2FF,
                align : 'center',
                dropShadow : true,
                dropShadowBlur : 10,
                dropShadowColor : '#00A3D5',
                dropShadowDistance : 0,
            },
            KaisoNext_White : {
                fontFamily : 'KaisoNext',
                fill : 0xFFFFFF,
                align : 'left',
            },
            SmartPhoneUI : {
                fontFamily : 'SmartPhoneUI',
                fill : 0xCAF2FF,
                align : 'center',
                dropShadow : true,
                dropShadowBlur : 10,
                dropShadowColor : '#00A3D5',
                dropShadowDistance : 0
            },
            SmartPhoneUI_White : {
                fontFamily : 'SmartPhoneUI',
                fill : 0xFFFFFF,
                align : 'left'
            }
        };

        this.init();
    }

    init(){
        document.getElementById("app").appendChild(this.app.view);
        this.loadFonts();
    }

    loadFonts(){
        let self = this;
        document.fonts.load("12px 'KaisoNext'").then(function(){
            document.fonts.load("12px 'SmartPhoneUI'")
        }).then(function(){
            self.gameStart();
        });
    }

    gameStart(){
        this.Manager = new Manager(this.app);
    }
}
