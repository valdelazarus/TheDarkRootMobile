class GameMenu extends createjs.Container{
    constructor(){
        super();
        this.removeAllChildren();
        //this.addTitle();
        this.addBG();
        this.addButtons();
        this.music = playSound("MenuMusic",true,.5);
    }
    addTitle() {
        var title = drawText("The Dark Root", "Bold 50px Arial", "#000", canvas.width/2, canvas.height/2-70);
        title.shadow = drawShadow("#666",3,3,10);
        this.addChild(title);
    }
    addButtons() {
                
        var btnContainer = new UIButton("PLAY", canvas.width - 250, canvas.height/2 - 200);
        
        btnContainer.on('click', this.onButtonClick, this);
        
        var resumeBtnContainer = new UIButton("RESUME", canvas.width - 250, canvas.height/2-50);
        
        resumeBtnContainer.on('click', this.onResumeClick, this);
        
        var guideBtnContainer = new UIButton("GUIDE", canvas.width - 250, canvas.height/2+100);
        
        guideBtnContainer.on('click', this.onGuideClick, this);
        
        this.addChild(btnContainer, resumeBtnContainer, guideBtnContainer);
    }
    addBG(){
        this.addChild(new lib.MenuBG());
    }
    onButtonClick(e) {
        playSound("Pickup");
        this.dispatchEvent(GameStateEvents.LEVEL_1_TRANSITION);
    }
    onResumeClick(e){
        playSound("Pickup");
        if (typeof(Storage) !== undefined){ //if local storage is available
            if (localStorage.level == undefined){
                localStorage.level = 1;
            }
            levelLoad = localStorage.level;
        } else {
            levelLoad = 1;
        }
        switch (levelLoad){
            case "1":
                this.dispatchEvent(GameStateEvents.LEVEL_1_TRANSITION);
                break;
            case "2":
                this.dispatchEvent(GameStateEvents.LEVEL_2_TRANSITION);
                break;
            case "3":
                this.dispatchEvent(GameStateEvents.LEVEL_3_TRANSITION);
                break;
        }
    }
    onGuideClick(e){
        playSound("Pickup");
        this.dispatchEvent(GameStateEvents.GUIDE);
    }
    dispose(){
        this.music.stop();
    }
}
class GameComplete extends createjs.Container{
    constructor(displayedText, music){
        super();
        this.removeAllChildren();
        this.addBG();
        this.addTitle(displayedText);
        this.addButtons();
        this.music = playSound(music,true,.5);
    }
    addTitle(displayedText) {

        this.title = new createjs.BitmapText(displayedText, textSpriteSheet);
        
        this.title.x = canvas.width/4;
        this.title.y = canvas.height/2-200;
        this.title.scale = .7;
        
        this.addChild(this.title);
    }
    addBG(){
        this.addChild(new lib.UIBG_1());
    }
    addButtons() {
        
        var replayBtnContainer = new UIButton("REPLAY", 0, 0);
        
        replayBtnContainer.x = canvas.width/2-replayBtnContainer.graphic.nominalBounds.width/2 * replayBtnContainer.graphic.scale;
        replayBtnContainer.y = canvas.height/2;
        
        replayBtnContainer.on('click', this.onReplayButtonClick, this);
        
        var menuBtnContainer = new UIButton("MENU", 0, 0);
             
        menuBtnContainer.x = canvas.width/2-menuBtnContainer.graphic.nominalBounds.width/2 * menuBtnContainer.graphic.scale;
        menuBtnContainer.y = canvas.height/2 + 100;
        
        menuBtnContainer.on('click', this.onMenuButtonClick, this);
       
        this.addChild(replayBtnContainer, menuBtnContainer);
    }
    onMenuButtonClick(e) {
        playSound("Pickup");
        this.dispatchEvent(GameStateEvents.MAIN_MENU);
    }
    onReplayButtonClick(e) {
        playSound("Pickup");
        this.dispatchEvent(GameStateEvents.LEVEL_1_TRANSITION);
    }
    dispose(){
        this.music.stop();
    }
}
class GameComplete2 extends createjs.Container{
    constructor(displayedText, music, storyText){
        super();
        this.removeAllChildren();
        this.addBG();
        this.addTitle(displayedText);
        this.addStoryText(storyText);
        this.addButtons();
        this.music = playSound(music,true,.5);
    }
    addTitle(displayedText) {

        this.title = new createjs.BitmapText(displayedText, textSpriteSheet);
        
        this.title.x = canvas.width/4;
        this.title.y = canvas.height/2-200;
        this.title.scale = .7;
        
        this.addChild(this.title);
    }
    addBG(){
        this.addChild(new lib.UIBG_1());
    }
    addStoryText(storyText){
        this.storyText = drawText(storyText, "30px Arial Bold", "#000", canvas.width/2, canvas.height/2);
        this.storyText.lineWidth = 600;
        this.storyText.alpha = 0;
        createjs.Tween.get(this.storyText).to({alpha:1},3000);
        this.addChild(this.storyText); 
    }
    addButtons() {
        
        var replayBtnContainer = new UIButton("REPLAY", 0, 0);
        
        replayBtnContainer.x = canvas.width/2-replayBtnContainer.graphic.nominalBounds.width/2 * replayBtnContainer.graphic.scale;
        replayBtnContainer.y = canvas.height/2 + 150;
        
        replayBtnContainer.on('click', this.onReplayButtonClick, this);
        
        var menuBtnContainer = new UIButton("MENU", 0, 0);
        
        menuBtnContainer.x = canvas.width/2-menuBtnContainer.graphic.nominalBounds.width/2 * menuBtnContainer.graphic.scale;
        menuBtnContainer.y = canvas.height/2 + 250;
        
        menuBtnContainer.on('click', this.onMenuButtonClick, this);
       
        this.addChild(replayBtnContainer, menuBtnContainer);
    }
    onMenuButtonClick(e) {
        playSound("Pickup");
        this.dispatchEvent(GameStateEvents.MAIN_MENU);
    }
    onReplayButtonClick(e) {
        playSound("Pickup");
        this.dispatchEvent(GameStateEvents.LEVEL_1_TRANSITION);
    }
    dispose(){
        this.music.stop();
    }
}

class GameLevel extends createjs.Container{
    constructor(levelData){
        super();
        
        this.bgLayer = new createjs.Container();
        this.ppLayer = new createjs.Container();
        this.playerLayer = new createjs.Container();
        this.enemyLayer = new createjs.Container();
        this.bossLayer = new createjs.Container();
        this.hudLayer = new createjs.Container();
        
        this.levelData = levelData;
        
        this.levelBG = new lib.GameBG();
        
        this.bossSpawned = true;
        
        this.createPlayer();

        hudContainer = new createjs.Container();
        this.createHealthBar();
        this.createTimer();
        this.createAmmoDisplay();
        this.createSkillDisplay();
        this.createScoreBoard();
        
        this.createControlButtons();

        this.currentMusic = playSound(this.levelData.backgroundMusic,true,.5);
        
        this.timer = 0;
        this.boss = undefined;
        
        this.guide = drawPreloadedImage(preloader.queue.getResult("Guide"),.5,canvas.width/4,canvas.height/2);
    
        
//        this.addChildAt(this.levelBG, 0);
//        this.hudLayer.addChild(hudContainer);   
        
        this.addChildAt(this.bgLayer, 0);
        this.addChildAt(this.ppLayer, 1);
        this.addChildAt(this.playerLayer, 2);
        this.addChildAt(this.enemyLayer, 3);
        this.addChildAt(this.bossLayer, 4);
        this.addChildAt(this.hudLayer, 5);
        
        this.bgLayer.addChild(this.levelBG);
        this.hudLayer.addChild(hudContainer);
    }
    run(){
         //handle game over
        if (gameOver){
  
            this.loseGame();
            return;
        }

        if (nextLevel){

            this.winGame();
            return;
        }
        
        if (player != undefined){
            player.update();
            this.toggleGuide();
        }

        this.runEnemyBehavior();
        this.runBulletBehavior();
        this.runPickupBehavior();

        if (healthBarObj != undefined && player != undefined && !gameOver){
            healthBarObj.currentValue = player.health;
        }
        if (skillDisplayLeft != undefined && player != undefined && !gameOver){
            if (player.shootBehavior.atkCounter >= player.shootBehavior.shootInterval * createjs.Ticker.framerate){
                skillDisplayLeft.currentValue = 0;
            } else {
                skillDisplayLeft.currentValue = 1;
            }
        }
        if (skillDisplayRight != undefined && player != undefined && !gameOver){
            if (player.shootBehavior.atkCounter >= player.shootBehavior.specialAtkInterval * createjs.Ticker.framerate){
                skillDisplayRight.currentValue = 0;
            } else {
                skillDisplayRight.currentValue = 1;
            }
        }

        if (timerObj != undefined && player != undefined && !gameOver && timerObj.seconds <= 0){
           //this.lastSpawn = time;
            this.spawnBoss();
        } 
        
        if (this.boss == undefined || this.boss == null){
            this.timer++;
            if (this.timer > this.levelData.waveSpawnInterval * createjs.Ticker.framerate){
                this.timer = 0;
                this.spawnEnemies();
            }
        } else {
//            this.setChildIndex(this.boss, this.numChildren-1);
            this.boss.update(); 
        }
        
        if (smallAmmoDisplay != undefined && player != undefined && !gameOver){
            smallAmmoDisplay.updateAmmoText(player.weaponManager.smallWeapon.ammoNumber);
        }
        if (largeAmmoDisplay != undefined && player != undefined && !gameOver){
            largeAmmoDisplay.updateAmmoText(player.weaponManager.largeWeapon.ammoNumber);
        }
    }
    createPlayer(){
        player = new Player(new lib.Player(), playerSpd, playerAtkSpd, playerAimAngle, playerShootInterval, playerSpecialAtkInterval, PLAYER_HEALTH, playerMinDmg, playerMaxDmg);
    
        player.graphic.scale = .3;
        player.x = 500;
        player.y = 300;
        
        this.createAimIndicator();
        
        this.playerLayer.addChild(player);
    }
    createAimIndicator(){
        aimIndicator = new GameObject(drawPreloadedImage(preloader.queue.getResult("AimIndicator"), .5, 0, 0));
        player.addChild(aimIndicator);
        //setting local positions for rotating point (parent object)
        aimIndicator.x = player.graphic.nominalBounds.width/2*player.graphic.scale;
        aimIndicator.y = player.graphic.nominalBounds.height/2*player.graphic.scale;
        //aimIndicator.y = 50;
        //setting child local position offset
        aimIndicator.graphic.x = 60;
        aimIndicator.graphic.y = -49/4+6.6; //-aim indicator image width * its scale / 2 + offset
    }
    createHealthBar(){
        healthBarObj = new HealthBar(PLAYER_HEALTH, player.health, 100, 10, 150, 20,"Player");
        hudContainer.addChild(healthBarObj);
    }
    createTimer(){
        timerObj = new Timer(this.levelData.timerMaxTimer, stage.canvas.width/2, 20, 50,20,"red","#fff");
        hudContainer.addChild(timerObj);
    }
    createAmmoDisplay(){
        smallAmmoDisplay = new AmmoDisplay(new lib.SmallProj(),110,50);
        hudContainer.addChild(smallAmmoDisplay);
        largeAmmoDisplay = new AmmoDisplay(new lib.LargeProj(),110,80);
        hudContainer.addChild(largeAmmoDisplay);
    }
    createSkillDisplay(){
        var left = new createjs.BitmapText("L", textSpriteSheet);
        left.scale = .3;
        left.shadow = drawShadow("#ccff33",0,0,10);
        left.x -= 10;
        left.y -= 10;
        
        var right = new createjs.BitmapText("R", textSpriteSheet);
        right.scale = .3;
        right.shadow = drawShadow("#ccff33",0,0,10);
        right.x -= 10;
        right.y -= 10;
        
        skillDisplayLeft = new SkillDisplay(left, 1, 0, 40, 40, 120, 120);
        skillDisplayRight = new SkillDisplay(right, 1, 0, 40, 40, 170, 120);
        hudContainer.addChild(skillDisplayLeft, skillDisplayRight);
    }
    createScoreBoard(){
        if (this.scoreTxt != undefined){
            hudContainer.removeChild(this.scoreTxt);
        }
        this.scoreTxt = new createjs.BitmapText(score.toString(), textSpriteSheet);
        this.scoreTxt.y = timerObj.y;
        this.scoreTxt.x = stage.canvas.width -100;
        this.scoreTxt.shadow = drawShadow("#ffffcc",0,0,10);
        this.scoreTxt.scale = .5;
        hudContainer.addChild(this.scoreTxt);
    }
    createControlButtons(){
        var rightBtn = new ControlButton("R",canvas.width -330,canvas.height - 50);
        
        rightBtn.on("click", function(){
            if (player != undefined){
            player.shootBehavior.performSpecialAtk(player);}
        });
        
        var btn1 = new ControlButton("1",canvas.width -260,canvas.height - 50);
        
        btn1.on("click", function(){
            keyboard1 = true;
            keyboard2= false;
            keyboard3= false;
        });
        
        var btn2 = new ControlButton("2",canvas.width -190,canvas.height - 50);
        
        btn2.on("click", function(){
            keyboard2 = true;
            keyboard1= false;
            keyboard3= false;
        });
        
        var btn3 = new ControlButton("3",canvas.width -120,canvas.height - 50);
        
        btn3.on("click", function(){
            keyboard3 = true;
            keyboard2= false;
            keyboard1= false;
        });
        
        var btnH = new ControlButton("H",canvas.width -50,canvas.height - 50);
        
        btnH.on("mousedown", function(){
            keyboardH = true;
        });
        btnH.on("pressup", function(){
            keyboardH = false;
        });
       
        var mouseClickArea = new createjs.Container();
        
        mouseClickArea.hitArea = drawRect("#fff",canvas.width, canvas.height - 100, canvas.width/2,canvas.height/2);
        
        mouseClickArea.on("click", function(){
            if (player != undefined){
                player.shootBehavior.performAtk(player);
            }
        });
        
        hudContainer.addChild(mouseClickArea, rightBtn, btn1, btn2, btn3, btnH);
    }
    spawnEnemies(){
        if (!gameOver && !nextLevel && timerObj.seconds > 0){
            console.log("Level spawned minions");
            this.levelData.enemySpawner.spawnMinions();
        }
    }
    spawnBoss(){
//        if (this.bossSpawned){
//            boss = new Boss1(drawPreloadedImage(preloader.queue.getResult("Boss"), .7, 700, 300),this.levelData.bossSpd,this.levelData.bossDmg,this.levelData.bossHealth,this.levelData.bossAtkInterval,this.levelData.bossMinionsNumber,this.levelData.bossWaveSpawnInterval, this.levelData);
//
//            enemies.push(boss);
//            this.addChild(boss);
//
//            this.bossSpawned = false;
//        }
    }
    runEnemyBehavior(){
        for (var i =0; i<enemies.length; ++i){      
 
            if ((enemies[i].type == "Melee")||(enemies[i].type == "Boss") ){
                if (checkCollisionSprSpr(player, enemies[i])){
                    enemies[i].speed = 0;      
                    if (enemies[i].dealMeleeDamage){
                        enemies[i].meleeBehavior.atkCounter++;
                        enemies[i].dealMeleeDamage();
                    }          
                    handleCollisionSprSpr(player, enemies[i]);
                } 
                else {
                    enemies[i].speed = enemies[i].temp;
                }
                
                if (enemies[i].shootBehavior != undefined){
                    enemies[i].shootBehavior.performAtk(enemies[i]);
                }
            }

            else if (enemies[i].type == "Ranged"){
                handleCollisionSprSpr(player, enemies[i]);
                if (enemies[i].chaseBehavior.distance <= enemies[i].minDistance){
                    enemies[i].speed = 0;
                    enemies[i].shootBehavior.performAtk(enemies[i]);
                } else {
                    enemies[i].speed = enemies[i].temp;
                }
            }
            
            if (enemies[i] != undefined){
                enemies[i].update();
            }            
        }
    }
    runBulletBehavior(){
        for (var i=0; i<bullets.length; ++i){     
            if ((bullets[i].source.type === 'Ranged') ||(bullets[i].source.type == "Boss")){
                if (checkCollisionSprSpr(bullets[i],player)){
                    playSound("Hurt");
                    bullets[i].hitPlayer();
                    this.removeChild(bullets[i]);
                    bullets.splice(i,1);
                }
            } else if (bullets[i].source.type === 'Player'){
                
                bullets[i].hitEnemy();
                this.createScoreBoard();
            }
            if (bullets[i] != undefined){
                bullets[i].update(); 
            }
        }
    }
    
    runPickupBehavior(){
        for (var i=0; i<pickups.length; ++i){
            
            if (pickups[i].graphic.nominalBounds != undefined){
                if (checkCollisionSprSpr(pickups[i],player)){
                    playSound("Pickup");
                    pickups[i].onPickup();
                }
            } else {
                if (checkCollisionSpriteRect(player, pickups[i])){
                    playSound("Pickup");
                    pickups[i].onPickup();
                }
            }
            
            if (pickups[i] != undefined){
                pickups[i].update();
            }
        }
    }
    
    reset(){
        if (this.boss){
            this.boss.active = false;
        }
        
        enemies = [];
        bullets = [];
        pickups = [];
        gameOver = false;
        nextLevel = false; 
        
        this.currentMusic.stop();
        
        this.bgLayer.removeAllChildren();
        this.ppLayer.removeAllChildren();
        this.playerLayer.removeAllChildren();
        this.enemyLayer.removeAllChildren();
        this.bossLayer.removeAllChildren();
        this.hudLayer.removeAllChildren();
        
        this.removeAllChildren();
    }
    loseGame(){
        this.reset();
        score = 0;
        playerSpd = 3;
        this.dispatchEvent(GameStateEvents.GAME_LOSE);
    }
    winGame(){
        this.reset();
        localStorage.level = 1;
        score = 0;
        playerSpd = 3;
        this.dispatchEvent(GameStateEvents.GAME_COMPLETE);
    }
    dispose(){
        timerObj = undefined;
        this.removeAllEventListeners();
    }
    toggleGuide(){
        if (keyboardH){
            if(this.guide != undefined){
                this.removeChild(this.guide); 
            } 
            this.addChild(this.guide);
        }else {
            if(this.guide != undefined){
                this.removeChild(this.guide); 
            } 
        }
    }
}
class GameLevel1 extends GameLevel{
    constructor(levelData){
        super(levelData);
    }
     winGame(){
        this.reset();
         if (localStorage.level == undefined){
             localStorage.level = 2;
         } else {
             if (localStorage.level < 2){
                 localStorage.level = 2;
             }
         }
         
        this.dispatchEvent(GameStateEvents.LEVEL_2_TRANSITION);
    }
    spawnBoss(){
        if (this.bossSpawned){
            this.boss = new Boss1(new lib.Boss1(),this.levelData.bossSpd,this.levelData.bossDmg,this.levelData.bossHealth,this.levelData.bossAtkInterval,this.levelData.bossMinionsNumber,this.levelData.bossWaveSpawnInterval, this.levelData);
            this.boss.graphic.scale = .7;
            this.boss.x = 700;
            this.boss.y = 300;
            this.boss.healthBar.x = this.boss.graphic.nominalBounds.width/2 * this.boss.graphic.scale;

            enemies.push(this.boss);
            playSound("Boss Appear");
            this.bossLayer.addChild(this.boss);

            this.bossSpawned = false;
        }
    }
}
class GameLevel2 extends GameLevel{
    constructor(levelData){
        super(levelData);
    }
     winGame(){
        this.reset();
         localStorage.level = 3;
        this.dispatchEvent(GameStateEvents.LEVEL_3_TRANSITION);
    }
    spawnEnemies(){
        if (!gameOver && !nextLevel && timerObj.seconds > 0){
            console.log("Level spawned minions");
            this.levelData.enemySpawner.spawnMinions(false,true);
        }
    }
    spawnBoss(){
        if (this.bossSpawned){
            this.boss = new Boss2(new lib.Boss2(),this.levelData.bossSpd,this.levelData.bossDmg,this.levelData.bossHealth,this.levelData.bossAtkInterval,this.levelData.bossAtkSpd,this.levelData.bossMinDistance, this.levelData);
            this.boss.graphic.scale = .5;
            this.boss.x = 700;
            this.boss.y = 300;
            this.boss.healthBar.x = this.boss.graphic.nominalBounds.width/2 * this.boss.graphic.scale;

            enemies.push(this.boss);
            playSound("Boss Appear");
            this.bossLayer.addChild(this.boss);

            this.bossSpawned = false;
        }
    }
}
class GameLevel3 extends GameLevel{
    constructor(levelData){
        super(levelData);
    }
    spawnEnemies(){
        if (!gameOver && !nextLevel && timerObj.seconds > 0){
            console.log("Level spawned minions");
            this.levelData.enemySpawner.spawnMinions(true);
        }
    }
    spawnBoss(){
        if (this.bossSpawned){
            this.boss = new Boss3(new lib.Boss3(),this.levelData.bossSpd,this.levelData.bossDmg,this.levelData.bossHealth,this.levelData.bossAtkInterval, this.levelData.bossAtkSpd, this.levelData.bossMinDistance, this.levelData.bossMinionsNumber, this.levelData.bossWaveSpawnInterval, this.levelData);
            this.boss.graphic.scale = .5;
            this.boss.x = 700;
            this.boss.y = 300;
            this.boss.healthBar.x = this.boss.graphic.nominalBounds.width/2 * this.boss.graphic.scale;
            
            enemies.push(this.boss);
            playSound("Boss Appear");
            this.bossLayer.addChild(this.boss);

            this.bossSpawned = false;
        }
    }
}
class LevelTransition extends createjs.Container{
    constructor(displayedText, storyText){
        super();
        this.removeAllChildren();
        
        this.addBG();
        
        this.addTitle(displayedText);
        this.addStoryText(storyText);
        
        this.addButtons();
        
    }
    addTitle(displayedText) {

        this.title = new createjs.BitmapText(displayedText, textSpriteSheet);
        
        this.title.x = canvas.width/4;
        this.title.y = canvas.height/2-200;
        this.title.scale = .5;
        
        this.addChild(this.title);
    }
    addBG(){
        this.addChild(new lib.UIBG_1());
    }
    addStoryText(storyText){
        this.storyText = drawText(storyText, "30px Arial Bold", "#000", canvas.width/2, canvas.height/2);
        this.storyText.lineWidth = 600;
        this.storyText.alpha = 0;
        createjs.Tween.get(this.storyText).to({alpha:1},3000);
        this.addChild(this.storyText); 
    }
    addButtons() {
        
        var nextBtnContainer = new UIButton("NEXT", 0, 0);
        
        nextBtnContainer.x = canvas.width/2-nextBtnContainer.graphic.nominalBounds.width/2 * nextBtnContainer.graphic.scale;
        nextBtnContainer.y = canvas.height/2 + 200;
        
        nextBtnContainer.on('click', this.onNextButtonClick, this);
        
        this.addChild(nextBtnContainer);
    }
    onNextButtonClick(e) {
        
    }
}
class Level1Transition extends LevelTransition{
    constructor(){
        super("ROOT I", "I, Bobbie, was out looking for my inspiration. I saw a beautiful tree, but I fell into a hole. Where is this place?...");
    }
    onNextButtonClick(e) {
        playSound("Pickup");
        this.dispatchEvent(GameStateEvents.LEVEL_1);
    }
}
class Level2Transition extends LevelTransition{
    constructor(){
        super("ROOT II", "I proceeded through a dark cave. I saw some red eyes from the corners. Are they bats?...");
    }
    onNextButtonClick(e) {
        playSound("Pickup");
        this.dispatchEvent(GameStateEvents.LEVEL_2);
    }
}
class Level3Transition extends LevelTransition{
    constructor(){
        super("ROOT III", "It seems like I have reached the end of these roots. There is light going through from above...");
    }
    onNextButtonClick(e) {
        playSound("Pickup");
        this.dispatchEvent(GameStateEvents.LEVEL_3);
    }
}
class GuideScene extends createjs.Container{
    constructor(music){
        super();
        this.removeAllChildren();
        this.addBG();
        this.addTitle();
        this.addGuide();
        this.addButtons();
        this.music = playSound(music,true,.5);
    }
    addTitle() {

        this.title = new createjs.BitmapText("HOW TO PLAY", textSpriteSheet);
        
        this.title.x = canvas.width/4;
        this.title.y = 30;
        this.title.scale = .7;
        this.title.shadow = drawShadow("#ffffcc", 2, 2, 10);
        
        this.addChild(this.title);
    }
    addBG(){
        this.addChild(new lib.UIBG_1());
    }
    addGuide(){
        this.guide = drawPreloadedImage(preloader.queue.getResult("Guide"), 1, 0, 130);
        this.guide.alpha = 0;
        createjs.Tween.get(this.guide).to({alpha:1},3000);
        this.addChild(this.guide); 
    }
    addButtons() {
        
        var menuBtnContainer = new UIButton("MENU", 0, 0);
        
        menuBtnContainer.x = canvas.width/2-menuBtnContainer.graphic.nominalBounds.width/2 * menuBtnContainer.graphic.scale;
        menuBtnContainer.y = canvas.height - 110;
        
        menuBtnContainer.on('click', this.onMenuButtonClick, this);
       
        this.addChild(menuBtnContainer);
    }
    onMenuButtonClick(e) {
        playSound("Pickup");
        this.dispatchEvent(GameStateEvents.MAIN_MENU);
    }
    dispose(){
        this.music.stop();
    }
}