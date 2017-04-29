
$(document).ready(function() {
  $("#play-call").submit(function(event) {
    event.preventDefault();

    if (playCall == null) {
      playCall = $("input").val().toLowerCase();
      if (playCall === 'run') {
        $("input").attr("placeholder", "INSIDE or OUTSIDE run?");
      } else if (playCall === 'pass') {
        $("input").attr("placeholder", "SHORT, MEDIUM or DEEP pass?");
      } else if (playCall === "kick") {
        $("input").attr("placeholder", "PUNT or FIELD GOAL?");
      } else if (playCall === 'go for it') {
        $("input").attr("placeholder", "RUN or PASS?");
        playCall = null;
        type = null;
      } else {
        alert("choose a play");
        playCall = null; // if no valid play is selected reset null to prevent proceeding to next step
      }
    }  // end of if playcall is null

    else if (playCall != null) {
      type = $("input").val().toLowerCase(); // i don't think i need this if conditional bc huddle has a fail safe for incorrect input...keep for now
      if (playCall === 'run' || playCall === 'pass') {
        huddle(playCall, type); // call huddle, which calls playExecution
        downs.advanceDown(); // advance downs,
      } else if (playCall === 'kick') {
        if (type === 'field goal') {
          fieldgoal.kick();
        } else if (type === 'punt') {
          punt();
        }
        // call opponentPossession function
      }
    } // end of if playcall is not null
    $("input").val("");
  }); // end of submit function
}); // end of doc ready
