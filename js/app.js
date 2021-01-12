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
LocationObject.prototype.render = function(){
  var writeRow = document.getElementById("alltable");
  var interest = document.createElement('tr');
  interest.textContent = this.name;
  writeRow.appendChild(interest);
  for(var count2 = 0; count2<hourPerday.length;count2++){
    var interest2 = document.createElement('td');
    interest2.textContent = this.howmanybuy[count2];
    //console.log(hourPerday[count]);
    interest.appendChild(interest2);}

}

function mainfunction(name,min,max,avg){
  for (var i = 0; i<name.length; i++){
    var object = new LocationObject(name[i],min[i],max[i],avg[i]);
    object.randomnumberFun();
    object.render();
    allObject.push(object);
    }; 
};
BuildHeader(hourPerday);
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



function allHours(hourPerday){
  for(i = 0;i<hourPerday.length;i++){
    var hold =0;
    for(var count = 0;count <allObject.length;count++){
      hold +=allObject[count].howmanybuy[i];
    }
    allPerHour.push(hold);
  }
}
allHours(hourPerday);
//console.log(allPerHour);

function BuildRows(allObject,test){
  var writeRow = document.getElementById("alltable");
  if (test == false){
    var RowFooter = document.createElement('tfoot');
    RowFooter.setAttribute('id',"tablefoot");
    writeRow.appendChild(RowFooter);
    var interestLast = document.createElement('tr');
    interestLast.textContent = "Total";
    RowFooter.appendChild(interestLast);
    for(var count2 = 0; count2<hourPerday.length;count2++){
    var interest2 = document.createElement('td');
    interest2.textContent = allPerHour[count2];
    //console.log(hourPerday[count]);
    interestLast.appendChild(interest2);}
  }else{
    var ChangeRow = document.getElementById("tablefoot");
    ChangeRow.remove();
    BuildRows(allObject,false);
  }
  
}
BuildRows(allObject,false);

function Hello(){
  var inputname = check(inputname,"Name of the New Location :");
  nameOfLocation.push(inputname);
  var inputmax = checknamber(inputmax,"Max for the New Location :");
  inputmax =parseInt(inputmax);
  maxOfLocationPerHour.push(inputmax);
  var inputmin = checknamber(inputmin,"Min for the New Location :");
  inputmin =parseInt(inputmin);
  while(inputmin>=inputmax){
    inputmin = checknamber(inputmin,"Min must be less than max:");
  }
  minOfLocationPerHour.push(inputmin);
  var inputavg = checknamber(inputavg,"Avg for the New Location :");
  inputavg =parseInt(inputavg);
  avgOfBuyPerHour.push(inputavg);

  var object = new LocationObject(inputname,inputmin,inputmax,inputavg);
  object.randomnumberFun();
  object.render();
  allObject.push(object);
  allPerHour = [];
  allHours(hourPerday);
  BuildRows(allObject,true);
  console.log(allObject);

}

function check(x, y ){
  while (x == "" || x == null || x == undefined || x == 0 ){
      x = prompt(y);
  }
  return x;
}
function checknamber(q6, y ){
  q6 = prompt(y);
  q6 = parseFloat(q6);
  while(isNaN(q6%1) || q6 == ""){
    q6 = prompt(y);
    q6 = parseFloat(q6);
  }
  return q6;
}

