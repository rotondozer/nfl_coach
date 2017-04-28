
var playCall = null;
var runType = null;
var passType = null;

function huddle(generalPlay, specificPlay) {
  // replace this later with for loop through function names
  if (specificPlay === 'inside' || specificPlay === 'outside' || specificPlay === 'short' || specificPlay === 'medium' || specificPlay === 'deep') {
    alert(specificPlay.toUpperCase() + " " + generalPlay.toUpperCase() + " function call");
    $("input").attr("placeholder", "RUN or PASS?");
    playCall = null;
    runType = null;
    passType = null;
  }
  else {
    alert("choose a " + generalPlay.toUpperCase() + " type");
    runType = null;
    passType = null;
  }
};

$(document).ready(function() {
  $("#play-call").submit(function(event) {
    event.preventDefault();

    if (playCall == null) {
      playCall = $("input").val();
      if (playCall === 'run') {
        $("input").attr("placeholder", "INSIDE or OUTSIDE run?");
      } else if (playCall === 'pass') {
        $("input").attr("placeholder", "SHORT, MEDIUM or DEEP pass?");
      } else {
        alert("choose a RUN or PASS play");
        playCall = null;
      }
    }
    else if (playCall != null) {
      if (playCall === 'run') {
        runType = $("input").val();
        huddle(playCall, runType);
      } else if (playCall === 'pass') {
        passType = $("input").val();
        huddle(playCall, passType);
      }
    }
    $("input").val("");
  });
});


function drive() {
  while (numPossessions < 13) {
    while (downs[0]) { //first
      alert("It's 1st and " + ydsToGo + " from the " + totalYdsGained + " yard line");
      var ydsThisDown = huddle();
      alert("You gained " + ydsThisDown + " yards on First Down");
      ydsToGo -= ydsThisDown;
      totalYdsGained += ydsThisDown;
      firstDownCheck(0, 1);
      touchDownCheck(0);
    }
    while (downs[1]) { //second
      alert("It's 2nd and " + ydsToGo + " from the " + totalYdsGained + " yard line");
      var ydsThisDown = huddle();
      totalYdsGained += ydsThisDown;
      alert("You gained " + ydsThisDown + " yards on Second Down");
      ydsToGo -= ydsThisDown;
      firstDownCheck(1, 2);
      touchDownCheck(1);
    }
    while (downs[2]) { //Third
      alert("It's 3rd and " + ydsToGo + " from the " + totalYdsGained + " yard line")
      var ydsThisDown = huddle();
      totalYdsGained += ydsThisDown;
      alert("You gained " + ydsThisDown + " yards on Third Down");
      ydsToGo -= ydsThisDown;
      firstDownCheck(2, 3);
      touchDownCheck(2);
    }
    //fourthDown needs to be different to accomodate turnover
    while (downs[3]) {
      alert("It's 4th and " + ydsToGo + " from the " + totalYdsGained + " yard line");
      var decision = prompt("Should we KICK, or GO FOR IT?").toLowerCase();
      if (decision == 'kick' || decision == 'kick it') {
        if (totalYdsGained < 65) {
          var puntConfirm = prompt("It's too long to attempt a Field Goal.\nAre you sure you want to PUNT?").toLowerCase();
          if (puntConfirm == 'yes' || puntConfirm == 'punt') {
            puntPlay();
          } else {
            alert("Make a decision!\nWe're running out of time!");
          }
        } else {
            fieldGoal();
        }
      } else if (decision == 'go for it') {
      var ydsThisDown = huddle();
      totalYdsGained += ydsThisDown;
      alert("You gained " + ydsThisDown + " yards on Fourth Down");
      ydsToGo -= ydsThisDown;
      firstDownCheck(3, 4);
      touchDownCheck(3);
      if (downs[4]) {
        opponentFieldPosition = totalYdsGained;
        alert("TURNOVER on downs\nYour opponent starts on their " + opponentFieldPosition + " yard line.");
        possessionChange(3);
      }
    }
  }
  if (numPossessions == 3 || numPossessions == 6 || numPossessions == 9 || numPossessions == 12) { //doesn't work
    alert("End of Quarter " + quarter);
    if (quarter == 4) {
      alert("The game is over\nFinal Score:\nHome: " + totalPoints + "\nAway: " + opponentPoints);
      if (totalPoints > opponentPoints) {
        alert("You Win!!!");
      } else if (opponentPoints > totalPoints) {
        alert("You lost :(")
      } else {
        alert("The game is a tie, or something went terribly wrong");
      }
    }
    quarter++;
  }
 }
};

var quarterChange = function() {
  if (numPossessions % 4 == 0) {

  }
}

drive();
