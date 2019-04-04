//CONSTANTS
const KEYCODE_W = 87;
const KEYCODE_A = 65;
const KEYCODE_S = 83;
const KEYCODE_D = 68;
const PLAYER_MAXSPEED = 7;
const BULLET_SPEED = 10;
const PLAYER_HEALTH = 10;

// --WEAPON STATS--//
const KEYCODE_1 = 49;
const KEYCODE_2 = 50;
const KEYCODE_3 = 51;

const NORMAL_ATKSPD = 1;
const NORMAL_MIN = 1;
const NORMAL_MAX = 3; 

const SMALL_ATKSPD = 2;
const SMALL_MIN = 1;
const SMALL_MAX = 1;

const LARGE_ATKSPD = .5;
const LARGE_MIN = 2;
const LARGE_MAX = 4;

//IN-GAME HELP MENU//
const KEYCODE_H = 72;

/* Game states and state events */
var GameStates = { 
    RUN_SCENE:0,
    MAIN_MENU:10,
    LEVEL_1:20,
    LEVEL_2:30,
    LEVEL_3:40,
    GAME_COMPLETE:50,
    GAME_LOSE:60,
    LEVEL_1_TRANSITION: 15,
    LEVEL_2_TRANSITION: 25,
    LEVEL_3_TRANSITION: 35,
    GUIDE: 11
};
var GameStateEvents = { 
    MAIN_MENU:'main menu event',
    GAME_COMPLETE:'game complete event',
    GAME_LOSE:'game lose event',
    MAIN_MENU_SELECT:'game menu select event',
    LEVEL_1:'game level 1 event',
    LEVEL_2:'game level 2 event',
    LEVEL_3:'game level 3 event',
    LEVEL_1_TRANSITION: 'level 1 transition event',
    LEVEL_2_TRANSITION: 'level 2 transition event',
    LEVEL_3_TRANSITION: 'level 3 transition event',
    GUIDE: 'guide event'
};

/* Settings - global variables */
var canvas = document.getElementById('game-canvas');
var context = canvas.getContext('2d');
var stage = new createjs.Stage(canvas);
var version = '1.0.0';
var joystick;

var preloader = new Preloader();
var fakeProgress = 0;
var loadInterval; 

var comp=AdobeAn.getComposition("1977E17A7A7E4A0591398ED1B9A11F5A");
var lib=comp.getLibrary();

var textSpriteSheet, subSpriteSheet;

var sceneManager = new SceneManager();

var nextLevel = false;
var gameOver = false;

var levelData1 = new LevelData();
    levelData1.setData(1);
var levelData2 = new LevelData();
    levelData2.setData(2);
var levelData3 = new LevelData();
    levelData3.setData(3);

var levelLoad = 1;

/* Player specific */
var keyboardMoveLeft = false, keyboardMoveRight = false, keyboardMoveUp = false, keyboardMoveDown = false;
var keyboard1 = false, keyboard2 = false, keyboard3 = false;
var keyboardH = false;

var player;
var aimIndicator;

var playerAtkSpd = 1; //can be changed with pickups
var playerAimAngle = 0;  //changing depending on mouse position 
var playerShootInterval = 1; 
var playerSpecialAtkInterval = 3;  
var playerMinDmg = 1;
var playerMaxDmg =3;

var playerSpd = 3;

var score = 0;

/* Common data */
var enemies = [];

var bullets = [];

var pickups = [];

//HUD
var hudContainer;
var healthBarObj;
var timerObj;
var smallAmmoDisplay;
var largeAmmoDisplay;
var skillDisplayLeft;
var skillDisplayRight;

//calling init() function on page load
init();

function init(){
    //set up auto-update on stage
    createjs.Ticker.framerate = 60;
    createjs.Ticker.on('tick',stage);
    
    retinalize();
    
    intialLog();
    
    optimizeForTouchAndScreens();
    
    try{
        loadGraphics();
    }
    catch(e){
        location.reload();
    }
}
//for retina display 
function retinalize(){
    stage.width = canvas.width;
    stage.height = canvas.height;

    let ratio = Window.devicePixelRatio;
    if (ratio === undefined){
    return;
    }

    canvas.setAttribute('width', Math.round(stage.width * ratio));
    canvas.setAttribute('height', Math.round(stage.height * ratio));

    stage.scaleX = stage.scaleY = ratio;

    //set CSS style
    canvas.style.width = stage.width + "px";
    canvas.style.height = stage.height + "px";
}
function intialLog(){
    console.log(`Welcome to the game. Version ${version}`);
}
function optimizeForTouchAndScreens() {
    if (typeof window.orientation !== 'undefined') {
        window.onorientationchange = onOrientationChange;
        if (createjs.Touch.isSupported()) {
            createjs.Touch.enable(stage);
            joystick	= new VirtualJoystick({
				container	: document.getElementById("game-canvas"),
				mouseSupport	: true,
			});
        }
        onOrientationChange();
        }
    else {
        window.onresize = resizeGame;
        resizeGame();
    }
}
function onOrientationChange() {
    setTimeout(resizeGame, 100);
}
function resizeGame() {
    var nTop, nLeft, scale;
    var gameWrapper = document.getElementById('gameWrapper');
    var w = window.innerWidth;
    var h = window.innerHeight;
    var nWidth = window.innerWidth;
    var nHeight = window.innerHeight;
    var widthToHeight = canvas.width / canvas.height;
    var nWidthToHeight = nWidth / nHeight;
    if (nWidthToHeight > widthToHeight) {
        nWidth = nHeight * widthToHeight;
        scale = nWidth / canvas.width;
        nLeft = (w / 2) - (nWidth / 2);
        gameWrapper.style.left = (nLeft) + "px";
        gameWrapper.style.top = "0px";
    }
    else {
        nHeight = nWidth / widthToHeight;
        scale = nHeight / canvas.height;
        nTop= (h / 2) - (nHeight / 2);
        gameWrapper.style.top = (nTop) + "px";
        gameWrapper.style.left = "0px";
    }
    canvas.setAttribute("style", "-webkit-transform:scale(" + scale +
    ")");
    window.scrollTo(0, 0);
}
function loadGraphics(){
    preloader.addFile("loadingScreen", "images/loadingScreenBG.jpg");
    preloader.loadFiles();
    
    preloader.queue.addEventListener("complete", handleComplete, this);

    function handleComplete() {
        preloader.queue.removeAllEventListeners();
        this.preloadAssets();
    }
}
function preloadAssets(){
    /*LOADING SCREEN*/

        sceneManager.createLoadingScene();
    
        //preloader jobs
        preloader.createLoadingBar(canvas.width,20,canvas.width/2,canvas.height-10);
        preloader.installSoundPlugin();
        createjs.Sound.initializeDefaultPlugins();
        createjs.Sound.alternateExtensions = ["ogg", "aiff"];
        
        preloader.addFile("AimIndicator", "images/aimIndicator.png");
        preloader.addFile("Guide", "images/GuideScreen.png");
    
        preloader.addFile("font", "font/TheDarkRootFont.png");
        preloader.addFile("subSpriteSheet", "images/ssSpace.png");
    
        preloader.addFile("Normal Shoot", "sound/shoot1.wav");
        preloader.addFile("Special Shoot", "sound/shoot2.wav");
        
        preloader.addFile("Pickup", "sound/pickup.wav");
        preloader.addFile("Hurt", "sound/hit.wav");
    
        preloader.addFile("Minion Die", "sound/minionDie.wav");
        preloader.addFile("Boss Die", "sound/bossDie.wav");
        preloader.addFile("Boss Hurt", "sound/bossHurt.wav");
        preloader.addFile("Boss Appear", "sound/bossAppear.wav");   
    
        preloader.addFile("Background1","sound/[Slow]TemptingFate.mp3");
        preloader.addFile("Background2","sound/[Fast]EpicSeries.mp3");
        preloader.addFile("Background3","sound/[Fast]Pentagram.mp3");
        preloader.addFile("MenuMusic", "sound/[Med]Marauder.mp3");
        preloader.addFile("GameOverMusic", "sound/[Slow]TheMaster.mp3");
        preloader.addFile("GameWinMusic", "sound/[Med]Triangle.mp3");
    
        preloader.addFiles(lib.properties.manifest);

        //loadInterval = setInterval(updateLoadingBar, 50);
        preloader.queue.on("progress", function(){
            preloader.updateLoadingBar(preloader.loadingBar, "#ffffcc", "fff");
        })
    
        preloader.queue.on("complete", function(){
            preloader.queue.removeAllEventListeners("complete");
            setTimeout(handleComplete,15000);
        });
    
        preloader.loadFiles();
}
handleComplete = function(){
    try{
        //main spritesheet
        var ss=comp.getSpriteSheet();
        var ssMetadata = lib.ssMetadata;
        for(var i=0; i<ssMetadata.length; i++) {
            ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [preloader.queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
        }    
        
        //additional spritesheet for explosion animation
        createSubSpriteSheet();
    }
    catch(e){
        location.reload();
    }
    finally{
        stage.removeAllChildren();
        window.addEventListener("click", resumeAudioContext);
        sceneManager.gameReady();
    }
}
function createSubSpriteSheet(){
    var ss2Data = {
        "framerate":24,
        "images":[preloader.queue.getResult("subSpriteSheet")],
        "frames":[
            [482, 401, 71, 51, 0, 0, 0],
            [71, 401, 71, 51, 0, 0, 0],
            [142, 401, 71, 51, 0, 0, 0],
            [1262, 401, 71, 51, 0, 0, 0],
            [1659, 401, 71, 51, 0, 0, 0],
            [1781, 401, 71, 51, 0, 0, 0],
            [1588, 401, 71, 51, 0, 0, 0],
            [0, 452, 71, 51, 0, 0, 0],
            [1852, 401, 71, 51, 0, 0, 0],
            [142, 452, 71, 51, 0, 0, 0],
            [1923, 401, 71, 51, 0, 0, 0],
            [71, 452, 71, 51, 0, 0, 0],
            [213, 401, 71, 51, 0, 0, 0],
            [1877, 302, 71, 51, 0, 0, 0],
            [1948, 302, 71, 51, 0, 0, 0],
            [1735, 302, 71, 51, 0, 0, 0],
            [1806, 302, 71, 51, 0, 0, 0],
            [355, 401, 71, 51, 0, 0, 0],
            [284, 401, 71, 51, 0, 0, 0],
            [0, 401, 71, 51, 0, 0, 0],
            [566, 452, 75, 40, 0, -1, 0],
            [491, 452, 75, 40, 0, -1, 0],
            [941, 452, 75, 40, 0, -1, 0],
            [641, 452, 75, 40, 0, -1, 0],
            [716, 452, 75, 40, 0, -1, 0],
            [791, 452, 75, 40, 0, -1, 0],
            [866, 452, 75, 40, 0, -1, 0],
            [81, 503, 71, 26, 0, 0, 0],
            [1626, 452, 71, 26, 0, 0, 0],
            [1697, 452, 71, 26, 0, 0, 0],
            [1768, 452, 71, 26, 0, 0, 0],
            [1839, 452, 71, 26, 0, 0, 0],
            [1910, 452, 71, 26, 0, 0, 0],
            [0, 503, 71, 26, 0, 0, 0],
            [1730, 401, 51, 51, 0, 0, 0],
            [239, 452, 62, 45, 0, 0, 0],
            [405, 452, 60, 44, 0, 0, 0],
            [301, 452, 55, 44, 0, 0, 0],
            [1268, 452, 51, 33, 0, 0, 0],
            [1846, 0, 101, 99, 0, -3, -3],
            [1947, 0, 101, 99, 0, -3, -3],
            [0, 104, 101, 99, 0, -3, -3],
            [101, 104, 101, 99, 0, -3, -3],
            [202, 104, 101, 99, 0, -3, -3],
            [303, 104, 101, 99, 0, -3, -3],
            [404, 104, 101, 99, 0, -3, -3],
            [505, 104, 101, 99, 0, -3, -3],
            [606, 104, 101, 99, 0, -3, -3],
            [707, 104, 101, 99, 0, -3, -3],
            [808, 104, 101, 99, 0, -3, -3],
            [519, 0, 103, 101, 0, -2, -2],
            [622, 0, 103, 101, 0, -2, -2],
            [210, 0, 103, 101, 0, -2, -2],
            [313, 0, 103, 101, 0, -2, -2],
            [416, 0, 103, 101, 0, -2, -2],
            [1137, 0, 103, 101, 0, -2, -2],
            [1034, 0, 103, 101, 0, -2, -2],
            [1212, 104, 101, 99, 0, -3, -3],
            [1313, 104, 101, 99, 0, -3, -3],
            [1414, 104, 101, 99, 0, -3, -3],
            [1515, 104, 101, 99, 0, -3, -3],
            [1616, 104, 101, 99, 0, -3, -3],
            [1717, 104, 101, 99, 0, -3, -3],
            [1818, 104, 101, 99, 0, -3, -3],
            [1919, 104, 101, 99, 0, -3, -3],
            [0, 203, 101, 99, 0, -3, -3],
            [101, 203, 101, 99, 0, -3, -3],
            [909, 104, 101, 99, 0, -3, -3],
            [303, 203, 101, 99, 0, -3, -3],
            [404, 203, 101, 99, 0, -3, -3],
            [505, 203, 101, 99, 0, -3, -3],
            [606, 203, 101, 99, 0, -3, -3],
            [808, 203, 101, 99, 0, -3, -3],
            [1010, 104, 101, 99, 0, -3, -3],
            [1111, 104, 101, 99, 0, -3, -3],
            [1010, 203, 101, 99, 0, -3, -3],
            [1111, 203, 101, 99, 0, -3, -3],
            [1212, 203, 101, 99, 0, -3, -3],
            [1313, 203, 101, 99, 0, -3, -3],
            [725, 0, 103, 101, 0, -2, -2],
            [1240, 0, 103, 101, 0, -2, -2],
            [931, 0, 103, 101, 0, -2, -2],
            [1343, 0, 103, 101, 0, -2, -2],
            [1446, 0, 103, 101, 0, -2, -2],
            [1549, 0, 103, 101, 0, -2, -2],
            [828, 0, 103, 101, 0, -2, -2],
            [1818, 203, 101, 99, 0, -3, -3],
            [1919, 203, 101, 99, 0, -3, -3],
            [1414, 203, 101, 99, 0, -3, -3],
            [1745, 0, 101, 99, 0, -3, -3],
            [1515, 203, 101, 99, 0, -3, -3],
            [707, 203, 101, 99, 0, -3, -3],
            [1717, 203, 101, 99, 0, -3, -3],
            [1616, 203, 101, 99, 0, -3, -3],
            [0, 302, 101, 99, 0, -3, -3],
            [909, 203, 101, 99, 0, -3, -3],
            [202, 203, 101, 99, 0, -3, -3],
            [675, 401, 51, 51, 0, 0, 0],
            [2047, 302, 1, 1, 0, 0, 0],
            [298, 503, 5, 25, 0, -25, 0],
            [71, 503, 10, 26, 0, -25, 0],
            [2029, 452, 16, 26, 0, -25, 0],
            [1981, 452, 22, 26, 0, -25, 0],
            [2003, 452, 26, 26, 0, -25, 0],
            [152, 503, 26, 26, 0, -25, 0],
            [178, 503, 26, 26, 0, -25, 0],
            [204, 503, 26, 26, 0, -25, 0],
            [230, 503, 26, 26, 0, -25, 0],
            [1059, 452, 26, 35, 0, -25, 0],
            [465, 452, 26, 41, 0, -25, 0],
            [213, 452, 26, 47, 0, -25, 0],
            [879, 401, 26, 51, 0, -25, 0],
            [2020, 104, 26, 51, 0, -25, 0],
            [2020, 203, 26, 51, 0, -25, 0],
            [2019, 302, 26, 51, 0, -25, 0],
            [426, 401, 26, 51, 0, -25, 0],
            [452, 401, 30, 51, 0, -21, 0],
            [553, 401, 35, 51, 0, -16, 0],
            [588, 401, 40, 51, 0, -11, 0],
            [628, 401, 47, 51, 0, -4, 0],
            [726, 401, 51, 51, 0, 0, 0],
            [777, 401, 51, 51, 0, 0, 0],
            [828, 401, 51, 51, 0, 0, 0],
            [956, 401, 51, 51, 0, 0, 0],
            [1007, 401, 51, 51, 0, 0, 0],
            [1058, 401, 51, 51, 0, 0, 0],
            [1109, 401, 51, 51, 0, 0, 0],
            [1160, 401, 51, 51, 0, 0, 0],
            [1211, 401, 51, 51, 0, 0, 0],
            [905, 401, 51, 51, 0, 0, 0],
            [1333, 401, 51, 51, 0, 0, 0],
            [1384, 401, 51, 51, 0, 0, 0],
            [1435, 401, 51, 51, 0, 0, 0],
            [1486, 401, 51, 51, 0, 0, 0],
            [1537, 401, 51, 51, 0, 0, 0],
            [2046, 104, 2, 23, 0, 0, 0],
            [2046, 203, 2, 23, 0, 0, -3],
            [1176, 452, 23, 34, 0, 0, -1],
            [1319, 452, 19, 32, 0, 0, -2],
            [1154, 452, 22, 34, 0, 0, -1],
            [1199, 452, 23, 34, 0, 0, -1],
            [1338, 452, 23, 32, 0, 0, -2],
            [1222, 452, 23, 34, 0, 0, -1],
            [1131, 452, 23, 34, 0, 0, -1],
            [1245, 452, 23, 33, 0, 0, -1],
            [1108, 452, 23, 34, 0, 0, -1],
            [1085, 452, 23, 34, 0, 0, -1],
            [344, 503, 40, 24, 0, 0, 0],
            [256, 503, 42, 26, 0, 0, 0],
            [1583, 452, 43, 27, 0, 0, 0],
            [1496, 452, 44, 29, 0, 0, 0],
            [1407, 452, 45, 30, 0, 0, 0],
            [1361, 452, 46, 32, 0, 0, 0],
            [1452, 452, 44, 29, 0, 0, 0],
            [1540, 452, 43, 27, 0, 0, 0],
            [303, 503, 41, 25, 0, 0, 0],
            [411, 503, 17, 16, 0, -48, -44],
            [384, 503, 27, 24, 0, -43, -40],
            [1016, 452, 43, 40, 0, -35, -32],
            [356, 452, 49, 44, 0, -32, -30],
            [1994, 401, 53, 50, 0, -30, -27],
            [1299, 302, 61, 60, 0, -26, -22],
            [583, 302, 73, 70, 0, -20, -17],
            [405, 302, 87, 80, 0, -13, -12],
            [101, 302, 103, 94, 0, -5, -5],
            [97, 0, 113, 102, 0, 0, -1],
            [1652, 0, 93, 100, 0, -10, -2],
            [0, 0, 97, 104, 0, -8, 0],
            [822, 302, 77, 62, 0, -18, -21],
            [741, 302, 81, 66, 0, -16, -19],
            [656, 302, 85, 70, 0, -14, -17],
            [492, 302, 91, 76, 0, -11, -14],
            [308, 302, 97, 82, 0, -8, -11],
            [204, 302, 104, 92, 0, 0, -4],
            [2045, 302, 2, 2, 0, 0, 0],
            [428, 503, 4, 4, 0, 0, 0],
            [899, 302, 400, 60, 0, 0, 0],
            [1360, 302, 375, 53, 0, 0, 0]
        ],
        "animations":{
            "1": {"frames": [138], "speed": 1},
            "2": {"frames": [139], "speed": 1},
            "4": {"frames": [141], "speed": 1},
            "5": {"frames": [142], "speed": 1},
            "6": {"frames": [143], "speed": 1},
            "7": {"frames": [144], "speed": 1},
            "0": {"frames": [137], "speed": 1},
            "8": {"frames": [145], "speed": 1},
            "3": {"frames": [140], "speed": 1},
            "9": {"frames": [146], "speed": 1},
            "asteroid3": {"frames": [37], "speed": 1},
            "enemy2Hit": {
                "frames": [21, 22, 23, 24, 25, 26],
                "next": "enemy2Idle",
                "speed": 1
            },
            "powerup": {
                "frames": [
                    39,
                    40,
                    41,
                    42,
                    43,
                    44,
                    45,
                    46,
                    47,
                    48,
                    49,
                    50,
                    51,
                    52,
                    53,
                    54,
                    55,
                    56,
                    57,
                    58,
                    59,
                    60,
                    61,
                    62,
                    63,
                    64,
                    65,
                    66,
                    67,
                    39
                ],
                "speed": 1
            },
            "asteroid4": {"frames": [38], "speed": 1},
            "shield": {
                "frames": [
                    68,
                    69,
                    70,
                    71,
                    72,
                    73,
                    74,
                    75,
                    76,
                    77,
                    78,
                    79,
                    80,
                    81,
                    82,
                    83,
                    84,
                    85,
                    86,
                    87,
                    88,
                    89,
                    90,
                    91,
                    92,
                    93,
                    94,
                    95,
                    96,
                    68
                ],
                "speed": 1
            },
            "life": {
                "frames": [147, 148, 149, 150, 151, 152, 153, 154, 155, 98],
                "speed": 0.4
            },
            "shieldHUD": {"frames": [97], "speed": 1},
            "heroPrize": {
                "frames": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0],
                "speed": 1
            },
            "progessHUD": {
                "frames": [
                    98,
                    99,
                    99,
                    100,
                    100,
                    101,
                    101,
                    102,
                    102,
                    103,
                    103,
                    104,
                    104,
                    105,
                    105,
                    106,
                    106,
                    107,
                    107,
                    108,
                    108,
                    109,
                    109,
                    110,
                    110,
                    111,
                    111,
                    112,
                    112,
                    113,
                    113,
                    114,
                    114,
                    115,
                    115,
                    116,
                    116,
                    117,
                    117,
                    118,
                    118,
                    119,
                    119,
                    120,
                    120,
                    121,
                    121,
                    122,
                    122,
                    123,
                    123,
                    124,
                    124,
                    125,
                    125,
                    126,
                    126,
                    127,
                    127,
                    128,
                    128,
                    129,
                    129,
                    130,
                    130,
                    131,
                    131,
                    132,
                    132,
                    133
                ],
                "speed": 1
            },
            "powerHUD": {"frames": [134], "speed": 1},
            "enemy1Hit": {
                "frames": [28, 29, 30, 31, 32, 33],
                "next": "enemy1Idle",
                "speed": 1
            },
            "asteroid2": {"frames": [36], "speed": 1},
            "enemy1Idle": {"frames": [27], "speed": 1},
            "healthHUD": {"frames": [34], "speed": 1},
            "star1": {"frames": [98], "speed": 1},
            "explosion": {
                "frames": [
                    156,
                    157,
                    158,
                    159,
                    160,
                    161,
                    162,
                    163,
                    164,
                    165,
                    166,
                    167,
                    168,
                    169,
                    170,
                    171,
                    172,
                    172,
                    173
                ],
                "speed": 1
            },
            "star2": {"frames": [174], "speed": 1},
            "star3": {"frames": [175], "speed": 1},
            "heroIdle": {"frames": [0], "speed": 1},
            "enemy2Idle": {"frames": [20], "speed": 1},
            "gameOver": {"frames": [177], "speed": 1},
            "asteroid1": {"frames": [35], "speed": 1},
            "bullet": {"frames": [135, 136], "speed": 1},
            "heroHit": {
                "frames": [0, 14, 15, 16, 17, 18, 19],
                "next": "heroIdle",
                "speed": 0.4
            },
            "title": {"frames": [176], "speed": 1}
        }
    }
    subSpriteSheet = new createjs.SpriteSheet(ss2Data);
}

/* HANDLE AUDIO CONTEXT FOR AUTOPLAY POLICY ON CHROME AND SAFARI*/
function resumeAudioContext(){
    // handler for fixing suspended audio context in Chrome
    try {
        if (createjs.WebAudioPlugin.context && createjs.WebAudioPlugin.context.state === "suspended") {
            createjs.WebAudioPlugin.context.resume();
            // Should only need to fire once
            window.removeEventListener("click", resumeAudioContext);
        }
    } 
    catch (e) {
        // SoundJS context or web audio plugin may not exist
        console.error("There was an error while trying to resume the SoundJS Web Audio context...");
        console.error(e);
    }
}
/*LOADING BAR*/
//function updateLoadingBar(){
//    fakeProgress += .005;
//    
//    preloader.loadingBar.graphics.beginFill("#ffffcc");
//        
//    preloader.loadingBar.graphics.drawRect(0, 0, preloader.loadingBar.getBounds().width *               fakeProgress, preloader.loadingBar.getBounds().height);
//
//    preloader.loadingBar.graphics.endFill();
//
//    preloader.loadingBar.graphics.setStrokeStyle(2);
//    preloader.loadingBar.graphics.beginStroke("#fff");
//
//    preloader.loadingBar.graphics.drawRect(0, 0, preloader.loadingBar.getBounds().width,                   preloader.loadingBar.getBounds().height);
//
//    preloader.loadingBar.graphics.endStroke();
//    
//    if (fakeProgress >= 1){
//        try{
//            var ss=comp.getSpriteSheet();
//            var ssMetadata = lib.ssMetadata;
//            for(var i=0; i<ssMetadata.length; i++) {
//                ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [preloader.queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
//            }    
//        }
//        catch(e){
//            location.reload();
//        }
//        finally{
//            clearInterval(loadInterval);
//            stage.removeAllChildren();
//            sceneManager.gameReady();
//        }
//    }
//}