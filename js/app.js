'use strict';
console.log("farhanayyash");

var nameOfLocation = ["Seattle", "Tokyo", "Dubai", "Paris", "Lima"];
var minOfLocationPerHour = [23, 3, 11, 20, 2];
var maxOfLocationPerHour = [65, 24, 38, 38, 16];
var avgOfBuyPerHour = [6.3, 1.2, 3.7, 2.3, 4.6];
var allObject = [];
var allPerHour= [];

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

var hourPerday = [];
for(var i = 6;i<19;i++){
  if (i >=12){
    if( i == 12){hourPerday.push((12)+":00pm");}
    hourPerday.push((i-11)+":00pm");
  }else{hourPerday.push((i)+":00am");}
}
hourPerday.push("Daily Location Total");


function LocationObject(name,min,max,avg){
  this.name = name;
  this.maxmum = max;
  this.minmum = min;
  this.average =  avg;
  this.randomnumber= [];
  this.howmanybuy= [];
  this.totalperlocation= 0;
};
LocationObject.prototype.randomnumberFun = function(){
  for (var i = 0; i<14;i++){
    var hold = getRndInteger(this.minmum,this.maxmum);
    this.randomnumber.push(hold);
    this.howmanybuy.push(Math.ceil(hold*this.average));
    this.totalperlocation += Math.ceil(hold*this.average);
  }
  this.howmanybuy.push(this.totalperlocation);
}

function mainfunction(name,min,max,avg){
  for (var i = 0; i<name.length; i++){
    var object = new LocationObject(name[i],min[i],max[i],avg[i]);
    object.randomnumberFun();
    allObject.push(object);
    }; 
};

mainfunction(nameOfLocation,minOfLocationPerHour,maxOfLocationPerHour,avgOfBuyPerHour);

console.log(allObject);

function BuildHeader (hourPerday){
  var writeMain = document.getElementById("main");
  var TimeDay = document.createElement('table');
  TimeDay.setAttribute('id',"alltable");
  writeMain.appendChild(TimeDay);
  var HoursPerDay = document.createElement('thead');
  TimeDay.appendChild(HoursPerDay);
  var interest = document.createElement('th');
  HoursPerDay.appendChild(interest);

  for(var count = 0; count<hourPerday.length;count++){
    var interest = document.createElement('th');
    interest.textContent = hourPerday[count];
    //console.log(hourPerday[count]);
    HoursPerDay.appendChild(interest);
  }

}
BuildHeader(hourPerday);

function allHours(hourPerday){
  for(i = 0;i<hourPerday.length;i++){
    var hold = allObject[0].howmanybuy[i]+allObject[1].howmanybuy[i]+allObject[2].howmanybuy[i]+allObject[3].howmanybuy[i]+allObject[4].howmanybuy[i];
    allPerHour.push(hold);
  }
}
allHours(hourPerday);
console.log(allPerHour);

function BuildRows(allObject){
  var writeRow = document.getElementById("alltable");
  var RowLocation = document.createElement('tbody');
  writeRow.appendChild(RowLocation);
  for(var count = 0; count<allObject.length;count++){
    var interest = document.createElement('tr');
    interest.textContent = allObject[count].name;
    //console.log(hourPerday[count]);
    RowLocation.appendChild(interest);
    for(var count2 = 0; count2<hourPerday.length;count2++){
      var interest2 = document.createElement('td');
      interest2.textContent = allObject[count].howmanybuy[count2];
      //console.log(hourPerday[count]);
      interest.appendChild(interest2);
    }
  }
  var RowFooter = document.createElement('tfoot');
  writeRow.appendChild(RowFooter);
  var interestLast = document.createElement('tr');
  interestLast.textContent = "Total";
  RowFooter.appendChild(interestLast);
  for(var count2 = 0; count2<hourPerday.length;count2++){
    var interest2 = document.createElement('td');
    interest2.textContent = allPerHour[count2];
    //console.log(hourPerday[count]);
    interestLast.appendChild(interest2);}
  

}
BuildRows(allObject);


