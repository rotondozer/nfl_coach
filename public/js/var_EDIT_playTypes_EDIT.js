var opponentFieldPosition = 100;
var totalPoints = 0;
var opponentPoints = 0;
var numPossessions = 0;
var quarter = 1; //<--do something with this. for loop likely

var ydLineConverter = function() {
  if (fieldPosition > 50) {
    return "AWAY " + (100 - fieldPosition);
  } else {
    return "HOME " + fieldPosition;
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
}; //comment
var fieldgoal = [
  /*inside10:*/ [/*outerYdLine*/ 90, /*innerYdLine*/ 100, /*kickOdds*/ 98],
  /*between25and10:*/ [/*outerYdLine*/ 75, /*innerYdLine*/ 90, /*kickOdds*/ 80],
  /*between35and25:*/ [/*outerYdLine*/ 64, /*innerYdLine*/ 75, /*kickOdds*/ 60],
  /*between42and35:*/ [/*outerYdLine*/ 57, /*innerYdLine*/ 64, /*kickOdds*/ 20],
  /*outOfRange:*/ [/*outerYdLine*/ 1, /*innerYdLine*/ 57, /*kickOdds*/ 0]
]
fieldgoal.kick = function() {
  var arrLength = this.length; //should i be making a function instead of re-writing this exact loop?
  var i;
  for (i = 0; i < arrLength; i++) {
    if (fieldPosition > this[i][0] && fieldPosition <= this[i][1]) {// if fieldPosition is between outerYdLine and innerYdLine
      var fgOdds = numberGenerator.effectiveness("probability");
      if (fgOdds < this[i][2]) { // if probability generator is in favor of successful kick odd
        $("#home-play-updates").append("FIELD GOAL from the " + ydLineConverter() + " is GOOD!");
        totalPoints += 3;
        $("#home-team-score").text(totalPoints);
      } else { // probability generated missed field goal odds
        $("#home-play-updates").append("FIELD GOAL from the " + ydLineConverter() + " is MISSED");
      }
      return; // exit loop, call OPPONENT POSSESION FUNCTION
    }
  }
}

function punt() {
  var puntDistance = numberGenerator.effectiveness("punt");
  $("#home-play-updates").append("HOME team punted for " + puntDistance + " yards");
  playTypes.playExecution("puntreturn");
  fieldPosition += puntDistance - ydsGainedThisDown;
  $("#away-play-updates").append("Punt returned for " + ydsGainedThisDown + " yards.<br>AWAY team starts on the " + ydLineConverter() + " yard line.");
}

var playTypes = {
  insiderun: {execThreshold: 95, one: "notEffective", two: "minEffective", three: "effective", four: "veryEffective", five: "superEffective", six: "bigPlay"},
  outsiderun: {execThreshold: 90, one: "minEffective", two: "notEffective", three: "effective", four: "veryEffective", five: "superEffective", six: "bigPlay"},
  shortpass: {execThreshold: 80, one: "effective", two: "minEffective", three: "notEffective", four: "veryEffective", five: "superEffective", six: "bigPlay"},
  mediumpass: {execThreshold: 60, one: "veryEffective", two: "superEffective", three: "effective", four: "bigPlay", five: "notEffective", six: "minEffective"},
  deeppass: {execThreshold: 30, one: "bigPlay", two: "superEffective", three: "veryEffective", four: "effective", five: "notEffective", six: "minEffective"},
  puntreturn: {execThreshold: 75, one: "veryEffective", two: "effective", three: "minEffective", four: "notEffective", five: "superEffective", six: "bigPlay"}
  //punt object reuturn effectiveness of return, same method applied
}

playTypes.playExecution = function(input) { //where 'input' is specificPlay + generalPlay
  // potentially reset ydsGainedThisDown = 0 here?
  var executionOdds = numberGenerator.effectiveness("probability");
  if (executionOdds > this[input].execThreshold) { // gen num to decide if threshold is crossed
    return; //exit if threshold not crossed
  }
  else { // threshold has been crossed
    var effectivenessOdds = numberGenerator.effectiveness("probability");
    // HOW DO I CONSOLIDATE THIS...IMMEDIATELY INVOKE FUNCTION? for loop, i+whatever
    if (effectivenessOdds <= 46) {
      ydsGainedThisDown = numberGenerator.effectiveness(this[input].one);
    } else if (effectivenessOdds >= 47 && effectivenessOdds <= 72) {
      ydsGainedThisDown = numberGenerator.effectiveness(this[input].two);
    } else if (effectivenessOdds >= 73 && effectivenessOdds <= 85) {
      ydsGainedThisDown = numberGenerator.effectiveness(this[input].three);
    } else if (effectivenessOdds >= 86 && effectivenessOdds <= 95) {
      ydsGainedThisDown = numberGenerator.effectiveness(this[input].four);
    } else if (effectivenessOdds >= 96 && effectivenessOdds <= 98) {
      ydsGainedThisDown = numberGenerator.effectiveness(this[input].five);
    } else if (effectivenessOdds >= 99) {
      ydsGainedThisDown = numberGenerator.effectiveness(this[input].six);
    }
  }
};
var ydsGainedThisDown = 0;
var playCall = null;
var type = null;
var fieldPosition = 20;
var ydsToGo = 10;

var huddle = function(generalPlay, specificPlay) {
  if (playTypes.hasOwnProperty(specificPlay + generalPlay)) {
    // if input matches object in playTypes, execute that play function
    playTypes.playExecution(specificPlay + generalPlay);
    $("input").attr("placeholder", "RUN or PASS?");
    playCall = null;
    type = null;
  } else {
    alert("choose a " + generalPlay.toUpperCase() + " type");
    type = null;
  }
};

var downs = [
  ["First", true], ["Second", false], ["Third", false], ["Fourth", false]
]

// ydsGainedThisDown HAS BEEN UPDATED
// fieldPosition HAS BEEN UPDATED
downs.advanceDown = function(/* not sure if i need these*/) {
  fieldPosition += ydsGainedThisDown;
  ydsToGo -= ydsGainedThisDown;
  if (playCall === null) { // huddle finished with success
    var arrLength = this.length;
    var i;
    for (i = 0; i < arrLength; i++) {
      if (this[i][1]) {
        $("#home-play-updates").append("<p>" + ydsGainedThisDown + " yards gained on " + this[i][0] + " down</p>" );
        ydsGainedThisDown = 0;
      }
    }
    if (fieldPosition >= 100) { //TOUCHDOWN
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
      $("#home-play-updates").append("<p>FIRST DOWN!<br>First and 10 from the " + ydLineConverter() + " yard line</p>" );
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
            $("input").attr("placeholder", "KICK or GO FOR IT?");
          }
          return; // this ends the loop
        } //end of inner if statement
      } // end of inner loop
    } //end of no first, no td of advance down
  } //end of outer if
  else { // huddle is not finished
    return;
  }//end of outer else statement
}// END of downs.advanceDown
