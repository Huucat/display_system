import * as PIXI from 'pixi.js';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';

export default class ConstellationDetails {
    constructor(app){
        this.app = app;
        this.detailsBox = new PIXI.Container();
        this.constellationBox = new PIXI.Container();
        this.flameBox = new PIXI.Container();
        this.groupTextBox = new PIXI.Container();
        this.messageBox = new PIXI.Container();

        this.constellationBox.x = document.documentElement.clientWidth / 2;
        this.constellationBox.y = document.documentElement.clientHeight / 2;
        this.constellationBox.scale.set(0.7);
        this.detailsBox.addChild(this.constellationBox , this.flameBox , this.groupTextBox , this.messageBox);

        this.groupNum = 0;
        this.beforeId = [];

        this.star = [];
        this.name = [];
        this.targetState = false;
        this.targetStep = 0;

        this.infoState = false;
        this.studentState = false;

        this.addBackground();
        this.addTarget();
        this.addFlame();
        this.addHomeButton();
        this.addInfoButton();
        this.createConstellationInfo();
        this.createStudentInfo();
    }

    addBackground(){
        let self = this;
        this.spaceBg = new PIXI.Sprite(this.app.loader.resources['spaceBg_01'].texture);
        this.spaceBg.anchor.set(0.5);
        this.spaceBg.rotation = Math.PI * Math.random() * 2;
        this.spaceBg.interactive = true;
        this.spaceBg.on('pointerdown', function(){
            self.hideStudent();
        })

        this.constellationBg = new PIXI.Sprite();
        this.constellation = new PIXI.Sprite();

        this.constellationBox.addChild(this.spaceBg , this.constellationBg , this.constellation);
    }

    addTarget(){
        this.target_In = new PIXI.Sprite(this.app.loader.resources['target_in'].texture);
        this.target_In.anchor.set(0.5);
        this.target_In.scale.set(0.3);
        this.target_In.visible = false;
        this.target_Out = new PIXI.Sprite(this.app.loader.resources['target_out'].texture);
        this.target_Out.anchor.set(0.5);
        this.target_Out.scale.set(0.3);
        this.target_Out.visible = false;

        this.messageBox.addChild(this.target_In , this.target_Out);
    }

    addHomeButton(){
        let self = this;
        let poly = new PIXI.Polygon(
            new PIXI.Point(-70 , -115),
            new PIXI.Point(-130 , 0),
            new PIXI.Point(-70 , 115),
            new PIXI.Point(70 , 115),
            new PIXI.Point(130 , 0),
            new PIXI.Point(70 , -115)
        );

        this.buttonHome = new PIXI.Sprite(this.app.loader.resources['button_home_off'].texture);
        this.buttonHome.anchor.set(0.5);
        this.buttonHome.position.set(200 , document.documentElement.clientHeight - 200);
        this.buttonHome.hitArea = poly;
        this.buttonHome.interactive = true;
        this.buttonHome.buttonMode = true;
        this.buttonHome.on('pointerover', function(){
            this.texture = self.app.loader.resources['button_home_on'].texture
        }).on('pointerout', function(){
            this.texture = self.app.loader.resources['button_home_off'].texture
        }).on('pointerdown', function(){
            self.buttonHome_On();
        });
        this.messageBox.addChild(this.buttonHome);
    }

    addInfoButton(){
        let self = this;
        this.infoButton = new PIXI.Sprite(this.app.loader.resources['button_constellation_info_off'].texture);
        // this.infoButton.scale.set(0.5);
        this.infoButton.interactive = true;
        this.infoButton.buttonMode = true;
        this.infoButton.anchor.set(1 , 0);
        this.infoButton.position.set(document.documentElement.clientWidth - 25 , 25);

        this.infoButton.on('pointerover', function(){
            this.texture = self.app.loader.resources['button_constellation_info_on'].texture
        }).on('pointerout', function(){
            this.texture = self.app.loader.resources['button_constellation_info_off'].texture
        }).on('pointerdown', function(){
            self.showInfo();
        });

        this.messageBox.addChild(this.infoButton);
    }
    
    addFlame(){
        let self = this;
        this.flameLeft = new PIXI.Sprite(this.app.loader.resources['flame_left'].texture);
        this.flameLeft.scale.set(0.5);
        this.flameLeft.x = -60;
        this.flameRight = new PIXI.Sprite(this.app.loader.resources['flame_right'].texture);
        this.flameRight.anchor.set(1 , 0);
        this.flameRight.scale.set(0.5);
        this.flameRight.x = document.documentElement.clientWidth + 60;
        this.flameBottom = new PIXI.Sprite(this.app.loader.resources['flame_bottom'].texture);
        this.flameBottom.anchor.set(0.5 , 1);
        this.flameBottom.scale.set(1 , 0.45);
        this.flameBottom.x = document.documentElement.clientWidth / 2;
        this.flameBottom.y = document.documentElement.clientHeight;
        this.line_horizontal = new PIXI.Graphics().lineStyle(1, 0xFFFFFF, 0.5).moveTo(0 , document.documentElement.clientHeight / 2).lineTo(document.documentElement.clientWidth , document.documentElement.clientHeight / 2);
        this.line_vertical = new PIXI.Graphics().lineStyle(1, 0xFFFFFF, 0.5).moveTo(document.documentElement.clientWidth / 2 , 0).lineTo(document.documentElement.clientWidth / 2 , document.documentElement.clientHeight);
        
        this.constellationName = new PIXI.Text('' , game.fontStyle.KaisoNext);
        this.constellationName.anchor.x = 0.5;
        this.constellationName.position.set(document.documentElement.clientWidth / 2 , 50);
        this.constellationName.style.fontSize = 36;
        
        this.title = new PIXI.Sprite(this.app.loader.resources['title_constellation'].texture);
        this.title.scale.set(0.8);
        this.buttonBack = new PIXI.Sprite(this.app.loader.resources['button_02'].texture);
        this.buttonBack.scale.set(0.8);
        this.buttonBack.anchor.set(0.5);
        this.buttonBack.position.set(60 , 43);
        this.buttonBack.interactive = true;
        this.buttonBack.buttonMode = true;
        this.buttonBack.on('pointerdown', function(){
            self.back();
        });
        this.flameBox.addChild(this.line_horizontal ,this.line_vertical , this.flameLeft , this.flameRight , this.flameBottom , this.constellationName , this.title , this.buttonBack);
    }

    createConstellationBackground(){
        this.constellationBg.texture = this.app.loader.resources['group_01_bg'].texture;
        this.constellationBg.anchor.x = 0.5;
        this.constellationBg.anchor.y = 0.5;
        this.constellationBg.alpha = 0.2;
    }

    createConstellation(){
        this.constellation.texture = this.app.loader.resources['group_01'].texture;
        this.constellation.anchor.x = 0.5;
        this.constellation.anchor.y = 0.5;
    }

    createStar(){
        let self = this;
        for (let i = 0; i < game.Manager.data.userData.groups[this.groupNum].members.length; i++) {
            this.star[i] = new PIXI.Sprite(game.space.constellation[this.groupNum].star[i].texture);
            this.star[i].anchor.x = 0.5;
            this.star[i].anchor.y = 0.5;
            this.star[i].x = game.Manager.data.userData.groups[this.groupNum].members[i].xy[0];
            this.star[i].y = game.Manager.data.userData.groups[this.groupNum].members[i].xy[1];
            this.star[i].interactive = true;
            this.star[i].hitArea = new PIXI.Circle(0 , 0 , 80);
            this.star[i].name = game.Manager.data.userData.students[game.Manager.data.userData.groups[this.groupNum].members[i].id].name;
            this.star[i].studentId = game.Manager.data.userData.groups[this.groupNum].members[i].id;
            this.star[i].scale.set(this.setStarSize(this.star[i].studentId));
            this.star[i].on('pointerover', function(){
                self.targetOn(this)
            }).on('pointerout', function(){
                self.targetOff(this)
            }).on('pointerdown', function(){
                self.showStudent(this.name , this.studentId)
            });
            this.constellationBox.addChild(this.star[i]);
            this.creatName(i);
        }
    }

    setStarSize(studentId){
        if(game.Manager.data.userData.students[studentId].comments){
            let comments = game.Manager.data.userData.students[studentId].comments
            let total = 0;
            for(let j in comments){
                total += comments[j].coding + comments[j].design + comments[j].plan + comments[j].presentation
            }
            total = total / 800;
            if(total > 0.75){
                total = 0.75;
            }
            return (0.3 + total);
        }else{
            return (0.3);
        }
    }

    creatName(i){
        this.name[i] = new PIXI.Text(this.star[i].name , game.fontStyle.SmartPhoneUI);
        this.name[i].style.fontSize = 26;
        this.name[i].anchor.x = 0.5;
        this.name[i].x = this.star[i].x;
        this.name[i].y = this.star[i].y + 50;
        this.constellationBox.addChild(this.name[i]);
    }

    createConstellationInfo(){
        let self = this;
        this.constellationTextBox = new PIXI.Graphics();
        this.constellationTextBox.lineStyle(3, 0xcaf2ff, 1);
        this.constellationTextBox.beginFill(0xcaf2ff, 0.2);
        this.constellationTextBox.drawRoundedRect(0 , 0 , 575, 0, 8);
        this.constellationTextBox.endFill();
        this.constellationTextBox.position.set(document.documentElement.clientWidth - 610 , 35);

        let dropShadowFilter = new DropShadowFilter();
        dropShadowFilter.blur = 8;
        dropShadowFilter.distance = 0;
        dropShadowFilter.quality = 6;
        dropShadowFilter.color = 0x00a3d5;
        dropShadowFilter.pixelSize = 0.6;
        this.constellationTextBox.filters = [dropShadowFilter];

        this.constellationTitle = new PIXI.Text('留学生座', game.fontStyle.KaisoNext_White);
        this.constellationTitle.style.fontSize = 60;
        this.constellationTitle.style.wordWrap = true;
        this.constellationTitle.style.breakWords = true;
        this.constellationTitle.style.wordWrapWidth = 450;
        this.constellationTitle.x = this.constellationTextBox.x + 25;
        this.constellationTitle.y = this.constellationTextBox.y + 40;

        this.constellationText = new PIXI.Text('Webデザイン科の留学生。\nみんなN1もしくはN2の検定を取得していて、会話も授業も「日本語」のみで学んでいます。\n日本語のレベルアップのため、作文コンテストに挑戦した学生も。',game.fontStyle.SmartPhoneUI_White);
        this.constellationText.style.wordWrap = true;
        this.constellationText.style.breakWords = true;
        this.constellationText.style.wordWrapWidth = 525;
        this.constellationText.x = this.constellationTitle.x;
        this.constellationText.y = this.constellationTitle.y + this.constellationTitle.height + 40;

        this.closeButton = new PIXI.Sprite(this.app.loader.resources['button_close'].texture);
        this.closeButton.anchor.x = 1;
        this.closeButton.x = this.constellationTextBox.x + this.constellationTextBox.width - 25;
        this.closeButton.y = this.constellationTextBox.y + 25;
        this.closeButton.interactive = true;
        this.closeButton.buttonMode = true;
        this.closeButton.on('pointerdown', function(){
            self.hideInfo();
        });

        this.groupTextBox.addChild(this.constellationTextBox , this.constellationTitle , this.constellationText , this.closeButton);
    }

    createStudentInfo(){
        let self = this;

        this.studentTextBox = new PIXI.Graphics();
        this.studentTextBox.lineStyle(2, 0xcaf2ff, 2);
        this.studentTextBox.beginFill(0xcaf2ff, 0.2);
        this.studentTextBox.drawRoundedRect(0 , 0 , 600 , 150, 8);
        this.studentTextBox.endFill();
        this.studentTextBox.x = 25;
        this.studentTextBox.y = document.documentElement.clientHeight - 250;
        this.studentTextBox.visible = false;

        let dropShadowFilter = new DropShadowFilter();
        dropShadowFilter.alpha = 1;
        dropShadowFilter.blur = 8;
        dropShadowFilter.distance = 0;
        dropShadowFilter.quality = 6;
        dropShadowFilter.color = 0x00a3d5;
        dropShadowFilter.pixelSize = 0.6;
        this.studentTextBox.filters = [dropShadowFilter];

        this.studentText = new PIXI.Text('恒星名：', game.fontStyle.KaisoNext);
        this.studentText.style.fontSize = 28;
        this.studentText.x = this.studentTextBox.x + 25;
        this.studentText.y = this.studentTextBox.y + 25;
        this.studentText.visible = false;

        this.studentName = new PIXI.Text('', game.fontStyle.KaisoNext);
        this.studentName.style.fontSize = 40;
        this.studentName.x = this.studentTextBox.x + 25;
        this.studentName.y = this.studentTextBox.y + 80;
        this.studentName.visible = false;

        let poly = new PIXI.Polygon(
            new PIXI.Point(-70 , -115),
            new PIXI.Point(-130 , 0),
            new PIXI.Point(-70 , 115),
            new PIXI.Point(70 , 115),
            new PIXI.Point(130 , 0),
            new PIXI.Point(70 , -115));

        this.buttonObservation = new PIXI.Sprite(this.app.loader.resources['button_observation_off'].texture);
        this.buttonObservation.interactive = true;
        this.buttonObservation.buttonMode = true;
        this.buttonObservation.anchor.set(0.5);
        this.buttonObservation.hitArea = poly;
        this.buttonObservation.position.set(document.documentElement.clientWidth - 200 , document.documentElement.clientHeight - 200);
        this.buttonObservation.on('pointerover', function(){
            this.texture = self.app.loader.resources['button_observation_on'].texture
        }).on('pointerout', function(){
            this.texture = self.app.loader.resources['button_observation_off'].texture
        });
        this.buttonObservation.visible = false;

        this.messageBox.addChild(this.studentTextBox , this.studentText , this.studentName , this.buttonObservation);
    }

    showInfo(){
        this.infoState = !this.infoState;
        this.infoButton.visible = false;
        this.buttonBack.visible = false;
        this.buttonHome.visible = false;
        this.groupTextBox.visible = true;

        this.constellationBox.x = document.documentElement.clientWidth / 4;
    }

    hideInfo(){
        this.infoState = !this.infoState;
        this.infoButton.visible = true;
        if(this.beforeId.length == 0){
            this.buttonBack.visible = false;
        }else{
            this.buttonBack.visible = true;
        }
        this.buttonHome.visible = true;
        this.groupTextBox.visible = false;

        this.constellationBox.x = document.documentElement.clientWidth / 2;
    }

    showStudent(name , studentId){
        let self = this;
        if(this.infoState == false && this.studentState == false){
            this.studentState = true;
            this.studentName.text = name;
            this.buttonHome.visible = false;
            this.infoButton.visible = false;
            for(let i in this.name){
                this.name[i].visible = false;
            }
            this.studentTextBox.visible = true;
            this.studentText.visible = true;
            this.studentName.visible = true;
            this.buttonObservation.off('pointerdown');
            this.buttonObservation.on('pointerdown', function(){
                self.toStar(studentId);
            })
            this.buttonObservation.visible = true;
        }
    }

    hideStudent(){
        if(this.infoState == false && this.studentState == true){
            this.studentName.text = '';
            this.buttonHome.visible = true;
            this.infoButton.visible = true;
            for(let i in this.name){
                this.name[i].visible = true;
            }
            this.studentTextBox.visible = false;
            this.studentText.visible = false;
            this.studentName.visible = false;
            this.buttonObservation.visible = false;
    
            this.target_In.visible = false;
            this.target_Out.visible = false;

            this.studentState = false;
        }
    }

    targetOn(self){
        if(this.infoState == false && this.studentState == false){
            this.target_In.visible = true;
            this.target_Out.visible = true;
            this.targetState = true;
            this.target_In.x = document.documentElement.clientWidth / 2 + self.x * 0.7;
            this.target_In.y = document.documentElement.clientHeight / 2 + self.y * 0.7;
            this.target_Out.x = document.documentElement.clientWidth / 2 + self.x * 0.7;
            this.target_Out.y = document.documentElement.clientHeight / 2 + self.y * 0.7;
        }
    }

    targetOff(){
        if(this.infoState == false && this.studentState == false){
            this.targetState = false;
            this.target_In.visible = false;
            this.target_Out.visible = false;
            this.targetStep = 0;
        }
    }

    buttonHome_On(){
        this.beforeId = [];
        game.star.beforeId = [];
        game.Manager.enter(1);
    }

    toStar(studentId){
        game.star.beforeId.push({managerNum : 2 , number : this.groupNum})
        game.star.studentId = studentId;
        game.Manager.enter(3);
    }

    removeChildren(){
        for (let i = 0; i < this.star.length; i++) {
            this.constellationBox.removeChild(this.star[i] , this.name[i]);
        }
        this.star = [];
        this.name = [];
    }

    setGroupNum(groupNum){
        this.groupNum = groupNum;
    }

    setConstellationTextBox(){
        this.constellationTextBox.clear();
        this.constellationTextBox.lineStyle(3, 0xcaf2ff, 1 , 0);
        this.constellationTextBox.beginFill(0xcaf2ff, 0.2);
        this.constellationTextBox.drawRoundedRect(0 , 0 , 575, 120 + this.constellationTitle.height + this.constellationText.height, 8);
        this.constellationTextBox.endFill();
        
    }

    enter(){
        if(this.beforeId.length == 0){
            this.buttonBack.visible = false;
        }else{
            this.buttonBack.visible = true;
        }
        this.groupTextBox.visible = false;
        this.buttonObservation.texture = this.app.loader.resources['button_observation_off'].texture;
        this.buttonHome.texture = this.app.loader.resources['button_home_off'].texture;
        this.constellationName.text = game.Manager.data.userData.groups[this.groupNum].groupName + '座';
        this.removeChildren();
        this.setConstellationTextBox();
        this.createConstellationBackground();
        this.createConstellation();
        this.createStar();
        this.hideStudent();
    }

    back(){
        game.star.studentId = this.beforeId.pop()
        game.Manager.enter(5);
    }

    update(){
        if(this.targetState == true){
            this.target_Out.scale.set(Math.sin(this.targetStep) * 0.010 + 0.3);
            this.targetStep += 0.15;
        }
        this.spaceBg.rotation -= 0.0002
    }
}