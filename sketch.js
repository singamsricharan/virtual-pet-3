//Create variables here
var dog, happyDog, database, foodS, foodStock,database;
function preload(){
  //load images here
  dogimg=loadImage("images/dogImg.png")
  dog2img=loadImage("images/dogImg1.png")
}

function setup(){
	createCanvas(500,500);
  dog=createSprite(250,250);
  dog.addImage(dogimg);
  dog.scale=0.2;
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
  textSize(30);
  fill("black");
  stroke("black");
  text("FoodRemaining:"+foodS,100,100)
}
//Fuction to read values from db
function readstock(data){
  foodS=data.val();
}
//Fuction to write values from db
function writeStock(x){
  if (x<=0){
    x=0
  }else{
    x-=1
  }
  database.ref('/').update({
    Food:x
  })
}