import * as PIXI from 'pixi.js';
import bunnypng from './bunny.png'

const app = new PIXI.Application();
var gameBox = document.getElementById("app")
// The application will create a canvas element for you that you
// can then insert into the DOM
gameBox.appendChild(app.view);

// load the texture we need
const bunny = PIXI.Sprite.from(bunnypng);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;
bunny.anchor.set(0.5);
app.stage.addChild(bunny);
app.ticker.add(() => {
    // just for fun, let's rotate mr rabbit a little
    bunny.rotation += 0.1;
});