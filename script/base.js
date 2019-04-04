/* LEVEL DATA */
class LevelData{
    constructor(){
        this.enemySpd = 0; //changing depending on the level - will be used with chasing behavior codes
        this.enemyTotal = 0; //changing depending on the level
        this.waveSpawnInterval = 0; //changing depending on the level
        this.enemySpawner = null;

        this.bossSpd = 0;
        this.bossDmg = 0;
        this.bossHealth = 0;
        this.bossAtkInterval = 0;
        this.bossMinionsNumber = 0;
        this.bossWaveSpawnInterval = 0;
        this.bossAtkSpd = 0;
        this.bossMinDistance = 0;

        this.meleeDmg = 0;
        this.meleeAtkInterval = 0;

        this.rangedDmg = 0; 
        this.rangedAtkSpd = 0; 
        this.shootAtkInterval = 0;

        this.meleeHealthDropRate = 0;
        this.meleeSmallAmmoDropRate = 0;
        this.meleeLargeAmmoDropRate = 0;
        
        this.rangedHealthDropRate = 0;
        this.rangedSmallAmmoDropRate = 0;
        this.rangedLargeAmmoDropRate = 0;

        //HUD
        this.timerMaxTimer = 0; 
        
        //bg music
        this.backgroundMusic = null;
        
        //bonus point upon killing minions
        this.bonus = 0;
    }
    setData(level){
        switch(level){
            case 1:
                this.enemySpd = 2; //changing depending on the level - will be used with chasing behavior codes
                this.enemyTotal = 3; //changing depending on the level
                this.waveSpawnInterval = 3; //changing depending on the level
                this.enemySpawner = new EnemySpawner(this.enemyTotal, this);

                this.bossSpd = 1;
                this.bossDmg = 3;
                this.bossHealth = 50;
                this.bossAtkInterval = 1;
                this.bossMinionsNumber = 1;
                this.bossWaveSpawnInterval = 600;

                this.meleeDmg = 1;
                this.meleeAtkInterval = 1;
                
                this.meleeHealthDropRate = 0.2;
                this.meleeSmallAmmoDropRate = 0.1;

                //HUD
                this.timerMaxTimer = 10; 
                
                this.backgroundMusic = "Background1";
                
                this.bonus = 10;
                
                break;
            case 2:
                this.enemySpd = 2; //changing depending on the level - will be used with chasing behavior codes
                this.enemyTotal = 3; //changing depending on the level
                this.waveSpawnInterval = 5; //changing depending on the level
                this.enemySpawner = new EnemySpawner(this.enemyTotal, this);

                this.bossSpd = 1;
                this.bossDmg = 2;
                this.bossHealth = 100;
                this.bossAtkInterval = 5;
                this.bossAtkSpd = 1;
                this.bossMinDistance = 20;

                this.rangedDmg = 2; 
                this.rangedAtkSpd = 1; 
                this.shootAtkInterval = 3;

                this.rangedHealthDropRate = 0.3;
                this.rangedSmallAmmoDropRate = 0.2;
                this.rangedLargeAmmoDropRate = 0.1;

                //HUD
                this.timerMaxTimer = 20; 
                
                this.backgroundMusic = "Background2";
                
                this.bonus = 15;
                
                break;
            case 3:
                this.enemySpd = 2; //changing depending on the level - will be used with chasing behavior codes
                this.enemyTotal = 3; //changing depending on the level
                this.waveSpawnInterval = 3; //changing depending on the level
                this.enemySpawner = new EnemySpawner(this.enemyTotal, this);

                this.bossSpd = 1;
                this.bossDmg = 2;
                this.bossHealth = 100;
                this.bossMinionsNumber = 1; //calling spawn twice making them offset
                this.bossWaveSpawnInterval = 1200;
                this.bossAtkInterval = 10;
                this.bossAtkSpd = 2;
                this.bossMinDistance = 20;

                this.meleeDmg = 1;
                this.meleeAtkInterval = 1;

                this.rangedDmg = 2; 
                this.rangedAtkSpd = 1; 
                this.shootAtkInterval = 5;

                this.meleeHealthDropRate = 0.2;
                this.meleeSmallAmmoDropRate = 0.1;
                this.meleeLargeAmmoDropRate = 0;
                
                this.rangedHealthDropRate = 0.3;
                this.rangedSmallAmmoDropRate = 0;
                this.rangedLargeAmmoDropRate = 0.1;

                //HUD
                this.timerMaxTimer = 30; 
                
                this.backgroundMusic = "Background3";
                
                this.bonus = 20;
                
                break;
        }
    }
}

//General base GameObject class with graphic and bounds
class GameObject extends createjs.Container{ //Container is a display class that can have multiple children
  constructor(graphic){
    super();

    if (graphic !== undefined){
        this.graphic = graphic;
        
        //set positions of graphic (child node) to container (parent node) then reset graphic positions 
        this.x = this.graphic.x;
        this.y = this.graphic.y;
        this.graphic.x = 0;
        this.graphic.y = 0;
        
        //after that, parent graphic to container
        this.addChild(this.graphic);
        
        //stage.addChild(this); -- to add child to scene container instead
//        if (sceneManager.currentScene != undefined){
//            sceneManager.currentScene.addChild(this);
//        }
    }
  }
}
//Moveable GameObject added velocity in x and y
class MoveableGameObject extends GameObject{
  constructor(graphic){
    super(graphic);
      
    this.velocity = {
      x:0,
      y:0
    }

    createjs.Ticker.on('tick', this.update.bind(this));
  }
  update(){
    this.y += this.velocity.y;
    this.x += this.velocity.x;
  }
}
//Player specific class 
class Player extends MoveableGameObject{
    constructor(graphic, speed, atkSpd, aimAngle, shootInterval, specialAtkInterval, health, minDamage, maxDamage){
        super(graphic);
        
        this.graphic.shadow = drawShadow("#ffffcc",2,2,10);
        
        this.weaponManager = new WeaponManager();
        
        this.speed = speed;
        
        //this.atkSpd = atkSpd;
        this.atkSpd = this.weaponManager.normalWeapon.atkSpd;
        
        this.aimAngle = aimAngle;
        this.shootInterval = shootInterval;
        this.specialAtkInterval = specialAtkInterval;
        
        this.health = health;
        this.maxHealth = health;
        
//        this.minDamage = minDamage;
//        this.maxDamage = maxDamage;
        this.minDamage = this.weaponManager.normalWeapon.minDamage;
        this.maxDamage = this.weaponManager.normalWeapon.maxDamage;
        
        this.damage = this.minDamage;
        
        this.type = 'Player';
        
        this.shootBehavior = new ShootBehavior(this.atkSpd, this.aimAngle, this.shootInterval, this.specialAtkInterval);
        
        //createjs.Ticker.on('tick', this.update.bind(this));
        this.currentWeapon = this.weaponManager.normalWeapon;
        this.currentWeapon.graphic.x = this.graphic.nominalBounds.width/4*.3;
        this.currentWeapon.graphic.y = this.graphic.nominalBounds.height*.3 - 50;
        this.addChild(this.currentWeapon.graphic);
    }
    update(){
        this.movementHandler();
        this.updateWeapon();
        //restrict to game space - use function from physics.js
        restrictToGameSpace(this);
        //calling shoot behavior update
        this.shootBehavior.update();
    }
    movementHandler(){
        if (keyboardMoveLeft){
            this.velocity.x = -this.speed;
            this.x += this.velocity.x;
        } 
        if (keyboardMoveRight){
            this.velocity.x = this.speed;
            this.x += this.velocity.x;
        } 
        if (keyboardMoveUp){
            this.velocity.y = -this.speed;
            this.y += this.velocity.y;
        } 
        if (keyboardMoveDown){
            this.velocity.y = this.speed;
            this.y += this.velocity.y;
        }
    }
    reduceHealth(points){
        this.health-=points;
        if (this.health<=0){
            gameOver = true;
            console.log("Game over!");
        }
    }
    increaseHealth(points){
        if (this.health >= this.maxHealth){
            this.health = this.maxHealth;
        } else {
            this.health += points;
        }
    }
    updateWeapon(){
        
        if (keyboard1){
            this.removeChild(this.currentWeapon.graphic);
            
            this.currentWeapon = this.weaponManager.normalWeapon;
            this.currentWeapon.graphic.x = this.graphic.nominalBounds.width/4*this.graphic.scale;
            this.currentWeapon.graphic.y = this.graphic.nominalBounds.height*this.graphic.scale - 50;
            this.addChild(this.currentWeapon.graphic);
            
            this.atkSpd = this.weaponManager.normalWeapon.atkSpd;
            this.minDamage = this.weaponManager.normalWeapon.minDamage;
            this.maxDamage = this.weaponManager.normalWeapon.maxDamage;
        }else if (keyboard2){
            if (this.weaponManager.smallWeapon.ammoNumber > 0){
                this.removeChild(this.currentWeapon.graphic);
                
                this.currentWeapon = this.weaponManager.smallWeapon;
                this.currentWeapon.graphic.x = this.graphic.nominalBounds.width/4*this.graphic.scale;
                this.currentWeapon.graphic.y = this.graphic.nominalBounds.height*this.graphic.scale - 50;
                this.addChild(this.currentWeapon.graphic);
                
                this.atkSpd = this.weaponManager.smallWeapon.atkSpd;
                this.minDamage = this.weaponManager.smallWeapon.minDamage;
                this.maxDamage = this.weaponManager.smallWeapon.maxDamage;
            }
        }else if (keyboard3){
            if (this.weaponManager.largeWeapon.ammoNumber > 0){
                this.removeChild(this.currentWeapon.graphic);
                
                this.currentWeapon = this.weaponManager.largeWeapon;
                this.currentWeapon.graphic.x = this.graphic.nominalBounds.width/4*this.graphic.scale;
                this.currentWeapon.graphic.y = this.graphic.nominalBounds.height*this.graphic.scale - 50;
                this.addChild(this.currentWeapon.graphic);
                
                this.atkSpd = this.weaponManager.largeWeapon.atkSpd;
                this.minDamage = this.weaponManager.largeWeapon.minDamage;
                this.maxDamage = this.weaponManager.largeWeapon.maxDamage;
            }
        }
    }
}
//general Enemy class - base for special types of enemies which implement different behavior classes
class Enemy extends MoveableGameObject{
    constructor(graphic, speed, damage){
        super(graphic);
        
        this.graphic.shadow = drawShadow("#ccc",2,2,10);
        
        this.speed = speed; 
        
        this.damage = damage;
        
        this.type = 'Enemy';
        
        this.chaseBehavior = new ChaseBehavior();
        
        //createjs.Ticker.on('tick', this.update.bind(this));
    }
    update(){
        if (player == undefined){
            return;
        }
        super.update();
        //just for testing purpose - later will be replace with chasing behavior
//            this.velocity.y = this.speed;
//            if ((this.y + this.graphic.image.height * this.graphic.scale >= stage.canvas.height)
//               ||(this.y <= 0)){
//                this.speed = -this.speed;
//                this.velocity.y = this.speed;
//            }
        this.chasePlayer();
    }
    chasePlayer(){
        this.chaseBehavior.moveToPoint(player.x-this.x,player.y-this.y,this.speed);
        this.velocity.x = this.chaseBehavior.velocity.x;
        this.velocity.y = this.chaseBehavior.velocity.y;
    }
}
//sub class - for melee minions
class MeleeEnemy extends Enemy{
    constructor(graphic, speed, damage, atkInterval, healthDropRate, smallAmmoDropRate, largeAmmoDropRate){
        super(graphic,speed,damage);
        
        this.atkInterval = atkInterval;
        this.meleeBehavior = new MeleeBehavior(this.atkInterval);
        
        this.type = "Melee";
        
        this.temp = this.speed;
        
        //this.dropRate = dropRate;
        this.healthDropRate = healthDropRate;
        this.smallAmmoDropRate = smallAmmoDropRate;
        this.largeAmmoDropRate = largeAmmoDropRate;
        
        this.dropBehavior = new DropBehavior(this.healthDropRate, this.smallAmmoDropRate, this.largeAmmoDropRate);
    }
    dropItem(){
        //this.dropBehavior.dropItem("Health",this.x,this.y,this.parent);
        this.dropBehavior.dropRandomItem(this.x, this.y);
    }
    dealMeleeDamage(){
        this.meleeBehavior.dealMeleeDamage(this.damage);
    }
}
//sub class - for ranged minions
class RangedEnemy extends Enemy{
    constructor(graphic, speed, damage, atkSpd, aimAngle, shootInterval, specialAtkInterval, minDistance, healthDropRate, smallAmmoDropRate, largeAmmoDropRate){
        super(graphic,speed,damage);
        
        this.type = "Ranged";
        
        this.atkSpd = atkSpd;
        this.aimAngle = aimAngle;
        this.shootInterval = shootInterval;
        this.specialAtkInterval = specialAtkInterval;
        
        this.shootBehavior = new ShootBehavior(this.atkSpd, this.aimAngle, this.shootInterval, this.specialAtkInterval);
        
        this.minDistance = minDistance;
        
        this.temp = this.speed;
        
        this.healthDropRate = healthDropRate;
        this.smallAmmoDropRate = smallAmmoDropRate;
        this.largeAmmoDropRate = largeAmmoDropRate;
        
        this.dropBehavior = new DropBehavior(this.healthDropRate, this.smallAmmoDropRate, this.largeAmmoDropRate);
        
        //createjs.Ticker.on('tick', this.update.bind(this));
    }
    update(){
        super.update();
        //calling shoot behavior update
        this.shootBehavior.update();
        if (player != undefined){
            this.aimAngle = Math.atan2(player.y-this.y,player.x-this.x) / Math.PI * 180;
        }
    }
    dropItem(){
        //this.dropBehavior.dropItem("Health",this.x,this.y, this.parent);
        this.dropBehavior.dropRandomItem(this.x, this.y);
    }
}
//general Boss class
//--behavior: wander around, if health <= 20%, start chasing player with high speed 
class Boss extends Enemy{
    constructor(graphic, speed, damage, health, atkInterval, levelData){
        super(graphic, speed, damage);
        
        this.levelData = levelData;
        
        this.type = 'Boss';
        this.health = health;
        this.minHealthTrigger = health/5;
        
        this.temp = this.speed;
        this.startChasing = false;
        
        this.atkInterval = atkInterval;
        
        this.point = {x: player.x, y: player.y};
        
        this.healthBar = new HealthBar(this.health, this.health, 200, 10, 0, 0,null);
        
        this.addChild(this.healthBar);
        
        this.active = true;
        
    }
    update(){
        if (this.active == false){
            return;
        }
        if (player == undefined || gameOver || nextLevel || timerObj.seconds > 0){
            return;
        }
        this.healthBar.currentValue= this.health;
        
        if (this.health > this.minHealthTrigger){ 
            this.startChasing = false;
            
            //wandering around the stage
            this.moveToRandomPoint();
            if (this.chaseBehavior.distance < 10){
                this.point = this.chaseBehavior.randomizeAPoint();
            }
            
        }else {
            this.speed = this.temp*1.5;
            this.startChasing = true;
            this.chasePlayer();
            this.restrictToGameSpaceMinusPlayer();
        }
        
        this.x+= this.velocity.x;
        this.y += this.velocity.y;
        
        
    }
    moveToRandomPoint(){
        this.chaseBehavior.moveToPoint(this.point.x-this.x, this.point.y-this.y, this.speed);
        this.velocity.x = this.chaseBehavior.velocity.x;
        this.velocity.y = this.chaseBehavior.velocity.y;
    }
    reduceHealth(points){
        this.health -= points;
        if (this.health<=0){
            if (sceneManager.currentScene.bossLayer != undefined){
                playSound("Boss Die");
                this.active = false;
                sceneManager.currentScene.bossLayer.removeChild(sceneManager.currentScene.boss);
            }
            
            nextLevel = true;
            //console.log("Level 1 finished!");
        }
    }
    restrictToGameSpaceMinusPlayer(){
        if (player != undefined){
            if(this.x + this.graphic.nominalBounds.width * this.graphic.scale > stage.canvas.width - player.graphic.nominalBounds.width * player.graphic.scale){
                this.x = stage.canvas.width - player.graphic.nominalBounds.width * player.graphic.scale - this.graphic.nominalBounds.width * this.graphic.scale;
            }
            if(this.x  < player.graphic.nominalBounds.width * player.graphic.scale){
                this.x = player.graphic.nominalBounds.width * player.graphic.scale;
            }
            if(this.y + this.graphic.nominalBounds.height * this.graphic.scale > stage.canvas.height - player.graphic.nominalBounds.height * player.graphic.scale){
                this.y = stage.canvas.height - player.graphic.nominalBounds.height * player.graphic.scale - this.graphic.nominalBounds.height * this.graphic.scale;
            }
            if(this.y < player.graphic.nominalBounds.height * player.graphic.scale){
                this.y = player.graphic.nominalBounds.height * player.graphic.scale;
            }
        }
    }
}

//sub class - for boss lvl 1
//--behavior: wander around and summon minions each interval; if health <= 20%, stop spawning and start to chase player with high speed
class Boss1 extends Boss{
    constructor(graphic, speed, damage, health, atkInterval, minionsNumber, waveSpawnInterval, levelData){
        super(graphic, speed, damage, health, atkInterval, levelData);

        this.meleeBehavior = new MeleeBehavior(this.atkInterval);
        
        this.minionsNumber = minionsNumber;
        this.spawner = new EnemySpawner(this.minionsNumber, this.levelData);
        this.waveSpawnInterval = waveSpawnInterval;
        this.timer = 0;
        
        this.spawnMeleeMinions();
    }
    update(){
        if (this.active == false){
            return;
        }
        if (player == undefined || gameOver || nextLevel){
            return;
        }
        this.healthBar.currentValue= this.health;
        
        if (this.health > this.minHealthTrigger){
            this.timer++; 
            
            this.startChasing = false;
            
            //wandering around the stage
            this.moveToRandomPoint();
            if (this.chaseBehavior.distance < 10){
                this.point = this.chaseBehavior.randomizeAPoint();
            }
            
            if (this.timer > (this.waveSpawnInterval)){
                this.timer = 0;
                //this.spawnMeleeMinions();
                if (timerObj.seconds <= 0){
                    this.spawner.spawnAtSpecifiedPosition(this.x + this.graphic.nominalBounds.width/2 * this.graphic.scale, this.y+ this.graphic.nominalBounds.height/2 * this.graphic.scale, 0);
                }
            }
            
        }else {
            //console.log('Boss starts to chase player!');
            this.timer = 0;
            this.speed = this.temp*1.5;
            this.startChasing = true;
            this.chasePlayer();
            this.restrictToGameSpaceMinusPlayer();
        }
        
        this.x+= this.velocity.x;
        this.y += this.velocity.y;
    }
    spawnMeleeMinions(){
        if (timerObj.seconds <= 0){
            this.spawner.spawnAtSpecifiedPosition(this.x + this.graphic.nominalBounds.width/2 * this.graphic.scale, this.y+ this.graphic.nominalBounds.height/2 * this.graphic.scale, 0);
        }
    }
    dealMeleeDamage(){
        this.meleeBehavior.dealMeleeDamage(this.damage);
    }
}
//sub class - for boss lvl 2
//--behavior: wander around and deal ranged damage each interval; if health <= 20%, start to chase player with high speed - no melee damage on contact with player
class Boss2 extends Boss{
    constructor(graphic, speed, damage, health, atkInterval, atkSpd, minDistance, levelData){
        super(graphic, speed, damage, health, atkInterval, levelData);

        this.atkSpd = atkSpd;
        this.aimAngle = 0;
        
        this.shootBehavior = new ShootBehavior(this.atkSpd, this.aimAngle, this.atkInterval, 0);
        
        this.minDistance = minDistance;

    }
    update(){
        if (this.active == false){
            return;
        }
        if (player == undefined || gameOver || nextLevel){
            return;
        }
        this.healthBar.currentValue= this.health;
        
        if (this.health > this.minHealthTrigger){
            
            this.startChasing = false;
            
            //wandering around the stage
            this.moveToRandomPoint();
            if (this.chaseBehavior.distance < 10){
                this.point = this.chaseBehavior.randomizeAPoint();
            }
            
        }else {
            this.speed = this.temp*1.5;
            this.startChasing = true;
            this.chasePlayer();
            this.restrictToGameSpaceMinusPlayer();
            
            if (this.chaseBehavior.distance < this.minDistance){
                this.speed = 0;
            } else {
                this.speed = this.temp*1.5;
            }
        }
        
        this.x+= this.velocity.x;
        this.y += this.velocity.y;
        
        //calling shoot behavior update
        this.shootBehavior.update();
        
        if (player != undefined){
            this.aimAngle = Math.atan2(player.y-this.y,player.x-this.x) / Math.PI * 180 + 10;
        }
    }
}
//sub class - for boss lvl 3
//--behavior: wander around, summon minions and deal ranged damage each interval; if health <= 20%, stop spawning and start to chase player with high speed  - combine behaviors of lvl 1 and lvl 2 - have melee damage on contact with player
class Boss3 extends Boss1{
     constructor(graphic, speed, damage, health, atkInterval, atkSpd, minDistance, minionsNumber, waveSpawnInterval, levelData){
        super(graphic, speed, damage, health, atkInterval, minionsNumber, waveSpawnInterval, levelData);

        this.atkSpd = atkSpd;
        this.aimAngle = 0;
        
        this.shootBehavior = new ShootBehavior(this.atkSpd, this.aimAngle, this.atkInterval, 0);
        
        this.minDistance = minDistance;

    }
    update(){
        if (this.active == false){
            return;
        }
        if (player == undefined || gameOver || nextLevel){
            return;
        }
        this.healthBar.currentValue= this.health;
        
        if (this.health > this.minHealthTrigger){
            this.timer++; 
            
            this.startChasing = false;
            
            //wandering around the stage
            this.moveToRandomPoint();
            if (this.chaseBehavior.distance < 10){
                this.point = this.chaseBehavior.randomizeAPoint();
            }
            
            if (this.timer > (this.waveSpawnInterval)){
                this.timer = 0;
                if (timerObj.seconds <= 0){
                    this.spawner.spawnAtSpecifiedPosition(this.x + this.graphic.nominalBounds.width/2 * this.graphic.scale, this.y, 0);

                    this.spawner.spawnAtSpecifiedPosition(this.x + this.graphic.nominalBounds.width/2 * this.graphic.scale, this.y+ this.graphic.nominalBounds.height * this.graphic.scale, 0);
                } 
            }
            
        }else {
            //console.log('Boss starts to chase player!');
            this.timer = 0;
            this.speed = this.temp*1.5;
            this.startChasing = true;
            this.chasePlayer();
            this.restrictToGameSpaceMinusPlayer();
            
            if (this.chaseBehavior.distance < this.minDistance){
                this.speed = 0;
            } else {
                this.speed = this.temp*1.5;
            }
        }
        
        this.x+= this.velocity.x;
        this.y += this.velocity.y;
        
        //calling shoot behavior update
        this.shootBehavior.update();
        
        if (player != undefined){
            this.aimAngle = Math.atan2(player.y-this.y,player.x-this.x) / Math.PI * 180 + 10;
        }
    }
    spawnMeleeMinions(){
        if (timerObj.seconds <= 0){
            this.spawner.spawnAtSpecifiedPosition(this.x + this.graphic.nominalBounds.width/2 * this.graphic.scale, this.y, 0);
        
            this.spawner.spawnAtSpecifiedPosition(this.x + this.graphic.nominalBounds.width/2 * this.graphic.scale, this.y+ this.graphic.nominalBounds.height * this.graphic.scale, 0);
        }    
    }
}

/* AI LOGIC AND RELATED OBJECTS */
//Bullet 
class Bullet extends MoveableGameObject{
    constructor(graphic, lifeTime, source){
        super(graphic);
        
        this.speed = BULLET_SPEED; 
        
        this.lifeTime = lifeTime;
        this.source = source;
        this.timer = 0;
        
        //createjs.Ticker.on('tick', this.update.bind(this));
    }
    update(){
        super.update();
        
        //remove when lifetime ends
        this.timer++;
        if (this.timer > (this.lifeTime * createjs.Ticker.framerate)){
            this.timer = 0;
            this.selfDestroy();
        }   
    }
    hitPlayer(){ //more than 1 instance at the same time ->> need to call this in a loop running through bullets list so that it only invokes once
        player.reduceHealth(this.source.damage);
        console.log("Ranged damage dealt from source id "+ this.source.id + " bullet " + this.id + " hits player. Player health: "+ player.health);
    }
    hitEnemy(){
        for(var i=0 ; i <enemies.length; ++i){
            if (checkCollisionSprSpr(this,enemies[i])){      
                if (enemies[i].type == 'Boss'){
                    playSound("Boss Hurt");
                    
                    this.source.damage = Math.round(this.source.minDamage + Math.random()*(this.source.maxDamage-this.source.minDamage)); //randomize player damage dealt
                    
                    enemies[i].reduceHealth(this.source.damage);
                    
                    new DamageText(enemies[i],this.source.damage, "red", enemies[i].graphic.nominalBounds.width/2*enemies[i].graphic.scale, enemies[i].graphic.nominalBounds.height/2*enemies[i].graphic.scale);
                    
                    console.log("Hit "+ enemies[i].type + ". Target health: "+ enemies[i].health);
                    this.selfDestroy();
                } else {
                    this.selfDestroy();
                    playSound("Minion Die");
                    console.log('Hit enemy' + i);
                    
                    //update score
                    score+=sceneManager.currentScene.levelData.bonus;
                    if (score % 100 == 0){
                        player.speed++;
                        if (player.speed > PLAYER_MAXSPEED){
                            player.speed = PLAYER_MAXSPEED;
                        }
                        playerSpd = player.speed;
                    }
                    
                    //generate explosion animation
                    var expl = new createjs.Sprite(subSpriteSheet, "explosion");
                    expl.x = enemies[i].x;
                    expl.y = enemies[i].y;
                    expl.paused = true;
                    enemies[i].parent.addChild(expl);
                    expl.gotoAndPlay("explosion");
                    
                    expl.on('animationend', function(e){
                        if (!gameOver && !nextLevel)
                            sceneManager.currentScene.enemyLayer.removeChild(e.target);
                    }); 
                    
                    enemies[i].parent.removeChild(enemies[i]);
                    enemies[i].dropItem();
                    enemies.splice(i, 1);
                }
            }
        }
    }
    hitProp(){
        for(var i=0 ; i <blocks.length; ++i){
            if (checkCollisionSpriteRect(this,blocks[i])){
                this.selfDestroy();
            }
        }
    }
    selfDestroy(){
        if (sceneManager.currentScene.ppLayer != undefined){
            sceneManager.currentScene.ppLayer.removeChild(this);
        }
        
        for (var i=0; i<bullets.length; ++i){
            if (bullets[i] === this){
                bullets.splice(i,1);
            }
        }
    }
}
/* OBJECT BEHAVIOR */
//Shooting Behavior
class ShootBehavior {
    constructor(atkSpd, aimAngle, shootInterval, specialAtkInterval){
        this.atkSpd = atkSpd; 
        this.aimAngle = aimAngle;
        this.atkCounter = 0;
        this.shootInterval = shootInterval;
        this.specialAtkInterval = specialAtkInterval;
    }
    update(){
        if (player != undefined){
            this.atkSpd = player.atkSpd;
        }
        this.atkCounter += this.atkSpd;
    }
    performAtk(source){
        if (player!= undefined && player.currentWeapon.ammoNumber > 0){
            if (this.atkCounter >= (this.shootInterval * createjs.Ticker.framerate)){
                this.atkCounter = 0;
                
                //generate bullet 
                console.log(source.type + source.id + " Normal shoot");
                //play SFX
                playSound("Normal Shoot");
                //
                this.generateBullet(source);
                
                if (source.type == 'Player'){
                    player.currentWeapon.use();
                } 
            } 
        }
    }
    performSpecialAtk(source){
        if (player!= undefined && player.currentWeapon.ammoNumber > 0){
            if (this.atkCounter >= (this.specialAtkInterval * createjs.Ticker.framerate)){
                this.atkCounter = 0;
                //generate 3 bullets 
                console.log(source.type + source.id + " Special shoot");
                //play SFX
                playSound("Special Shoot");
                //
    //            this.generateBullet(source,source.aimAngle - 5);
    //			this.generateBullet(source,source.aimAngle);
    //			this.generateBullet(source,source.aimAngle + 5);
                for(var i = 0 ; i < 360; i+=20){
                    this.generateBullet(source, i);
                }
                player.currentWeapon.use();
            } 
        }
    }
    generateBullet(source, aimOverwrite){
        var spawnPosX = source.x + source.graphic.nominalBounds.width * source.graphic.scale/2;
        var spawnPosY = source.y + source.graphic.nominalBounds.height * source.graphic.scale/2;

//        var bullet = new Bullet(drawImage('images/playerBullet.png', .2, spawnPosX, spawnPosY),
//                               5, source.type);
        var bullet;
        if (source.type == 'Player'){
            switch(source.currentWeapon.type){
                case "normal":
                    bullet = new Bullet(new lib.MediumProj(), 1, source);
                    bullet.graphic.scale = .3;
                    break;
                case "small":
                    bullet = new Bullet(new lib.SmallProj(), 1, source);
                    bullet.graphic.scale = .3;
                    break;
                case "large":
                    bullet = new Bullet(new lib.LargeProj(), 1, source);
                    break;
            }
        } else {
            bullet = new Bullet(new lib.Projectile(), 1, source);
        }
        
        bullet.graphic.scale = .3;
        bullet.graphic.shadow = drawShadow("#000",2,2,10);
        bullet.x = spawnPosX;
        bullet.y = spawnPosY;

        var angle;
        if(aimOverwrite !== undefined)
            angle = aimOverwrite;
        else angle = source.aimAngle;

        bullet.velocity.x = Math.cos(angle/180*Math.PI)*bullet.speed;
        bullet.velocity.y = Math.sin(angle/180*Math.PI)*bullet.speed;
        
        bullets.push(bullet);
        
        if (sceneManager.currentScene.ppLayer != undefined){
            sceneManager.currentScene.ppLayer.addChild(bullet);
        }
    }
}
//Chasing behavior
class ChaseBehavior{
    constructor(){
        this.velocity = {
          x:0,
          y:0
        }
        this.distance = 0;
    }
    moveToPoint(dirX,dirY,speed){
        var angle = Math.atan2(dirY,dirX);
        this.velocity.x = Math.cos(angle)*speed;
        this.velocity.y = Math.sin(angle)*speed;
        
        this.calcDistanceToPoint(dirX,dirY);
    }
    calcDistanceToPoint(dirX,dirY){
        this.distance = Math.sqrt(dirX*dirX + dirY*dirY);
    }
    randomizeAPoint(){
        var point = {x:0,y:0};
        
        point.x = Math.random()*(stage.canvas.width+1-500); 
        
        point.y = Math.random()*(stage.canvas.height+1-500);
        
        return point;
    }
}
//Melee behavior
class MeleeBehavior{
    constructor(atkInterval){
        this.atkInterval = atkInterval;
        this.atkCounter = this.atkInterval * createjs.Ticker.framerate;
    }
    dealMeleeDamage(damage){
        if (this.atkCounter >= (this.atkInterval * createjs.Ticker.framerate)){
            this.atkCounter = 0; 
            player.reduceHealth(damage);
            console.log("Melee damage dealt to player. Player health: "+ player.health);
        }
    }
}

/* Pick-Ups */
class Pickup extends GameObject{
    constructor(graphic, lifeTime){
        super(graphic);
        
        this.lifeTime = lifeTime;
        
        this.timer = 0;
        
        //createjs.Ticker.on('tick', this.update.bind(this));
    }
    update(){
        //remove when lifetime ends
        this.timer++;
        if (this.timer > (this.lifeTime * createjs.Ticker.framerate)){
            this.timer = 0;
            this.selfDestroy();
        } 
    }
    selfDestroy(){
        if (sceneManager.currentScene.ppLayer != undefined){
            sceneManager.currentScene.ppLayer.removeChild(this);
        }
        
        for (var i=0; i<pickups.length; ++i){
            if (pickups[i] === this){
                pickups.splice(i,1);
            }
        }
    }
}
class HealthPickup extends Pickup{
    constructor(graphic, lifeTime, healthBonus){
        super(graphic,lifeTime);
        
        this.healthBonus = healthBonus;
        
        pickups.push(this);
    }
    onPickup(){
        this.selfDestroy();
        player.increaseHealth(this.healthBonus);
        console.log("Picked up health. Player health: "+ player.health);
    }
}

class AmmoPickup extends Pickup{
    constructor(graphic, lifeTime, ammoBonus){
        super(graphic,lifeTime);
        
        this.ammoBonus = ammoBonus;
        
        pickups.push(this);
    }
}
class SmallAmmoPickup extends AmmoPickup{
    constructor(graphic, lifeTime, ammoBonus){
        super(graphic,lifeTime,ammoBonus);
    }
     onPickup(){
        this.selfDestroy();
        player.weaponManager.smallWeapon.ammoNumber += this.ammoBonus;
        console.log("Picked up small ammo. Small ammo number: "+    player.weaponManager.smallWeapon.ammoNumber);
    }
}

class LargeAmmoPickup extends AmmoPickup{
    constructor(graphic, lifeTime, ammoBonus){
        super(graphic,lifeTime,ammoBonus);
    }
     onPickup(){
        this.selfDestroy();
        player.weaponManager.largeWeapon.ammoNumber += this.ammoBonus;
        console.log("Picked up large ammo. Large ammo number: "+    player.weaponManager.largeWeapon.ammoNumber);
    }
}
//drop an item at specified drop rate
class DropBehavior{ 
    constructor(healthDropRate, smallAmmoDropRate, largeAmmoDropRate){
        this.healthDropRate = healthDropRate;
        this.smallAmmoDropRate = smallAmmoDropRate;
        this.largeAmmoDropRate = largeAmmoDropRate;
        
        this.random = 0;
    }
    dropItem(itemType, posX, posY){
        this.random = Math.random();
        var item; 
        switch (itemType){
            case "Health":
                if (this.random <= this.healthDropRate){
                    item = new HealthPickup(new lib.HealthPickup(), 10, 1);
                    item.graphic.scale = .3;
                    item.x = posX;
                    item.y = posY;
                }
                break;
            case "SmallAmmo":
                if (this.random <= this.smallAmmoDropRate){
                    item = new SmallAmmoPickup(new lib.SmallProj(),10,10);
                }
                break;
            case "LargeAmmo":
                if (this.random <= this.largeAmmoDropRate){
                    item = new LargeAmmoPickup(new lib.LargeProj(),10,10);
                }
                break;
        }
        if (sceneManager.currentScene.ppLayer != undefined){
            sceneManager.currentScene.ppLayer.addChild(item);
        }
        
//        if (this.random <= this.dropRate){
//            if (itemType == "Health"){
//                var item = new HealthPickup(drawPreloadedImage(preloader.queue.getResult("HealthPickup"), .3, posX, posY), 3, 1);
//            }
//        }
    }
    dropRandomItem(posX, posY){
        this.random = Math.random();
        var item;
        if (this.random < this.largeAmmoDropRate){
            item = new LargeAmmoPickup(new lib.LargeProj(),3,10);
            item.graphic.scale = .5;
            item.x = posX;
            item.y = posY;
        } else if (this.random < this.smallAmmoDropRate){
            item = new SmallAmmoPickup(new lib.SmallProj(),3,10);
            item.graphic.scale = .5;
            item.x = posX;
            item.y = posY;
        } else if (this.random < this.healthDropRate){
            item = new HealthPickup(new lib.HealthPickup(), 3, 1);
            item.graphic.scale = .3;
            item.x = posX;
            item.y = posY;
        }
        if (sceneManager.currentScene.ppLayer != undefined){
            sceneManager.currentScene.ppLayer.addChild(item);
        }
    }
}

/* WEAPON SYSTEM */

//this class should manage the current ammo number of each type of weapon player currently has 
//-deduct ammo on use 
//- normal default has infinite ammo number-> no deduction
class WeaponManager{
    constructor(){
//        this.normalWeapon = new Weapon(drawRect("#666", 20, 20, 0, 0), NORMAL_ATKSPD, NORMAL_MIN, NORMAL_MAX, 1, false); 
//        
//        this.smallWeapon = new Weapon(drawRect("#999", 20, 20, 0, 0), SMALL_ATKSPD, SMALL_MIN, SMALL_MAX, 0 , true);
//        
//        this.largeWeapon = new Weapon(drawRect("#333", 20, 20, 0, 0), LARGE_ATKSPD, LARGE_MIN, LARGE_MAX, 0, true); 
        this.normalWeapon = new Weapon(new lib.MediumWP(), NORMAL_ATKSPD, NORMAL_MIN, NORMAL_MAX, 1, false, "normal"); 
        
        this.smallWeapon = new Weapon(new lib.SmallWP(), SMALL_ATKSPD, SMALL_MIN, SMALL_MAX, 0 , true , "small");
        
        this.largeWeapon = new Weapon(new lib.LargeWP(), LARGE_ATKSPD, LARGE_MIN, LARGE_MAX, 0, true, "large"); 
    }
}

//each weapon has graphic, atkSpd, and damage range associated 
class Weapon{
    constructor(graphic, atkSpd, minDamage, maxDamage, ammoNumber, ammoCheck, type){
        this.graphic = graphic;
        this.atkSpd = atkSpd;
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
        this.ammoNumber = ammoNumber;
        this.ammoCheck = ammoCheck;
        this.graphic.scale = .3;
        this.type = type;
    }
    use(){
        if (this.ammoCheck){
            this.ammoNumber -= 1;
            if (this.ammoNumber < 0){
                this.ammoNumber = 0;
            }
        }
    }
}







