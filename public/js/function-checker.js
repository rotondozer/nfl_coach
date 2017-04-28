//OPPONENT POSSESSION function
var opponentFieldPosition = 100;
var opponentPoints = 0;

var probability = function() {
  return Math.floor(Math.random()*101);//1-100
}

var opponentDrive = function() {
  var scoringOdds = probability();
  if (opponentFieldPosition >= 96 && opponentFieldPosition < 101) {
    if (scoringOdds <= 12) {
      opponentPoints += 7;
      console.log("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >= 13 && scoringOdds <= 19) {
      opponentPoints += 3;
      console.log("Your opponent scored a FIELD GOAL");
    }
    else {
      console.log("Your opponent PUNTED");
    }
  }
  if (opponentFieldPosition >= 91 && opponentFieldPosition <= 95) {
    if (scoringOdds <= 13) {
      opponentPoints += 7;
      console.log("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >= 14 && scoringOdds <= 19) {
      opponentPoints += 3;
      console.log("Your opponent scored a FIELD GOAL");
    }
    else {
      console.log("Your opponent PUNTED");
    }
  }
  if (opponentFieldPosition >= 86 && opponentFieldPosition <= 90) {
    if (scoringOdds <= 15) {
      opponentPoints += 7;
      console.log("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >= 16 && scoringOdds <= 22) {
      opponentPoints += 3;
      console.log("Your opponent scored a FIELD GOAL");
    }
    else {
      console.log("Your opponent PUNTED");
    }
  }
  if (opponentFieldPosition >= 81 && opponentFieldPosition <= 85) {
    if (scoringOdds <= 16) {
      opponentPoints += 7;
      console.log("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >= 17 && scoringOdds <= 24) {
      opponentPoints += 3;
      console.log("Your opponent scored a FIELD GOAL");
    }
    else {
      console.log("Your opponent PUNTED");
    }
  }
  if (opponentFieldPosition >= 76 && opponentFieldPosition <= 80) {
    if (scoringOdds <= 18) {
      opponentPoints += 7;
      console.log("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >= 19 && scoringOdds <= 27) {
      opponentPoints += 3;
      console.log("Your opponent scored a FIELD GOAL");
    }
    else {}
  }
  if (opponentFieldPosition >= 71 && opponentFieldPosition <= 75) {
    if (scoringOdds <= 20) {
      opponentPoints += 7;
      console.log("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >= 21 && scoringOdds <= 30) {
      opponentPoints += 3;
      console.log("Your opponent scored a FIELD GOAL");
    }
    else {
      console.log("Your opponent PUNTED");
    }
  }
  if (opponentFieldPosition >= 66 && opponentFieldPosition <= 70) {
    if (scoringOdds <= 22) {
      opponentPoints += 7;
      console.log("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >=23 && scoringOdds <= 34) {
      opponentPoints += 3;
      console.log("Your opponent scored a FIELD GOAL");
    }
    else {
      console.log("Your opponent PUNTED");
    }
  }
  if (opponentFieldPosition >= 61 && opponentFieldPosition <= 65) {
    if (scoringOdds <= 24) {
      opponentPoints += 7;
      console.log("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >= 25 && scoringOdds <= 38) {
      opponentPoints += 3;
      console.log("Your opponent scored a FIELD GOAL");
    }
    else {
      console.log("Your opponent PUNTED");
    }
  }
  if (opponentFieldPosition >= 56 && opponentFieldPosition <= 60) {
    if (scoringOdds <= 25) {
      opponentPoints += 7;
      console.log("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >= 26 && scoringOdds <= 40) {
      opponentPoints += 3;
      console.log("Your opponent scored a FIELD GOAL");
    }
    else {
      console.log("Your opponent PUNTED");
    }
  }
}

opponentDrive();
console.log(opponentPoints);
opponentDrive();
console.log(opponentPoints);
opponentDrive();
console.log(opponentPoints);
opponentDrive();
console.log(opponentPoints);
opponentDrive();
console.log(opponentPoints);
