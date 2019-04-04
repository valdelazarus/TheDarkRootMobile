//draw a circle with color, radius and positions
drawCircle = function(color, radius, posX, posY){
    var circle = new createjs.Shape();
    circle.graphics.beginFill(color).drawCircle(0,0,radius);

    circle.x = posX;
    circle.y = posY;
    circle.radius = radius;

    //stage.addChild(circle);
    return circle;
}
//draw a rectangle with color, width, height and positions
drawRect = function(color, width, height, posX, posY){
    var rect = new createjs.Shape();
    rect.graphics.beginFill(color).drawRect(0,0,width,height);

    //changing pivot to center
    rect.regX = width/2;
    rect.regY = height/2;

    //change position after setting pivot
    rect.x = posX;
    rect.y = posY;

    rect.setBounds(rect.regX,rect.regY,width,height);

    //stage.addChild(rect);
    return rect;
}
//draw a rectangle with border color, width, height and positions 
drawBorderedRect = function(color, width, height, posX, posY){
    var borderedRect = new createjs.Shape();
    
    borderedRect.graphics.setStrokeStyle(2);
    borderedRect.graphics.beginStroke(color).drawRect(0, 0, width, height);
    
    borderedRect.regX = width/2;
    borderedRect.regY = height/2;
    
    borderedRect.x = posX;
    borderedRect.y = posY;
    
    borderedRect.setBounds(borderedRect.regX,borderedRect.regY,width,height);
    
    //stage.addChild(borderedRect);
    return borderedRect;
}
//draw a image sprite with scale and positions
drawImage = function(imagePath, scale, posX, posY){
    var imageObj = new Image();
    imageObj.src = imagePath;

    var image = new createjs.Bitmap(imageObj);

    image.x = posX;
    image.y = posY;

    image.scale = scale;
    
    //stage.addChild(image);
    return image;
}
//draw a image using preloaded image
drawPreloadedImage = function(imageObj,scale,posX,posY){
    var image = new createjs.Bitmap(imageObj);
    
    image.shadow = drawShadow("#666",2,2,10);

    image.x = posX;
    image.y = posY;

    image.scale = scale;
    
    //stage.addChild(image);
    return image;
}
//draw text with a displayed text, font, color, posX and posY
drawText = function(text, font, color, posX, posY){
    var textObj = new createjs.Text(text,font,color);
    
    textObj.textBaseline = "middle";
    textObj.textAlign = "center";
    
    textObj.x = posX;
    textObj.y = posY;
    
    //stage.addChild(textObj);
    return textObj;
}
//draw shadow under graphic
drawShadow = function(color, offsetX, offsetY, blurSize){
    var shadow = new createjs.Shadow(color, offsetX, offsetY, blurSize);
    return shadow;
}