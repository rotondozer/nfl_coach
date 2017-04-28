var firstDownCheck = function(thisDown, nextDown) {
if (ydsToGo <= 0 && totalYdsGained < 100) {
  alert("First Down!");
  ydsToGo = 10;
  downs[thisDown] = false;
  downs[0] = true;
} else if (totalYdsGained < 100) {
  downs[thisDown] = false;
  downs[nextDown] = true;
  }
};
var possessionChange = function(thisDown) {
  downs[4] = true;
  if (downs[4]) {
    totalYdsGained = 20;
    ydsToGo = 10;
    alert("SCORE:\n\nHOME: " + totalPoints + "\nAWAY: " + opponentPoints);
    alert("Your opponent has possession");
    opponentDrive();
    alert("SCORE:\n\nHOME: " + totalPoints + "\nAWAY: " + opponentPoints);
  }
  downs[4] = false;
  downs[thisDown] = false;
  downs[0] = true;
  numPossessions++;
  alert(downs+"\n"+numPossessions);

};

var touchDownCheck = function(thisDown) { //IN PROGRESS...
  if (totalYdsGained >= 100) {
    alert("TOUCHDOWNNNN!!!!!");
    ydsToGo = 10;
    totalPoints += 7;
    //downs[thisDown] = false;
    possessionChange(thisDown);
    alert(downs+"\n"+numPossessions);
  }
};
