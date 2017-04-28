
//make playCall the parameter here? then write a function  for switch statements?
var huddle = function() {
  var playCall = document.getElementById('play-call').value;
  //prompt("What's the call, coach?\nShould we RUN or PASS the ball?").toLowerCase();
  switch (playCall) {
    case 'run':
      document.getElementById("home-play-updates").innerHTML = "Run it to the INSIDE or OUTSIDE?";
      var runType = document.getElementById("play-call").value;
      //prompt("Run it to the INSIDE or OUTSIDE?").toLowerCase();
      switch (runType) {
        case 'inside':
          return insideRun();
          break;
        case 'outside':
          return outsideRun();
          break;
        default:
          alert("That's not in our playbook!");
          return huddle();
      }
    break;
    case 'pass':
      var passType = prompt("Should we throw it SHORT, MEDIUM, or DEEP?").toLowerCase();
      switch (passType) {
        case 'short':
          return shortPass();
          break;
        case 'medium':
          return mediumPass();
          break;
        case 'deep':
          return deepPass();
          break;
        default:
          alert("That's not a pass play we know how to do!");
          return huddle();
      }
      case 'punt':
        return puntPlay();
        break;
    default:
      alert("That's not in our playbook");
      return huddle();
  }
};

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
