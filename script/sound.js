//functions to register sound, play sound with soundPath parameters

//always call this function first (at init)
function registerSound(soundPath, name){
    createjs.Sound.alternateExtensions = ["ogg", "aiff"];
    createjs.Sound.registerSound(soundPath, name);
}

//play sound and return instance of the sound playing
function playSound(soundName, loop=false, volume = 1){ //usind name of registered sound
    var instance = createjs.Sound.createInstance(soundName);
    if (loop){
        instance.play({loop:-1});
        //instance = createjs.Sound.play(soundName, {loop:-1});
    }else {
        instance.play();
    }
    instance.volume = volume;
    return instance;
}

//set sound volume
function setSoundVolume(soundInstance, volume){
    soundInstance.volume = volume;
}