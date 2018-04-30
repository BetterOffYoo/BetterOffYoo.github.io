require=function t(e,i,o){function n(a,c){if(!i[a]){if(!e[a]){var r="function"==typeof require&&require;if(!c&&r)return r(a,!0);if(s)return s(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var h=i[a]={exports:{}};e[a][0].call(h.exports,function(t){var i=e[a][1][t];return n(i||t)},h,h.exports,t,e,i,o)}return i[a].exports}for(var s="function"==typeof require&&require,a=0;a<o.length;a++)n(o[a]);return n}({audioMgr:[function(t,e,i){"use strict";cc._RF.push(e,"ea34frCtWtCvpGtXKFQ2KKU","audioMgr"),cc.Class({extends:cc.Component,properties:{bgAudio:cc.AudioClip},onLoad:function(){cc.game.addPersistRootNode(this.node);var t=cc.find("Canvas");this.btMgrJs=t.getComponent("button-manage")},start:function(){cc.audioEngine.stopAll(),this.playAudio()},playAudio:function(){this.bgId=cc.audioEngine.play(this.bgAudio,!0,this.btMgrJs.audioValue/100)},setVol:function(t){cc.audioEngine.setVolume(this.bgId,t/100)}}),cc._RF.pop()},{}],"button-manage":[function(t,e,i){"use strict";cc._RF.push(e,"cd01c+B1hRIcKm53v0+wJ+k","button-manage"),cc.Class({extends:cc.Component,properties:{settingViewNode:cc.Node,musicNode:cc.Node,shopViewNode:cc.Node,audioBtImg:[cc.SpriteFrame],roleViewNode:{default:null,type:cc.Node,tooltip:"角色面板"},shadow:{default:null,type:cc.Node,tooltip:"阴影"},btAudio:cc.AudioClip,audioNode:cc.Node},onLoad:function(){this.audioButtonSprite=cc.find("Canvas/Buttons/audioButton").getComponent(cc.Sprite),this.progressComp=this.musicNode.getComponent(cc.ProgressBar),this.sliderComp=this.musicNode.getChildByName("musicSlider").getComponent(cc.Slider),this.roleViewNodeJs=this.roleViewNode.getComponent("roleView"),this.audioMgr=this.audioNode.getComponent("audioMgr"),this.audioValue=80,this.setMusicUi(this.audioValue),this.showMusicInterval=0},buttonsClick:function(t,e){switch(e){case"setting":this._openAction(this.settingViewNode);break;case"shop":this._openAction(this.shopViewNode);break;case"audio":this.audioValue>0?(this.setMusicUi(0),this.sliderComp.progress=0):(this.setMusicUi(50),this.sliderComp.progress=.5);break;default:cc.director.loadScene(e)}},_openAction:function(t){this.shadow.active=!0,t.active=!0,t.scale=0;var e=cc.scaleTo(.2,1);t.runAction(e)},closeSettingButtonClick:function(t){var e=cc.scaleTo(.2,0),i=cc.callFunc(function(t){t.active=!1,this.shadow.active=!1},this,t.target.parent);t.target.parent.runAction(cc.sequence(e,i))},buyHorse:function(t){var e=t.target.parent.getChildByName("level").getComponent(cc.Label),i=e.string,o=i.indexOf("."),n=i.slice(o+1);n++,e.string="Lv."+n},buyItem:function(t){var e=t.target.parent.getChildByName("haveNum").getComponent(cc.Label);e.string=e.string-0+1},selectHorseButton:function(t,e){this.setHorse(t.target.name),this.roleViewNodeJs.openView(e-0)},setHorse:function(t){this.selectedHorse=t},musicSlider:function(t){var e=Math.floor(100*t.progress);this.setMusicUi(e),this.showMusicInterval=0},setMusicUi:function(t){cc.find("musicSlider/Handle/num",this.musicNode).getComponent(cc.Label).string=t,this.audioValue=t,this.audioMgr.setVol(t),this.progressComp.progress=t/100,this.audioButtonSprite.spriteFrame=t>0?this.audioBtImg[1]:this.audioBtImg[0]},tabSwitch:function(t){var e=t.target,i=this.shopViewNode.getChildByName("horseList"),o=this.shopViewNode.getChildByName("itemList");"playerTab"===e.name?(i.active=!0,o.active=!1):"itemTab"===e.name&&(i.active=!1,o.active=!0)},playAudio:function(){cc.audioEngine.play(this.btAudio,!1,this.audioValue/100)}}),cc._RF.pop()},{}],constant:[function(t,e,i){"use strict";cc._RF.push(e,"e26b11T43dKN7wzjHFmpxTZ","constant"),window.constant=window.constant||{},constant.AnimStatus={STOP:0,RUN:1,JUMP:2},constant.GameStatus={NONE:0,PLAYING:1,PAUSE:2,VICTORY:3,DEFEAT:4},cc._RF.pop()},{}],control:[function(t,e,i){"use strict";cc._RF.push(e,"d82c1Ct55FKkqi0Qj+5G5U+","control"),cc.Class({extends:cc.Component,properties:{jumps:2,jumpSpeed:1300},onLoad:function(){this.Canvas=cc.find("Canvas"),this.gameJs=this.Canvas.getComponent("game"),this.Canvas.on("touchstart",this.onKeyDown,this),this.Canvas.on("touchend",this.onKeyUp,this),this.Canvas.on("touchcancel",this.onKeyUp,this),this.bodyComp=this.getComponent(cc.RigidBody),this.playerUiJs=this.node.getComponent("playerUi"),this.upFlag=!1,this._upPressed=!1},onDestroy:function(){this.Canvas.off("touchstart",this.onKeyDown,this),this.Canvas.off("touchend",this.onKeyUp,this),this.Canvas.off("touchcancel",this.onKeyUp,this)},onKeyDown:function(t){this._upPressed||(this.upFlag=!0),this._upPressed=!0},onKeyUp:function(t){this._upPressed=!1},onBeginContact:function(t,e,i){var o=i.node,n=t.getWorldManifold().normal;switch(o.name){case"jump":o.animIsPlaying||(this.jumps++,this._playPropAni(o));break;case"forever":o.animIsPlaying||(this.jumps=100,this._playPropAni(o));break;case"final":this.gameJs.gameWin(),e.node.destroy(),o.destroy();break;case"thorn":this.gameJs.gameOver(),e.node.destroy();break;default:n.y<0&&(this.jumps=2)}n.x>0&&"oneside"!==o.name&&this.gameJs.gameOver()},_playPropAni:function(t){t.animIsPlaying=!0;var e=t.getComponent(cc.Animation);e.once("finished",function(){t.destroy()},this),e.play()},update:function(t){if(this.gameJs.isPlaying()){var e=this.bodyComp.linearVelocity;e.x=0,this.jumps>0&&this.upFlag&&(e.y=this.jumpSpeed,this.jumps--),this.upFlag=!1,this.bodyComp.linearVelocity=e,0===e.y&&this.playerUiJs.getAnimStatus()!==constant.AnimStatus.RUN&&this.playerUiJs.runAni()}}}),cc._RF.pop()},{}],game2:[function(t,e,i){"use strict";cc._RF.push(e,"b959eJ/LIdMoao0PHn8pHlv","game2"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){cc.director.getPhysicsManager().enabled=!0,this.gameStatus=null,this.SceneMove=this.node.getComponent("scene-move"),this.floorNode=this.SceneMove.floorsAndStarsNode.getChildByName("floors"),this.victoryOrDefeat=cc.find("Canvas/ui/victoryOrDefeat"),this.goldNumLabel=cc.find("Canvas/ui/goldNum").getComponent(cc.Label),this.goldNumLabel.string=0,this.playerNode=this.node.getChildByName("player"),this.oldGoldNum=cc.sys.localStorage.getItem("goldNum"),this.oldGoldNum=this.oldGoldNum?this.oldGoldNum-0:0},changeGameStatus:function(t){this.gameStatus=t,this.victoryOrDefeat.active=!0,this.victoryOrDefeat.getChildByName("label").getComponent(cc.Label).string=t,this.gameStop(),this.addGoldNum()},gameStop:function(){this.SceneMove.moveFlag=!1;for(var t=this.floorNode.children,e=0;e<t.length;e++)t[e].stopAllActions()},restartButtonClick:function(){cc.director.loadScene("game")},addGoldNum:function(){var t=this.goldNumLabel.string-0;cc.sys.localStorage.setItem("goldNum",t+this.oldGoldNum)},update:function(t){(this.playerNode.x+this.playerNode.width/2<-cc.winSize.width/2||this.playerNode.y+this.playerNode.height/2<-cc.winSize.height/2&&"defeat"!==this.gameStatus)&&this.changeGameStatus("defeat")}}),cc._RF.pop()},{}],gameUi:[function(t,e,i){"use strict";cc._RF.push(e,"0b4a3oAS/VPCYui6rodOrh9","gameUi"),cc.Class({extends:cc.Component,properties:{pauseBoardNode:cc.Node,scoreBoardNode:cc.Node,stateImg:[cc.SpriteFrame],levelTooltip:{default:null,type:cc.Node,tooltip:"开始时第几关提示节点"},levelImg:{default:[],type:[cc.SpriteFrame],tooltip:"图片关卡几"},tips:[cc.Node]},onLoad:function(){this.gameJs=this.node.getComponent("game"),this.guangAnimComp=this.scoreBoardNode.getChildByName("guang").getComponent(cc.Animation),this.stateSprite=this.scoreBoardNode.getChildByName("state").getComponent(cc.Sprite),this.levelImgSprite=this.levelTooltip.getChildByName("img").getComponent(cc.Sprite),this.levelTooltipAnim=this.levelTooltip.getComponent(cc.Animation)},onDestroy:function(){},switchPauseBoard:function(){this.pauseBoardNode.active=this.gameJs.isPause()},showScoreBoardNode:function(t){this.scoreBoardNode.active=!0;var e=this.scoreBoardNode.getChildByName("next");switch(this.guangAnimComp.play(),t){case constant.GameStatus.VICTORY:if(this.stateSprite.spriteFrame=this.stateImg[0],9===this.gameJs.gameLevel){var i=this.scoreBoardNode.getChildByName("tip");e.active=!1,i.active=!0}else e.active=!0;break;case constant.GameStatus.DEFEAT:this.stateSprite.spriteFrame=this.stateImg[1],e.active=!1}},showLevelNum:function(t,e){var i=this;this.levelTooltip.active=!0;var o=t-1;(o<0||o>8)&&(o=0),this.levelTooltipAnim.once("finished",function(){i.levelTooltip.active=!1,e()},this),this.levelImgSprite.spriteFrame=this.levelImg[o],this.levelTooltipAnim.play()},showTip:function(t,e){var i=this;1===t?this.tips[0].active=!0:4===t&&(this.tips[1].active=!0),setTimeout(function(){i.tips[0].active=!1,i.tips[1].active=!1,e()},2e3)}}),cc._RF.pop()},{}],game:[function(t,e,i){"use strict";cc._RF.push(e,"4367eOomrZAAbqOEVe6LpKE","game");var o=t("global");cc.Class({extends:cc.Component,properties:{playerNode:cc.Node,audio:cc.AudioClip,levelPrefab:[cc.Prefab]},onLoad:function(){cc.director.getPhysicsManager().enabled=!0,this.gameUiJs=this.node.getComponent("gameUi"),this.playerUiJs=this.playerNode.getComponent("playerUi"),this.sceneNode=this.node.getChildByName("scene"),cc.game.on(cc.game.EVENT_HIDE,this.clickPauseBtn,this),this.reset()},start:function(){if(1===o.level||4===o.level){this.gameUiJs.showTip(o.level,function(){this.gameUiJs.showLevelNum(this.gameLevel,function(){this.gameStatus=constant.GameStatus.PLAYING}.bind(this))}.bind(this))}else{this.gameUiJs.showLevelNum(this.gameLevel,function(){this.gameStatus=constant.GameStatus.PLAYING}.bind(this))}},onDestroy:function(){this.node.off("playAudio",this.playAudio,this)},reset:function(){this.gameStatus=constant.GameStatus.NONE,this.gameLevel=o.level;o.level;o.level;this.sceneNode.children;var t=cc.instantiate(this.levelPrefab[this.gameLevel-1]);this.sceneNode.addChild(t),3===o.level||9===o.level?this.playerUiJs.highPosition():this.playerUiJs.lowPosition()},playAudio:function(){cc.audioEngine.play(this.audio,!1,.8)},clickPauseBtn:function(){this.isPlaying()&&(this.setGameStatus(constant.GameStatus.PAUSE),this.gameUiJs.switchPauseBoard(),this.playerUiJs.stopAni(),this.playAudio())},clickContinueBtn:function(){this.setGameStatus(constant.GameStatus.PLAYING),this.gameUiJs.switchPauseBoard(),this.playerUiJs.runAni(),this.playAudio()},clickRestartBtn:function(){cc.director.loadScene("game"),this.playAudio()},clickNextBtn:function(){o.level<9&&(o.level=this.gameLevel+1),cc.director.loadScene("game"),this.playAudio()},clickSelectBtn:function(){cc.director.loadScene("select"),this.playAudio()},gameWin:function(){this.setGameStatus(constant.GameStatus.VICTORY),this.gameUiJs.showScoreBoardNode(this.gameStatus)},gameOver:function(){this.setGameStatus(constant.GameStatus.DEFEAT),this.gameUiJs.showScoreBoardNode(this.gameStatus)},isPlaying:function(){return this.gameStatus===constant.GameStatus.PLAYING},isPause:function(){return this.gameStatus===constant.GameStatus.PAUSE},setGameStatus:function(t){this.gameStatus=t},update:function(t){this.isPlaying()&&(this.playerNode.x+this.playerNode.width/2<-cc.winSize.width/2||this.playerNode.y+this.playerNode.height/2<-cc.winSize.height/2)&&this.gameOver()}}),cc._RF.pop()},{global:"global"}],global:[function(t,e,i){"use strict";cc._RF.push(e,"a1245oHhyBNHLtBuLfKyhDQ","global"),e.exports={level:1,firstTime:0},cc._RF.pop()},{}],"hero-control":[function(t,e,i){"use strict";cc._RF.push(e,"7f83e4cLCpFgYkIfEc+vPuj","hero-control"),cc.Class({extends:cc.Component,properties:{maxSpeed:500,jumps:2,jumpSpeed:1300,drag:100},onLoad:function(){this.Canvas=cc.find("Canvas"),this.Canvas.on("touchstart",this.onKeyDown,this),this.Canvas.on("touchend",this.onKeyUp,this),this.upFlag=!1,this.body=this.getComponent(cc.RigidBody),this.playerUiJs=this.node.getComponent("playerUi")},onKeyDown:function(t){this._upPressed||(this.upFlag=!0),this._upPressed=!0,this.playerUiJs.jumpAni()},onKeyUp:function(t){this._upPressed=!1},update:function(t){var e=this.body.linearVelocity;e.x=0,Math.abs(e.y)<1&&(this.jumps=2),this.jumps>0&&this.upFlag&&(e.y=this.jumpSpeed,this.jumps--),this.upFlag=!1,this.body.linearVelocity=e,0===e.y&&this.playerUiJs.getAnimStatus()!==constant.AnimStatus.RUN&&this.playerUiJs.runAni()}}),cc._RF.pop()},{}],loadmap:[function(t,e,i){"use strict";cc._RF.push(e,"b5ed0gg9CNPSK/lKT77eAzO","loadmap");var o=t("mapdata");cc.Class({extends:cc.Component,properties:{floorPrefab:[cc.Prefab]},onLoad:function(){this.allFloorNodePool={},this.floorsNode=cc.find("Canvas/game/floor");var t=o.level1Floor;this.createrNode(t)},createrNode:function(t){for(var e=0;e<t.length;e++)this.createrPrefab(t[e].name,t[e].p,t[e].rotation,t[e].sensor)},createrPrefab:function(t,e,i,o){for(var n=0;n<this.floorPrefab.length;n++)if(t===this.floorPrefab[n].name){var s=cc.instantiate(this.floorPrefab[n]);this.floorsNode.addChild(s),s.setPosition(cc.p(e.x,e.y)),s.rotation=i;var a=s.getComponent(cc.PhysicsBoxCollider);a.sensor=o,a.apply();break}}}),cc._RF.pop()},{mapdata:"mapdata"}],mapdata:[function(t,e,i){"use strict";cc._RF.push(e,"01c55xsT9dM05cBo5Ku6tds","mapdata");e.exports={level1Floor:[{name:"floor1",p:{x:-329,y:-226},rotation:0,sensor:!1},{name:"f1",p:{x:369,y:-290},rotation:20,sensor:!1},{name:"floor1",p:{x:1018,y:-226},rotation:0,sensor:!1},{name:"f1",p:{x:1561,y:1},rotation:0,sensor:!0},{name:"f1",p:{x:1688,y:-300},rotation:-20,sensor:!1},{name:"floor2",p:{x:2339,y:-226},rotation:0,sensor:!1},{name:"floor1",p:{x:2958,y:-226},rotation:0,sensor:!1},{name:"floor2",p:{x:3331,y:-226},rotation:0,sensor:!1},{name:"floor3",p:{x:3928,y:-244},rotation:0,sensor:!1},{name:"floor3",p:{x:4391,y:-244},rotation:0,sensor:!1},{name:"floor3",p:{x:4855,y:-244},rotation:0,sensor:!1},{name:"floor4",p:{x:5798,y:-241},rotation:0,sensor:!1},{name:"floor1",p:{x:6905,y:-210},rotation:0,sensor:!1}]},cc._RF.pop()},{}],"one-side-platform":[function(t,e,i){"use strict";cc._RF.push(e,"36e76cnS2BBBYYElgUPdNB1","one-side-platform"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.pointVelPlatform=cc.v2(),this.pointVelOther=cc.v2(),this.relativeVel=cc.v2(),this.relativePoint=cc.v2()},onBeginContact:function(t,e,i){this._pointsCache;for(var o=i.body,n=e.body,s=t.getWorldManifold().points,a=this.pointVelPlatform,c=this.pointVelOther,r=this.relativeVel,l=(this.relativePoint,0);l<s.length;l++){if(n.getLinearVelocityFromWorldPoint(s[l],a),o.getLinearVelocityFromWorldPoint(s[l],c),n.getLocalVector(c.subSelf(a),r),r.y<-32)return;r.y}t.disabled=!0}}),cc._RF.pop()},{}],playerUi:[function(t,e,i){"use strict";cc._RF.push(e,"43b31ptbuBGfqojRGDjZK9I","playerUi"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.animStatus=constant.AnimStatus.STOP,this.animComp=this.node.getComponent(cc.Animation)},start:function(){this.runAni()},runAni:function(){this.animStatus=constant.AnimStatus.RUN,this.animComp.play("player-run")},stopAni:function(){this.animStatus=constant.AnimStatus.STOP,this.animComp.stop()},getAnimStatus:function(){return this.animStatus},highPosition:function(){this.node.position=cc.p(-400,100)},lowPosition:function(){this.node.position=cc.p(-400,-72)}}),cc._RF.pop()},{}],player:[function(t,e,i){"use strict";cc._RF.push(e,"0c12aAxGHVCC6G8RDX/66hg","player"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.Game=cc.find("Canvas/game").getComponent("game"),this.jumpTimes=0,this.nodeDefaultX=-380,this.resetPositionFlag=!1,this.anim=this.node.getComponent(cc.Animation)},start:function(){this.anim.play("player-run")},jumpAni:function(){this.anim.play("player-jump")},runAni:function(){this.anim.play("player-run")},playerJump:function(t){this.jumpTimes<2&&(this.resetPositionFlag=!1,this.node.getComponent(cc.RigidBody).linearVelocity=cc.p(0,1e3),this.jumpTimes++,this.anim.play("player-jump"))},onBeginContact:function(t,e,i){if(!1===i.sensor){1!==e.tag&&0===i.node.rotation||(this.jumpTimes=0);var o=this.anim.currentClip;1===e.tag&&0===i.node.rotation?(this.resetPositionFlag=!0,"player-run"!==o.name&&this.anim.play()):0!==i.node.rotation&&"player-roll"!==o.name&&this.anim.play("player-roll")}else!0===i.sensor&&(3===i.tag?this.collisionGold(i.node):this.node.y-this.node.height/2>=i.node.y&&(i.sensor=!1,i.apply()))},onEndContact:function(t,e,i){!0===i.sensor&&this.node.y-this.node.height/2>=i.node.y&&(i.sensor=!1,i.apply())},resetPosition:function(){var t=this.node.x-this.nodeDefaultX;if(Math.abs(t)<50)this.resetPositionFlag=!1;else{var e=this.node.getComponent(cc.RigidBody);t>50?e.linearVelocity=cc.p(-200,0):t<-50&&(e.linearVelocity=cc.p(200,0))}},collisionGold:function(t){t.destroy();var e=this.Game.goldNumLabel.string-0;e++,this.Game.goldNumLabel.string=e},update:function(t){this.resetPositionFlag&&this.resetPosition()}}),cc._RF.pop()},{}],roleView:[function(t,e,i){"use strict";cc._RF.push(e,"4de1fmBK01AgLz95xZPA2D8","roleView"),cc.Class({extends:cc.Component,properties:{roleImg:{default:[],type:[cc.SpriteFrame],tooltip:"角色图片"},nameImg:{default:[],type:[cc.SpriteFrame],tooltip:"名字图片"},roleSprite:cc.Sprite,nameSprite:cc.Sprite},onLoad:function(){this.index=0},onDestroy:function(){},openView:function(t){this.node.active=!0,this.needCloseFlag=!1,this.index=t,this.changeView(t),this._openAni()},_openAni:function(){this.node.scale=0;var t=cc.scaleTo(.2,1);this.node.runAction(t)},_closeAni:function(){var t=cc.scaleTo(.2,0),e=cc.callFunc(function(){this.node.active=!1},this);this.node.runAction(cc.sequence(t,e))},changeView:function(t){this.roleSprite.spriteFrame=this.roleImg[t],this.nameSprite.spriteFrame=this.nameImg[t]},leftBtn:function(){this.index--,this.index<0&&(this.index=4),this.changeView(this.index)},rightBtn:function(){this.index++,this.index>4&&(this.index=0),this.changeView(this.index)},closeBtn:function(){this._closeAni()}}),cc._RF.pop()},{}],"scene-move":[function(t,e,i){"use strict";cc._RF.push(e,"211a2A13idAw5w3wFf/GOu4","scene-move"),cc.Class({extends:cc.Component,properties:{background:[cc.Node],bgMoveSpeed:80,floorsAndStarsNode:cc.Node,floorsAndStarSpeed:330,cloudNode:cc.Node,cloudSpeed:30},onLoad:function(){this.Game=this.node.getComponent("game"),this.playerNode=this.node.getChildByName("player"),this.floorsAndStarsMove(),this.moveFlag=!0},bgAndCloudMove:function(t){var e=function(e,i){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;e.x>-e.width?e.x-=t*i:e.x=e.width-3+o};e(this.background[0],this.bgMoveSpeed),e(this.background[1],this.bgMoveSpeed),e(this.cloudNode,this.cloudSpeed,470)},floorsAndStarsMove:function(){for(var t=this.floorsAndStarsNode.getChildByName("floors").children,e=t[t.length-1].getPositionX()-t[0].getPositionX(),i=0;i<t.length;i++){var o=cc.moveBy(e/this.floorsAndStarSpeed,cc.p(-e,0));if(i===t.length-1){var n=cc.callFunc(function(){this.playerNode.y>t[t.length-1].y&&this.Game.changeGameStatus("victory")},this),s=cc.sequence(o,n);t[i].runAction(s)}else t[i].runAction(o)}for(var a=this.floorsAndStarsNode.getChildByName("stars").children,c=0;c<a.length;c++){var r=cc.moveBy(e/this.floorsAndStarSpeed,cc.p(-e,0));a[c].runAction(r)}},update:function(t){this.moveFlag&&this.bgAndCloudMove(t)}}),cc._RF.pop()},{}],sceneMove:[function(t,e,i){"use strict";cc._RF.push(e,"03cdbs1zMZMcISH2rSrYDG3","sceneMove"),cc.Class({extends:cc.Component,properties:{cloudSpeed:30,mountainSpeed:100,houseSpeed:200,groundSpeed:500},onLoad:function(){this.gameJs=cc.find("Canvas").getComponent("game");var t=this.node.getChildByName("background");this.cloud=t.getChildByName("cloud"),this.mountain=t.getChildByName("mountain"),this.house=t.getChildByName("house"),this.grounds=this.node.getChildByName("ground").children,this.bgList=["cloud","mountain","house"],this.bgListLen=this.bgList.length},bgMove:function(t,e){var i=this[t].getChildByName("b1"),o=this[t].getChildByName("b2");i.x-=this[t+"Speed"]*e,o.x-=this[t+"Speed"]*e,this.checkOutOfScene(i,o)},checkOutOfScene:function(t,e){t.x+t.width/2<-cc.winSize.width/2&&(t.x=e.x+t.width),e.x+e.width/2<-cc.winSize.width/2&&(e.x=t.x+e.width)},groundMove:function(t){for(var e=0;e<this.grounds.length;e++)this.grounds[e].x-=this.groundSpeed*t},update:function(t){if(this.gameJs.isPlaying()){for(var e=0;e<this.bgListLen;e++)this.bgMove(this.bgList[e],t);this.groundMove(t)}}}),cc._RF.pop()},{}],select:[function(t,e,i){"use strict";cc._RF.push(e,"43cb6cJkEBAXLyoR0/PXQyZ","select");var o=t("global");cc.Class({extends:cc.Component,properties:{backButton:cc.Button,loadingNode:cc.Node,bgSprite:cc.Sprite,bgImg:[cc.SpriteFrame]},onLoad:function(){this.pageView=cc.find("Canvas/selectView").getComponent(cc.PageView),this.pageViewContent=this.pageView.content,this.pageViewIndicatorNode=this.pageView.indicator.node,this.pageView.node.on("scroll-ended",this.selectLevel,this),this.loadingNode.active=!1},start:function(){var t=this.pageViewContent.children[0];this.scrollNode(t,!0)},selectLevel:function(t){var e=t.detail,i=e.getPages(),o=e.getCurrentPageIndex();this.bgSprite.spriteFrame=this.bgImg[o];for(var n=0;n<i.length;n++){var s=n===o,a=i[n].getComponent(cc.Button);a&&(a.interactable=s),this.scrollNode(i[n],s)}},scrollNode:function(t,e){var i=t.getChildByName("bg"),o=i.getChildByName("label"),n=e?255:123,s=e?1.2:1,a=cc.spawn(cc.tintTo(.3,n,n,n),cc.scaleTo(.3,s));i.runAction(a),o.runAction(cc.tintTo(.3,n,n,n))},backButtonClick:function(){cc.director.loadScene("start")},clickLevel:function(t){var e=this;this.pageView.enabled=!1,this.clickedNode=t.target,this.clickedNode.getComponent(cc.Button).interactable=!1,this.backButton.interactable=!1,this.levelChildren=this.clickedNode.getChildByName("level").children;var i=cc.moveBy(1,cc.p(0,-100)),o=cc.callFunc(function(){e.backButton.interactable=!0,e.playAnim()},this);this.clickedNode.runAction(cc.sequence(i,o));for(var n=this.pageViewContent.children,s=0;s<n.length;s++)n[s].name!==this.clickedNode.name&&n[s].runAction(cc.fadeOut(1));this.pageViewIndicatorNode.runAction(cc.fadeOut(1))},playAnim:function(){this.playNum=0;for(var t=0;t<this.levelChildren.length-1;t++){this.levelChildren[t].getComponent(cc.Animation).once("finished",this.playNext,this)}this.playNext()},playNext:function(){this.levelChildren[this.playNum].active=!0,this.levelChildren[this.playNum].getComponent(cc.Animation).play(),this.playNum++},toGameScene:function(t,e){this.loadingNode.active=!0;var i=e-0;o.level=i,cc.director.preloadScene("game",function(){setTimeout(function(){cc.director.loadScene("game")},500)})}}),cc._RF.pop()},{global:"global"}],start:[function(t,e,i){"use strict";cc._RF.push(e,"8cf4ciaNjhHF5crU4dW1iiD","start");var o=t("global");cc.Class({extends:cc.Component,properties:{startUp:cc.Node},onLoad:function(){this.buttonManage=this.node.getComponent("button-manage"),this.audioMgr=this.buttonManage.audioMgr,o.firstTime>0||this.showStartUp()},start:function(){},loadGoldNum:function(){var t=cc.sys.localStorage.getItem("goldNum");t=t?t-0:0,this.setGold(t)},setGold:function(t){this.node.getChildByName("goldNum").getComponent(cc.Label).string=t},showStartUp:function(){var t=this;o.firstTime=1,this.startUp.active=!0;var e=this.startUp.getComponent(cc.Animation);e.once("finished",function(){cc.director.preloadScene("select"),setTimeout(function(){t.startUp.active=!1},2e3)},this),e.play()}}),cc._RF.pop()},{global:"global"}],test:[function(t,e,i){"use strict";cc._RF.push(e,"1526ecE6vRHJqvQA4CUyVLE","test"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.getAllFloorsPosition()},getAllFloorsPosition:function(){for(var t=cc.find("Canvas/game/floor111").children,e=[],i=0;i<t.length;i++){var o=t[i].getComponent(cc.PhysicsBoxCollider).sensor,n={name:t[i].name,p:t[i].getPosition(),rotation:t[i].rotation,sensor:o};e.push(n)}var s=JSON.stringify(e);console.log(s)}}),cc._RF.pop()},{}]},{},["constant","global","mapdata","control","game","gameUi","playerUi","sceneMove","game2","hero-control","loadmap","player","scene-move","select","audioMgr","button-manage","roleView","start","test","one-side-platform"]);