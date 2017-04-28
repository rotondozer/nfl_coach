var opponentFieldPosition = 100;
var totalYdsGained = 20;
var totalPoints = 0;
var opponentPoints = 0;
var ydsToGo = 10;
var numPossessions = 0;
var quarter = 1; //<--do something with this. for loop likely

var downs = [
  firstDown = true, //0
  secondDown = false, //1
  thirdDown = false, //2
  fourthDown = false, //3
  opponentPossession = false //4
];

var ineffective = 0;
var notEffective = function() {
  return Math.floor(Math.random()*2+1); //1-2 yards
}
var minEffective = function() {
  return Math.floor(Math.random()*2+2); //2-3 yards
}
var effective = function() {
  return Math.floor(Math.random()*4+3); //3-6 yards
}
var veryEffective = function() {
  return Math.floor(Math.random()*4+7); //7-10 yards
}
var superEffective = function () {
  return Math.floor(Math.random()*11+10); //10-20 yards
}
var bigPlay = function() {
  return Math.floor(Math.random()*61+20);
}
var probability = function() {
  return Math.floor(Math.random()*101);//1-100
}
