import Space from "./Space";
import ConstellationDetails from './ConstellationDetails.js'

export default class Manager{
    constructor(app){
        this.managerNum = 1;

        game.space = new Space(app);
        game.constellationDetails = new ConstellationDetails(app);

        app.stage.addChild(game.space.spaceBox , game.constellationDetails.detailsBox);
        this.enter(this.managerNum , app);
    }
    
    enter(number , app){
        this.managerNum = number;
        game.space.spaceBox.visible = false;
        game.constellationDetails.detailsBox.visible = false;
        switch (this.managerNum) {
            case 1:
                game.space.spaceBox.visible = true;
            break;
            case 2:
                game.constellationDetails.createConstellation(app);
                game.constellationDetails.detailsBox.visible = true;
            break;
        }
    }

    update(){
        switch (this.managerNum) {
            case 1:
                game.space.rotation();
            break;
            case 2:
                game.constellationDetails.targetAnimation();
            break;
        }
        
    }
}