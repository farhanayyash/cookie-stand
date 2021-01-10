'use strict';
console.log("farhanayyash");

var nameOfLocation = ["Seattle", "Tokyo", "Dubai", "Paris", "Lima"];
var minOfLocationPerHour = [23, 3, 11, 20, 2];
var maxOfLocationPerHour = [65, 24, 38, 38, 16];
var avgOfBuyPerHour = [6.3, 1.2, 3.7, 2.3, 4.6];
var allObject = [];

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

var hourPerday = [];
for(var i = 6;i<19;i++){
  if (i >=12){
    if( i == 12){hourPerday.push((12)+"pm");}
    hourPerday.push((i-11)+"pm");
  }else{hourPerday.push((i)+"am");}
}
hourPerday.push("Total");
//console.log(hourPerday);


function mainfunction(name,min,max,avg){
  for (var i = 0; i<name.length; i++){
    var object = {
        name : nameOfLocation[i],
        maxmum : max[i],
        minmum: min[i],
        average: avg[i],
        randomnumber: [],
        howmanybuy: [],
        totalperlocation: 0 ,
        randPerHour: function(){
          for (var i = 0; i<14;i++){
            var hold = getRndInteger(this.minmum,this.maxmum);
            this.randomnumber.push(hold);
            this.howmanybuy.push(Math.round(hold*this.average));
            this.totalperlocation += Math.round(hold*this.average);
          }
          this.howmanybuy.push(this.totalperlocation);
        }
    };
    
    allObject.push(object);
  };
};

mainfunction(nameOfLocation,minOfLocationPerHour,maxOfLocationPerHour,avgOfBuyPerHour);
for(var i = 0; i < allObject.length;i++){
  allObject[i].randPerHour();
}
//console.log(allObject);

for(var i = 0; i < allObject.length;i++){
  var writeMain = document.getElementById("main");
  var LocaionName = document.createElement('h2');
  LocaionName.textContent = allObject[i].name;
  writeMain.appendChild(LocaionName);
  var Locaionperhour = document.createElement('ul');
  writeMain.appendChild(Locaionperhour);
  for(var count = 0; count<hourPerday.length;count++){
    var interest = document.createElement('li');
    interest.textContent = hourPerday[count]+": "+allObject[i].howmanybuy[count]+" cookies";
    //console.log(hourPerday[count]);
    Locaionperhour.appendChild(interest);
  }

  
  
}
console.log(allObject);

