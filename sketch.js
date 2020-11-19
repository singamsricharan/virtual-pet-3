//Create variables here
var dog, happyDog, database, foodS, foodStock,database;
var fedTime,lastfed;
var foodObj;
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
  foodObj=new Food();
  database = firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readstock);
  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw(){  
  background(46,139,87);
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastfed=data.val();
  })
  foodObj.display();
  drawSprites();
  //add styles here
  textSize(30);
  fill("black");
  stroke("black");
  text("FoodRemaining:"+foodS,100,100)
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function feedDog(){
  dog.addImage(dog2img);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    fedTime:hour()
  })
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