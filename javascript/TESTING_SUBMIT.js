
$(document).ready(function() {
  $("#play-call").submit(function(event) {
    event.preventDefault();

    if (playCall == null) {
      playCall = $("input").val();
      if (playCall === 'run') {
        $("input").attr("placeholder", "INSIDE or OUTSIDE run?");
      } else if (playCall === 'pass') {
        $("input").attr("placeholder", "SHORT, MEDIUM or DEEP pass?");
      } else if (playCall === "kick") {
        $("input").attr("placeholder", "PUNT or FIELD GOAL");
      } else {
        alert("choose a play");
        playCall = null; // if no valid play is selected reset null to prevent proceeding to next step
      }
    }  // end of if playcall is null

    else if (playCall != null) {
      type = $("input").val();
      if (playCall === 'run' || playCall === 'pass' || playCall === 'kick') {
        huddle(playCall, type); // call huddle, which calls playExecution
        downs.advanceDown(); // advance downs,
      }
    } // end of if playcall is not null
    $("input").val("");
  }); // end of submit function
}); // end of doc ready
