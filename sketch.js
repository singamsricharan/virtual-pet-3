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
  database = firebase.database();
  createCanvas(1000,500);
  
  dog=createSprite(800,250);
  dog.addImage(dogimg);
  dog.scale=0.2;

  foodObj=new Food();
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
  foodObj.display();
  fedTime=database.ref("FeedTime");
  fedTime.on("value",function(data){
  lastfed=data.val();
  })
  fill(255,255,254);
  textSize(15);
  if(lastfed>=12){
    text("last Feed : "+lastfed+"PM",200,40)
  }
  else if(lastfed==0){
    text("Last Feed : 12 AM",200,40)
  }
  else{
    text("Last Feed : "+lastfed+"AM",200,40)
  }
  drawSprites();
  textSize(30);
  fill("black");
  stroke("black");
  text("FoodRemaining:"+foodS,100,100);
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
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
//Fuction to read values from db
function readstock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
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