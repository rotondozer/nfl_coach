var homePoints = 0;
var awayPoints = 0;
var ydsGainedThisDown = 0;
var homePossession = true;
var awayPossession = false;
var playCall = null;
var type = null;
var fieldPosition = 20;
var ydsToGo = 10;

var ydLineConverter = function(thisTeam, otherTeam) {
  if (fieldPosition > 50) {
    return otherTeam + " " + (100 - fieldPosition);
  } else {
    return thisTeam + " " + fieldPosition;
  }
}

var downs = [
  ["First", true], ["Second", false], ["Third", false], ["Fourth", false], ["TURNOVER", false]
]
/* not sure I need the loop in the function if this down is assigned 'false' before anytime it's called. */
downs.firstDown = function(thisTeam, otherTeam) {
  var arrLength = this.length;
  var i;
  ydsToGo = 10;
  this[0][1] = true;
  for (i = 0; i < arrLength; i++) {
    if (this[i][0] != "First") {
      this[i][1] = false;
    }
  }
  $("#" + thisTeam + "-play-updates").prepend("<p>First and 10 from the " + ydLineConverter(thisTeam, otherTeam) + " yard line.<br>FIRST DOWN!</p>");
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
fieldgoal.kick = function(thisTeam, otherTeam) {
  var arrLength = this.length; //should i be making a function instead of re-writing this exact loop?
  var i;
  for (i = 0; i < arrLength; i++) {
    if (fieldPosition > this[i][0] && fieldPosition <= this[i][1]) {// if fieldPosition is between outerYdLine and innerYdLine
      var fgOdds = numberGenerator.effectiveness("probability");
      if (fgOdds < this[i][2]) { // if probability generator is in favor of successful kick odd
        $("#" + thisTeam + "-play-updates").prepend("FIELD GOAL from the " + ydLineConverter(thisTeam, otherTeam) + " is GOOD!");
        homePoints += 3;
        $("#" + thisTeam + "-team-score").text(homePoints);
        fieldPosition = 20;
      } else { // probability generated missed field goal odds
        $("#" + thisTeam + "-play-updates").prepend("FIELD GOAL from the " + ydLineConverter(thisTeam, otherTeam) + " is MISSED");
      }
      return turnover(thisTeam, otherTeam); // exit loop, call OPPONENT POSSESION FUNCTION
    }
  }
}

function punt(kickTeam, returnTeam) { // can add parameter for HOME or AWAY
  var puntDistance = numberGenerator.effectiveness("punt");
  $("#" + kickTeam + "-play-updates").prepend(kickTeam + " team punted for " + puntDistance + " yards");
  if (fieldPosition + puntDistance > 100) {
    fieldPosition = 20; // mirror field position for AWAY possession
    $("#" + returnTeam + "-play-updates").prepend("Touchback. First and 10 on the " + ydLineConverter(returnTeam, kickTeam) + " yard line.");
  } else {
    playTypes.playExecution("puntreturn");
    fieldPosition += puntDistance - ydsGainedThisDown;
    fieldPosition = 100 - fieldPosition; // mirror field position for AWAY possession
    $("#" + returnTeam + "-play-updates").prepend("Punt returned for " + ydsGainedThisDown + " yards.<br>First and 10 on the " + ydLineConverter(returnTeam, kickTeam) + " yard line.<br>");
  }
  turnover(kickTeam, returnTeam);
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
  var executionOdds;
  if (homePossession) {
    $("#HOME-play-updates").prepend("<p>" + type + " " + playCall + " play called</p>");
    executionOdds = numberGenerator.effectiveness("probability");
  } else if (awayPossession) {
    $("#AWAY-play-updates").prepend("<p>" + input + " play called</p>");
    if (input === (type + playCall)) {
      $("#AWAY-play-updates").prepend("<p>DEFENSE guessed play!</p>");
      executionOdds = 99;
    }
  }

  if (executionOdds > this[input].execThreshold) { // gen num to decide if threshold is crossed
    return; //exit if threshold not crossed
            // return with ydsGainedThisDown = 0 if user guessess play correctly
  } else { // threshold has been crossed
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

playTypes.randomPlay = function() {
  var result;
  var count = 0;
  for (var prop in this) {
    if (prop !== 'playExecution' && prop !== 'puntreturn' && prop !== 'randomPlay') {
      if (Math.random() < 1/++count) {
        result = prop;
      }
    }
  }
  return result;
};

var huddle = function(generalPlay, specificPlay) {
  if (playTypes.hasOwnProperty(specificPlay + generalPlay)) { // if input matches object in playTypes, execute that play function
    if (homePossession) {
      playTypes.playExecution(specificPlay + generalPlay);
    }
    else if (awayPossession) {
      playTypes.playExecution(playTypes.randomPlay());
    }
    $("input").attr("placeholder", "RUN or PASS?");
    playCall = null;
    type = null;
  }
 else {
    alert("choose a " + generalPlay.toUpperCase() + " type");
    type = null;
  }
};

// ydsGainedThisDown HAS BEEN UPDATED
// fieldPosition HAS BEEN UPDATED
downs.advanceDown = function(thisTeam, otherTeam) {
  if (playCall === null) { // huddle finished with success
    fieldPosition += ydsGainedThisDown;
    ydsToGo -= ydsGainedThisDown;
    var arrLength = this.length;
    var i;
    for (i = 0; i < arrLength; i++) {
      if (this[i][1]) {
        $("#" + thisTeam + "-play-updates").prepend("<p>" + ydsGainedThisDown + " yards gained on " + this[i][0] + " down</p>" );
        ydsGainedThisDown = 0;
        this[i][1] = false; // this down becomes false
        if (fieldPosition >= 100) { //TOUCHDOWN
          if (awayPossession) {
            awayPoints += 7;
            $("#" + thisTeam + "-team-score").text(awayPoints);
          } else if (homePossession) {
            homePoints += 7; //increase homePoints by 7
            $("#" + thisTeam + "-team-score").text(homePoints);
          }
          fieldPosition = 20;
          $("#" + thisTeam + "-play-updates").prepend("<p>TOUCHDOWN!</p>" );
          return turnover(thisTeam, otherTeam);
        } else if (ydsToGo <= 0) { // FIRST DOWN
          // first down becomes true, all other downs[var][1] = false
          downs.firstDown(thisTeam, otherTeam);
        } else { // neither FIRST DOWN,  or TD,
          this[i + 1][1] = true; // next down becomes true
          $("#" + thisTeam + "-play-updates").prepend("<p>" + this[i + 1][0] + " down and " + ydsToGo + " from the " + ydLineConverter(thisTeam, otherTeam) + " yard line"); // announce next down and field position
          if (this[3][1]) { // FOURTH down
            $("input").attr("placeholder", "KICK or GO FOR IT?");
          } else if (this[4][1]) { //TURNOVER
            return turnover(thisTeam, otherTeam);
          }
        }
        return; // end loop (inside if)
      }
    } // end of for loop through downs array
  } else { // huddle is not finished (playCall != null)
      return;
  }
};

function turnover(thisTeam, otherTeam) {
  if (thisTeam === "AWAY") { //AWAY team commits turnover
    awayPossession = false;
    homePossession = true;
    $("h4").text("What's the call, coach?");
  } else if (thisTeam === "HOME") { //HOME team commits turnover
    homePossession = false;
    awayPossession = true;
    $("h4").text("GUESS the AWAY team's offensive play!");
  }
  downs.firstDown(otherTeam, thisTeam);
  $("input").val("");
  //fieldPosition = 100 - fieldPosition; // mirror field position
  playCall = null;
  type = null;
  $("input").val("");
  $("input").attr("placeholder", "RUN or PASS?");
};
