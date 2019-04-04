/*SPAWNER, TIMER, HUD, SCENE*/

//manage scenes and scene transition
class SceneManager{
    constructor(){
        
    }
    /*FOR LOADING SCREEN*/
    createGameTitle(){
        var title = drawText("The Dark Root", "Bold 50px Arial", "#000", canvas.width/2, canvas.height/2-70);
        title.shadow = drawShadow("#666",3,3,10);
        stage.addChild(title);
    }
    createCopyrightText(){
        var copyRightText = drawText("\xA9 Copyright 2019 - NC Bots", "Bold 20px Arial", "#000", canvas.width/2, canvas.height/2+50);
        stage.addChild(copyRightText);
    }
    createLoadingScene(){
        //var bg = new lib.LoadingScreen();
        //var bg = drawImage("images/loadingScreenBG.jpg", 1, 0, 0);
        var bg = drawPreloadedImage(preloader.queue.getResult("loadingScreen"),1,0,0);
        stage.addChild(bg);
    }
    createFontSheet(){
        var textData = {
            "images": [preloader.queue.getResult("font")],
            
            "frames": [
                [4, 38, 16, 62], 
                [50, 35, 46, 66],
                [98, 37, 38, 66],
                [138, 35, 41, 69],
                [181,36,50,67],
                [233,38,44, 64],
                [279,38,47,68],
                [328,38,53,67],
                [383,33,52,69],
                [437,35,45,67],
                [484,35,44,67],
                [540,37,32,64],
                [574,49,64,57],
                [640,38,100,91],
                [742,38,92,115],
                [836,37,106,83],
                [944,38,69,94],
                [1015,37,123,90],
                [1140,38,73,90],
                [1215,39,121,129],
                [1338,39,58,107],
                [1398,32,122,83],
                [1522,37,102,140],
                [1626,36,110,86],
                [1738,25,105,98],
                [1845,22,89,132],
                [1936,26,66,84],
                [2004,25,67,78],
                [2073,32,72,109],
                [2147,33,78,95],
                [2227,35,135,82],
                [2364,31,89,78],
                [2455,22,171,82],
                [2628,27,63,76],
                [2693,8,81,98],
                [2776,2,97,101],
                [2875,37,126,100],
                [3003,32,65,104],
                [3070,31,114,87],
                [3198,66,36,37],
                [3236,43,36,60],
                [3274,66,30,36],
                [3306,43,35,60],
                [3343,67,37,35],
                [3382,43,74,79],
                [3458,66,32,36],
                [3492,42,35,61],
                [3529,53,19,49],
                [3550,53,39,67],
                [3591,43,35,59],
                [3628,42,19,61],
                [3649,66,37,36],
                [3688,67,35,36],
                [3725,64,37,37],
                [3764,64,34,60],
                [3800,63,34,64],
                [3836,66,38,38],
                [3876,66,30,37],
                [3908,54,57,48],
                [3967,65,32,38],
                [4001,63,37,38],
                [4040,64,44,38],
                [2,245,33,41],
                [37,246,44,64],
                [83,246,39,35]
            ],
            "animations": {
                "!":[0], 
                "0":[1], 
                "1":[2], 
                "2":[3], 
                "3":[4], 
                "4":[5], 
                "5":[6], 
                "6":[7], 
                "7":[8], 
                "8":[9],
                "9":[10],
                "?":[11],
                "@":[12],
                "A":[13],
                "B":[14],
                "C":[15],
                "D":[16],
                "E":[17],
                "F":[18],
                "G":[19],
                "H":[20],
                "I":[21],
                "J":[22],
                "K":[23],
                "L":[24],
                "M":[25],
                "N":[26],
                "O":[27],
                "P":[28],
                "Q":[29],
                "R":[30],
                "S":[31],
                "T":[32],
                "U":[33],
                "V":[34],
                "W":[35],
                "X":[36],
                "Y":[37],
                "Z":[38],
                "a":[39],
                "b":[40],
                "c":[41],
                "d":[42],
                "e":[43],
                "f":[44],
                "g":[45],
                "h":[46],
                "i":[47],
                "j":[48],
                "k":[49],
                "l":[50],
                "m":[51],
                "n":[52],
                "o":[53],
                "p":[54],
                "q":[55],
                "r":[56],
                "s":[57],
                "t":[58],
                "u":[59],
                "v":[60],
                "w":[61],
                "x":[62],
                "y":[63],
                "z":[64]    
            }
        };
        textSpriteSheet = new createjs.SpriteSheet(textData);
    }
    gameReady(){
        this.createFontSheet();
        createjs.Ticker.on("tick", this.onTick, this);
        this.changeState(GameStates.MAIN_MENU);
        this.setUpKeyboardMouseEvent();
    }
    changeState(state){
        switch (state) {
            case GameStates.MAIN_MENU:
                this.currentGameStateFunction = this.gameStateMainMenu;
                break;
            case GameStates.LEVEL_1:
                this.currentGameStateFunction = this.gameStateLevel1;
                break;
            case GameStates.LEVEL_2:
                this.currentGameStateFunction = this.gameStateLevel2;
                break;
            case GameStates.LEVEL_3:
                this.currentGameStateFunction = this.gameStateLevel3;
                break;
            case GameStates.GAME_COMPLETE:
                this.currentGameStateFunction = this.gameStateGameComplete;
                break;
            case GameStates.GAME_LOSE:
                this.currentGameStateFunction = this.gameStateGameLose;
                break;
            case GameStates.RUN_SCENE:
                this.currentGameStateFunction = this.gameStateRunScene;
                break;
            case GameStates.LEVEL_1_TRANSITION:
                this.currentGameStateFunction = this.gameStateLevel1Transition;
                break;
            case GameStates.LEVEL_2_TRANSITION:
                this.currentGameStateFunction = this.gameStateLevel2Transition;
                break;
            case GameStates.LEVEL_3_TRANSITION:
                this.currentGameStateFunction = this.gameStateLevel3Transition;
                break;
            case GameStates.GUIDE:
                this.currentGameStateFunction = this.gameStateGuide;
                break;
        }
    }
    onStateEvent(e, obj) {
        this.changeState(obj.state);
    }
    disposeCurrentScene(){
        if (this.currentScene != null) {
            stage.removeChild(this.currentScene);
            if (this.currentScene.dispose) {
                this.currentScene.dispose();
            }
            this.currentScene = null;
        }
    }
    gameStateMainMenu() {      
        player = undefined;
        
        this.disposeCurrentScene();
        
        var scene = new GameMenu();
        
        scene.on(GameStateEvents.LEVEL_1_TRANSITION, this.onStateEvent, this, true, {state:GameStates.LEVEL_1_TRANSITION});
        scene.on(GameStateEvents.LEVEL_2_TRANSITION, this.onStateEvent, this, true, {state:GameStates.LEVEL_2_TRANSITION});
        scene.on(GameStateEvents.LEVEL_3_TRANSITION, this.onStateEvent, this, true, {state:GameStates.LEVEL_3_TRANSITION});
       
        scene.on(GameStateEvents.GUIDE, this.onStateEvent, this, true, {state:GameStates.GUIDE});
        
        stage.addChild(scene);
        
        this.currentScene = scene;
        this.changeState(GameStates.RUN_SCENE);
    }
    gameStateGuide(){
        player = undefined;
        
        this.disposeCurrentScene();
        
        var scene = new GuideScene("GameWinMusic");
        
        scene.on(GameStateEvents.MAIN_MENU, this.onStateEvent, this, true, {state:GameStates.MAIN_MENU});
        
        stage.addChild(scene);

        this.currentScene = scene;
        this.changeState(GameStates.RUN_SCENE);
    }
    gameStateLevel1() {
        this.disposeCurrentScene();
        
        var scene = new GameLevel1(levelData1);
        
        scene.on(GameStateEvents.LEVEL_2_TRANSITION, this.onStateEvent, this, true, {state:GameStates.LEVEL_2_TRANSITION});
        
        scene.on(GameStateEvents.GAME_LOSE, this.onStateEvent, this, true, {state:GameStates.GAME_LOSE});
        
        stage.addChild(scene);
        
        this.currentScene = scene;
        this.changeState(GameStates.RUN_SCENE);
    }
    gameStateLevel2() {
        this.disposeCurrentScene();
        
        var scene = new GameLevel2(levelData2);
        
        scene.on(GameStateEvents.LEVEL_3_TRANSITION, this.onStateEvent, this, true, {state:GameStates.LEVEL_3_TRANSITION});
        
        scene.on(GameStateEvents.GAME_LOSE, this.onStateEvent, this, true, {state:GameStates.GAME_LOSE});
        
        stage.addChild(scene);
        
        this.currentScene = scene;
        this.changeState(GameStates.RUN_SCENE);
    }
    gameStateLevel3() {
        this.disposeCurrentScene();
        
        var scene = new GameLevel3(levelData3);
        
        scene.on(GameStateEvents.GAME_COMPLETE, this.onStateEvent, this, true, {state:GameStates.GAME_COMPLETE}); 
        
        scene.on(GameStateEvents.GAME_LOSE, this.onStateEvent, this, true, {state:GameStates.GAME_LOSE});
        
        stage.addChild(scene);
        
        this.currentScene = scene;
        this.changeState(GameStates.RUN_SCENE);
    }
    
    gameStateGameComplete() {    
        
        player = undefined;
        
        this.disposeCurrentScene();
        
        //var scene = new GameComplete("FINALLY...", "GameWinMusic");
        var scene = new GameComplete2("FINALLY...", "GameWinMusic","I come closer to the tree. Its beauty shines despite the dark root. And after a moment, it disappeared...");
        
        scene.title.shadow = drawShadow("#ffffcc", 2, 2, 10);
        
        scene.on(GameStateEvents.MAIN_MENU, this.onStateEvent, this, true, {state:GameStates.MAIN_MENU});
    
        scene.on(GameStateEvents.LEVEL_1_TRANSITION, this.onStateEvent, this, true, {state:GameStates.LEVEL_1_TRANSITION});
        
        stage.addChild(scene);

        this.currentScene = scene;
        this.changeState(GameStates.RUN_SCENE);
    }
    
    gameStateGameLose() {   
        
        player = undefined;
        
        this.disposeCurrentScene();
        
        var scene = new GameComplete("GAME OVER!", "GameOverMusic");
        scene.title.shadow = drawShadow("red", 2, 2, 10);
        
        scene.on(GameStateEvents.MAIN_MENU, this.onStateEvent, this, true, {state:GameStates.MAIN_MENU});
        
        scene.on(GameStateEvents.LEVEL_1_TRANSITION, this.onStateEvent, this, true, {state:GameStates.LEVEL_1_TRANSITION});
        
        stage.addChild(scene);
        
        this.currentScene = scene;
        this.changeState(GameStates.RUN_SCENE);
    }
    
    gameStateRunScene() {
        if (this.currentScene.run) {
            this.currentScene.run();        
            this.handleJoyStickEvent();
        }
    }
    
    gameStateLevel1Transition(){
        player = undefined;
        
        this.disposeCurrentScene();
        
         var scene = new Level1Transition();
        
        scene.on(GameStateEvents.LEVEL_1, this.onStateEvent, this, true, {state:GameStates.LEVEL_1});
       
        stage.addChild(scene);
        
        this.currentScene = scene;
        this.changeState(GameStates.RUN_SCENE);
    }
     gameStateLevel2Transition(){
        player = undefined;
        
        this.disposeCurrentScene();
        
         var scene = new Level2Transition();
        
        scene.on(GameStateEvents.LEVEL_2, this.onStateEvent, this, true, {state:GameStates.LEVEL_2});
       
        stage.addChild(scene);
        
        this.currentScene = scene;
        this.changeState(GameStates.RUN_SCENE);
    }
     gameStateLevel3Transition(){
        player = undefined;
        
        this.disposeCurrentScene();
        
         var scene = new Level3Transition();
        
        scene.on(GameStateEvents.LEVEL_3, this.onStateEvent, this, true, {state:GameStates.LEVEL_3});
       
        stage.addChild(scene);
        
        this.currentScene = scene;
        this.changeState(GameStates.RUN_SCENE);
    }
    onTick(e){
        if (this.currentGameStateFunction != null) {
           this.currentGameStateFunction(e);
        } 
    }
    setUpKeyboardMouseEvent(){
//        document.onclick = this.mouseClickHandler; //left click
//        document.oncontextmenu = this.rightMouseClickHandler; //right click
    
        stage.on('pressmove', this.mouseMoveHandler); //mouse move

        //this.handleKeyBoardEvent();
    }
    handleJoyStickEvent(){
        keyboardMoveUp = joystick.up();
        keyboardMoveDown = joystick.down();
        keyboardMoveLeft = joystick.left();
        keyboardMoveRight = joystick.right();
    }
    mouseClickHandler(){
        if (player != undefined){
            player.shootBehavior.performAtk(player);
        } else return;
    }
    rightMouseClickHandler(e){
        if (player != undefined){
            player.shootBehavior.performSpecialAtk(player);
            e.preventDefault(); //hide popup menu
        } else return;
    }
    mouseMoveHandler(e){
        var mouseX = e.stageX;
        var mouseY = e.stageY;
        
        if (player != undefined){
            player.aimAngle = 
                Math.atan2(mouseY-player.y - player.graphic.nominalBounds.height * player.graphic.scale/2, mouseX-player.x- player.graphic.nominalBounds.width * player.graphic.scale/2) / Math.PI * 180;

            //rotate aimIndicator accordingly 
            aimIndicator.setTransform(aimIndicator.x,aimIndicator.y,1,1,player.aimAngle);
        }
    }
    handleKeyBoardEvent(){
        //handle keyboard event
        window.onkeyup = this.keyUpHandler;
        window.onkeydown = this.keyDownHandler;
    }
    keyDownHandler(e){ //when key is pressed
        switch(e.keyCode){
            case KEYCODE_A:
                keyboardMoveLeft = true;
                break;
            case KEYCODE_D:
                keyboardMoveRight = true;
                break;
            case KEYCODE_W:
                keyboardMoveUp = true;
                break;
            case KEYCODE_S:
                keyboardMoveDown = true;
                break;   
            case KEYCODE_1:
                keyboard1 = true;
                break; 
            case KEYCODE_2:
                keyboard2 = true;
                break; 
            case KEYCODE_3:
                keyboard3 = true;
                break; 
            case KEYCODE_H:
                keyboardH = true;
                break; 
        }
    }
    keyUpHandler(e){ // when key is released
        switch(e.keyCode){
            case KEYCODE_A:
                keyboardMoveLeft = false;
                break;
            case KEYCODE_D:
                keyboardMoveRight = false;
                break;
            case KEYCODE_W:
                keyboardMoveUp = false;
                break;
            case KEYCODE_S:
                keyboardMoveDown = false;
                break;
            case KEYCODE_1:
                keyboard1 = false;
                break; 
            case KEYCODE_2:
                keyboard2 = false;
                break; 
            case KEYCODE_3:
                keyboard3 = false;
                break; 
            case KEYCODE_H:
                keyboardH = false;
                break; 
        }
    }
}
//preload assets and render loading bar 
class Preloader{
    constructor(){
        this.fileArray = [];
        this.queue = new createjs.LoadQueue();
        this.loadingBar = null;
        this.loadInterval = null;
    }
    //install sound plugin
    installSoundPlugin(){
        this.queue.installPlugin(createjs.Sound);
    }
    //add file to array 
    addFile(id, src){
        this.fileArray.push({id: id, src: src});
    }
    //add file to array 
    addFiles(array){
        for (var i = 0; i<array.length; ++i){
            this.fileArray.push(array[i]);
        }
    }
    //use a file array; each item in array should have id and src property
    loadFiles(){
        this.queue.loadManifest(this.fileArray);
    }
    //get loading progress - precentage between 0 and 1
    getLoadingProgress(){
        return this.queue.progress;
    }
    //create loading bar at pos x and y and return the instance
    createLoadingBar(width, height, posX, posY, color= "#fff"){
        this.loadingBar = drawBorderedRect(color, width, height, posX, posY);
        stage.addChild(this.loadingBar);
    }
    //update loading bar with real loading progress - pass in bar instance
    updateLoadingBar(loadingBar, fillColor="#ccc", strokeColor="#fff"){
        loadingBar.graphics.beginFill(fillColor);
        
        loadingBar.graphics.drawRect(0, 0, loadingBar.getBounds().width *                     this.getLoadingProgress(), loadingBar.getBounds().height);
        
        loadingBar.graphics.endFill();
        
        loadingBar.graphics.setStrokeStyle(2);
        loadingBar.graphics.beginStroke(strokeColor);
        
        loadingBar.graphics.drawRect(0, 0, loadingBar.getBounds().width, loadingBar.getBounds().height);
        
        loadingBar.graphics.endStroke();
    }
}

//general random enemy spawner class
class EnemySpawner{
    constructor(total, levelData){
        this.total = total;
        this.levelData = levelData;
    }
    spawnMinions(random=false,ranged=false){
        var nextX = 0, nextY = 50, maxGap = 100;
        
        for (var i=0; i< this.total; ++i){
            var gap = Math.random()* maxGap;

            //var enemy = new Enemy(drawImage('images/enemy.png', .5, nextX, nextY), enemySpd);
//            var enemy = new Enemy(drawPreloadedImage(preloader.queue.getResult("Minion"), .2, nextX, nextY), enemySpd, meleeDmg);
            if(random){
                var enemy = this.randomizeMinions(nextX, nextY);
            } else if (!ranged){
                var enemy = new MeleeEnemy(new lib.Melee(), this.levelData.enemySpd, this.levelData.meleeDmg, this.levelData.meleeAtkInterval, this.levelData.meleeHealthDropRate, this.levelData.meleeSmallAmmoDropRate, this.levelData.meleeLargeAmmoDropRate);
                enemy.graphic.scale = .3;
                
                enemy.x = nextX - enemy.graphic.nominalBounds.width/2*enemy.graphic.scale;
                enemy.y = nextY - enemy.graphic.nominalBounds.height/2*enemy.graphic.scale;
            } else if (ranged){
                var enemy = new RangedEnemy(new lib.Ranged(), this.levelData.enemySpd, this.levelData.rangedDmg, this.levelData.rangedAtkSpd, 0, this.levelData.shootAtkInterval, 0, 500, this.levelData.rangedHealthDropRate, this.levelData.rangedSmallAmmoDropRate, this.levelData.rangedLargeAmmoDropRate);
                enemy.graphic.scale = .3;
                
                enemy.x = nextX - enemy.graphic.nominalBounds.width/2*enemy.graphic.scale;
                enemy.y = nextY - enemy.graphic.nominalBounds.height/2*enemy.graphic.scale;
            }
            
            enemies.push(enemy);

            nextX = gap + Math.random() * (stage.canvas.width - enemy.graphic.nominalBounds.width * enemy.graphic.scale);
            nextY = gap + Math.random() * (stage.canvas.height - enemy.graphic.nominalBounds.height * enemy.graphic.scale); 
            
            sceneManager.currentScene.enemyLayer.addChild(enemy);
        }
    }
    spawnAtSpecifiedPosition(posX, posY, maxGap, random=false){
        var nextX = posX, nextY=posY;
        var maxGap = maxGap;
        for (var i=0; i< this.total; ++i){
            
            var gap = -maxGap + Math.random()* maxGap;
            
            if (random){
                var enemy = this.randomizeMinions(nextX, nextY);
            }else{
                var enemy = new MeleeEnemy(new lib.Melee(), this.levelData.enemySpd, this.levelData.meleeDmg, this.levelData.meleeAtkInterval, this.levelData.meleeHealthDropRate, this.levelData.meleeSmallAmmoDropRate, this.levelData.meleeLargeAmmoDropRate);
                enemy.graphic.scale = .3;
                
                enemy.x = nextX - enemy.graphic.nominalBounds.width/2*enemy.graphic.scale;
                enemy.y = nextY - enemy.graphic.nominalBounds.height/2*enemy.graphic.scale;
            }
            
            enemies.push(enemy);
            
            sceneManager.currentScene.enemyLayer.addChild(enemy);

            nextY += gap;
        }
    }
    randomizeMinions(posX, posY){
        var n = 1+ Math.random()*10;
        var enemy;
        if (n<8){
            enemy = new MeleeEnemy(new lib.Melee(), this.levelData.enemySpd, this.levelData.meleeDmg, this.levelData.meleeAtkInterval, this.levelData.meleeHealthDropRate, this.levelData.meleeSmallAmmoDropRate, this.levelData.meleeLargeAmmoDropRate);
            
            enemy.graphic.scale = .3;
            enemy.x = posX - enemy.graphic.nominalBounds.width/2*enemy.graphic.scale;
            enemy.y = posY - enemy.graphic.nominalBounds.height/2*enemy.graphic.scale;
        } else {
            enemy = new RangedEnemy(new lib.Ranged(), this.levelData.enemySpd, this.levelData.rangedDmg, this.levelData.rangedAtkSpd, 0, this.levelData.shootAtkInterval, 0, 500, this.levelData.rangedHealthDropRate, this.levelData.rangedSmallAmmoDropRate, this.levelData.rangedLargeAmmoDropRate);
            enemy.graphic.scale = .3;
            enemy.x = posX - enemy.graphic.nominalBounds.width/2*enemy.graphic.scale;
            enemy.y = posY - enemy.graphic.nominalBounds.height/2*enemy.graphic.scale;
        }
        return enemy;
    }
}
//health bar class -create, display and update bar according to current health value 
class HealthBar extends createjs.Container{
    constructor(maxValue, currentValue, width, height, posX, posY, text, borderColor= "#000", fillColor = "red"){  
        super();
        
        this.maxValue = maxValue; 
        this.currentValue = currentValue;
        
        this.width = width;
        this.height = height; 
        this.x = posX; 
        this.y = posY; 
        this.strokeColor = borderColor;
        this.fillColor = fillColor;
        
        this.border = null;
        this.fillArea = null;
        
         //will be replaced with player avatar later 
        //this.text = drawText(text, "20px Arial Bold", "#000", -this.width/2-40, 0);
        if (text != null){
            this.ava = new lib.PlayerAva();
            this.ava.scale = .3;
            this.ava.x = -this.width/2-70;
            this.ava.y = -10;
             this.addChild(this.ava, this.fillArea, this.border);
        }
        else {
            this.addChild(this.fillArea, this.border); //group border and fill 
        }
        
        //stage.addChild(this);
        
        createjs.Ticker.on('tick',this.update.bind(this));
    }
    update(){
        this.updateBar();
    }
    updateBar(){
        //create the fill representing current value 
        if (this.fillArea != undefined){
            this.removeChild(this.fillArea); //reset after each update
        }
        if (this.border != undefined){
            this.removeChild(this.border); //reset after each update
        }
        
        //draw the fill
            this.fillArea=drawBorderedRect(null, this.width, this.height, 0, 0); //rect with no border

            this.fillArea.graphics.beginFill(this.fillColor);

            // width <-> maxValue ; fillWidth <-> currentValue --> fillWidth = width*currentValue/maxValue
            this.fillArea.graphics.drawRect(0, 0, this.width * this.currentValue / this.maxValue, this.height); 

            this.fillArea.graphics.endFill();
        
        //draw the border - make healthbar border drawn on top
            this.border = drawBorderedRect(this.strokeColor, this.width, this.height, 0, 0);
        
        this.addChild(this.fillArea, this.border); //group border and fill 
    }
}


//timer class
class Timer extends createjs.Container{
    constructor(maxTime, posX, posY, boxWidth, boxHeight, boxColor, textColor){ //set direcly on constructor
        
        super();
        
        this.seconds = maxTime;
        this.maxTime = maxTime; //max time allowed before spawning boss 
        this.count = 0;
        
        this.x = posX;
        this.y = posY;
        
        this.text = null;
        this.textColor = textColor;
        
        //maybe replaced with timer graphic later 
        this.boxWidth = boxWidth;
        this.boxHeight = boxHeight;
        this.boxColor = boxColor;
        
        //this.containerBox = drawRect(this.boxColor, this.boxWidth, this.boxHeight, 0, 0);
        this.containerBox = new lib.TimerHUD();
        //this.containerBox.scale = 1;
        this.containerBox.x = -this.containerBox.nominalBounds.width/2 * this.containerBox.scale+20;
        this.containerBox.y = -this.containerBox.nominalBounds.height/2 * this.containerBox.scale-10;
//        this.containerBox.graphics.setStrokeStyle(2).beginStroke("#000").drawRect(0,0,this.boxWidth,this.boxHeight);
        
        this.addChild(this.containerBox);
        this.updateTime();
        
        //stage.addChild(this);
        
        createjs.Ticker.on('tick',this.update.bind(this));
    }
        
    update(){
        this.count++;  //count frame
        if (this.count == 60) { //game running on 60 FPS
            this.count = 0;
            this.seconds--;
        }
        if (this.seconds >= 0){
            this.updateTime();
            if (this.seconds == 0){ 
                hudContainer.removeChild(this);
            }
        }
    }
        
    //set Timer based on the current time - graphics.js -drawText - format the text: 'MM:SS'
    updateTime(){
        if(this.text != undefined)
            this.removeChild(this.text); //reset after each update
       
//        var sec = this.seconds % 60;
//        var min = Math.floor(this.seconds/60);
//
//        if(sec < 10){
//            sec = "0" + sec; //Add a 0 before any 1-digit number
//        }
//        if(min < 10){
//            min = "0" + min; //Add a 0 before any 1-digit number
//        }
        var sec = this.seconds.toString();
         if(sec < 10){
            sec = "0" + sec; //Add a 0 before any 1-digit number
        }
//        this.text = drawText(min + ":" + sec, "20px Arial Bold", this.textColor, 0,0); //offset pos from containerBox  
        this.text = new createjs.BitmapText(sec, textSpriteSheet);
        this.text.scale = .5;
        this.text.shadow = drawShadow("#cc3333",2,2,10); 
        this.text.textAlign = "center";
        this.text.textBaseline = "middle";
        
        this.addChild(this.text);
    }
}
//Display damage text 
class DamageText{
    constructor(parent, damage, color, posX, posY){
        this.color = color;
        this.posX = posX;
        this.posY = posY;
        this.parent = parent; 
        
//        this.text = drawText(-damage, "20px Arial Bold", this.color, this.posX,this.posY);
        this.text = new createjs.BitmapText(damage.toString(), textSpriteSheet);
        this.text.shadow = drawShadow("#cc3333",2,2,10); 
        this.text.textAlign = "center";
        this.text.textBaseline = "middle";
        this.text.x = this.posX;
        this.text.y = this.posY;
        
        this.parent.addChild(this.text);
        
        createjs.Tween.get(this.text).to({y:100, alpha:0},500).call(this.selfDestroy);
    }
    selfDestroy(){
        this.parent.removeChild(this.text);
    }
}

//HUD for weapon ammo display 
class AmmoDisplay extends createjs.Container{
    constructor(graphic, posX, posY){
        super();
        
        this.graphic = graphic;
        
        this.ammoText = 0;
        this.graphic.scale = .5;
        this.x = posX- this.graphic.nominalBounds.width/2*this.graphic.scale;
        this.y = posY- this.graphic.nominalBounds.height/2*this.graphic.scale;;

        this.ammoTxtBox = new createjs.BitmapText("x "+this.ammoText, textSpriteSheet);
        this.ammoTxtBox.textAlign = "left";
        this.ammoTxtBox.scale = .3;
        this.ammoTxtBox.x = this.graphic.nominalBounds.width*this.graphic.scale+10;
        this.ammoTxtBox.shadow = drawShadow("#ffffcc",2,2,10);
        this.addChild(this.graphic, this.ammoTxtBox);
    }
    updateAmmoText(text){
        this.removeChild(this.ammoTxtBox);
        
        this.ammoText = text;
        this.ammoTxtBox = new createjs.BitmapText("x "+this.ammoText, textSpriteSheet);
        this.ammoTxtBox.textAlign = "left";
        this.ammoTxtBox.scale = .3;
        this.ammoTxtBox.x = this.graphic.nominalBounds.width*this.graphic.scale+10;
        this.ammoTxtBox.shadow = drawShadow("#ffffcc",2,2,10);
        this.addChild(this.ammoTxtBox);
    }
}

//skill display class -create, display and update bar according to current skill cooldown value 
class SkillDisplay extends createjs.Container{
    constructor(image, maxValue, currentValue, width, height, posX, posY, fillColor = "#fff", borderColor= "#fff"){  
        super();
        
        this.maxValue = maxValue; 
        this.currentValue = currentValue;
        
        this.width = width;
        this.height = height; 
        this.x = posX; 
        this.y = posY; 
        
        this.fillColor = fillColor;
        this.strokeColor = borderColor;
        
        this.border = null;
        this.fillArea = null;
        
//        image.x = -image.nominalBounds.width/2 * image.scale;
//        image.y = -image.nominalBounds.height/2 * image.scale;
        this.addChild(image, this.fillArea, this.border); //group border and fill 
        
        stage.addChild(this);
        
        createjs.Ticker.on('tick',this.update.bind(this));
    }
    update(){
        this.updateBar();
    }
    updateBar(){
        //create the fill representing current value 
        if (this.fillArea != undefined){
            this.removeChild(this.fillArea); //reset after each update
        }
        if (this.border != undefined){
            this.removeChild(this.border); //reset after each update
        }
        
        //draw the fill
            this.fillArea=drawBorderedRect(null, this.width, this.height, 0, 0); //rect with no border

            this.fillArea.graphics.beginFill(this.fillColor);

            // width <-> maxValue ; fillWidth <-> currentValue --> fillWidth = width*currentValue/maxValue
            this.fillArea.graphics.drawRect(0, 0, this.width, this.currentValue * this.height / this.maxValue); 
        
            this.fillArea.alpha = 0.3;

            this.fillArea.graphics.endFill();
        
         this.border = drawBorderedRect(this.strokeColor, this.width, this.height, 0, 0);
        
        this.addChild(this.fillArea, this.border); //group border and fill 
    }
}

class UIButton extends createjs.Container{
    constructor(text, posX, posY){
        super();
               
        this.graphic = new lib.UIBtn_1();
        this.graphic.scale = .5;
        
        this.text = new createjs.BitmapText(text, textSpriteSheet);
        this.text.scale = .3;
        this.text.x = 20;
        this.text.y = 40;
        this.text.shadow = drawShadow("#ffffcc", 0, 0, 10);
        
        this.hit = drawRect("#fff", this.graphic.nominalBounds.width * this.graphic.scale, this.graphic.nominalBounds.height * this.graphic.scale, this.graphic.nominalBounds.width/2 * this.graphic.scale, this.graphic.nominalBounds.height/2 * this.graphic.scale);
        
        this.addChild(this.graphic, this.text);
        
        this.x = posX;
        this.y = posY;
        
        this.hitArea = this.hit;
    }
}

class ControlButton extends createjs.Container{
    constructor(text, posX, posY){
        super();
        
        this.text = new createjs.BitmapText(text, textSpriteSheet);
        this.text.scale = .3;
        this.text.x -= 10;
        this.text.y -= 10;
        
        this.bg = drawRect("#fff", 50, 50, 0, 0);
        this.bg.shadow = drawShadow("#000",0,0,10);
        
        this.x = posX;
        this.y = posY;
       
        this.addChild(this.bg,this.text);
    }
}
