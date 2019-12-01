import Space from "./Space";

export default class Manager{
    constructor(app){
        game.space = new Space(app);
    }
    
    enter(){

    }

    update(){
        game.space.rotation();
    }
}