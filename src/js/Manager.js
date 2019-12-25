import Space from "./Space";
import ConstellationDetails from './ConstellationDetails.js'
import Star from './Star.js'

export default class Manager{
    constructor(app){
        this.managerNum = 1;

        game.space = new Space(app);
        game.constellationDetails = new ConstellationDetails(app);
        game.star = new Star(app);

        app.stage.addChild(game.space.spaceBox , game.constellationDetails.detailsBox , game.star.starBox);
        this.enter(this.managerNum , app);
    }
    
    enter(number , app){
        this.managerNum = number;
        game.space.spaceBox.visible = false;
        game.constellationDetails.detailsBox.visible = false;
        game.star.starBox.visible = false;
        switch (this.managerNum) {
            case 1:
                game.space.spaceBox.visible = true;
            break;
            case 2:
                game.constellationDetails.enterDetails();
                game.constellationDetails.detailsBox.visible = true;
            break;
            case 3:
                game.star.enter()
                game.star.starBox.visible = true;
            break;
        }
    }

    update(){
        switch (this.managerNum) {
            case 1:
                game.space.update();
            break;
            case 2:
                game.constellationDetails.update();
            break;
            case 3:
                game.star.update();
            break;
        }
        
    }
}