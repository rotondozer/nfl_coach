
//insideRun has 95% chance execution
var insideRun = function() {
  var executionOdds = probability();
  if (executionOdds > 95) {
    return ineffective;
  } else {
    var playOutcome = probability();
    if (playOutcome <= 46) {
      return notEffective();
    } else if (playOutcome >= 47 && playOutcome <= 72) {
      return minEffective();
    } else if (playOutcome >= 73 && playOutcome <= 85) {
      return effective();
    } else if (playOutcome >= 86 && playOutcome <= 95) {
      return veryEffective();
    } else if (playOutcome >= 96 && playOutcome <= 98) {
      return superEffective();
    } else if (playOutcome >= 99) {
      return bigPlay();
    }
  }
};

//outsideRun has 90% chance execution
var outsideRun = function() {
  var executionOdds = probability();
  if (executionOdds > 90) {
    return ineffective;
  } else {
    var playOutcome = probability();
    if (playOutcome <= 46) {
      return minEffective();
    } else if (playOutcome >= 47 && playOutcome <= 72) {
      return notEffective();
    } else if (playOutcome >= 73 && playOutcome <= 85) {
      return effective();
    } else if (playOutcome >= 86 && playOutcome <= 95) {
      return veryEffective();
    } else if (playOutcome >= 96 && playOutcome <= 98) {
      return superEffective();
    } else if (playOutcome >= 99) {
      return bigPlay();
    }
  }
};
 //shortPass has 80% chance execution
var shortPass = function() {
  var executionOdds = probability();
  if (executionOdds > 80) {
    return ineffective;
  } else {
    var playOutcome = probability();
    if (playOutcome <= 46) {
      return effective();
    } else if (playOutcome >= 47 && playOutcome <= 72) {
      return minEffective();
    } else if (playOutcome >= 73 && playOutcome <= 85) {
      return notEffective();
    } else if (playOutcome >= 86 && playOutcome <= 95) {
      return effective();
    } else if (playOutcome >= 96 && playOutcome <= 98) {
      return superEffective();
    } else if (playOutcome >= 99) {
      return bigPlay();
    }
  }
};
//mediumPass has 60% chance of execution, or completion
var mediumPass = function() {
  var executionOdds = probability();
  if (executionOdds > 60) {
    return ineffective;
  } else {
    var playOutcome = probability();
    if (playOutcome <= 46) {
      return veryEffective();
    } else if (playOutcome >= 47 && playOutcome <= 72) {
      return superEffective();
    } else if (playOutcome >= 73 && playOutcome <= 85) {
      return effective();
    } else if (playOutcome >= 86 && playOutcome <= 95) {
      return bigPlay();
    } else if (playOutcome >= 96 && playOutcome <= 98) {
      return notEffective();
    } else if (playOutcome >= 99) {
      return minEffective();
    }
  }
};
//deepPass has 20% chance of execution, or completion
var deepPass = function() {
  var executionOdds = probability();
  if (executionOdds > 20) {
    return ineffective;
  } else {
    var playOutcome = probability();
    if (playOutcome <= 46) {
      return superEffective();
    } else if (playOutcome >= 47 && playOutcome <= 72) {
      return bigPlay();
    } else if (playOutcome >= 73 && playOutcome <= 85) {
      return veryEffective();
    } else if (playOutcome >= 86 && playOutcome <= 95) {
      return effective();
    } else if (playOutcome >= 96 && playOutcome <= 98) {
      return notEffective();
    } else if (playOutcome >= 99) {
      return minEffective();
    }
  }
};
 console.log(deepPass());

//FIELD GOAL function
var fieldGoal = function() {
    alert("Field Goal is GOOD!");
    totalPoints += 3;
    opponentFieldPosition = 80;
    alert("Your opponent will start on their " + opponentFieldPosition + " yard line after the kickoff.");
    possessionChange(3);
};
//PUNT function!
var puntPlay = function() {
  var puntDistance = Math.floor(Math.random()*21+37);
  opponentFieldPosition -= puntDistance + totalYdsGained;
  if (puntDistance + totalYdsGained >= 100) {
    opponentFieldPosition = 80;
    alert(puntDistance + " yard punt into the End Zone.\nTouchback");
  } else {
    opponentFieldPosition = totalYdsGained + puntDistance;
    alert(puntDistance + " yard punt.\nYour opponent begins possession on their " + opponentFieldPosition);
  }
  possessionChange(3);
};

//OPPONENT POSSESSION function
var opponentDrive = function() {
  var scoringOdds = probability();
  if (opponentFieldPosition >= 96 && opponentFieldPosition < 101) {
    if (scoringOdds <= 12) {
      opponentPoints += 7;
      alert("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >= 13 && scoringOdds <= 19) {
      opponentPoints += 3;
      alert("Your opponent scored a FIELD GOAL");
    }
    else {
      alert("Your opponent PUNTED");
    }
  }
  if (opponentFieldPosition >= 91 && opponentFieldPosition <= 95) {
    if (scoringOdds <= 13) {
      opponentPoints += 7;
      alert("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >= 14 && scoringOdds <= 19) {
      opponentPoints += 3;
      alert("Your opponent scored a FIELD GOAL");
    }
    else {
      alert("Your opponent PUNTED");
    }
  }
  if (opponentFieldPosition >= 86 && opponentFieldPosition <= 90) {
    if (scoringOdds <= 15) {
      opponentPoints += 7;
      alert("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >= 16 && scoringOdds <= 22) {
      opponentPoints += 3;
      alert("Your opponent scored a FIELD GOAL");
    }
    else {
      alert("Your opponent PUNTED");
    }
  }
  if (opponentFieldPosition >= 81 && opponentFieldPosition <= 85) {
    if (scoringOdds <= 16) {
      opponentPoints += 7;
      alert("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >= 17 && scoringOdds <= 24) {
      opponentPoints += 3;
      alert("Your opponent scored a FIELD GOAL");
    }
    else {
      alert("Your opponent PUNTED");
    }
  }
  if (opponentFieldPosition >= 76 && opponentFieldPosition <= 80) {
    if (scoringOdds <= 18) {
      opponentPoints += 7;
      alert("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >= 19 && scoringOdds <= 27) {
      opponentPoints += 3;
      alert("Your opponent scored a FIELD GOAL");
    }
    else {
      alert("Your opponent PUNTED");
    }
  }
  if (opponentFieldPosition >= 71 && opponentFieldPosition <= 75) {
    if (scoringOdds <= 20) {
      opponentPoints += 7;
      alert("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >= 21 && scoringOdds <= 30) {
      opponentPoints += 3;
      alert("Your opponent scored a FIELD GOAL");
    }
    else {
      alert("Your opponent PUNTED");
    }
  }
  if (opponentFieldPosition >= 66 && opponentFieldPosition <= 70) {
    if (scoringOdds <= 22) {
      opponentPoints += 7;
      alert("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >=23 && scoringOdds <= 34) {
      opponentPoints += 3;
      alert("Your opponent scored a FIELD GOAL");
    }
    else {
      alert("Your opponent PUNTED");
    }
  }
  if (opponentFieldPosition >= 61 && opponentFieldPosition <= 65) {
    if (scoringOdds <= 24) {
      opponentPoints += 7;
      alert("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >= 25 && scoringOdds <= 38) {
      opponentPoints += 3;
      alert("Your opponent scored a FIELD GOAL");
    }
    else {
      alert("Your opponent PUNTED");
    }
  }
  if (opponentFieldPosition >= 56 && opponentFieldPosition <= 60) {
    if (scoringOdds <= 25) {
      opponentPoints += 7;
      alert("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >= 26 && scoringOdds <= 40) {
      opponentPoints += 3;
      alert("Your opponent scored a FIELD GOAL");
    }
    else {
      alert("Your opponent PUNTED");
    }
  }
  if (opponentFieldPosition >= 45 && opponentFieldPosition <= 55) {
    if (scoringOdds <= 30) {
      opponentPoints += 7;
      alert("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >= 31 && scoringOdds <= 50) {
      opponentPoints += 3;
      alert("Your opponent scored a FIELD GOAL");
    }
    else {
      alert("Your opponent PUNTED");
    }
  }
  if (opponentFieldPosition >= 35 && opponentFieldPosition <= 44) {
    if (scoringOdds <= 40) {
      opponentPoints += 7;
      alert("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >= 41 && scoringOdds <= 70) {
      opponentPoints += 3;
      alert("Your opponent scored a FIELD GOAL");
    }
    else {
      alert("Your opponent PUNTED");
    }
  }
  if (opponentFieldPosition >= 20 && opponentFieldPosition <= 34) {
    if (scoringOdds <= 50) {
      opponentPoints += 7;
      alert("Your opponent scored a TOUCHDOWN");
    }
    else if (scoringOdds >= 51 && scoringOdds <= 85) {
      opponentPoints += 3;
      alert("Your opponent scored a FIELD GOAL");
    }
    else {
      alert("Your opponent PUNTED");
    }
  }

  opponentFieldPosition = 100;
}


//add a trick play eventually
