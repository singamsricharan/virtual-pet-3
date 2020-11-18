//Create variables here
var dog, happyDog, database, foodS, foodStock;
function preload(){
  //load images here
  dogimg=loadImage("images/dogImg.png")
  dog2img=loadImage("images/dogImg1.png")
}

function setup(){
	createCanvas(500,500);
  dog=createSprite(200,200);
  dog.addImage(dogimg);
  database = firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readstock);
}


function draw(){  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dog2img);
  }
  drawSprites();
  //add styles here
  textSize(20);
  fill("black");
  stroke(white)
}
//Fuction to read values from db
function readstock(){
  foodS=data.val();
}
//Fuction to write values from db
function writeStock(){
  database.ref('/').update({
    Food:x
  })
}