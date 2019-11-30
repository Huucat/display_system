import * as PIXI from 'pixi.js';
import { filePath } from './filePath.js';
import { Space } from './Space.js';

export var Game = window.Game =  function(){
    const WinWidth = window.innerWidth;
    const WinHeight = window.innerHeight;
    
    this.app = new PIXI.Application({
        width: WinWidth,
        height: WinHeight,
    });
    
    document.getElementById("app").appendChild(this.app.view);
    var self = this;
    this.app.loader.add(filePath.images).load(setup);
    function setup(){
        self.Space_1 = new Space(self.app);
        self.app.ticker.add(() => {
            self.Space_1.rotation();
        });
    }
}