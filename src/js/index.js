import '@/css/style.css';
import Game from '@/js/Game.js';

window.game = new Game();
document.body.oncontextmenu = function(){
    window.event.returnValue = false;
    return false;
}