import * as firebase from 'firebase/app';
import 'firebase/database';

import FILE_PATH from './FILE_PATH.js';
import * as PIXI from 'pixi.js';

export default class LoadManager{
    constructor(app){
        this.app = app;
        this.loadBox = new PIXI.Container();
        this.loadText = new PIXI.Text("", game.fontStyle.KaisoNext_White);
        this.loadText.anchor.set(0.5);
        this.loadText.position.set(document.documentElement.clientWidth / 2 , document.documentElement.clientHeight / 2 - 50);

        this.loadTextNum = new PIXI.Text("", game.fontStyle.KaisoNext_White);
        this.loadTextNum.style.fontSize = 20;
        this.loadTextNum.anchor.set(0.5);
        this.loadTextNum.position.set(document.documentElement.clientWidth / 2 , document.documentElement.clientHeight / 2);
        
        this.progressBarOutside = new PIXI.Graphics();
        this.progressBarOutside.lineStyle(2, 0xcaf2ff, 1);
        this.progressBarOutside.drawRoundedRect(-100 , -15 , 200, 30, 8);
        this.progressBarOutside.position.set(document.documentElement.clientWidth / 2 , document.documentElement.clientHeight / 2);

        this.progressBarInside = new PIXI.Graphics();
        this.progressBarInside.position.set(document.documentElement.clientWidth / 2 , document.documentElement.clientHeight / 2);

        this.loadBox.addChild(this.loadText , this.progressBarOutside , this.progressBarInside , this.loadTextNum);
    }

    loadAssets(callback){
        let self = this;
        this.app.loader.add(FILE_PATH.images)
            .on("progress", function(loader , resource){self.loadState(loader, resource)})
            .load(function(){callback()});
    }

    loadState(loader , resource){
        this.loadText.text = "Loading:" + resource.url;
        this.loadTextNum.text = Math.floor(loader.progress) + "%";
        let loadNum = loader.progress / 100;
        this.progressBarInside.clear();
        this.progressBarInside.beginFill(0xcaf2ff, 0.7);
        //max width 194
        this.progressBarInside.drawRoundedRect(-97 , -12 , 194 * loadNum, 24, 4);
        this.progressBarInside.endFill();
    }

    loadOver(){
        this.loadBox.visible = false;
    }
}