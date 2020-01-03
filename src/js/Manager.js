import Space from "./Space";
import ConstellationDetails from './ConstellationDetails.js'
import Star from './Star.js'
import StarInfo from './StarInfo.js'
import StarLink from './StarLink.js'
import StarRecommend from './StarRecommend.js'

export default class Manager{
    constructor(app){
        this.managerNum = 1;

        game.space = new Space(app);
        game.constellationDetails = new ConstellationDetails(app);
        game.star = new Star(app);
        game.starInfo = new StarInfo(app);
        game.starLink = new StarLink(app);
        game.starRecommend = new StarRecommend(app);

        app.stage.addChild(
            game.space.spaceBox,
            game.constellationDetails.detailsBox,
            game.star.starBox,
            game.starInfo.starInfoBox,
            game.starLink.starLinkBox,
            game.starRecommend.starRecommendBox
        );
        this.enter(this.managerNum , app);
    }
    
    enter(number){
        this.managerNum = number;
        game.space.spaceBox.visible = false;
        game.constellationDetails.detailsBox.visible = false;
        game.star.starBox.visible = false;
        game.starInfo.starInfoBox.visible = false;
        game.starLink.starLinkBox.visible = false;
        game.starRecommend.starRecommendBox.visible = false;
        switch (this.managerNum) {
            case 1:
                game.space.spaceBox.visible = true;
            break;
            case 2:
                game.constellationDetails.enter();
                game.constellationDetails.detailsBox.visible = true;
            break;
            case 3:
                game.star.enter()
                game.star.starBox.visible = true;
            break;
            case 4:
                game.starInfo.starInfoBox.visible = true;
                game.starInfo.enter();
            break;
            case 5:
                game.starLink.starLinkBox.visible = true;
                game.starLink.enter();
            break;
            case 6:
                game.starRecommend.starRecommendBox.visible = true;
                game.starRecommend.enter();
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
            case 4:
                game.starInfo.update();
            break;
            case 5:
                game.starLink.update();
            break;
            case 6:
                game.starRecommend.update();
            break;
        }
        
    }
}