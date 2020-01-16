import * as firebase from 'firebase/app';
import 'firebase/database';

import Space from "./Space";
import ConstellationDetails from './ConstellationDetails.js'
import Star from './Star.js'
import StarInfo from './StarInfo.js'
import StarLink from './StarLink.js'
import StarRecommend from './StarRecommend.js'
import GROUPS from './groups.json'

export default class Manager{
    constructor(app){
        let self = this;
        this.app = app;
        this.appStart = false;
        this.managerNum = 1;

        this.firebaseConfig = {
            apiKey: "AIzaSyCi2pj67bUejaR1VCXqOYJ_gZ0ufqqQQs8",
            authDomain: "evaluation-system-34106.firebaseapp.com",
            databaseURL: "https://evaluation-system-34106.firebaseio.com",
            projectId: "evaluation-system-34106",
            storageBucket: "evaluation-system-34106.appspot.com",
            messagingSenderId: "964676946210",
            appId: "1:964676946210:web:784b204d504bfda2ef7d7b",
            measurementId: "G-CS85S6NSKM"
        };
        firebase.initializeApp(this.firebaseConfig);
        firebase.database().ref().on('value', function(data) {
            self.data.userData = GROUPS;
            console.log(self.data.userData);
        });

        this.data = {
            _userData : undefined,
            get userData(){
                return this._userData;
            },
            set userData(data){
                this._userData = data;
                if(self.appStart == false){
                    self.setStarColor();
                    self.init(app);
                    self.appStart = true;
                }
                if(self.appStart == true){
                    self.setStarColor();
                    game.space.resetStarColor();
                    game.space.resetStarSize();
                }
            }
        }
        
        this.app.ticker.add(() => {
            if(self.appStart == true){
                self.update();
            }
        });
    }

    init(app){
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

    setStarColor(){
        for(let i in game.Manager.data.userData.students){
            let arr = {
                plan : 0,
                design : 0,
                coding : 0,
                presentation : 0
            };

            let max = 0;
            let index = [];

            if(game.Manager.data.userData.students[i].comments){
                let comments = game.Manager.data.userData.students[i].comments;
                for(let j in comments){
                    arr.plan += comments[j].plan;
                    arr.design += comments[j].design;
                    arr.coding += comments[j].coding;
                    arr.presentation += comments[j].presentation;
                }
            }

            for(let j in arr){
                if(max < arr[j]){
                    max = arr[j];
                    index = [];
                    index[0] = j;
                }else if(max == arr[j]){
                    max = arr[j]
                    index.push(j);
                }
            }

            switch(index[Math.floor(Math.random() * index.length)]){
                case 'plan':
                    game.Manager.data.userData.students[i].color = "star_plan";
                break;
                case 'design':
                    game.Manager.data.userData.students[i].color = "star_design";
                break;
                case 'coding':
                    game.Manager.data.userData.students[i].color = "star_coding";
                break;
                case 'presentation':
                    game.Manager.data.userData.students[i].color = "star_presentation";
                break;
            }
        }
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