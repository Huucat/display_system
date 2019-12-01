import * as PIXI from 'pixi.js';
import FILE_PATH from './FILE_PATH.js';
import Manager from './Manager.js';
// import Space from './Space.js';

export default class Game{
    constructor(){
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        this.init();
    }

    init(){
        document.getElementById("app").appendChild(this.app.view);
        var self = this;
        this.app.loader.add(FILE_PATH.images).load(function(){self.gameStart()});
    }

    gameStart(){
        var self = this;
        this.Manager = new Manager(this.app)
        this.app.ticker.add(() => {
            self.Manager.update();
        });
    }
}