var opponentFieldPosition = 100;
var totalPoints = 0;
var opponentPoints = 0;
var numPossessions = 0;
var quarter = 1; //<--do something with this. for loop likely

var ydLineConverter = function() {
  if (totalYdsGained > 50) {
    return "AWAY " + (100 - totalYdsGained);
  } else {
    return "HOME " + totalYdsGained;
  }
}

var numberGenerator = [
  ["probability", 101, 0], //1-100
  ["notEffective", 2, 1],// 1-2 yds
  ["minEffective", 2, 2], // 2-3 yds
  ["effective", 4, 3], // 3-6 yds
  ["veryEffective", 4, 7], // 7-10 yds
  ["superEffective", 11, 10], // 10-20 yds
  ["bigPlay", 61, 20], // 21-80 yds??
  // FIELD GOAL
  ["punt", 30, 35]// PUNT 35-64
]

numberGenerator.effectiveness = function (type) {
  var arrLength = this.length;
  var i;
  for (i = 0; i < arrLength; i++) {
    if (this[i][0] === type) {
      return Math.floor(Math.random() * this[i][1] + this[i][2]);
    }
  }
};
//not sure if i want to keep this punt function
/*var kick(fgORpunt) = function() {
  if (fgORpunt === 'punt') {
    var puntDistance = numberGenerator.effectiveness(fgORpunt);
    $("#home-play-updates").append("HOME team punted for " + puntDistance + " yards");
    opponentFieldPosition -= puntDistance + totalYdsGained;
    $("#away-play-updates").append("AWAY teams begins on " + ydLineConverter());
  } else if (fgORpunt === 'field goal') { // how to consolidate this
    var odds = numberGenerator.effectiveness("probability");
    if (totalYdsGained > 90) { // inside the 10 yd line
      if (odds < 98) {
        // field goal is good
      } else {
        //fg no good
      }
    } else if (totalYdsGained > 74 && totalYdsGained <= 90) { //between 25 and 10 yd line
      if (odds < 80) {
        //field goal is good
      } else {
        //fg no good
      }
    } else if (totalYdsGained > 60 && totalYdsGained <= 74) { // between 40 and 25 yd line
      if (odds < 60) {
        //fg is good
      } else {
        //fg no good
      }
    } else { //further back than 40 yd line

    }
  }
  // call opponentPossession function
} */

var playTypes = {
  insiderun: {execThreshold: 95, one: "notEffective", two: "minEffective", three: "effective", four: "veryEffective", five: "superEffective", six: "bigPlay"},
  outsiderun: {execThreshold: 90, one: "minEffective", two: "notEffective", three: "effective", four: "veryEffective", five: "superEffective", six: "bigPlay"},
  shortpass: {execThreshold: 80, one: "effective", two: "minEffective", three: "notEffective", four: "veryEffective", five: "superEffective", six: "bigPlay"},
  mediumpass: {execThreshold: 60, one: "veryEffective", two: "superEffective", three: "effective", four: "bigPlay", five: "notEffective", six: "minEffective"},
  deeppass: {execThreshold: 30, one: "bigPlay", two: "superEffective", three: "veryEffective", four: "effective", five: "notEffective", six: "minEffective"},

}

playTypes.playExecution = function(input) { //where 'input' is specificPlay + generalPlay
  // where 'this' is playTypes
  if (numberGenerator.effectiveness("probability") > this[input].execThreshold) { // gen num to decide if threshold is crossed
    return; //exit if threshold not crossed
  }
  else { // threshold has been crossed
    var odds = numberGenerator.effectiveness("probability");
    // HOW DO I CONSOLIDATE THIS...IMMEDIATELY INVOKE FUNCTION?
    if (odds <= 46) {
      ydsGainedThisDown = numberGenerator.effectiveness(this[input].one);
    } else if (odds >= 47 && odds <= 72) {
      ydsGainedThisDown = numberGenerator.effectiveness(this[input].two);
    } else if (odds >= 73 && odds <= 85) {
      ydsGainedThisDown = numberGenerator.effectiveness(this[input].three);
    } else if (odds >= 86 && odds <= 95) {
      ydsGainedThisDown = numberGenerator.effectiveness(this[input].four);
    } else if (odds >= 96 && odds <= 98) {
      ydsGainedThisDown = numberGenerator.effectiveness(this[input].five);
    } else if (odds >= 99) {
      ydsGainedThisDown = numberGenerator.effectiveness(this[input].six);
    }
  }
};
var ydsGainedThisDown = 0;
var playCall = null;
var type = null;
var totalYdsGained = 20;
var ydsToGo = 10;

var huddle = function(generalPlay, specificPlay) {
  if (playTypes.hasOwnProperty(specificPlay + generalPlay)) {
    // if input matches object in playTypes, execute that play function
    playTypes.playExecution(specificPlay + generalPlay);
    $("input").attr("placeholder", "RUN or PASS");

    playCall = null;
    type = null;
  }
  else {
    alert("choose a " + generalPlay.toUpperCase() + " type");
    type = null;
  }
};

var downs = [
  ["First", true], ["Second", false], ["Third", false], ["Fourth", false]
]
// ydsGainedThisDown HAS BEEN UPDATED
// totalYdsGained HAS BEEN UPDATED
downs.advanceDown = function(/* not sure if i need these*/) {
  totalYdsGained += ydsGainedThisDown;
  ydsToGo -= ydsGainedThisDown;

  if (playCall === null) { // huddle finished with success
    var arrLength = this.length;
    var i;
    for (i = 0; i < arrLength; i++) {
      if (this[i][1]) {
        $("#home-play-updates").append("<p>" + ydsGainedThisDown + " yards gained on " + this[i][0] + " down</p>" );
      }
    }
    if (totalYdsGained >= 100) { //TOUCHDOWN
      totalPoints += 7; //increase totalPoints by 7
      $("#home-play-updates").append("<p>TOUCHDOWN!</p>" );
      $("#home-team-score").text(totalPoints);
      // begin opponent possesion, reset everything
      // return
    }
    else if (ydsToGo <= 0) { // FIRST DOWN
      // first down becomes true, all other downs[var][1] = false
      this[0][1] = true; //first down becomes true
      for (i = 0; i < arrLength; i++) {
        if (this[i][0] != "First") { // any down not 'first'
          this[i][1] = false; // becomes false
        }
      }
      $("#home-play-updates").append("<p>FIRST DOWN!<br>First and 10 form the " + ydLineConverter() + " yard line</p>" );
      ydsToGo = 10;
    } // end of first down condition
    else /* NEITHER FIRST DOWN NOR TOUCHDOWN ACHIEVED maybe else if */{
      for (i = 0; i < arrLength; i++) {
        // this down becomes false. next down becomes true
        if (this[i][1]) {
          this[i][1] = false; // this down
          this[(i + 1) % 4][1] = true; // next down <-- this alg loops around to first -- not actually needed here
          $("#home-play-updates").append("<p>" + this[(i + 1) % 4][0] + " down and " + ydsToGo + " from the " + ydLineConverter() + " yard line");
          if (downs[3][1]) {
            $("input").attr("placeholder", "KICK or GO FOR IT");
          }
          return; // this ends the loop
        } //end of inner if statement
      } // end of inner loop
    } //end of no first, no td of advance down
  } //end of outer if
  else { // huddle is not finished
    return;
  }//end of outer else statement
  ydsGainedThisDown = 0;
}// END of downs.advanceDown
